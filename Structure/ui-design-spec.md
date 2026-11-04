# Dishari (দিশারী) — UI Design Specification
## "Warmly Professional, Unmistakably Human"

> **Design Philosophy:** This is NOT a government website. It is NOT a startup landing page.
> It is a civic companion — warm, trustworthy, and immediately legible to someone who
> has never used a smartphone before. Every pixel must earn its place.
>
> **The Judge Test:** A hackathon judge should understand what this does in under 5 seconds
> and think "this could actually exist in the real world."
>
> **The Rural User Test:** A 50-year-old farmer from Netrokona should not feel intimidated.

---

## Design Inspiration & References

Study these before writing any CSS. Understand *why* they work.

| Reference | URL | What to steal |
|---|---|---|
| **Linear** | https://linear.app | Extreme attention to spacing, hover states, micro-interactions |
| **Loom** | https://loom.com | How to make a complex product feel simple and friendly |
| **Nubank** | https://nubank.com.br | Civic/financial app with warmth — proves "serious" ≠ "cold" |
| **Fey App** | https://feyapp.com | Dashboard UI density done right — complex data, still readable |
| **Raycast** | https://raycast.com | Bold typography + clean cards that don't look AI-generated |
| **India Stack** | https://indiastack.org | Civic tech design for a similar audience — study the mistakes |
| **bKash** | https://bkash.com/bn | Your users already know this app — visual familiarity helps |
| **Dribbble — "Civic Tech"** | https://dribbble.com/search/civic-app | Browse for emotional tone, NOT for specific layouts |

