# Dishari — Form Submission Architecture (Option 4)
## "Invisible Bot Submission" Technical Specification

> **Core Concept:** The user interacts only with Dishari's clean, Bangla-first UI.
> A server-side Playwright bot handles all interaction with the government website invisibly.
> The user never sees the government site.

---

## High-Level Flow

```
User fills Dishari form (pre-filled from Document Locker)
        ↓
User clicks "Submit Application"
        ↓
API call → Dishari Job Queue
        ↓
Playwright Worker spins up (server-side)
        ↓
        ├── Navigates to government site
        ├── Fills all form fields using user's data
        ├── Uploads required files (photos, PDFs)
        ├── Hits CAPTCHA? → Pauses → Sends to user
        │       ↓
        │   User solves CAPTCHA on Dishari UI
        │   Solution sent back to worker via WebSocket
        │   Worker continues
        └── Submits the form
        ↓
Worker captures confirmation number / receipt screenshot
        ↓
User sees: "আপনার আবেদন সফল হয়েছে ✅ Tracking: BD-XXXXXXX"
```

---

## Tech Stack

| Component | Technology | Why |
|---|---|---|
| **Frontend** | Next.js 14 (App Router) | Server Actions, API Routes |
| **Bot / Browser Automation** | Playwright (Node.js) | Best-in-class, handles SPAs well |
| **Job Queue** | BullMQ + Redis | Persistent job queue, retries, status tracking |
| **Real-time Communication** | Socket.IO or Supabase Realtime | Push status updates & CAPTCHA to user |
| **Document Storage** | Supabase Storage | Stored user docs, accessible by worker |
| **Database** | Supabase (PostgreSQL) | Job records, user profiles, extracted doc data |
| **CAPTCHA Solver (fallback)** | 2captcha.com API | If user is not available to solve |
| **Worker Hosting** | Railway / Render (Node.js server) | Persistent server for Playwright (not serverless) |
| **Frontend Hosting** | Vercel | Next.js optimized |

> ⚠️ **IMPORTANT:** Playwright CANNOT run on Vercel serverless functions (timeout limit, no persistent process).
> The Playwright worker MUST run on a persistent server (Railway, Render, DigitalOcean, VPS).
> Only the Next.js frontend lives on Vercel.

---

## Database Schema

### `users` table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE,
  phone TEXT UNIQUE,
  full_name_bn TEXT,         -- Name in Bangla
  full_name_en TEXT,         -- Name in English
  nid_number TEXT,
  date_of_birth DATE,
  father_name_bn TEXT,
  mother_name_bn TEXT,
  permanent_address JSONB,   -- { division, district, upazila, village, post_code }
  current_address JSONB,
  occupation TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### `documents` table
```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,         -- 'nid', 'birth_cert', 'photo', 'tin', 'trade_license', etc.
  file_url TEXT NOT NULL,     -- Supabase Storage URL
  extracted_data JSONB,       -- OCR output: { nid_number, name, dob, address, ... }
  verified BOOLEAN DEFAULT FALSE,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);
```

