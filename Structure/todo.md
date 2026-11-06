# Dishari (দিশারী) — Base Website TODO

> **Goal:** Build a clean, navigable, mobile-first website shell with correct branding,
> routing, and UI structure. NO backend logic yet. NO database. NO AI features.
> Just the foundation everything else will be built on.
>
> **Primary language:** Bangla (বাংলা)
> **Secondary language:** English
> **Stack:** Next.js 14 (App Router) + Tailwind CSS + shadcn/ui
> **Target:** Works perfectly on mobile. Rural users. Low-end Android devices.

---

## Task 0 — Project Initialization
*Do this first. Everything else depends on it.*

- [x] **0.1** Scaffold Next.js 14 project with App Router
  ```bash
  npx create-next-app@latest dishari --typescript --tailwind --eslint --app --src-dir
  ```
- [ ] **0.2** Install shadcn/ui
  ```bash
  npx shadcn@latest init
  ```
  Choose: Default style, Zinc base color, CSS variables: yes

- [x] **0.3** Install required packages
  ```bash
  npm install lucide-react next-themes clsx tailwind-merge
  ```

- [x] **0.4** Configure Bangla font in `app/layout.tsx`
  - Use Google Fonts: **Noto Sans Bengali** (primary) + **Inter** (English fallback)
  - Add to `<head>`:
    ```html
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    ```
  - Set `font-family: 'Noto Sans Bengali', 'Inter', sans-serif` as the global default

- [x] **0.5** Set up global CSS variables in `app/globals.css`
  - Define brand colors (see Design System section below)

- [ ] **0.6** Set up folder structure:
  ```
  src/
    app/
      (marketing)/          -- Public pages (home, about, services)
        page.tsx            -- Home
        about/page.tsx
        services/page.tsx
        services/[slug]/page.tsx
      (auth)/               -- Auth pages (login, register)
        login/page.tsx
        register/page.tsx
      dashboard/            -- Protected user area (shell only for now)
        page.tsx
      layout.tsx            -- Root layout
      globals.css
    components/
      layout/
        Navbar.tsx
        Footer.tsx
        MobileNav.tsx
      ui/                   -- shadcn components go here (auto-generated)
      home/                 -- Components used only on the home page
      services/             -- Components used only on services pages
      shared/               -- Reusable across pages
    lib/
      utils.ts
      constants.ts          -- Service list, category data (mock data)
    types/
      index.ts
  ```

- [x] **0.7** Create a `.env.local` file (empty for now, with placeholder keys)
  ```
  NEXT_PUBLIC_APP_URL=http://localhost:3000
  NEXT_PUBLIC_APP_NAME=দিশারী
  ```

---

## Design System (Reference — Apply Throughout)

> Every developer/AI working on this MUST follow this design system for consistency.

### Brand Colors
```css
/* globals.css */
:root {
  --brand-green: #16a34a;       /* Primary — trust, Bangladesh */
  --brand-green-light: #dcfce7;
  --brand-green-dark: #15803d;
  --brand-red: #dc2626;         /* Accent — Bangladesh flag */
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #0f172a;
  --text-secondary: #64748b;
  --border: #e2e8f0;
}
```

### Typography Rules
- **All body text, labels, buttons:** Bangla first
- **Numbers, codes, URLs:** English/Latin numerals are fine
- **Heading hierarchy:** Use `text-2xl font-bold` for page titles, `text-lg font-semibold` for section titles
- **Line height:** Use `leading-relaxed` for all Bangla text (Bangla script needs more vertical space)
- **Font size minimum:** Never below `text-sm` (14px) — rural users, small screens, older eyes

### Component Rules
- All buttons: minimum height `h-12` (48px) — large touch targets for mobile
- All inputs: minimum height `h-12`, large placeholder text
- Cards: `rounded-2xl shadow-sm border border-border`
- Use icons from `lucide-react` only
- All interactive elements must have clear hover AND focus states

---

## Task 1 — Global Layout (Navbar + Footer)
*These appear on every page. Build them first.*

### 1.1 — Navbar (`components/layout/Navbar.tsx`)
- [x] **1.1.1** Logo on the left: "দিশারী" text logo in brand green + small tagline "জনবন্ধু AI"
- [x] **1.1.2** Desktop nav links (center or right):
  - সেবাসমূহ (Services)
  - আমাদের সম্পর্কে (About)
  - যোগাযোগ (Contact)