> ⚠️ **What NOT to do:**
> - Do not copy Tailwind UI components verbatim — they look like every other startup
> - Do not use purple/blue as primary color — that's a Western tech startup color
> - Do not use stock illustrations (undraw.co, storyset.com) — judges see these 50 times a day
> - Do not use a generic hero gradient + floating laptop mockup layout
> - Do not use pure white (#fff) as your background — it's flat and clinical

---

## Color System

```css
/* ─── Brand Colors ─────────────────────────────────────────── */
--green-50:  #f0fdf4;
--green-100: #dcfce7;
--green-500: #22c55e;
--green-600: #16a34a;   /* PRIMARY — buttons, links, accents */
--green-700: #15803d;   /* DARK — hover states, footer bg */
--green-900: #14532d;   /* DARKEST — footer text, deep accents */

--red-500:  #ef4444;    /* Bangladesh flag red — use sparingly */
--red-50:   #fef2f2;

--amber-500: #f59e0b;   /* Deadline alerts, important notices */
--amber-50:  #fffbeb;

/* ─── Neutral Palette ───────────────────────────────────────── */
--bg-page:    #FAFAF8;  /* Off-white — warmer than #fff, NOT pure white */
--bg-surface: #FFFFFF;  /* Cards, modals */
--bg-muted:   #F4F4F2;  /* Hover states, subtle backgrounds */

--text-primary:   #1C1917;  /* Near-black with warmth (stone-900) */
--text-secondary: #78716C;  /* Secondary text (stone-500) */
--text-muted:     #A8A29E;  /* Placeholders, captions (stone-400) */

--border:         #E7E5E4;  /* Default borders (stone-200) */
--border-strong:  #D6D3D1;  /* Emphasized borders (stone-300) */

/* ─── Category Colors (each service category gets its own color) */
--cat-identity:   #3B82F6;  /* Blue — NID, Passport */
--cat-education:  #8B5CF6;  /* Purple — Scholarship */
--cat-land:       #F59E0B;  /* Amber — Land, Property */
--cat-welfare:    #EC4899;  /* Pink — Allowances */
--cat-business:   #14B8A6;  /* Teal — Trade, Enterprise */
--cat-tax:        #F97316;  /* Orange — Tax, Revenue */
--cat-overseas:   #06B6D4;  /* Cyan — Probashi services */
--cat-health:     #22C55E;  /* Green — Health */
```

---

## Typography

```css
/* ─── Font Loading (in <head>) ──────────────────────────────── */
/* Primary: Noto Sans Bengali — all Bangla text */
/* Secondary: Plus Jakarta Sans — English text, numbers, UI chrome */

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

/* ─── Font Stack ────────────────────────────────────────────── */
font-family: 'Noto Sans Bengali', 'Plus Jakarta Sans', system-ui, sans-serif;

/* ─── Type Scale ────────────────────────────────────────────── */
/* Use these exact sizes. Do not use arbitrary sizes. */
--text-xs:   0.75rem;   /* 12px — captions, badges */
--text-sm:   0.875rem;  /* 14px — secondary text */
--text-base: 1rem;      /* 16px — body text */
--text-lg:   1.125rem;  /* 18px — emphasized body */
--text-xl:   1.25rem;   /* 20px — card titles */
--text-2xl:  1.5rem;    /* 24px — section headings */
--text-3xl:  1.875rem;  /* 30px — page headings */
--text-4xl:  2.25rem;   /* 36px — hero headings (mobile) */
--text-5xl:  3rem;      /* 48px — hero headings (desktop) */
--text-6xl:  3.75rem;   /* 60px — hero headline (large desktop) */

/* ─── Rules ─────────────────────────────────────────────────── */
/* 1. Bangla body text: always line-height: 1.8 (Bengali script is tall) */
/* 2. Headings: font-weight 700 or 800 (bold, never light) */
/* 3. Never use font-weight 300 for Bangla — too thin, unreadable on cheap screens */
/* 4. Letter-spacing: -0.02em for large headings (tighten them) */
/* 5. Use font-feature-settings: "tnum" for numbers in stats/badges */
```

---

## Spacing & Sizing Rules

```
Spacing scale: 4px base unit (Tailwind default is fine)

Page max-width:     1200px (not 1400px — keeps content readable)
Content padding:    px-4 (mobile) → px-6 (tablet) → px-8 (desktop)
Section gap:        py-16 (mobile) → py-24 (desktop)
Card padding:       p-5 or p-6
Card gap in grid:   gap-4 (mobile) → gap-6 (desktop)

Minimum tap target: 48px height on ALL interactive elements
Minimum font size:  14px (never go below this)
Icon sizes:         20px (inline), 24px (card icon), 40px (feature icon), 48px (hero icon)
```

---

## Component Design Specifications

### 1. NAVBAR

```
Desktop layout:
┌──────────────────────────────────────────────────────────────────┐
│  🟢 দিশারী          সেবাসমূহ  কীভাবে কাজ করে  আমাদের সম্পর্কে    বাং|EN   লগইন  [নিবন্ধন করুন]  │
└──────────────────────────────────────────────────────────────────┘

Mobile layout (bottom tab bar — NOT hamburger):
┌──────────────────────────────────────┐
│          (page content)              │
├──────┬──────┬──────┬──────┬──────────┤
│  🏠  │  🔍  │  📋  │  🔔  │   👤    │
│ হোম  │খুঁজুন│ সেবা │নোটিফি│ অ্যাকাউন্ট│
└──────┴──────┴──────┴──────┴──────────┘
```

**Visual spec:**
- Background: `bg-white/80 backdrop-blur-md` — frosted glass effect on scroll
- Border bottom: `border-b border-stone-200` — appears only on scroll (use `useScrollY`)
- Logo: Text "দিশারী" in `font-bold text-green-700` + a small green dot/icon before it
- Nav links: `text-stone-600 hover:text-green-700 transition-colors` — no underline, no box
- Language toggle: `bg-stone-100 rounded-full px-3 py-1 text-sm` — pill shape
- Register button: `bg-green-600 hover:bg-green-700 text-white rounded-xl px-5 h-10` — NOT `rounded-full`, NOT `rounded-md`
- Login button: `text-green-700 hover:bg-green-50 rounded-xl px-5 h-10` — ghost variant

**Mobile bottom bar:**
- Height: 64px
- Background: white with `shadow-[0_-1px_0_0_#E7E5E4]` (top border shadow)
- Active tab: icon and label turn green-600
- Inactive: stone-400
- Safe area padding for iPhone: `pb-safe`

> Why bottom tab bar instead of hamburger? Because your users are mobile-first. Hamburger menus are slower — the thumb has to travel to the top corner. Bottom tabs are native-feeling, faster, and familiar from bKash/Nagad.

---

### 2. HERO SECTION

> This is the most important section. It must NOT look like a template.

**Layout — Split Asymmetric (Desktop):**
```
┌─────────────────────────────────────────────────────────┐
│  bg: #FAFAF8 + subtle dot-grid pattern                  │
│                                                          │
│  ┌────────────────────┐  ┌─────────────────────────┐   │
│  │                    │  │  Animated Service Cards  │   │
│  │  Headline (large)  │  │  floating / staggered    │   │
│  │  Subheadline       │  │  entry animation         │   │
│  │                    │  │                          │   │
│  │  [Search Bar]      │  │  Card: পাসপোর্ট 🔵        │   │
│  │                    │  │  Card: NID সংশোধন 🔵     │   │
│  │  Chips: পাসপোর্ট   │  │  Card: উপবৃত্তি 🟣       │   │
│  │  NID · জন্ম নিবন্ধন│  │                          │   │
│  └────────────────────┘  └─────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Layout — Mobile (Stacked):**
```
┌────────────────────────┐
│  Small badge: "🇧🇩 সরকারি সেবা, সহজ ভাষায়" │
│                        │
│  বড় হেডলাইন            │
│  (2 lines max)         │
│                        │
│  [Search bar]          │
│                        │
│  [ট্যাগ] [ট্যাগ] [ট্যাগ] │
└────────────────────────┘
```

**Visual spec:**
- Background: `#FAFAF8` with an SVG dot-grid pattern overlay at 5% opacity
  ```css
  background-image: radial-gradient(#16a34a22 1px, transparent 1px);
  background-size: 24px 24px;
  ```
- Badge above headline:
  ```
  🇧🇩  সরকারি সেবা · সহজ ভাষায় · বিনামূল্যে
  ```
  Style: `inline-flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 rounded-full px-4 py-1.5 text-sm font-medium`

- Headline:
  - Bangla: **"সরকারি সেবা এখন আপনার হাতের মুঠোয়"**
  - `text-5xl font-extrabold text-stone-900 leading-tight tracking-tight`
  - The word "মুঠোয়" or key phrase: wrap in `<span class="text-green-600">` for color accent

- Subheadline:
  - `text-lg text-stone-500 leading-relaxed max-w-lg`

- Search bar (the most important element on the page):
  ```
  ┌─────────────────────────────────────────────────────┐
  │ 🔍  আপনি কী খুঁজছেন? যেমন: পাসপোর্ট, জন্ম নিবন্ধন...  │  [খুঁজুন] │
  └─────────────────────────────────────────────────────┘
  ```
  - Height: `h-16` (64px) — unusually tall, makes it feel important
  - Border: `border-2 border-stone-200 focus-within:border-green-500`
  - Border radius: `rounded-2xl`
  - Box shadow: `shadow-lg` always (not just on focus)
  - Transition: `transition-shadow focus-within:shadow-green-100 focus-within:shadow-xl`
  - Right side: `bg-green-600 text-white rounded-xl h-10 px-5` search button — inside the bar

- Quick-filter chips below search:
  - `bg-white border border-stone-200 hover:border-green-500 hover:bg-green-50 rounded-full px-4 py-2 text-sm text-stone-700 cursor-pointer transition-all`
  - On hover: border turns green, slight background tint
  - Add a subtle horizontal scroll on mobile with no scrollbar visible (`overflow-x-auto scrollbar-none`)

- Right side "floating cards" (desktop only):
  - 3 service cards at different rotations and stagger positions
  - Card 1: `rotate-2`, Card 2: `-rotate-1`, Card 3: `rotate-1`
  - They animate in with `framer-motion` stagger: each card fades + slides up 20px
  - On hover on the whole right side: cards slightly shift (parallax with `onMouseMove`)
  - Cards use the same design as Service Category Cards (see below)

---

### 3. SERVICE CATEGORY CARDS

> These are the visual centerpiece. They must feel like a physical product, not a web component.

```
┌────────────────────────┐
│  ┌────┐                │
│  │ 🪪 │  color bg pad  │  ← Icon in a colored rounded square
│  └────┘                │
│                        │
│  পরিচয় ও নথিপত্র      │  ← Bold, Bangla
│  Identity & Documents  │  ← Small, English, gray
│                        │
│  ১২টি সেবা →           │  ← Service count + arrow
└────────────────────────┘
```

**Visual spec:**
- Background: `bg-white`
- Border: `border border-stone-200`
- Border radius: `rounded-2xl`
- Padding: `p-6`
- Shadow: `shadow-sm hover:shadow-md transition-all duration-200`
- On hover: `translate-y-[-2px]` (slight lift — NOT scale transform)
- Left accent: a 3px colored left border using `border-l-4` matching the category color
  ```
  className="border-l-4 border-blue-500"  // for identity category
  ```

- **Icon container:**
  - Size: `w-12 h-12`
  - Background: category color at 10% opacity (e.g., `bg-blue-50`)
  - Border radius: `rounded-xl`
  - Icon: 24px, category color (e.g., `text-blue-600`)

- **Service count badge:**
  - Bottom of card
  - `text-sm text-stone-500`
  - Arrow icon: `lucide ChevronRight`, color matches category, appears on hover via `group-hover:translate-x-1 transition-transform`

---

### 4. FEATURED SERVICE LIST CARDS
*(These are different from Category Cards — more information-dense)*

```
┌────────────────────────────────────────────────────────────────┐
│  🔵 [Icon]  পাসপোর্ট আবেদন          [অনলাইন]  [৩,৪৫০৳]  →   │
│             Passport Application    ২১ কার্যদিবস              │
└────────────────────────────────────────────────────────────────┘
```

**Visual spec:**
- Full-width card, `h-20` height (consistent)
- Left: colored icon square (same as category card icon style)
- Middle: service name (bold, Bangla) + English name + processing time (small, gray)
- Right: fee badge + category badge + chevron
- Hover: entire row gets `bg-stone-50`, left border appears in category color
- Use `group` class for coordinated hover effects across children

---

### 5. "HOW IT WORKS" SECTION

> Do NOT use the standard "three boxes in a row" approach. Use a visual timeline/flow instead.

```
Desktop — Horizontal flow with connecting line:

  ①─────────────────②─────────────────③
  │                 │                 │
  🔍              📋               ✅
সেবা বেছে নিন   কাগজপত্র দেখুন   আবেদন করুন
                                (আমরা করে দেব)
```

**Visual spec:**
- Connecting line between steps: `border-t-2 border-dashed border-green-200`
- Step circle: `w-10 h-10 rounded-full bg-green-600 text-white font-bold` with step number
- Icon below circle: `w-16 h-16 bg-green-50 rounded-2xl` with large icon inside
- Step 3 is visually emphasized (larger, bolder, green background) — it's the differentiator

**Mobile — Vertical with left-side timeline:**
```
  🟢─── 🔍 সেবা বেছে নিন
  |
  🟢─── 📋 কাগজপত্র দেখুন
  |
  🟢─── ✅ আমরা করে দিই
```

---

### 6. STATS SECTION

```
┌──────────────────────────────────────────────────────┐
│   ৫০+          ৮ বিভাগ          ৩৩৩          ১০০%   │
│  সরকারি সেবা  সারা বাংলাদেশ   হেল্পলাইন    বিনামূল্যে│
└──────────────────────────────────────────────────────┘
```

**Visual spec:**
- Background: `bg-green-700` (dark green — creates contrast, premium feel)
- Text: white
- Numbers: `text-4xl font-extrabold font-feature-settings: tnum`
- Numbers should use a **count-up animation** when they scroll into view (use `useInView` from framer-motion + a simple counter)
- Dividers between stats: `border-r border-green-600`
- Section: `py-16`

---

### 7. AI ASSISTANT TEASER BANNER

> This needs to feel exciting, not like an afterthought.

```
┌───────────────────────────────────────────────────────────────┐
│                                                               │
│   ✨ জনবন্ধু AI শীঘ্রই আসছে                                  │
│                                                               │
│   বাংলায় কথা বলুন। ভয়েসে প্রশ্ন করুন।                       │
│   আমরা বলব — কী করতে হবে, কোথায় যেতে হবে।                   │
│                                                               │
│   [আগ্রহী হলে জানান →]      ░░░░░░░░░░░░░░░░░░░░░░░         │
│                              chat bubble animation            │
└───────────────────────────────────────────────────────────────┘
```

**Visual spec:**
- Background: Dark — `bg-stone-900` with a very subtle green gradient overlay
- Text: white headline, `text-stone-400` body
- Left side: Text content
- Right side: An animated chat bubble mockup (CSS/Tailwind only, no image):
  ```
  ┌──────────────────────┐
  │ 👤 আমি পাসপোর্ট করতে│  ← User bubble (right aligned, green)
  │    চাই               │
  └──────────────────────┘
      ┌────────────────────────────┐
      │ 🤖 আপনার NID ও ছবি আছে?   │  ← AI bubble (left aligned, white)
      │    তাহলে শুরু করা যাক...   │
      └────────────────────────────┘
  ```
- Chat bubbles animate in with a typing indicator (`...` pulse) then reveal text
- CTA button: `border border-white/30 text-white hover:bg-white/10 rounded-xl`

---

### 8. SERVICE DETAIL PAGE LAYOUT

**Mobile-first design:**
```
┌────────────────────────────┐
│  ← Back                   │
│                            │
│  🔵 [Icon]                 │
│  পাসপোর্ট আবেদন            │
│  Passport Application      │
│                            │
│  [অনলাইন] [৩,৪৫০৳] [২১দিন]│  ← Badges row
│                            │
├────────────────────────────┤
│ কাগজপত্র │ প্রক্রিয়া │ ফি  │  ← Sticky tab bar
├────────────────────────────┤
│                            │
│  Document checklist:       │
│  ┌─────────────────────┐   │
│  │ ✅ NID মূল কপি      │   │
│  │ ✅ ছবি (৩.৫×৪.৫)    │   │
│  │ ❌ জন্ম নিবন্ধন     │   │  ← Red ❌ if not in locker
│  └─────────────────────┘   │
│                            │
│  "নথিপত্র সেভ করুন" ─→     │  ← Soft CTA to login
│                            │
└────────────────────────────┘
│  [আবেদন শুরু করুন]         │  ← Sticky bottom bar
└────────────────────────────┘
```

**Document checklist item spec:**
- Height: `h-14` (tall tap target)
- Left: colored circle with ✅ or ❌ or ⚠️
- Middle: document name (Bangla bold) + type (মূল কপি / ফটোকপি — smaller, gray)
- Right: an `info` icon that opens a tooltip/popover with more details
- Border between items: `divide-y divide-stone-100`

---

### 9. DASHBOARD DESIGN

> The dashboard should feel like a personal assistant's desk, not a data table.

**Mobile layout (default — this is a mobile-first product):**
```
┌────────────────────────────┐
│  শুভ সন্ধ্যা, আসিফ 👋        │  ← Greeting (time-aware)
│  আপনার ৩টি কাজ বাকি আছে   │
│                            │
│  ┌────────────────────┐    │
│  │ 📄 আমার নথিপত্র   │    │  ← Document locker card
│  │ ৫টি সংরক্ষিত       │    │
│  └────────────────────┘    │
│                            │
│  ┌────────────────────┐    │
│  │ 📋 সক্রিয় আবেদন   │    │  ← Applications card
│  │ ১টি চলছে           │    │
│  └────────────────────┘    │
│                            │
│  আপনার জন্য সম্ভাব্য সেবা  │  ← Personalized recommendations
│  ┌──────┐ ┌──────┐         │
│  │উপবৃত্তি│ │ভাতা│         │
│  └──────┘ └──────┘         │
└────────────────────────────┘
```

**Visual spec:**
- Greeting card: `bg-gradient-to-r from-green-600 to-green-700 text-white rounded-3xl p-6`
- Dashboard cards: white, `rounded-2xl`, subtle shadow, `p-5`
- Recommendation chips: same as hero quick-filter chips

---

### 10. AUTHENTICATION PAGES

> Do not use a centered card on a gray background. It looks like every SaaS app ever.

**Layout — Split Screen (Desktop):**
```
┌──────────────────────┬──────────────────────────┐
│                      │                          │
│  Left: Brand side    │  Right: Form             │
│  bg-green-700        │  bg-white                │
│                      │                          │
│  দিশারী লোগো          │  "স্বাগতম" headline       │
│                      │  Phone / Email input     │
│  "লক্ষ লক্ষ নাগরিক  │  Password input          │
│  ইতিমধ্যে ব্যবহার   │  [লগইন করুন] button      │
│  করছেন"              │                          │
│                      │  "নিবন্ধন করুন" link      │
│  [testimonial quote] │                          │
└──────────────────────┴──────────────────────────┘
```

**Mobile — Full screen form:**
- Logo at top (small)
- Minimal form
- `bg-white` — no card, the page IS the form

**Form input spec:**
- Height: `h-14` (taller than typical)
- Border: `border-2 border-stone-200 focus:border-green-500 rounded-xl`
- Label: ABOVE the input (not floating label — floating labels are confusing for rural users)
- Error state: `border-red-400` + red text below input
- OTP input: 6 large boxes side by side, `w-12 h-14` each, centered numbers

---

## Animation Guidelines

> Use animation to guide attention, not to show off. Every animation must have a purpose.

```
Entry animations:
  - Page load: Stagger children 50ms apart, fade + 16px up
  - Use: opacity-0 → opacity-100, translateY(16px) → translateY(0)
  - Duration: 300ms, easing: cubic-bezier(0.16, 1, 0.3, 1)  [ease-out-expo]

Hover animations:
  - Cards: translateY(-2px), 200ms ease
  - Buttons: scale(0.98) on press (active state), 150ms
  - Links: color transition, 150ms

Loading states:
  - Skeleton: use a shimmer animation (gradient sweep)
  - Buttons: show a spinning icon INSIDE the button, disable it
  - Never use a full-page spinner

CAPTCHA / Bot state:
  - Show a pulsing green dot: "আবেদন প্রক্রিয়া চলছে..."
  - Progress steps: each step checks off as the bot completes it
  - If CAPTCHA appears: smooth fade-in of the CAPTCHA UI

Library: Use CSS transitions for simple interactions.
         Use Framer Motion only for complex sequences (stagger, layout animations).
```

---

## Iconography Rules

```
Library: lucide-react ONLY (do not mix icon libraries)
Style: Stroke icons, strokeWidth={1.75}
Sizes:
  - 16px: inline in text
  - 20px: buttons, nav
  - 24px: card icons (small)
  - 32px: feature icons (medium)
  - 48px: hero icons / empty states

Category icons mapping:
  Identity/Documents   → IdCard, CreditCard, FileText
  Education            → GraduationCap, BookOpen, Award
  Land & Property      → MapPin, Home, Map
  Welfare & Allowance  → HeartHandshake, Heart, Users
  Business             → Briefcase, Store, TrendingUp
  Tax                  → Receipt, Calculator, Landmark
  Overseas             → Plane, Globe, Ship
  Health               → Stethoscope, Hospital, Heart

Do NOT use emoji as primary icons in the main UI.
Emoji are acceptable ONLY in: chat bubbles, greeting messages, section labels.
```

---

## Responsive Breakpoints

```
Mobile first. Design for 390px first, then scale up.

sm:  640px  — Larger phones, phablets
md:  768px  — Tablets (iPad Mini portrait)
lg:  1024px — Tablets landscape, small laptops
xl:  1280px — Desktops
2xl: 1536px — Large monitors (most content stops growing at 1200px max-width)

Grid columns:
  Category cards:   2 col (mobile) → 3 col (md) → 4 col (lg)
  Service list:     1 col (mobile) → 2 col (lg)
  Dashboard:        1 col (mobile) → sidebar + content (lg)
  Auth split:       1 col (mobile) → 50/50 split (lg)
```

---

## Accessibility (Non-Negotiable)

```
- All interactive elements must have aria-label in Bangla
- Color contrast: WCAG AA minimum (4.5:1 for text, 3:1 for large text)
- Focus rings: visible, green-colored (outline: 2px solid #16a34a)
- Never rely on color alone to communicate state (always pair with icon or text)
- Form inputs: always have visible labels (no placeholder-only inputs)
- Keyboard navigable
- Screen reader: use semantic HTML (nav, main, section, article, header, footer)
```

---

## "Not AI-Built" Checklist

Before calling the UI done, verify these:

- [ ] Background is NOT pure white `#ffffff` — use `#FAFAF8`
- [ ] No generic blue/purple primary color — green only
- [ ] No undraw/storyset illustrations anywhere
- [ ] Hero is NOT "centered headline + two buttons + floating laptop image"
- [ ] Mobile nav is a bottom tab bar, NOT a hamburger menu
- [ ] Cards have category-specific accent colors (not all the same color)
- [ ] At least ONE section has a dark background (stats section, teaser)
- [ ] Typography mixes bold weight with regular weight (not all the same weight)
- [ ] Hover states exist on ALL interactive elements
- [ ] Service detail page has a sticky bottom CTA bar on mobile
- [ ] Bangla line-height is `leading-relaxed` (1.6–1.8) everywhere
- [ ] Numbers in stats have count-up animation
- [ ] The search bar is visibly larger/more prominent than typical inputs
- [ ] At least some visual asymmetry exists (not everything perfectly centered)
- [ ] Empty states have an illustration/icon + helpful text in Bangla

---

## File Structure for Styles

```
src/
  app/
    globals.css              ← CSS variables, base resets, Bangla line-height
  components/
    ui/                      ← shadcn auto-generated (do not heavily modify)
    layout/
      Navbar.tsx
      Footer.tsx
      MobileNav.tsx          ← Bottom tab bar component
    home/
      HeroSection.tsx
      CategoryGrid.tsx
      HowItWorks.tsx
      FeaturedServices.tsx
      AITeaser.tsx
      StatsSection.tsx
    services/
      ServiceCard.tsx        ← Reusable card for lists
      DocumentChecklist.tsx  ← Checklist with ✅/❌ states
      StepGuide.tsx          ← Step-by-step guide renderer
    shared/
      Badge.tsx              ← Category, fee, processing time badges
      SearchBar.tsx          ← Styled search bar component
      SectionHeading.tsx     ← Consistent section title component
      EmptyState.tsx         ← Reusable empty state
  lib/
    animations.ts            ← Framer Motion variants (export reusable variants)
```

---

*Project: Dishari (দিশারী) — জনবন্ধু AI*
*Document type: UI Design Specification*
*Phase: 1 — Base Website*