### `submission_jobs` table
```sql
CREATE TABLE submission_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  service_slug TEXT NOT NULL,          -- e.g. 'passport', 'nid-correction'
  status TEXT DEFAULT 'pending',       -- pending | running | captcha_needed | done | failed
  form_data JSONB NOT NULL,            -- Snapshot of data sent to bot
  captcha_image_url TEXT,              -- Stored temporarily when CAPTCHA occurs
  captcha_solution TEXT,               -- User's answer, sent back to bot
  confirmation_number TEXT,            -- Returned by govt site on success
  receipt_screenshot_url TEXT,         -- Screenshot of confirmation page
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### `services` table
```sql
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,           -- 'passport', 'nid-correction', 'birth-registration'
  name_bn TEXT NOT NULL,
  name_en TEXT NOT NULL,
  category TEXT,                       -- 'identity', 'land', 'welfare', 'education', 'business'
  submission_type TEXT,                -- 'online_bot' | 'pdf_only' | 'hybrid'
  target_url TEXT,                     -- Government form URL (for bot)
  form_field_map JSONB,               -- Maps our fields → govt site's HTML input selectors
  required_docs TEXT[],               -- ['nid', 'photo', 'birth_cert']
  steps JSONB,                         -- Step-by-step guide for user
  fees JSONB,                          -- { amount, currency, payment_method }
  processing_time TEXT,
  official_link TEXT,
  is_active BOOLEAN DEFAULT TRUE
);
```

---

## `form_field_map` Schema (Critical)

This is the brain of the bot. For each service, we define a mapping from our data fields to the government site's HTML selectors.

```json
{
  "service": "passport",
  "target_url": "https://www.epassport.gov.bd/authorization/applicant-registration",
  "steps": [
    {
      "step": 1,
      "url_pattern": "/applicant-registration",
      "action": "fill",
      "fields": [
        {
          "our_field": "user.full_name_en",
          "selector": "#applicantName",
          "type": "text"
        },
        {
          "our_field": "user.date_of_birth",
          "selector": "#dateOfBirth",
          "type": "date",
          "format": "DD/MM/YYYY"
        },
        {
          "our_field": "user.nid_number",
          "selector": "#nidNumber",
          "type": "text"
        },
        {
          "our_field": "documents.photo.file_url",
          "selector": "#photoUpload",
          "type": "file"
        },
        {
          "our_field": "user.permanent_address.district",
          "selector": "#district",
          "type": "select",
          "value_map": {
            "ঢাকা": "1",
            "চট্টগ্রাম": "2",
            "রাজশাহী": "3"
          }
        }
      ],
      "next_trigger": {
        "type": "click",
        "selector": "#btnNext"
      }
    },
    {
      "step": 2,
      "url_pattern": "/payment",
      "action": "wait_for_user"
    }
  ],
  "success_indicators": [
    { "type": "url_contains", "value": "/confirmation" },
    { "type": "text_contains", "selector": "body", "value": "Application ID" }
  ],
  "captcha_selectors": [
    "#captchaImage",
    ".g-recaptcha",
    "iframe[src*='recaptcha']"
  ]
}
```

---

## Worker Architecture

### Directory Structure
```
/worker
  ├── index.ts              -- BullMQ worker entry point
  ├── browser-manager.ts    -- Playwright browser pool
  ├── job-processor.ts      -- Main job execution logic
  ├── captcha-handler.ts    -- CAPTCHA detection & resolution
  ├── field-filler.ts       -- Fills form fields from field map
  ├── file-uploader.ts      -- Downloads from Supabase, uploads to govt site
  ├── screenshot.ts         -- Captures confirmation screenshots
  └── services/
        ├── passport.ts     -- Service-specific overrides if needed
        ├── nid-correction.ts
        └── ...
```

### `job-processor.ts` — Core Logic
```typescript
import { chromium } from 'playwright';
import { supabase } from './supabase-client';
import { fillFields } from './field-filler';
import { handleCaptcha } from './captcha-handler';
import { notifyUser } from './realtime';

export async function processJob(jobId: string) {
  // 1. Fetch job + user data from DB
  const { data: job } = await supabase
    .from('submission_jobs')
    .select('*, users(*), services(*)')
    .eq('id', jobId)
    .single();

  await updateJobStatus(jobId, 'running');

  // 2. Launch browser
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    locale: 'bn-BD',
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  try {
    const fieldMap = job.services.form_field_map;

    // 3. Navigate and fill each step
    for (const step of fieldMap.steps) {
      await page.goto(step.url_pattern.startsWith('http')
        ? step.url_pattern
        : job.services.target_url
      );

      if (step.action === 'fill') {
        await fillFields(page, step.fields, job);
      }

      // 4. CAPTCHA check at every step
      const captchaFound = await handleCaptcha(page, job, fieldMap.captcha_selectors);
      if (!captchaFound) {
        // Trigger next step
        if (step.next_trigger?.type === 'click') {
          await page.click(step.next_trigger.selector);
          await page.waitForNavigation({ waitUntil: 'networkidle' });
        }
      }
    }

    // 5. Check for success
    const confirmed = await checkSuccess(page, fieldMap.success_indicators);
    if (confirmed) {
      const screenshot = await page.screenshot({ fullPage: true });
      const screenshotUrl = await uploadScreenshot(screenshot, jobId);
      const confirmationNum = await extractConfirmationNumber(page, fieldMap);

      await supabase.from('submission_jobs').update({
        status: 'done',
        confirmation_number: confirmationNum,
        receipt_screenshot_url: screenshotUrl
      }).eq('id', jobId);

      await notifyUser(job.user_id, {
        type: 'submission_success',
        jobId,
        confirmationNumber: confirmationNum,
        screenshotUrl
      });
    }

  } catch (err) {
    await supabase.from('submission_jobs').update({
      status: 'failed',
      error_message: err.message
    }).eq('id', jobId);

    await notifyUser(job.user_id, { type: 'submission_failed', jobId, error: err.message });
  } finally {
    await browser.close();
  }
}
```

### `captcha-handler.ts`
```typescript
import { Page } from 'playwright';
import { supabase } from './supabase-client';
import { notifyUser } from './realtime';