- [x] **1.1.3** Right side buttons:
  - "লগইন" (Login) — outlined button
  - "নিবন্ধন করুন" (Register) — solid green button
- [x] **1.1.4** Language toggle button: "বাং | EN" — switches between Bangla and English display (use React context, no library needed yet)
- [x] **1.1.5** On mobile: Hide desktop nav links. Show hamburger icon.
- [x] **1.1.6** Mobile drawer nav (`components/layout/MobileNav.tsx`):
  - Slide-in from left or bottom sheet
  - Full-width links with icons
  - Login / Register buttons at bottom
- [x] **1.1.7** Navbar should be sticky (`sticky top-0 z-50`) with a subtle shadow on scroll

### 1.2 — Footer (`components/layout/Footer.tsx`)
- [x] **1.2.1** Three column layout (stacks to single column on mobile):
  - **Col 1:** Logo + 1-line mission statement in Bangla
  - **Col 2:** দ্রুত লিংক (Quick Links) — same as nav links + FAQ
  - **Col 3:** জরুরি হেল্পলাইন (Emergency Helplines):
    - জাতীয় হেল্পলাইন: ৩৩৩
    - জরুরি সেবা: ৯৯৯
    - দুর্নীতি দমন: ১০৬
- [x] **1.2.2** Bottom bar: Copyright text + "তৈরি করেছে দিশারী টিম"
- [x] **1.2.3** Background: dark green (`#15803d`) with white text

---

## Task 2 — Home Page (`app/(marketing)/page.tsx`)
*The most important page. First impression for rural users.*

### 2.1 — Hero Section
- [x] **2.1.1** Full-width section, green gradient background
- [x] **2.1.2** Large headline (Bangla): **"সরকারি সেবা এখন আপনার হাতের মুঠোয়"**
- [x] **2.1.3** Subheadline (Bangla): "কোন কাগজ লাগবে? কোথায় যেতে হবে? কীভাবে আবেদন করবেন? সব উত্তর এখানে।"
- [x] **2.1.4** Large search bar with placeholder: "আপনি কী খুঁজছেন? যেমন: পাসপোর্ট, জন্ম নিবন্ধন..."
  - Fully wired to live database search API with real-time autocomplete dropdown
  - Search icon button on the right
- [x] **2.1.5** Below search bar: Popular search tags as clickable chips
  - পাসপোর্ট · NID সংশোধন · জন্ম নিবন্ধন · উপবৃত্তি · ভাতা · ট্রেড লাইসেন্স
- [x] **2.1.6** Animated Logo Intro: Seamless bespoke multi-stage choreographed SVG logo intro (compass stroke draw, spring-damped needle sweep, star flare, Kalpurush typography reveal, and glint pass) on the hero page

### 2.2 — Service Category Grid
- [x] **2.2.1** Section title: "কোন সেবা খুঁজছেন?"
- [x] **2.2.2** Grid of category cards: 2 columns on mobile, 3 on tablet, 4 on desktop
- [x] **2.2.3** Categories to include (with icons from lucide-react):
  | Category (Bangla) | Category (English) | Icon |
  |---|---|---|
  | পরিচয় ও নথিপত্র | Identity & Documents | `IdCard` |
  | শিক্ষা ও বৃত্তি | Education & Scholarship | `GraduationCap` |
  | ভূমি ও সম্পত্তি | Land & Property | `MapPin` |
  | কল্যাণ ও ভাতা | Welfare & Allowance | `HeartHandshake` |
  | ব্যবসা ও উদ্যোগ | Business & Enterprise | `Briefcase` |
  | কর ও রাজস্ব | Tax & Revenue | `Receipt` |
  | প্রবাসী সেবা | Overseas Services | `Plane` |
  | স্বাস্থ্যসেবা | Health Services | `Stethoscope` |
- [x] **2.2.4** Each card: icon (top) + category name (Bangla bold, English small) + arrow icon
- [x] **2.2.5** Cards link to `/services?category=[slug]`

### 2.3 — "How It Works" Section
- [x] **2.3.1** Section title: "কীভাবে কাজ করে?"
- [x] **2.3.2** 3-step horizontal flow (stacks vertically on mobile):
  - Step 1: 🔍 "সেবা বেছে নিন" — আপনার প্রয়োজনীয় সরকারি সেবাটি খুঁজুন
  - Step 2: 📋 "কাগজপত্র দেখুন" — কী কী লাগবে তা আগেই জেনে নিন
  - Step 3: ✅ "আবেদন করুন" — আমরা আপনার হয়ে ফর্ম পূরণ করে দেব
