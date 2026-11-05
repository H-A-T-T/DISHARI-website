<<<<<<< HEAD
# দিশারী (Dishari)

> **"সরকারি সেবা এখন আপনার হাতের মুঠোয়"**
> Government services, now within your reach.

Dishari is a civic-tech platform that helps Bangladeshi citizens — especially rural and low-literacy users — find, understand, and apply for government services without needing to visit a computer operator or navigate complex government websites.

---

## Repository Structure

```
Dishari/
├── Structure/          ← Project documentation (non-code)
│   ├── statement.txt           Project problem statement & vision
│   ├── info.txt                Feature descriptions & target users
│   ├── todo.md                 Phase 1 build tasks with subtasks
│   ├── ui-design-spec.md       UI design system & component specs
│   ├── form-submission-architecture.md  Core bot-submission tech spec
│   └── dishari-roadmap.md      Full project roadmap (all phases)
│
└── web/                ← Next.js 14 web application
    ├── src/
    │   ├── app/        App Router pages
    │   ├── components/ Reusable UI components
    │   ├── lib/        Utilities, data, helpers
    │   └── types/      TypeScript type definitions
    └── ...
```

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + shadcn/ui |
| Language | TypeScript |
| Primary Language | Bangla (বাংলা) |
| Font | Noto Sans Bengali + Plus Jakarta Sans |
| Backend (Phase 2+) | Supabase (PostgreSQL + Auth + Storage) |
| AI (Phase 5+) | Google Gemini API |
| Bot/Automation (Phase 3+) | Playwright + BullMQ + Redis |

## Getting Started

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Key Features (Roadmap)

- **Document Locker** — Save your NID, birth certificate, photo once; reuse forever
- **Smart Auto-Fill** — We fill government forms on your behalf using saved documents
- **জনবন্ধু AI** — Bangla-first AI assistant with voice input support
- **Deadline Alerts** — Never miss a scholarship or tax return deadline
- **Service Guides** — Step-by-step guides for 50+ government services

## Documentation

All planning documents are in the [`Structure/`](./Structure/) folder.
Start with [`todo.md`](./Structure/todo.md) for the current build plan.

---

*Built for Bangladesh. Built for everyone.*
