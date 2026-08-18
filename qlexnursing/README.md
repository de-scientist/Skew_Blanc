# QLexNursing — Frontend Technical Assessment

A production-quality redesign of the **QLexNursing** nursing exam-preparation experience, built for the Skew Blanc LTD assessment. It demonstrates strong frontend engineering, UI/UX thinking, technical SEO, performance, accessibility and maintainability using the required stack: **Next.js (App Router), React, TypeScript and Tailwind CSS**.

> **Practice smarter. Understand your performance. Prepare with confidence.**

---

## Overview

QLexNursing is a modern EdTech/SaaS-style platform that helps nursing students prepare for the **NCLEX-RN** and **RN Nursing** exams. The application was redesigned around the student's real journey:

```
Dashboard → Choose Exam → Start Exam → Answer Questions → Submit → View Results → Review Answers → Identify Weak Areas → Practice Again
```

Rather than copying the existing sites, the product was rebuilt to prioritize **clarity, speed, confidence and accessibility** over visual novelty.

---

## Objectives

- A reusable, maintainable component architecture.
- Excellent, responsive UI/UX across desktop, tablet and mobile.
- Strong technical SEO (metadata, Open Graph, JSON-LD, sitemap, robots).
- Performant rendering (Server Components, no unnecessary client JS, optimized assets).
- Accessible, keyboard-navigable, screen-reader-friendly interfaces.
- A realistic, interactive exam + results flow (not just static UI).
- Clear documentation of design, SEO, performance and assumptions.

---

## Technology Stack

| Concern        | Choice |
| -------------- | ------ |
| Framework      | Next.js 16 (App Router) |
| Language       | TypeScript (strict) |
| UI             | React 19 |
| Styling        | Tailwind CSS v4 (CSS-based theme tokens) |
| Charts         | Custom lightweight SVG components (no heavy chart dependency) |
| Icons          | Custom inline SVG icon set |
| Fonts          | Inter (loaded via Google Fonts `<link>`) |
| Deployment     | Vercel (recommended) |

No UI component library was used — the design system is implemented from scratch to demonstrate senior-level frontend engineering.

---

## Architecture

```
src/
├── app/
│   ├── layout.tsx            # Root layout: html/body, global metadata, skip link
│   ├── page.tsx              # Public landing (marketing)
│   ├── globals.css           # Tailwind v4 design tokens + base styles
│   ├── sitemap.ts            # Public URL sitemap
│   ├── robots.ts             # Crawler directives
│   ├── opengraph-image.tsx   # Dynamic OG image (next/og)
│   ├── not-found.tsx         # 404
│   └── (app)/                # Authenticated-style app shell group
│       ├── layout.tsx        # AppShell (sidebar + topbar + mobile nav)
│       ├── dashboard/
│       ├── exams/
│       │   ├── nclex-rn/
│       │   └── rn-nursing/
│       ├── exam/[id]/
│       └── results/[id]/
├── components/
│   ├── ui/                   # Button, Card, Badge, ProgressBar, StatCard, Modal, Skeleton, charts, icons…
│   ├── layout/               # AppShell, Sidebar, Topbar, MobileBottomNav, SiteHeader
│   ├── dashboard/            # Dashboard sections
│   ├── exam/                 # ExamLanding, ExamInterface, QuestionCard, ExamNavigator, ExamTimer
│   └── results/              # ResultsView
├── lib/
│   ├── api/                  # API abstraction layer (client, exams, questions, dashboard)
│   ├── result.ts             # Result building + demo fallback
│   ├── seo.ts                # Metadata + JSON-LD builders
│   └── utils.ts              # cn(), formatters
├── config/                   # site.ts, nav.ts
├── data/mock/                # Isolated mock data
└── types/                    # Shared TypeScript types
```

**Key decisions**

- **Route group `(app)`** keeps the marketing landing (public) separate from the application shell (dashboard/exam/results) without affecting URLs.
- **API abstraction layer** (`lib/api`) isolates data access so raw `fetch` calls never appear in components. Service functions mirror a real REST contract (`getExams`, `getExam`, `getQuestions`, `getDashboard`).
- **Mock data is isolated** under `data/mock` and accessed only through the API layer, making real backend integration a drop-in change.

---

## Design Decisions

- **Color system** — A calm, trustworthy healthcare/education palette: deep navy (primary), cyan/teal (secondary), plus success/warning/error semantic colors. All meet WCAG contrast requirements and **status is never communicated by color alone** (e.g. ✓/✗ icons + labels).
- **Typography** — Inter for long-reading comfort, with a clear H1–H6 / body / caption hierarchy.
- **Information hierarchy** — The dashboard opens with greeting + the single most important next action ("Continue practice"), then surfaces stats, focus area, performance and recent activity.
- **Navigation** — Desktop uses a persistent sidebar; tablet collapses it; mobile uses a bottom tab bar plus a drawer question navigator during exams. Desktop patterns are never forced onto mobile.
- **Micro-interactions** — Subtle hover elevation and smooth progress transitions; animations are reduced under `prefers-reduced-motion` and kept minimal during exams.

---

## UX Improvements (over the source sites)

- A single, obvious **next action** on the dashboard instead of scattered CTAs.
- A distraction-free **exam interface** with persistent question counter, accessible timer, flagging, and a question navigator showing answered / unanswered / flagged states.
- A **submit-confirmation modal** that prevents accidental submission and reports unanswered counts.
- A **results + review experience** that explains every answer (correct answer + rationale).
- **Recommended focus area** surfaced from performance data.
- Fully intentional **mobile** layouts (bottom nav, drawer navigator, large tappable options).

