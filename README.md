# Nursora

> Learn. Practice. Advance.

**Nursora** is a modern nursing education and examination preparation platform designed to help learners study, practice realistic exam-style questions, track their performance, and advance toward their professional goals.

Nursora is built with **Next.js (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**, with a hand-maintained, shadcn/ui-inspired component system. It presents a complete, image-led product experience — dashboards, an examination interface, study tools, a blog, and a community layer — backed by a **fully mocked data and authentication layer** so the product can be designed, reviewed, and demoed end-to-end without a backend.

![Next.js](https://img.shields.io/badge/Next.js-16.3-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8)
![License](https://img.shields.io/badge/license-unspecified-lightgrey)

> **Maturity note.** As committed in this repository, Nursora is a **front-end application with a fully mocked data and authentication layer**. There is no backend, database, or server-side API in the project. The mock API client (`src/lib/api`) is intentionally structured so it can be swapped for a real backend later. See [Known Limitations](#known-limitations) and [Assumptions](#assumptions--architectural-decisions).

---

## Table of Contents

- [Overview](#overview)
- [Product Vision](#product-vision)
- [Key Features](#key-features)
- [User Roles](#user-roles)
- [User Journey](#user-journey)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Design Decisions](#design-decisions)
- [UI/UX Architecture](#uiux-architecture)
- [Theme System](#theme-system)
- [Accessibility](#accessibility)
- [SEO Improvements](#seo-improvements)
- [GEO / AI Search Readiness](#geo--ai-search-readiness)
- [Performance Optimizations](#performance-optimizations)
- [Security Considerations](#security-considerations)
- [Assumptions & Architectural Decisions](#assumptions--architectural-decisions)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Available Scripts](#available-scripts)
- [Authentication](#authentication)
- [Dashboard](#dashboard)
- [Examination System](#examination-system)
- [Study System](#study-system)
- [Profile & Settings](#profile--settings)
- [Blog & Content](#blog--content)
- [Forums & Community](#forums--community)
- [API](#api)
- [Database](#database)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Known Limitations](#known-limitations)
- [Future Roadmap](#future-roadmap)
- [Rebranding Audit](#rebranding-audit)
- [Contributing](#contributing)
- [License](#license)
- [Disclaimer](#disclaimer)
- [Contact & Support](#contact--support)
- [Documentation Audit](#documentation-audit)

---

## Overview

Nursora is a digital nursing education and examination preparation platform. Its goal is to help nursing students and exam candidates build real exam readiness through realistic practice questions, clear rationales, and performance insights organized around how people actually study.

The application is a **Next.js (App Router)** project. Pages are rendered with React Server Components where data is read, and interactive regions (forms, exam interface, carousels, theme switching) are Client Components. All content currently ships as typed mock data so the product can be designed, reviewed, and demoed end-to-end without a backend.

**Who it is for**

- Nursing students preparing for entrance and licensure exams (ATI TEAS, HESI A2, NCLEX-RN, NCLEX-PN, RN/LPN Nursing).
- Candidates who want structured practice, performance tracking, and a study plan.
- A community layer (forums, testimonials, blog) for shared learning.

**How the parts work together**

1. A visitor explores public marketing/content pages (home, exams, resources, blog, FAQs).
2. They register or sign in (currently a client-side mock).
3. Authenticated users land on a dashboard with stats, performance, streak, and recommendations.
4. They choose an exam category, start a practice exam, answer questions, and review results.
5. Progress, study streaks, and recommendations update from mock data.
6. Community features (forums, blog comments UI) complement self-study.

No claims of official affiliation, accreditation, or exam guarantees are made by the software. See [Disclaimer](#disclaimer).

---

## Product Vision

> **Nursora — Learn. Practice. Advance.**

Nursora exists to turn passive studying into an active, measurable loop:

- **Learn** — structured study notes, resources, and exam-aligned content introduce and reinforce concepts.
- **Practice** — realistic, rationalized exam-style questions across the major nursing exam families build stamina and clinical judgment.
- **Advance** — performance analytics, study streaks, and recommendations show learners exactly where to focus next, so each session moves them closer to their goal.

The current codebase realizes this loop as a fully designed front-end experience. The data and authentication layers are mocked, but the product structure, information architecture, and component system are production-shaped and ready to connect to a real backend.

---

## Key Features

### Authentication & Account

- Registration with name, email, password, nursing level, and primary exam goal.
- Login / logout (client-side mock session).
- Password reset and email verification screens (UI present; wired to mock flows).
- Profile management (name, contact, institution, study goal, preferences).
- Profile photo upload: in-app file picker + live preview, persisted to the session (`avatarUrl`).
- Theme preference persisted per browser.

### Learning & Study

- Study notes browser with subjects, categories, favorites, and progress.
- Study resources (notes, flashcards, guides, cheat sheets, videos) as curated cards.
- Study plan builder (daily questions, weekly time, target date, active days).
- Study streak tracking (current / longest / weekly calendar).
- Learning recap (strongest/weakest subjects, totals).

### Examination

- Six exam categories: **ATI TEAS, HESI A2, RN Nursing, LPN Nursing, NCLEX-RN, NCLEX-PN**.
- Per-category landing pages with overview, subjects, and FAQ.
- Exam interface with question rendering, multiple-choice answer selection, flagging, progress navigator, and timer.
- Results view with per-question correctness, subject performance, and readiness insight.
- Each exam defines `totalQuestions`, `durationMinutes`, and `passingScore`.

### Community & Content

- Forums with topics, replies, pinned/solved states, and a "new topic" composer (demo posting).
- Blog with listing, article pages, categories, authors, and reading time.
- Resources and study-notes hubs.
- FAQs and testimonials.

---

## User Roles

The application does **not** implement a formal role-based access control system.

It distinguishes exactly two states:

| State | How it is determined | Access |
| --- | --- | --- |
| Guest | No session in `localStorage` (`qlex:session`) | Public routes only (`/`, `/exams`, `/blog`, `/login`, etc.) |
| Authenticated user | A session exists | All `/app/*` routes (dashboard, exams, progress, profile, forums, settings) |

There is **no administrator, moderator, or instructor role** in the codebase. Every authenticated user has the same set of accessible areas. Route protection is enforced client-side by `RequireAuth` (redirects guests to `/login?next=…`).

> **Legacy technical identifier.** The session key is still named `qlex:session` in the source (`src/lib/api/auth.ts`). This is a storage key, not the product name, and is intentionally preserved so existing demo sessions and documentation remain accurate. The product/brand name is **Nursora**.

---

## User Journey

```
Visitor
  ↓  (public site: home, exams, resources, blog, FAQs)
Registration  →  /register
  ↓
Login  →  /login
  ↓
Dashboard  →  /dashboard
  ↓
Set study goal / study plan  →  /settings, /study-plan
  ↓
Choose exam category  →  /exams/[category]
  ↓
Start practice exam  →  /exam/[id]
  ↓
Answer questions, flag, submit
  ↓
Review results  →  /results/[id]
  ↓
Track progress & streak  →  /progress
  ↓
Improve weak areas (recommendations, study notes)
```

All stages above are implemented as routes/components. Authentication and persistence are mocked (see [Authentication](#authentication)).

---

## Technology Stack

| Technology | Purpose | Status |
| --- | --- | --- |
| Next.js `16.3.1` | Framework (App Router, RSC, routing, build) | Verified |
| React `19.2.8` | UI library | Verified |
| TypeScript `^5` | Language | Verified (strict mode, `tsconfig.json`) |
| Tailwind CSS `^4` | Styling | Verified (CSS-first config via `@theme` in `globals.css`) |
| `@tailwindcss/postcss` | Tailwind v4 PostCSS plugin | Verified (`postcss.config.mjs`) |
| Custom UI components | Component system | Verified (`src/components/ui`, modeled on shadcn/ui conventions, radix-free) |
| ESLint `^9` + `eslint-config-next` | Linting | Verified (`eslint.config.mjs`) |
| Inter (Google Fonts) | Typography | Verified (`app/layout.tsx`) |
| No database / ORM | Persistence | Not present (mock data only) |
| No state-management library | State | Not present (React Context only) |
| Vitest `^4` | Tests | Verified (`src/lib/assessment/engine.test.ts`, `npm run test`) |
| No CI/CD configuration | Deployment pipeline | Not present |

There is **no** database, ORM, state-management library (Redux/Zustand), testing framework, or CI/CD configuration in the repository. shadcn/ui CLI is **not** installed; the equivalents are hand-maintained in `src/components/ui`.

---

## Architecture

### High level

```
Browser
  └── Next.js App Router (Server + Client Components)
        ├── UI primitives (src/components/ui)
        ├── Feature components (dashboard, exams, forums, …)
        ├── Context providers (ThemeProvider, AuthProvider)
        └── API / services (src/lib/api)  ← currently MOCK
              ├── client.ts   (simulated latency)
              ├── auth.ts     (localStorage session)
              ├── exams.ts     (mock exams)
              ├── dashboard.ts (mock dashboard)
              ├── questions.ts  (mock questions)
              └── result.ts    (localStorage results)
```

### Frontend

- **Server Components** read mock data via `async` page components (e.g., `getDashboard()`, `getExam()`) and render static/streamed HTML.
- **Client Components** (`"use client"`) handle interactivity: theme toggle, auth forms, exam interface, carousels, dropdowns, study plan.
- **Providers** wrap the app in `app/layout.tsx`: `ThemeProvider` → `AuthProvider`.

### Authentication flow (mocked)

```
login(email, password)
  → lib/api/auth.login()  (accepts any credentials; demo)
  → writeSession({ user, token })  → localStorage["qlex:session"]
  → AuthProvider sets status = "authenticated"
RequireAuth guards /app/* and redirects guests to /login?next=…
logout() → clearSession() → localStorage.removeItem("qlex:session")
```

### Data flow

```
UI event
  → React state / Context (useAuth, useTheme)
  → service function in src/lib/api/*
  → client.request(mockData, delayMs)   (simulated network)
  → component renders result
```

The mock client (`src/lib/api/client.ts`) is the single seam to replace with a real `fetch(NEXT_PUBLIC_API_URL)` when a backend exists.

### External services

- **Fonts**: Inter, loaded from Google Fonts in `app/layout.tsx` (preconnect + stylesheet). `next/font` is **not** currently used.
- **Images**: remote images are allowed **only** from `images.unsplash.com` (see `next.config.ts` `remotePatterns`). All hero/card imagery uses `next/image`.

---

## Project Structure

```
qlexnursing/                # repository / package directory (legacy technical identifier; product is Nursora)
├── app/                    # Next.js App Router routes
│   ├── (site)/             # Public marketing & content routes
│   │   ├── page.tsx        # Homepage (hero, sections, testimonials)
│   │   ├── about/  contact/  faq/  blog/  resources/  study-notes/
│   │   ├── exams/          # /exams and /exams/[category]
│   │   ├── legal/[doc]/     # Privacy, Terms, Refund, Accessibility, Disclaimer
│   │   └── onboarding/
│   ├── (auth)/             # Auth screens: login, register, forgot/reset/verify
│   ├── (app)/              # Authenticated app (wrapped by RequireAuth + AppShell)
│   │   ├── dashboard/  exam/[id]/  results/[id]/
│   │   ├── progress/  profile/  settings/  study-plan/
│   │   ├── search/  forums/  study-notes/
│   ├── layout.tsx           # Root layout: providers, fonts, skip link, metadata
│   ├── globals.css          # Tailwind v4 theme tokens + design system
│   ├── sitemap.ts / robots.ts# SEO routes (/sitemap.xml, /robots.txt)
│   └── opengraph-image.tsx  # Default social share image
├── components/
│   ├── ui/                  # Design-system primitives (Button, Card, Badge, …)
│   ├── layout/              # AppShell, SiteHeader, Topbar, Sidebar, MobileBottomNav, Footer
│   ├── dashboard/           # DashboardHeader, Stats, Performance, Subject, Activity, Recommendation
│   ├── exams/               # ExamLanding, ExamInterface, QuestionCard, ExamNavigator, ExamTimer
│   ├── results/             # ResultsView
│   ├── auth/                # AuthProvider, RequireAuth, LoginForm, RegisterForm
│   ├── forums/  home/  study/  settings/  profile/  search/  theme/  onboarding/
├── config/                  # site.ts (siteConfig), nav.ts (navigation)
├── data/mock/               # examCategories, exams, questions, dashboard, content, user, blog, testimonials
├── lib/                     # api/ (mock services), seo.ts, result.ts, accents.ts, utils.ts
├── types/                   # domain.ts, index.ts (Exam, Question, …)
├── public/                  # static assets
├── .env.example
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── tsconfig.json
└── package.json
```

---

## Design Decisions

This section explains the reasoning behind the major architectural and UI/UX decisions. Design choices are centralized so the product scales consistently as features are added.

### Component architecture

The UI is built from a small set of **reusable primitives** composed into feature components. All buttons across the app use a single `Button` (`src/components/ui/Button.tsx`); all surfaces build on a single `Card` primitive plus composed variants in `src/components/ui/cards.tsx`. This avoids duplicated styling logic and keeps visual language consistent. Feature components (`dashboard/*`, `exams/*`, `forums/*`) compose primitives rather than re-implementing them.

**Why reusable components:** reduces drift, simplifies theming (one place to change tokens), and makes new screens cheap to build. `BlogCard`, `ResourceCard`, and `ImageCard` all build on `Card` + `ImageFrame` + `Badge`, proving the pattern holds at scale.

### shadcn/ui conventions (hand-maintained)

The project follows **shadcn/ui conventions** (semantic, composable, class-based components) but does **not** use the shadcn CLI or Radix primitives. Components are hand-maintained in `src/components/ui` so the dependency surface stays minimal and the design tokens stay fully under our control.

**Why this approach:** it gives the ergonomics and consistency of shadcn/ui without adding runtime dependencies or a generator step, which keeps the bundle lean and the component API stable.

### Tailwind CSS v4 (CSS-first)

Tailwind is configured **CSS-first** via `@theme` inside `globals.css` rather than a JavaScript config. Design tokens are declared once and exposed as utilities (`bg-canvas`, `text-ink`, `border-line`, `ring-brand-500`, …).

**Why Tailwind:** utility-first styling keeps layout and spacing consistent, pairs naturally with design tokens, and avoids a separate CSS-in-JS runtime. The v4 `@theme` model makes the token system the single source of truth for both styling and theming.

### Design tokens

`globals.css` defines a full **semantic token set** (shadcn-style, brand-adapted):

- Brand scale (`--color-brand-50…950`, deep navy) used for primary actions and focus.
- Accent scale (`--color-accent-*`, cyan/teal) for secondary emphasis.
- Semantic aliases that resolve to themeable CSS variables: `background`, `foreground`, `card`, `card-foreground`, `popover`, `primary`, `primary-foreground`, `secondary`, `accent`, `muted`, `muted-foreground`, `border`, `input`, `ring`, plus `success` / `warning` / `danger` / `info`.
- Surface tokens: `canvas` (page background), `surface` (cards), `elevated` (popovers/modals), `ink` (text), `muted` (secondary text), `line` (borders), `track` (progress/scroll), `subtle` (subtle fills).

**Why semantic tokens:** components reference meaning (`bg-card`, `text-muted`, `border-line`) rather than raw colors. Theme switching then becomes a matter of flipping a handful of CSS variables instead of restyling every component.

### Theme system

Theming is implemented without a CSS-framework plugin (`ThemeProvider` in `src/components/theme/ThemeProvider.tsx`):

- `light` / `dark` / `system` modes.
- The resolved theme toggles a `.dark` class on `<html>`; CSS variables flip between light and dark palettes.
- Preference is persisted in `localStorage` under `qlex:theme`.
- `ThemeScript` is injected in `<head>` and applies the class before paint to avoid a flash of incorrect theme (FOUC).
- `system` follows `prefers-color-scheme` and listens for OS changes.

**Why this architecture:** it is dependency-free, SSR-safe, and gives instant, flicker-free theming. Persisting to `localStorage` keeps the choice across visits without a server.

### Responsive design

The UI is **mobile-first** with Tailwind breakpoints (`sm`, `md`, `lg`, `xl`, `2xl`) and a `max-w-7xl` container:

- **Mobile (<768px):** bottom navigation (`MobileBottomNav`), slide-in drawer with focus trap, stacked cards, full-width forms.
- **Tablet (≥768px):** two-column grids, expanded navigation.
- **Desktop (≥1024px):** persistent `Sidebar` (app) / top header (site), multi-column dashboards.
- **Large displays (≥1280px/1536px):** wider content max-width; hero imagery scales up to ~72–90vh.

A **centralized z-index scale** (`globals.css`: content < bottomnav < header < overlay < drawer/dropdown < modal < toast < tooltip < skip) keeps navigation ordering correct so page content never covers menus or modals.

### Card system

Cards use one primitive, `Card` (`CardHeader` / `CardTitle` / `CardDescription` / `CardContent` / `CardFooter`), plus composed variants in `src/components/ui/cards.tsx`: `GlassCard`, `FeatureCard`, `ImageCard`, `BlogCard`, `ResourceCard`, `TestimonialCard`, `PortfolioCard`, `StatCard`, and `Rating`. This standardizes spacing, elevation, and hover behavior.

### Button system

A single `Button` (`src/components/ui/Button.tsx`) provides variants `primary`, `secondary`, `outline`, `ghost`, `danger`, `link` and sizes `sm`, `md`, `lg`, `icon`. Centralizing buttons guarantees consistent focus rings, disabled states, and motion.

### Typography

`Inter` is the default sans font (`--font-sans`), with a clear hierarchy driven by semantic font weights and sizes (display/hero → section headings → body → captions). `text-balance` is available for headings. Type is token-driven so it adapts across themes.

### Glassmorphism

`.glass` (theme-aware) and `.glass-dark` (always-dark, for overlays above imagery) provide translucent, blurred surfaces that keep text readable over photography and gradients. `.glass-dark` guarantees white text remains legible in **both** light and dark themes, which is why it is used for hero overlays and image cards.

### Accessibility (as implemented)

- Semantic HTML and landmark elements; a skip-to-content link in the root layout.
- Visible `:focus-visible` outlines and `ring` focus states on interactive components.
- ARIA roles/labels on `Carousel`, `Modal` (`role="dialog"`, `aria-modal`), and `Dropdown` (`aria-haspopup`, `aria-expanded`).
- Color contrast enforced through semantic tokens; glass surfaces use `.glass-dark` to keep text readable.
- `prefers-reduced-motion` disables animations and transitions globally.
- Accessible form labels and `next/image` `alt` text.

The project is **not** claimed to be WCAG-certified; a full accessibility audit is recommended before production launch (see [Accessibility](#accessibility)).

---

## UI/UX Architecture

| Area | Approach |
| --- | --- |
| Navigation | `SiteHeader` (public), `Topbar` + `Sidebar` (app), `MobileBottomNav`, focus-trapped mobile drawer |
| Responsive behavior | Mobile-first; bottom nav on mobile, persistent sidebar on desktop |
| Cards | Single `Card` primitive + composed variants (see [Design Decisions](#design-decisions)) |
| Buttons | Single `Button` with standardized variants/sizes |
| Forms | Typed `Input`, `Textarea`, `Select`, `Label`, `Field` (`forwardRef`, `aria-invalid` aware) |
| Modals / Dialogs | `Modal` with `role="dialog"` and focus handling |
| Theme system | Light / Dark / System with no-flash script |
| Typography | Inter-based hierarchy via tokens |
| Color system | Brand + accent + semantic tokens |
| Spacing | Token-based spacing via Tailwind utilities and `container-page` |
| Loading states | Route-level `loading.tsx` skeletons; shared `Skeleton` / `SkeletonText` |
| Empty states | Shared `EmptyState` (dashed panel + icon + copy) |
| Error states | `not-found.tsx` + inline form/error messaging |
| Mobile navigation | `MobileBottomNav` + drawer with focus trap |

**Design-system reasoning:** every interactive element is built from primitives that already encode focus, disabled, motion, and theme behavior, so new features inherit accessibility and visual consistency for free.

---

## Theme System

- `ThemeProvider` manages `light` / `dark` / `system`.
- Resolved theme toggles `.dark` on `<html>`; CSS variables flip the palette.
- Preference persists in `localStorage` key `qlex:theme` (legacy identifier; see [Rebranding Audit](#rebranding-audit)).
- `ThemeScript` runs before paint to prevent FOUC.
- `system` listens to `prefers-color-scheme` changes at runtime.
- `ThemeToggle` switches the active theme.

---

## Accessibility

The following are **implemented in the codebase**:

- Semantic HTML, landmarks, and a skip-to-content link.
- Visible `:focus-visible` outlines globally and `ring` focus states on interactive components.
- ARIA roles/labels on `Carousel`, `Modal`, `Dropdown`.
- Color contrast via semantic tokens; `.glass-dark` preserves legibility over imagery.
- `prefers-reduced-motion` disables animations/transitions globally.
- Accessible form labels and `next/image` `alt` text.

**Not yet verified:** a formal WCAG 2.1 AA audit, screen-reader passes, and automated a11y testing are **recommended** but not performed. The accessibility statement under `/accessibility` is template copy and should be validated before launch.

---

## SEO Improvements

SEO is implemented with the Next.js **Metadata API**, centralized in `src/lib/seo.ts` and per-page `metadata` exports. Status of each item:

| SEO item | Status | Evidence / Location |
| --- | --- | --- |
| `<title>` + template | Implemented | `app/layout.tsx` (`%s \| Nursora`), `seo.ts` |
| Meta descriptions | Implemented | Per-page `description` |
| Keywords | Implemented | Root + per-page `keywords` |
| Open Graph | Implemented | `openGraph` in layout + `seo.ts` (`type`, `url`, `title`, `description`, `siteName`, `locale`) |
| Twitter/X cards | Implemented | `twitter: summary_large_image` |
| Canonical URLs | Implemented | `alternates.canonical` per page |
| Sitemap | Implemented | `app/sitemap.ts` (`/sitemap.xml`) |
| Robots.txt | Implemented | `app/robots.ts` (`/robots.txt`), authenticated routes disallowed |
| Structured data (JSON-LD) | Implemented | `seo.ts`: `WebSite`, `Organization`, `Course`, `BreadcrumbList`, `FAQPage`, `BlogPosting` |
| Semantic HTML | Implemented | Landmarks, headings, lists |
| Heading hierarchy | Implemented (partial) | Logical `h1→h2→h3` in most views; not audited exhaustively |
| Image `alt` text | Implemented (partial) | `next/image` alt present on major imagery; verify all instances |
| Internal linking | Implemented | Nav, cards, breadcrumbs, related posts |
| URL structure | Implemented | Clean, nested App Router routes |
| Dynamic / page-specific metadata | Implemented | Each route exports `metadata` via `createMetadata` |
| Blog metadata | Implemented | `BlogPosting` JSON-LD + `article` OG type |
| Search-engine discoverability | Partial | Sitemap + robots present, but no `next-sitemap` submit flow, no `hreflang`, no index-rate tuning |

**No claims are made about search ranking, traffic, or Lighthouse scores.** Those require measurement on a deployed environment.

### SEO design decisions

```
Semantic HTML
      ↓
Clear heading hierarchy + structured content
      ↓
Metadata (title/description/canonical/OG/Twitter)
      ↓
Structured data (JSON-LD)
      ↓
Sitemap + robots
      ↓
Search-engine understanding → better discoverability
```

The architecture centralizes metadata in `createMetadata()` and JSON-LD builders so every new route gets correct, consistent SEO without per-page boilerplate. Adding new content types (e.g., a course catalog) is a matter of adding a JSON-LD builder and a sitemap entry, which supports **future SEO growth** without rework.

---

## GEO / AI Search Readiness

**GEO readiness is a recommended future enhancement.** The codebase does not currently implement Generative Engine Optimization or AI-search-specific structured outputs beyond standard JSON-LD.

What already helps AI/search engines today:

- Semantic HTML and a clean heading hierarchy.
- Machine-readable structured data (`WebSite`, `Organization`, `Course`, `FAQPage`, `BlogPosting`).
- FAQ content and entity-style descriptions in mock data.

Recommended next steps (not implemented):

- Expand `FAQPage` coverage and add `HowTo` / `QAPage` where relevant.
- Provide an `llms.txt` / `ai.txt` and richer entity descriptions.
- Ensure authoritative "About" and author metadata for blog content.
- Tighten canonicalization and internal linking for entity clarity.

---

## Performance Optimizations

| Optimization | Status | Purpose |
| --- | --- | --- |
| `next/image` (responsive, optimized) | Implemented | Reduce image payload, automatic sizing |
| Image formats (AVIF/WebP) | Implemented (default) | Next.js serves modern formats for `next/image` |
| Lazy loading (images) | Implemented (default) | `next/image` lazy-loads below-the-fold images |
| Responsive images (`sizes`/`priority`) | Implemented (partial) | `ImageFrame` sets `sizes`; hero uses `priority` selectively |
| Server-side rendering (RSC) | Implemented | Data-reading pages render on the server |
| Static generation | Implemented (partial) | Public/content routes prerender; dynamic auth routes are client-guarded |
| Streaming | Partial | RSC streaming available; not explicitly tuned |
| Route-based code splitting | Implemented | Inherent to the App Router |
| Component lazy loading (`dynamic()`) | Not detected | No `next/dynamic` usage found — recommended for heavy client widgets |
| Font optimization (`next/font`) | Not implemented | Fonts loaded via Google Fonts `<link>` (render-blocking) — migrate to `next/font` |
| CSS optimization | Implemented | Tailwind v4 purges unused utilities at build |
| JavaScript optimization | Implemented (partial) | Client Components scoped to interactive regions; no bundle analyzer configured |
| Caching layer | Not configured | Would be a deployment concern (CDN/edge) |
| CDN usage | Not detected | None configured in repo |
| API optimization | Not applicable | No real API; mock client simulates latency only |
| Database query optimization | Not applicable | No database |
| Animation optimization | Implemented | `prefers-reduced-motion` respected; lightweight keyframes |

**Only verified information is listed.** No Lighthouse score, bundle size, or TTFB figure is asserted here.

---

## Core Web Vitals

No verified production performance measurements were available during documentation generation (the app runs on mocked data locally and has no instrumented monitoring).

**Recommended measurement approach:**

- Run Lighthouse (or `next build` + Vercel Speed Insights) on a production deployment.
- Track **LCP** (hero/image), **CLS** (reserve space via `next/image` dimensions), **INP** (keep client handlers light), **FCP** (font/JS tuning), **TTFB** (edge/SSR).
- Add Real User Monitoring (RUM) once a backend and analytics are connected.

---

## Security Considerations

> The current authentication and data layer is a client-side mock and is **not** production-secure.

**What exists:**

- Client-side route protection via `RequireAuth`.
- No secrets are committed; `.env.example` contains only public vars and explicit warnings.

**Areas that must be reviewed before production:**

- Real authentication with server-side session/token validation (the mock accepts any credentials).
- Secure, `HttpOnly` cookies and HTTPS for sessions (currently `localStorage`).
- Server-side input validation, rate limiting, and CSRF protection.
- Password hashing (no passwords are stored or validated today).
- Authorization/roles (only guest vs authenticated exists).
- Protecting API routes and the future backend from unauthorized access.

Never commit secrets. Only `NEXT_PUBLIC_*` variables are safe in the client bundle.

---

## Assumptions & Architectural Decisions

This section documents assumptions made during development. Items are flagged as **Verified** (observable in code) or **Inferred** (reasonable given the implementation). Where the repository reveals no explicit assumption, that is stated.

### A1 — Front-end-only with mock backend
- **Assumption:** The product can be fully designed and demoed without a backend; a real API will be swapped in later.
- **Why:** `src/lib/api/client.ts` simulates latency and returns mock data; `NEXT_PUBLIC_API_URL` is reserved but unused.
- **Impact:** No persistence, auth, or real data today.
- **Risk:** Demo data may not reflect real product constraints.
- **Validation:** Verified by reading `src/lib/api/*` and absence of DB/ORM.

### A2 — Client-side authentication is sufficient for now
- **Assumption:** Route protection can be client-side (`RequireAuth`) for the demo.
- **Why:** No server exists to validate tokens.
- **Impact:** Not secure; sessions in `localStorage`.
- **Risk:** Easy to bypass; unsuitable for production.
- **Validation:** Verified (mock auth, `localStorage` session).

### A3 — Mock data shape matches a future REST API
- **Assumption:** Service function signatures (`getExams`, `getDashboard`, `login`, …) represent the intended REST contract.
- **Why:** The single `request()` seam is designed to become `fetch(NEXT_PUBLIC_API_URL)`.
- **Impact:** Lower migration cost later.
- **Risk:** Real API may differ; contracts may need revision.
- **Validation:** Inferred from `client.ts` design.

### A4 — Responsive, mobile-first behavior is expected
- **Assumption:** Users access Nursora on mobile and desktop; bottom nav + sidebar pattern fits.
- **Why:** `MobileBottomNav`, drawer, and breakpoint classes are implemented.
- **Impact:** Layout must stay mobile-first.
- **Risk:** Unverified on real devices/browsers.
- **Validation:** Partially verified (code present; no device lab testing).

### A5 — Remote imagery is limited to Unsplash
- **Assumption:** All remote images come from `images.unsplash.com`.
- **Why:** `next.config.ts` `remotePatterns` allows only that host.
- **Impact:** Other hosts break `next/image` unless added.
- **Risk:** Content/CMS may need more hosts later.
- **Validation:** Verified in `next.config.ts`.

### A6 — Theme preference persists per browser
- **Assumption:** Users expect their theme choice to persist.
- **Why:** `ThemeProvider` writes `qlex:theme` to `localStorage`.
- **Impact:** Cross-device sync not supported.
- **Risk:** Low.
- **Validation:** Verified.

### A7 — Exam content is original sample data
- **Assumption:** Practice questions are original preparation material, not official exams.
- **Why:** Disclaimer states non-affiliation; questions are templated mock data.
- **Impact:** Cannot claim exam alignment certification.
- **Risk:** Must not be presented as official.
- **Validation:** Verified (disclaimer + mock data).

### A8 — No automated tests are required yet
- **Assumption:** Manual review is adequate pre-backend.
- **Why:** No test framework is configured.
- **Impact:** Regressions can go unnoticed.
- **Risk:** Medium as the codebase grows.
- **Validation:** Verified (no test config).

> No other explicit assumptions were documented in the repository beyond those observable from the code above.

---

## Installation

### Prerequisites

- **Node.js**: 20.9 or newer (Next.js 16 no longer supports Node 18).
- **npm** (a `package-lock.json` is committed, so use npm).
- Git.
- A modern browser. No database or external service is required to run the app locally — all data is mocked.

### Install

```bash
git clone <repository-url>
cd qlexnursing   # repository directory (legacy identifier; product is Nursora)
npm install
```

---

## Environment Variables

The application reads public environment variables. A template is provided in `.env.example`.

| Variable | Required | Purpose | Example |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical site URL used for metadata, Open Graph, and JSON-LD | `https://nursora.vercel.app` |
| `NEXT_PUBLIC_API_URL` | No | Base URL of the (future) backend API; currently unused by the mock client | `https://api.nursora.com` |
| `NEXT_PUBLIC_DEMO_DELAY_MS` | No | Artificial latency (ms) added by the mock API so loading skeletons are demoable. `0` disables; defaults to `900` when unset | `900` |

No secrets, API keys, or private URLs are required to run the project locally. The repository does **not** contain real credentials.

> Use `YOUR_VALUE_HERE` placeholders in documentation; never commit real secrets.

---

## Development

Copy the example environment file (optional — the app runs with sensible defaults):

```bash
cp .env.example .env.local
```

Start the development server:

```bash
npm run dev
```

The app runs at **http://localhost:3000** (Next.js default). In demo mode, **any** email and password will sign you in.

---

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server (Next.js dev; Next 16 uses Turbopack by default). |
| `npm run build` | Production build. Also runs TypeScript type-checking. |
| `npm run start` | Start the production server (after `build`). |
| `npm run lint` | Run ESLint (Next.js config). |

There is **no** `test` or `type-check` script. Type checking happens as part of `npm run build`.

---

## Authentication

> **Demo only.** Authentication in this repository is a client-side mock. There is no server, no password hashing, and no real credential validation.

- `src/lib/api/auth.ts` exposes `login`, `register`, `updateProfile`, `readSession`, `writeSession`, `clearSession`.
- A session is stored in `localStorage` under the key **`qlex:session`** (legacy identifier).
- `login()` accepts any email/password and returns a mock user (`id: "u-1001"`).
- `RequireAuth` (`src/components/auth/RequireAuth.tsx`) protects the `(app)` route group; unauthenticated visitors are redirected to `/login?next=<path>`.
- `updateProfile` merges changes into the stored session only.

To wire a real backend later, replace `request(...)` in `src/lib/api/*` with `fetch(`${process.env.NEXT_PUBLIC_API_URL}/...`)`. The service contracts already match typical REST shapes.

---

## Dashboard

The dashboard (`/dashboard`) is composed from mock data via `getDashboard()`:

- **DashboardHeader** — greeting, study streak pill, "continue practice" CTA.
- **DashboardStats** — key metrics (questions answered, accuracy, time studied, streak) with trend indicators.
- **StudyRecommendation** — a recommended focus area.
- **PerformanceOverview** — accuracy/trend visualization (LineChart).
- **SubjectPerformance** — per-subject accuracy breakdown (DonutChart).
- **RecentActivity** — latest practice attempts.

The progress page (`/progress`) reuses these plus a **study streak** calendar and a **learning recap** (strongest/weakest subjects, totals).

---

## Examination System

Exam categories are defined in `src/data/mock/examCategories.ts`:

| Category | Slug | Audience |
| --- | --- | --- |
| ATI TEAS | `ati-teas` | Pre-Nursing |
| HESI A2 | `hesi-a2` | Pre-Nursing |
| RN Nursing | `rn-nursing` | RN |
| LPN Nursing | `lpn-nursing` | LPN |
| NCLEX-RN | `nclex-rn` | RN |
| NCLEX-PN | `nclex-pn` | LPN |

Nursora implements **four distinct learning modes** on a single, configuration-driven assessment engine. Mode behavior — feedback timing, explanations, hints, AI tutor, timer strictness, randomization, navigation, and passing score — is defined centrally as a `ModeConfig` in `src/lib/assessment/modes.ts` (see [Assumptions](#a9--four-mode-assessment-engine)). The `AssessmentPlayer` and engine read exclusively from these configs; there is no `if (mode === "exam")` branching in the UI.

| Mode | Purpose | Feedback | Explanations | Hints / AI | Timer | Randomization |
| --- | --- | --- | --- | --- | --- | --- |
| **Practice** | Learn with immediate feedback | Immediate | Immediate | UI only (no AI) | Optional | Off |
| **Tutor** | Guided, AI-assisted reasoning | Guided | Interactive | On — heuristic tutor | None | Off |
| **Test** | Measure knowledge | After submission | After submission | Off | Enabled | On |
| **Exam** | Simulate exam conditions | After submission | After submission | Off | Mandatory (authoritative `expiresAt`) | On |

**Flow**

1. `/exams` lists categories; `/exams/[category]` shows the landing page (`ExamLanding`) with an overview, subjects, FAQ, and a **mode selector** (`ModeSelector`).
2. Choosing a mode navigates to `/assessment/[id]?mode=<mode>`, which renders `AssessmentPlayer` with the matching `ModeConfig`.
3. `AssessmentPlayer` renders `QuestionCard`, supports answer selection, **flagging**, question navigation (`ExamNavigator`), and an `ExamTimer` derived from the server-style `expiresAt` (refreshes / tab closes cannot extend time). In Tutor mode it renders `TutorPanel` — a rule-based, heuristic tutor with an LLM-ready seam in `src/lib/assessment/tutor.ts`.
4. On submit/finish, the result is computed **authoritatively** by `computeResult()` in `src/lib/assessment/engine.ts` (correctness is recomputed from the question bank; the client score is never trusted) and persisted to `localStorage`.
5. `/assessment/results/[id]` renders `AssessmentResults` with per-question review, subject / topic / difficulty performance, weak areas, and recommendations.

Each `Exam` mock record defines `totalQuestions`, `durationMinutes`, and `passingScore`. Questions are served from mock data through `src/lib/api/questions.ts` and `src/lib/api/exams.ts`.

> **Backward compatibility.** A legacy single-flow exam interface (`ExamInterface` → `lib/result.ts` → `/results/[id]`) still exists; new entries use the four-mode flow above. The four modes are implemented in the front end and run on the mocked data/attempt layer. Server-side scoring, a real question bank, and a live LLM tutor remain backend work (see [Known Limitations](#known-limitations)).

---

## Study System

- **Study notes** (`/study-notes`): `StudyNotesBrowser` lists notes with subject, category, favorite, and progress.
- **Resources** (`/resources`): curated `StudyResource` items (Notes, Flashcards, Guide, Cheat Sheet, Video) as `ResourceCard`s.
- **Study plan** (`/study-plan`): `StudyPlanBoard` lets users set daily questions, weekly time, target date, and active days (client state; "Plan saved (demo)").
- **Streak & recap**: tracked in `mockStreak` and surfaced on the dashboard and progress pages.

These features read from `src/data/mock` and are currently presentation/demo only — changes are not persisted to a server.

---

## Profile & Settings

- **Profile** (`/profile`, `/profile/edit`): view and edit name, contact, institution, study goal, and profile photo. The **Replace** button opens a file picker, previews the chosen image (via `Avatar`'s `src`), and persists it to the session through `updateProfile({ avatarUrl })`; a **Remove** option clears it.
- **Settings** (`/settings`): `SettingsPanel` manages theme preference (light/dark/system), notification and study preferences. Changes are demo-local.

---

## Blog & Content

- **Blog** (`/blog`): grid of `BlogCard`s with category badge, author, date, reading time.
- **Article** (`/blog/[slug]`): cover image, metadata, JSON-LD `BlogPosting`, and related posts.
- **Resources**, **Study notes**, **FAQs** (`/faq`), and **Testimonials** are additional content surfaces, all backed by `src/data/mock/content.ts` and `src/data/mock/blog.ts`.
- Blog posts include `category`, `author`, `publishedAt`, `readingMinutes`, and `content` (array of paragraphs/blocks). Author is currently the mock "Nursora Team".

---

## Forums & Community

- **Forums** (`/forums`): `ForumsList` of topics with category, replies, views, likes, pinned/solved badges, and `Avatar`s.
- **Topic** (`/forums/[slug]`): original post, mock replies, and `ReplyBox`.
- **New topic** (`/forums/new`): `NewTopicForm` composer (demo posting — "Posted (demo)").
- Forums require authentication (under the `(app)` group). Posting is **demo-only** and not persisted to a backend.

---

## API

There is **no HTTP API** in the repository. Instead, typed service modules in `src/lib/api` return mock data through a simulated client.

| Module | Exports | Source |
| --- | --- | --- |
| `client.ts` | `request(data, delayMs)`, `sleep(ms)`, `DEMO_DELAY_MS` | Simulates latency (tunable via `NEXT_PUBLIC_DEMO_DELAY_MS`); clone of data |
| `auth.ts` | `login`, `register`, `updateProfile`, `readSession`, `writeSession`, `clearSession` | `localStorage` |
| `exams.ts` | `getExams`, `getExam(idOrSlug)` | `data/mock/exams` |
| `questions.ts` | `getQuestions(examId)`, `getQuestionPool(examId)` | `data/mock/questions` |
| `dashboard.ts` | `getDashboard` | `data/mock/dashboard` |
| `result.ts` | `buildResult`, `RESULT_STORAGE_KEY` | `localStorage` (legacy flow) |
| `assessment.ts` | `startAssessment`, `autosaveAnswer`, `autosaveAttempt`, `submitAssessment`, `fetchResult`, `fetchHistory` | `lib/assessment/attempt.ts` (localStorage) |

Example usage (actual project syntax):

```ts
import { getExams } from "@/lib/api/exams";

const exams = await getExams(); // Promise<Exam[]>
```

To connect a real backend, replace the body of `request()` with a `fetch` to `process.env.NEXT_PUBLIC_API_URL`. The service function signatures already represent the intended contract.

---

## Database

**Not implemented.** There is no database, ORM, schema, migration, or seed process in the repository. All data lives in `src/data/mock` (typed TypeScript objects) and in `localStorage` for session/results/streak. Persistence is a **planned** future enhancement (see [Future Roadmap](#future-roadmap)).

---

## Testing

Unit tests cover the assessment engine (`src/lib/assessment/engine.ts`) — scoring, percentage/pass-fail, answer evaluation (single + multiple choice), deterministic randomization (`mulberry32` / `shuffle`), question selection/filtering/pooling, weak-area detection, recommendations, and the mode configuration.

- **Runner:** [Vitest](https://vitest.dev) (`vitest.config.mts`).
- **Command:** `npm run test` (run once) or `npm run test:watch`.
- **Location:** `src/lib/assessment/engine.test.ts`.

```bash
npm run test   # 22 tests, all passing
```

> The engine is a pure, framework-free module so it can be unit-tested in Node and reused verbatim on a future backend. UI/integration/security tests are recommended next steps (see [Future Roadmap](#future-roadmap)).

---

## Deployment

Nursora is a standard Next.js application.

- No provider-specific configuration is committed (no `vercel.json`, `Dockerfile`, or `netlify.toml`).
- The only build-affecting config is `next.config.ts` (image `remotePatterns`).
- It can be deployed to **Vercel, Netlify, or any Node.js host** that runs Next.js. Do not assume a specific provider merely because the stack is Next.js.

### Production build

```bash
npm run build
npm run start
```

Set `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_API_URL` in the deployment environment if a backend is connected. The production server binds to the Next.js default port (3000) unless overridden.

---

## Troubleshooting

**Build / type errors**
Run `npm run build` to surface TypeScript and lint errors; `npm run dev` only type-checks on demand.

**Images do not load**
`next/image` only allows remote hosts listed in `next.config.ts` (`images.unsplash.com`). To use another image host, add it to `images.remotePatterns`.

**Theme flashes on load**
`ThemeScript` in `<head>` sets the theme class before paint. Ensure it is present (it is, in the root layout). Clearing `localStorage` key `qlex:theme` resets the preference.

**Signed in but can't access /dashboard**
`RequireAuth` redirects guests. In demo mode, sign in with any email/password; the session lives in `localStorage` key `qlex:session`. Clear that key (or "Clear site data") to reset.

**Node version errors**
Next.js 16 requires Node 20.9+. Upgrade Node if you see engine errors.

**Dependency issues**
Remove `node_modules` and the lockfile, then reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

**Demo data resets**
All mock data and results live in `localStorage`; clearing site data resets progress, streak, and session.

**Loading skeletons don't appear**
The route-level skeletons (`loading.tsx`) are driven by the mock API's artificial latency. Set `NEXT_PUBLIC_DEMO_DELAY_MS` (e.g. `900`) in `.env.local` to make them visible, or `0` to disable.

---

## Known Limitations

- **No backend / database.** All data is mock data in `src/data/mock`; the API client simulates latency (tunable via `NEXT_PUBLIC_DEMO_DELAY_MS`).
- **Mock authentication.** Any credentials sign in; sessions are in `localStorage` and are not secure.
- **No persistence beyond the browser.** Profile/settings/study-plan/forum posts are demo-only.
- **No automated tests, CI/CD, or coverage.**
- **Single access state** (guest vs authenticated); no admin/moderator roles.
- **Exam content is sample data**, not affiliated with or derived from official exams.
- **No rate limiting, CSRF, or server-side validation** in the current code.
- **No Prettier/commit-hook configuration** present.
- **Fonts loaded via Google Fonts `<link>`**, not `next/font` (render-blocking; see [Performance](#performance-optimizations)).
- **No `next/dynamic` lazy loading** of heavy client components.

---

## Future Roadmap

**Current features** (implemented, as documented above): auth mock, dashboard, six exam categories + exam interface + results, study notes/resources/plan, streak, blogs, forums (demo), FAQs, testimonials, light/dark/system theming, responsive shell, SEO metadata + sitemap/robots + JSON-LD.

**Recommended future improvements** (not yet implemented — proposed phases):

- **Phase 1 — UI/UX stabilization:** polish loading/empty/error states, add `next/font`, run an a11y audit.
- **Phase 2 — Real backend:** replace the mock API client with a real API (`NEXT_PUBLIC_API_URL`) and server-side auth.
- **Phase 3 — Persistence:** database for exams, results, forums, and profiles; seed process.
- **Phase 4 — Advanced learning analytics:** trend dashboards, readiness scoring, adaptive recommendations.
- **Phase 5 — Personalized learning:** study plans driven by performance; spaced repetition.
- **Phase 6 — Mobile applications:** native or PWA shell.
- **Phase 7 — AI-powered tutoring (proposed):** only if/when a real backend and content pipeline exist; not present today.

These phases are **proposed ideas**, not confirmed product commitments, unless the repository later confirms them.

---

## Rebranding Audit

The project was rebranded from **QLexNursing** → **Nursora** with the tagline **"Learn. Practice. Advance."**

### Product/Brand name (rebranded)

All user-facing product-name strings were updated across ~31 source files, including:

- `src/config/site.ts` — `name: "Nursora"`, `tagline: "Learn. Practice. Advance."`, `url`/`apiUrl`/`twitterHandle` default to `nursora` domains.
- Page metadata, hero, navigation (`SiteHeader`, `Sidebar`, `SiteFooter`), auth screens, blog/FAQ/about/contact copy.
- Mock data author ("Nursora Team"), resource titles ("Nursora Study Notes"), and the default Open Graph image text.

### Legacy technical identifiers (preserved — do not change)

These are storage keys / package identifiers, not the product name. They are intentionally kept so existing demo sessions, documentation, and the on-disk repository remain accurate:

| Identifier | Kind | Location |
| --- | --- | --- |
| `qlexnursing` | Package name / repository directory | `package.json`, `package-lock.json`, folder `qlexnursing/` |
| `qlex:session` | `localStorage` session key | `src/lib/api/auth.ts` |
| `qlex:result:<examId>` | `localStorage` result key | `src/lib/result.ts` |
| `qlex:theme` | `localStorage` theme key | `src/components/theme/ThemeProvider.tsx` |

When connecting a real backend, the product name is already **Nursora** everywhere it is rendered; only the legacy storage keys and package name retain the `qlex*` identifier by design.

---

## Contributing

1. Fork the repository and clone your fork.
2. Create a feature branch: `git checkout -b feature/<short-name>`.
3. Install dependencies: `npm install`.
4. Make your change; follow the existing component/design-system conventions.
5. Run `npm run lint` and `npm run build`.
6. Manually verify the affected routes (light/dark/system, mobile + desktop).
7. Commit with a clear message and open a Pull Request.

### Branching strategy (recommended)

No branching policy is enforced by the repository. A simple recommended approach:

```
main
develop
feature/*
fix/*
hotfix/*
```

### Commit convention (recommended)

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat:     new feature
fix:      bug fix
docs:     documentation
refactor: restructuring without behavior change
style:    formatting/UI only
test:     adding tests
chore:    tooling/build
```

### Safe change guidance

- **UI components**: extend `src/components/ui` primitives; don't hard-code colors — use design tokens. Keep buttons on `Button` and cards on `Card`.
- **API**: change the mock client seam (`src/lib/api/client.ts`) rather than scattering fetch calls.
- **Auth**: keep `RequireAuth` as the single guard; route protection is client-side today.
- **Env config**: only `NEXT_PUBLIC_*` vars are safe client-side; never add secrets to the client bundle.

---

## License

No explicit open-source license file was detected in the repository. The package is marked `"private": true`. Absent a license, default copyright applies and the code should not be treated as MIT/GPL/Apache licensed. Add a `LICENSE` file to define usage terms.

---

## Disclaimer

Nursora is an independent study tool and is **not affiliated with, endorsed by, or sponsored by NCSBN, ATI, HESI, or any trademark holder**. Practice exams and questions are original preparation material and are not the official exams. Using Nursora does not guarantee a passing score on any official examination. (This wording mirrors the legal disclaimer shipped in `src/app/(site)/legal/[doc]` and the about page.)

---

## Contact & Support

The in-app contact form (`/contact`) is a demo and does not submit data. For project support, contact the project maintainers. The site footer attributes the design to **Descientist** with a link to their GitHub profile. Demo contact email: `support@nursora.com`.

---

## Documentation Audit

Final audit of this README against the brief:

| Requirement | Status | Evidence / Location |
| --- | --- | --- |
| Design decisions | ✅ | [Design Decisions](#design-decisions), [UI/UX Architecture](#uiux-architecture), [Theme System](#theme-system) |
| SEO improvements | ✅ | [SEO Improvements](#seo-improvements), `src/lib/seo.ts`, `sitemap.ts`, `robots.ts` |
| Performance optimizations | ✅ | [Performance Optimizations](#performance-optimizations), [Core Web Vitals](#core-web-vitals) |
| Assumptions | ✅ | [Assumptions & Architectural Decisions](#assumptions--architectural-decisions) |
| Architecture | ✅ | [Architecture](#architecture), [Project Structure](#project-structure) |
| UI/UX | ✅ | [UI/UX Architecture](#uiux-architecture), [Design Decisions](#design-decisions) |
| Accessibility | ✅ (partial) | [Accessibility](#accessibility) — formal audit recommended |
| Security | ✅ | [Security Considerations](#security-considerations) |
| Deployment | ✅ (partial) | [Deployment](#deployment) — no provider config committed |
| Testing | ⚠️ | [Testing](#testing) — explicitly documents absence of tests |
| GEO / AI search readiness | ✅ (documented as future) | [GEO / AI Search Readiness](#geo--ai-search-readiness) |
| Rebranding | ✅ | [Rebranding Audit](#rebranding-audit), product name Nursora + tagline |
| Known limitations | ✅ | [Known Limitations](#known-limitations) |
| Future roadmap | ✅ | [Future Roadmap](#future-roadmap) |

> This README reflects the codebase as committed. Claims about implemented behavior were verified against `src/`; items not present in the repository are explicitly marked as **Not implemented**, **Planned**, or **Recommended** rather than asserted as fact.