- [x] **2.3.3** Each step: numbered circle + icon + title + description

### 2.4 — Featured Services Section
- [x] **2.4.1** Section title: "জনপ্রিয় সেবাসমূহ"
- [x] **2.4.2** Horizontal scrollable row of service cards on mobile, grid on desktop
- [x] **2.4.3** Show 6 services (use mock/live data from database API):
  - পাসপোর্ট আবেদন, NID সংশোধন, জন্ম নিবন্ধন, বিধবা ভাতা, উপবৃত্তি আবেদন, ট্রেড লাইসেন্স
- [x] **2.4.4** Each card: service icon + name (Bangla) + processing time + fee badge + "দেখুন →" link
- [x] **2.4.5** "সব সেবা দেখুন →" button at the end, links to `/services`

### 2.5 — AI Assistant Teaser Section
- [x] **2.5.1** Full-width banner with green background
- [x] **2.5.2** Text: "🤖 জনবন্ধু AI — শীঘ্রই আসছে"
- [x] **2.5.3** Subtext: "বাংলায় কথা বলুন, ভয়েসে প্রশ্ন করুন — আমরা উত্তর দেব"
- [x] **2.5.4** "আগ্রহী? অপেক্ষা তালিকায় যোগ দিন" button (non-functional, just UI)

### 2.6 — Stats Section (Trust Builder)
- [x] **2.6.1** 3 stats in a row:
  - ৫০+ সরকারি সেবা (50+ Government Services)
  - ৮ বিভাগে সেবা (Services in 8 Divisions)
  - সম্পূর্ণ বিনামূল্যে (Completely Free)
- [x] **2.6.2** Use large bold numbers, small descriptive text below

---

## Task 3 — Services List Page (`app/(marketing)/services/page.tsx`)
*Browse and filter all available services.*

- [x] **3.1** Page title: "সকল সেবা"
- [x] **3.2** Category filter tabs at top (horizontal scrollable on mobile):
  - সব · পরিচয় · শিক্ষা · ভূমি · কল্যাণ · ব্যবসা · কর · প্রবাসী
- [x] **3.3** Search input (filters the list client-side)
- [x] **3.4** Service list as cards (connected dynamically to database):
  - Service name (Bangla + English)
  - Category badge
  - Processing time
  - Fee (বিনামূল্যে if free)
  - Required documents count badge
  - "বিস্তারিত দেখুন" button → links to `/services/[slug]`
- [x] **3.5** Empty state if no results match search
- [x] **3.6** "আরও সেবা আসছে..." note at the bottom

---

## Task 4 — Individual Service Detail Page (`app/(marketing)/services/[slug]/page.tsx`)
*The most important page for the user. This is where the value is delivered.*

- [x] **4.1** Generate static params from dynamic database service data
- [x] **4.2** Service header:
  - Large icon + service name (Bangla bold) + English name (small, gray)
  - Category badge + processing time badge + fee badge
- [x] **4.3** Tab navigation (or accordion on mobile):
  - প্রয়োজনীয় কাগজপত্র (Required Documents)
  - ধাপে ধাপে প্রক্রিয়া (Step-by-Step Process)
  - প্রয়োজনীয় ফি ও অফিস (Fees & Office Location)
  - সরকারি লিংক (Official Links)
- [x] **4.4** "Required Documents" tab content:
  - Checklist of documents with:
    - Document name (Bangla)
    - Whether original/photocopy/online copy needed (মূল কপি / ফটোকপি / অনলাইন কপি)
    - Small note if applicable (e.g., "সত্যায়িত হতে হবে")
  - For now: all items show as unchecked (auth + doc locker wires this up later)
  - CTA at bottom: "নথি সংরক্ষণ করুন → আপনার কাগজপত্র সেভ করলে আমরা স্বয়ংক্রিয়ভাবে চেক করব"
- [x] **4.5** "Step-by-Step" tab content:
  - Numbered steps with icons
  - Each step: title + description + (optional) link
  - Important warnings in a yellow alert box