export async function handleCaptcha(
  page: Page,
  job: any,
  captchaSelectors: string[]
): Promise<boolean> {

  for (const selector of captchaSelectors) {
    const element = await page.$(selector);
    if (!element) continue;

    const isRecaptcha = selector.includes('recaptcha');

    if (isRecaptcha) {
      // Option 1: Use 2captcha.com API
      const siteKey = await page.$eval(
        '.g-recaptcha',
        el => el.getAttribute('data-sitekey')
      );
      const solution = await solve2Captcha(siteKey, page.url());
      await page.evaluate((sol) => {
        (window as any).___grecaptcha_cfg.clients[0].aa.l.callback(sol);
      }, solution);
      return true;
    }

    // Image CAPTCHA — send to user
    const captchaImage = await element.screenshot();
    const imageUrl = await uploadCaptchaImage(captchaImage, job.id);

    // Update DB + notify user via WebSocket
    await supabase.from('submission_jobs').update({
      status: 'captcha_needed',
      captcha_image_url: imageUrl
    }).eq('id', job.id);

    await notifyUser(job.user_id, {
      type: 'captcha_needed',
      jobId: job.id,
      captchaImageUrl: imageUrl
    });

    // Wait for user solution (poll DB, timeout 5 minutes)
    const solution = await waitForCaptchaSolution(job.id, 300_000);
    if (!solution) throw new Error('CAPTCHA timeout — user did not respond');

    // Type the solution into the CAPTCHA field
    const inputSelector = captchaSelectors
      .find(s => s.includes('input') || s.includes('captchaInput'))
      ?? '#captchaInput';
    await page.fill(inputSelector, solution);
    return true;
  }

  return false; // No CAPTCHA found
}

async function waitForCaptchaSolution(jobId: string, timeoutMs: number): Promise<string | null> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const { data } = await supabase
      .from('submission_jobs')
      .select('captcha_solution')
      .eq('id', jobId)
      .single();

    if (data?.captcha_solution) return data.captcha_solution;
    await new Promise(r => setTimeout(r, 2000)); // poll every 2 seconds
  }
  return null;
}
```

---

## Frontend — API Routes (Next.js)

### `POST /api/jobs/submit`
```typescript
// app/api/jobs/submit/route.ts
import { createClient } from '@/lib/supabase/server';
import { submissionQueue } from '@/lib/queue';

export async function POST(req: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const { serviceSlug } = await req.json();

  // Fetch user's full profile + relevant documents
  const { data: profile } = await supabase
    .from('users')
    .select('*, documents(*)')
    .eq('id', user.id)
    .single();

  // Create job record
  const { data: job } = await supabase
    .from('submission_jobs')
    .insert({
      user_id: user.id,
      service_slug: serviceSlug,
      status: 'pending',
      form_data: profile  // snapshot of user data at time of submission
    })
    .select()
    .single();

  // Push to BullMQ queue
  await submissionQueue.add('process', { jobId: job.id });

  return Response.json({ jobId: job.id });
}
```

### `POST /api/jobs/captcha-solution`
```typescript
// app/api/jobs/captcha-solution/route.ts
export async function POST(req: Request) {
  const supabase = createClient();
  const { jobId, solution } = await req.json();

  // Verify this job belongs to the authenticated user
  const { data: { user } } = await supabase.auth.getUser();
  const { data: job } = await supabase
    .from('submission_jobs')
    .select('user_id')
    .eq('id', jobId)
    .single();

  if (job?.user_id !== user?.id) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  await supabase.from('submission_jobs').update({
    captcha_solution: solution,
    status: 'running'
  }).eq('id', jobId);

  return Response.json({ ok: true });
}
```

---

## Frontend — User-Facing Components

### Job Status Page (`/apply/[serviceSlug]/status/[jobId]`)

States to handle in the UI:

```
pending       → "আপনার আবেদন প্রক্রিয়া শুরু হচ্ছে..." (spinner)
running       → "সরকারি ওয়েবসাইটে তথ্য পূরণ হচ্ছে..." (animated progress)
captcha_needed → CAPTCHA UI (image + text input + submit button)
done          → "✅ আবেদন সফল! আপনার ট্র্যাকিং নম্বর: BD-XXXXXX"
               [View Receipt Screenshot] [Download PDF]
failed        → "❌ কিছু একটা সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।"
               [Error details] [Retry]