---

## SEO Implementation

- **Metadata API** — Route-specific `title`, `description`, `canonical`, Open Graph and Twitter cards via `createMetadata()` in `lib/seo.ts`.
- **Canonical URLs** — Every indexable page declares a correct canonical; exam/results pages are `noindex, nofollow`.
- **Open Graph + Twitter** — Summary-large-image cards; a generated `opengraph-image.tsx` provides a branded social image.
- **JSON-LD structured data** — `WebSite`, `Organization`, `Course` (where applicable) and `BreadcrumbList` injected per page.
- **Sitemap & Robots** — `app/sitemap.ts` lists public pages; `app/robots.ts` disallows authenticated/app routes.
- **Semantic HTML & heading hierarchy** — `<header>/<nav>/<main>/<section>/<article>/<footer>`, one H1 per page, no skipped levels.
- **Image optimization** — `next/image` ready utilities; the OG image is generated at build/runtime.

---

## Performance Optimization

- **Server Components by default** — Pages fetch data on the server; only interactive pieces (`AppShell`, exam, modals, timer, navigator) are Client Components.
- **No heavy charting dependency** — Charts are small, dependency-free SVG components, keeping the bundle lean.
- **Lazy/deferred interaction** — Exam timer and navigator are client-only where needed; static pages are prerendered.
- **Skeleton loading states** — `dashboard/loading.tsx` and result placeholders avoid raw "Loading…" flashes.
- **Reserved dimensions & reduced CLS** — Layouts reserve space; no content shifts after load.
- **Font strategy** — Inter is loaded via a preconnected Google Fonts stylesheet (no build-time network dependency), with `display: swap`.
- **Code quality** — Strict TypeScript, no `any`, reusable typed components, ESLint passing.

---

## Accessibility

- Semantic landmarks and a "Skip to content" link.
- Visible `:focus-visible` rings and keyboard-operable controls (radio options, buttons, drawer, modal with Escape-to-close and focus handling).
- `aria-label`/`aria-current` on navigation, timers, progress bars and question status.
- Status communicated with text + icon, never color alone.
- `prefers-reduced-motion` respected.
- Form controls and images use descriptive labels/alt text.

---

## API Integration

The backend already exists. The frontend consumes a REST-style API through `lib/api`:

```typescript
getExams()
getExam(idOrSlug)
getQuestions(examId)
getDashboard()
```

Each function returns a typed Promise. Today they resolve **mock data** served from `data/mock` with a simulated network delay. To connect the real backend:

1. Implement the `request()` helper in `lib/api/client.ts` with `fetch(`${process.env.NEXT_PUBLIC_API_URL}/…`)`.
2. Map the response to the existing types in `src/types`.
3. No component changes are required — the contract is already fixed.

Authentication is assumed to be handled by the existing infrastructure; no auth backend is implemented here. The frontend reads an auth context/session managed by the host app.

---

## Assumptions

- The backend API and authentication are externally managed; mock data is used where endpoints are unavailable.
- Mock data is **clearly isolated** and not mixed into production components.
- Exam submission in this prototype persists the result to `localStorage` so the results page can render the student's own attempt; a real deployment would POST to the backend.
- Some figures (e.g. dashboard stats, trends) are representative mock values, not live production data.
- Subject lists, question counts and durations are based on the brief and may be refined against the real API contract.
- `Inter` is loaded at runtime via Google Fonts; in a no-network build you may swap to `next/font` once the build environment has font access.

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local   # then set NEXT_PUBLIC_SITE_URL / NEXT_PUBLIC_API_URL

# 3. Run the dev server
npm run dev                  # http://localhost:3000
```

## Environment Variables

| Variable                | Purpose |
| ----------------------- | ------- |
| `NEXT_PUBLIC_SITE_URL`  | Absolute site URL (used for canonical/OG/sitemap) |
| `NEXT_PUBLIC_API_URL`   | Base URL of the backend REST API |

No secrets are committed; `.env.example` is provided as documentation only.

## Build

```bash
npm run lint     # ESLint (core-web-vitals)
npm run build    # Production build (TypeScript + Next.js)
npm run start    # Serve the production build
```

Both `lint` and `build` pass cleanly.

## Deployment

Recommended: **Vercel**.

1. Push the repository to GitHub.
2. Import the project in Vercel (framework auto-detected as Next.js).
3. Set the environment variables above.
4. Deploy — the `/` landing, `/exams/*` pages and SEO routes go live; `/dashboard`, `/exam`, `/results` remain app-only.

## Lighthouse

Target **90+** on Performance, Accessibility, Best Practices and SEO for public pages. Key levers already in place: Server Components, minimal client JS, semantic HTML, preconnected fonts, reserved layout dimensions, and full metadata. Run `npx lighthouse <url>` against a production deployment to verify.

---

## Future Improvements

- Wire the real REST API and replace `localStorage` persistence with backend submission.
- Add real authentication/session integration.
- Expand the question bank and add adaptive difficulty.
- Add a dedicated study-plan view and spaced-repetition scheduling.
- Optional, fully-designed dark mode.
- End-to-end and component tests (Vitest/RTL) and visual regression coverage.
```