- [x] **4.6** CTA button (bottom, sticky on mobile):
  - "আবেদন শুরু করুন" — green, full-width on mobile
  - For now: links to login page with a message "আবেদন করতে প্রথমে নিবন্ধন করুন"

---

## Task 5 — Auth Pages (UI Shell Only — No Logic Yet)

> Do NOT wire up Supabase yet. Just build the UI. Auth logic comes in Phase 2.

### 5.1 — Register Page (`app/(auth)/register/page.tsx`)
- [x] **5.1.1** Page title: "নতুন অ্যাকাউন্ট তৈরি করুন"
- [x] **5.1.2** Form fields:
  - পূর্ণ নাম (Full Name) — text
  - মোবাইল নম্বর (Phone Number) — tel input, BD format (+880)
  - ইমেইল (Email) — optional, labeled as "(ঐচ্ছিক)"
  - পাসওয়ার্ড (Password) — with show/hide toggle
  - পাসওয়ার্ড নিশ্চিত করুন (Confirm Password)
- [x] **5.1.3** Register button: "নিবন্ধন করুন" — full width, green
- [x] **5.1.4** Below: "ইতিমধ্যে অ্যাকাউন্ট আছে? লগইন করুন →"
- [x] **5.1.5** No social login buttons for now (target users don't use Google login)

### 5.2 — Login Page (`app/(auth)/login/page.tsx`)
- [x] **5.2.1** Page title: "লগইন করুন"
- [x] **5.2.2** Two tabs: "মোবাইল নম্বর" | "ইমেইল"
- [x] **5.2.3** Mobile tab: Phone input + OTP button (UI only)
- [x] **5.2.4** Email tab: Email + Password inputs
- [x] **5.2.5** Login button: "লগইন করুন"
- [x] **5.2.6** "পাসওয়ার্ড ভুলে গেছেন?" link
- [x] **5.2.7** Below: "নতুন ব্যবহারকারী? নিবন্ধন করুন →"

---

## Task 6 — Dashboard Shell (`app/dashboard/page.tsx`)
*Just the layout and placeholder cards. No real data yet.*

- [x] **6.1** Dashboard layout: sidebar on desktop, bottom tab bar on mobile
- [x] **6.2** Sidebar links:
  - 🏠 হোম (Home)
  - 📄 আমার নথিপত্র (My Documents) — placeholder
  - 📋 আমার আবেদন (My Applications) — placeholder
  - 🔔 নোটিফিকেশন (Notifications) — placeholder
  - ⚙️ সেটিংস (Settings) — placeholder
- [x] **6.3** Main content area: Welcome message + placeholder cards
  - "আপনার নথিপত্র আপলোড করুন" — CTA card
  - "কোন সেবা দরকার?" — Browse services CTA
- [x] **6.4** Show "🔒 লগইন করুন" gate if user visits while logged out (middleware added in Phase 2)

---

## Task 7 — About Page (`app/(marketing)/about/page.tsx`)
- [x] **7.1** Mission statement in Bangla (full paragraph from `statement.txt`)
- [x] **7.2** Problem scenarios section — the 10 personas from `statement.txt` (Rahim, Rahima Begum, Jamil, etc.) shown as story cards
- [x] **7.3** "আমাদের লক্ষ্য" section with the vision quote
- [x] **7.4** Features list (coming soon labels where needed)
- [x] **7.5** Team section (placeholder for now)

---

## Task 8 — Mock / Database Data
*This layer drives all pages dynamically.*

- [x] **8.1** Create `CATEGORIES` meta — 8 categories with id, name_bn, name_en, icon, slug
- [x] **8.2** Create `SERVICES` database table & schema in PostgreSQL with:
  ```typescript
  {
    slug: 'passport',
    name_bn: 'পাসপোর্ট আবেদন',
    name_en: 'Passport Application',
    category: 'identity',
    fee: '৪,০২৫ টাকা',
    processing_time: '২১ কার্যদিবস',
    submission_type: 'online_bot', // 'online_bot' | 'pdf_only' | 'hybrid'
    required_docs: [...],
    steps: [...],
    official_link: 'https://www.epassport.gov.bd'
  }
  ```
- [x] **8.3** Services included in database:
  1. পাসপোর্ট আবেদন (passport)
  2. পাসপোর্ট নবায়ন (passport-renewal)
  3. জাতীয় পরিচয়পত্র সংশোধন (nid-correction)
  4. জন্ম নিবন্ধন (birth-registration)
  5. জন্ম নিবন্ধন সংশোধন (birth-registration-correction)
  6. মৃত্যু নিবন্ধন (death-registration)
  7. বিধবা ভাতা (widow-allowance)
  8. বয়স্ক ভাতা (old-age-allowance)
  9. প্রতিবন্ধী ভাতা (disability-allowance)
  10. উপবৃত্তি আবেদন (scholarship)
  11. ট্রেড লাইসেন্স (trade-license)
  12. ভূমি নামজারি (land-mutation)
  13. টিআইএন সার্টিফিকেট (tin-certificate)
  14. আয়কর রিটার্ন (tax-return)
  15. প্রবাসী কল্যাণ কার্ড (overseas-welfare-card)

---

## Task 9 — Language Toggle (Bangla / English)
*Lightweight implementation without a heavy i18n library.*

- [x] **9.1** Create `lib/language-context.tsx`:
  - `LanguageContext` with `lang: 'bn' | 'en'` and `setLang` function
  - Persist to `localStorage`
  - Wrap root layout in `LanguageProvider`
- [x] **9.2** Create `lib/translations.ts`:
  - Export `t(key, lang)` helper function
  - Add translations for all UI strings (nav labels, buttons, section titles)
  - Bangla is the default; English is the fallback
- [x] **9.3** Wire up language toggle button in Navbar
- [x] **9.4** Apply `lang` attribute to `<html>` tag for browser accessibility

> ⚠️ Note: Service content (names, descriptions, steps) is stored in separate `_bn` and `_en` fields in the data. The `t()` function is only for UI chrome (buttons, labels, navigation).

---

## Task 10 — Polish & Responsiveness Check
*Do this last before considering the base done.*

- [x] **10.1** Test every page at: 375px (iPhone SE), 390px (iPhone 14), 768px (tablet), 1280px (desktop)
- [x] **10.2** Check all tap targets are minimum 48x48px
- [x] **10.3** Verify Bangla text renders correctly (Noto Sans Bengali loaded)
- [x] **10.4** Check all navigation links work (no dead links, correct routes)
- [x] **10.5** Add a simple 404 page (`app/not-found.tsx`) in Bangla
- [x] **10.6** Add page metadata (`metadata` export) on all pages for SEO:
  - Title format: "পৃষ্ঠার নাম | দিশারী"
  - Description in Bangla
- [x] **10.7** Test on Chrome mobile emulator for a low-end Android simulation
- [x] **10.8** Add `loading.tsx` skeleton screens for the services list and detail pages

---

## Phase 2 & Civic Product Foundation Progress

- [x] Database connection (Local PostgreSQL via Docker dishari_db is active)
- [x] User authentication (real register & login APIs with persistent session)
- [x] Document upload / Digital Citizen Document Locker (Active)
- [x] Search functionality (backend-powered real-time autocomplete search)
- [x] In-app citizen notification center & deadline alert badge
- [x] Counter application docket & printable official receipt slip
- [x] Real government data (15 verified public services seeded)
- [ ] Form auto-fill / Playwright bot automation
- [ ] AI chatbot & voice assistant (Deferred per user instruction)
- [ ] Payment integration
- [ ] Admin panel

## Original Base Website Scope Notes
*Do not implement these yet. They are Phase 2 and beyond.*

- ❌ Supabase / database connection (Local PostgreSQL via Docker is active)
- ❌ User authentication (real login/register logic)
- ❌ Document upload / Document Locker
- ❌ Form auto-fill or Playwright bot
- ❌ AI chatbot
- ❌ Push notifications
- ❌ Search functionality (backend-powered)
- ❌ Payment integration
- ❌ Admin panel
- ❌ Real government data (use mock data only)

---

## Definition of Done ✅
The base website is complete when:
1. All 10 tasks above are checked off
2. The site runs without errors on `npm run dev`
3. All pages are accessible via their routes
4. The site looks correct on mobile (375px) and desktop (1280px)
5. Bangla text displays correctly with the correct font
6. Language toggle switches between Bangla and English on nav/UI elements
7. No `console.error` warnings in the browser
8. `npm run build` succeeds with no TypeScript errors

---

*Project: Dishari (দিশারী) — জনবন্ধু AI*
*Phase: 1 — Base Website*