```

```tsx
// components/JobStatusTracker.tsx
'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export function JobStatusTracker({ jobId }: { jobId: string }) {
  const [job, setJob] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    // Initial fetch
    supabase.from('submission_jobs')
      .select('*').eq('id', jobId).single()
      .then(({ data }) => setJob(data));

    // Real-time subscription
    const channel = supabase
      .channel(`job-${jobId}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'submission_jobs',
        filter: `id=eq.${jobId}`
      }, (payload) => {
        setJob(payload.new);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [jobId]);

  if (!job) return <Spinner />;

  if (job.status === 'captcha_needed') {
    return <CaptchaSolver
      jobId={jobId}
      captchaImageUrl={job.captcha_image_url}
    />;
  }

  if (job.status === 'done') {
    return <SuccessScreen
      confirmationNumber={job.confirmation_number}
      screenshotUrl={job.receipt_screenshot_url}
    />;
  }

  return <ProgressScreen status={job.status} />;
}
```

---

## Security Considerations

| Risk | Mitigation |
|---|---|
| User submits someone else's data | Jobs are user-scoped; `user_id` validated on every API call |
| Sensitive docs exposed in worker | Worker fetches files via signed Supabase URLs (expire in 1 hour) |
| Bot detected by government site | Rotate user agents, use realistic delays between actions (`page.waitForTimeout(1000 + Math.random() * 2000)`) |
| Playwright crashes mid-job | BullMQ retries failed jobs up to 3 times with exponential backoff |
| CAPTCHA timeout | Job marked `failed`, user notified, can retry |
| Government site changes its HTML | field_map is in DB — update selectors without code changes |
| User submits wrong data | Always show a "Review & Confirm" screen before submitting job |
| PII in job logs | Sanitize logs — never log NID, DOB, file contents |

---

## Anti-Detection Best Practices for Playwright

```typescript
// Add to browser context setup
const context = await browser.newContext({
  userAgent: 'Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
  locale: 'bn-BD',
  timezoneId: 'Asia/Dhaka',
  viewport: { width: 390, height: 844 }, // iPhone 14 size
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
});

// Human-like typing
async function humanType(page: Page, selector: string, text: string) {
  await page.click(selector);
  for (const char of text) {
    await page.keyboard.type(char, { delay: 50 + Math.random() * 100 });
  }
}

// Human-like delays between steps
await page.waitForTimeout(1000 + Math.random() * 2000);
```

---

## Service Onboarding Checklist

When adding a new government service to the system:

- [ ] Manually visit the government form website
- [ ] Map all form fields → record their HTML selectors (`#id`, `.class`, `[name="x"]`)
- [ ] Identify multi-step flow (how many pages/steps?)
- [ ] Identify what files need to be uploaded and their format requirements
- [ ] Check if CAPTCHA exists and what type (image, reCAPTCHA v2, v3)
- [ ] Check if login/account is required on the government site
- [ ] Record the success page indicators (URL change, confirmation text, receipt format)
- [ ] Write the `form_field_map` JSON and insert into `services` table
- [ ] Test manually with Playwright in headed mode (`headless: false`)
- [ ] Test with real user data
- [ ] Deploy and monitor first 5 live submissions

---

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # Worker only — never expose to frontend

# Queue (Redis)
REDIS_URL=redis://localhost:6379

# CAPTCHA (optional)
TWOCAPTCHA_API_KEY=

# Worker
WORKER_SECRET=                    # Shared secret between Next.js API and worker
NODE_ENV=production
```

---

## Deployment Architecture

```
┌─────────────────┐     ┌──────────────────────┐     ┌─────────────────┐
│   Vercel        │     │   Railway / Render    │     │   Supabase      │
│   (Frontend)    │────▶│   (Worker Server)     │────▶│   (DB + Storage)│
│   Next.js       │     │   Playwright + BullMQ │     │   PostgreSQL    │
│   API Routes    │     │   Redis               │     │   Realtime      │
└─────────────────┘     └──────────────────────┘     └─────────────────┘
         │                                                     │
         └─────────────────────────────────────────────────────┘
                    Supabase Realtime (WebSockets)
                    pushes job status updates to user's browser
```

---

## Known Limitations & Fallbacks

| Situation | Fallback |
|---|---|
| Government site is down | Notify user, offer to retry later automatically |
| Form structure changed (selector broken) | Job fails gracefully → alert admin → manual fix of field_map |
| File format rejected by govt site | Pre-validate file size/format before job starts |
| Login required on govt site | Collect govt site credentials from user (store encrypted) OR prompt user to create an account on govt site first |
| reCAPTCHA v3 (invisible, score-based) | Use 2captcha Enterprise or accept some failures |
| Service not yet supported | Show "আসছে শীঘ্রই" with option to request the service |

---

*Last updated: November 2026*
*Project: Dishari (দিশারী) — জনবন্ধু AI*
