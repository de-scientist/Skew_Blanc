# QLexNursing

> Practice smarter. Understand your performance. Prepare with confidence.

A modern, image-led nursing exam preparation platform built with Next.js. QLexNursing helps nursing students and candidates practice exam-style questions, track performance, follow a study plan, and engage with a study community — across exams such as NCLEX-RN, NCLEX-PN, RN Nursing, LPN Nursing, ATI TEAS and HESI A2.

![Next.js](https://img.shields.io/badge/Next.js-16.3-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8)
![License](https://img.shields.io/badge/license-unspecified-lightgrey)

> **Maturity note.** QLexNursing, as committed in this repository, is a **front-end application with a fully mocked data and authentication layer**. There is no backend, database, or server-side API in the project. The mock API client (`src/lib/api`) is intentionally structured so it can be swapped for a real backend later. See [Known Limitations](#known-limitations).

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [User Roles](#user-roles)
- [User Journey](#user-journey)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Important Files](#important-files)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)
- [Available Scripts](#available-scripts)
- [Authentication](#authentication)
- [Dashboard](#dashboard)
- [Examination System](#examination-system)
- [Study System](#study-system)
- [Profile & Settings](#profile--settings)
- [Blog & Content](#blog--content)
- [Forums & Community](#forums--community)
- [UI/UX & Design System](#uiux--design-system)
- [Theme System](#theme-system)
- [Component Architecture](#component-architecture)
- [Routing](#routing)
- [API Layer](#api-layer)
- [State Management](#state-management)
- [SEO](#seo)
- [Accessibility](#accessibility)
- [Responsive Design](#responsive-design)
- [Performance](#performance)
- [Security](#security)
- [Linting & Code Quality](#linting--code-quality)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [Known Limitations](#known-limitations)
- [Disclaimer](#disclaimer)
- [Contact & Support](#contact--support)
- [License](#license)

## Overview

QLexNursing is a digital nursing education and examination preparation platform. Its goal is to help nursing students and exam candidates build real exam readiness through realistic practice questions, clear rationales, and performance insights organized around how people actually study.

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

## Key Features

### Authentication & Account

- Registration with name, email, password, nursing level, and primary exam goal.
- Login / logout (client-side mock session).
- Password reset and email verification screens (UI present; wired to mock flows).
- Profile management (name, contact, institution, study goal, preferences).
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

## User Roles

The application does **not** implement a formal role-based access control system.

It distinguishes exactly two states:

| State | How it is determined | Access |
| --- | --- | --- |
| Guest | No session in `localStorage` (`qlex:session`) | Public routes only (`/`, `/exams`, `/blog`, `/login`, etc.) |
| Authenticated user | A session exists | All `/app/*` routes (dashboard, exams, progress, profile, forums, settings) |

There is **no administrator, moderator, or instructor role** in the codebase. Every authenticated user has the same set of accessible areas. Route protection is enforced client-side by `RequireAuth` (redirects guests to `/login?next=…`).

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

## Technology Stack

| Technology | Purpose | Notes |
| --- | --- | --- |
| Next.js `16.3.1` | Framework (App Router, RSC, routing, build) | Uses Turbopack for dev/build |
| React `19.2.8` | UI library | Server + Client Components |
| TypeScript `^5` | Language | Strict mode (`tsconfig.json`) |
| Tailwind CSS `^4` | Styling | CSS-first config via `@theme` in `globals.css` |
| `@tailwindcss/postcss` | Tailwind v4 PostCSS plugin | `postcss.config.mjs` |
| Custom UI components | Component system | `src/components/ui`, modeled on shadcn/ui conventions (radix-free) |
| ESLint `^9` + `eslint-config-next` | Linting | `eslint.config.mjs` |
| No CSS framework beyond Tailwind | — | No component library CLI installed |

There is **no** database, ORM, state-management library (Redux/Zustand), testing framework, or CI/CD configuration in the repository. shadcn/ui CLI is **not** installed; the equivalents are hand-maintained in `src/components/ui`.

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

- **Fonts**: Inter, loaded from Google Fonts in `app/layout.tsx` (preconnect + stylesheet).
- **Images**: remote images are allowed **only** from `images.unsplash.com` (see `next.config.ts` `remotePatterns`). All hero/card imagery uses `next/image`.

## Project Structure

```
qlexnursing/
├── app/                      # Next.js App Router routes
│   ├── (site)/               # Public marketing & content routes
│   │   ├── page.tsx          # Homepage (hero, sections, testimonials)
│   │   ├── about/  contact/  faq/  blog/  resources/  study-notes/
│   │   ├── exams/            # /exams and /exams/[category]
│   │   ├── legal/[doc]/      # Privacy, Terms, Refund, Accessibility, Disclaimer
│   │   └── onboarding/
│   ├── (auth)/               # Auth screens: login, register, forgot/reset/verify
│   ├── (app)/                # Authenticated app (wrapped by RequireAuth + AppShell)
│   │   ├── dashboard/  exam/[id]/  results/[id]/
│   │   ├── progress/  profile/  settings/  study-plan/
│   │   ├── search/  forums/  study-notes/
│   ├── layout.tsx            # Root layout: providers, fonts, skip link, metadata
│   ├── globals.css           # Tailwind v4 theme tokens + design system
│   ├── sitemap.ts / robots.ts# SEO routes (/sitemap.xml, /robots.txt)
├── components/
│   ├── ui/                   # Design-system primitives (Button, Card, Badge, …)
│   ├── layout/               # AppShell, SiteHeader, Topbar, Sidebar, MobileBottomNav, Footer
│   ├── dashboard/            # DashboardHeader, Stats, Performance, Subject, Activity, Recommendation
│   ├── exams/                # ExamLanding, ExamInterface, QuestionCard, ExamNavigator, ExamTimer
│   ├── results/              # ResultsView
│   ├── auth/                 # AuthProvider, RequireAuth, LoginForm, RegisterForm
│   ├── forums/  home/  study/  settings/  profile/  search/  theme/  onboarding/
├── config/                   # site.ts (siteConfig), nav.ts (navigation)
├── data/mock/                # examCategories, exams, dashboard, content, user
├── lib/                      # api/ (mock services), seo.ts, result.ts, accents.ts, utils.ts
├── types/                    # domain.ts, index.ts (Exam, Question, …)
├── public/                   # static assets
├── .env.example
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── tsconfig.json
└── package.json
```

## Important Files

| File | Why it matters |
| --- | --- |
| `package.json` | Scripts (`dev`, `build`, `start`, `lint`) and dependency versions. |
| `.env.example` | Documents the two public env vars (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_API_URL`). |
| `next.config.ts` | Next.js config; currently only `images.remotePatterns` (Unsplash). |
| `postcss.config.mjs` | Enables Tailwind v4 via `@tailwindcss/postcss`. |
| `tsconfig.json` | Path alias `@/*` → `./src/*`; strict TypeScript. |
| `app/globals.css` | **Design system source**: Tailwind v4 `@theme` tokens, `.glass`/`.glass-dark`, z-index scale, focus styles, reduced-motion. |
| `src/config/site.ts` | Site name, URL, organization, SEO defaults. |
| `src/config/nav.ts` | Sidebar and mobile-bottom navigation definitions. |
| `src/lib/api/client.ts` | Mock API seam — replace `request()` with a real `fetch`. |
| `src/components/theme/ThemeProvider.tsx` | Light/Dark/System theme logic + no-flash script. |
| `src/components/auth/AuthProvider.tsx` | Mock auth context. |
| `eslint.config.mjs` | ESLint flat config (Next.js). |

## Getting Started

### Prerequisites

- **Node.js**: 20.9 or newer (Next.js 16 no longer supports Node 18).
- **npm** (a `package-lock.json` is committed, so use npm).
- Git.
- A modern browser. No database or external service is required to run the app locally — all data is mocked.

## Installation

Clone the repository (replace the placeholder with your fork/clone URL):

```bash
git clone <repository-url>
cd <project-directory>
```

Install dependencies with npm (the lockfile is `package-lock.json`):

```bash
npm install
```

## Environment Variables

The application reads two public environment variables. A template is provided in `.env.example`.

| Variable | Required | Purpose | Example |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical site URL used for metadata, Open Graph, and JSON-LD | `https://qlexnursing.vercel.app` |
| `NEXT_PUBLIC_API_URL` | No | Base URL of the (future) backend API; currently unused by the mock client | `https://api.qlexnursing.com` |

No secrets, API keys, or private URLs are required to run the project locally. The repository does **not** contain real credentials. `.env.example` explicitly states that authentication is handled externally by a host backend and that real secrets must never be committed.

## Running Locally

Copy the example environment file (optional — the app runs with sensible defaults):

```bash
cp .env.example .env.local
```

Start the development server:

```bash
npm run dev
```

The app runs at **http://localhost:3000** (Next.js default). In demo mode, **any** email and password will sign you in.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server (Turbopack). |
| `npm run build` | Production build. Also runs TypeScript type-checking. |
| `npm run start` | Start the production server (after `build`). |
| `npm run lint` | Run ESLint (Next.js config). |

There is **no** `test` or `type-check` script. Type checking happens as part of `npm run build`.

## Authentication

> **Demo only.** Authentication in this repository is a client-side mock. There is no server, no password hashing, and no real credential validation.

- `src/lib/api/auth.ts` exposes `login`, `register`, `updateProfile`, `readSession`, `writeSession`, `clearSession`.
- A session is stored in `localStorage` under the key **`qlex:session`**.
- `login()` accepts any email/password and returns a mock user (`id: "u-1001"`).
- `RequireAuth` (`src/components/auth/RequireAuth.tsx`) protects the `(app)` route group; unauthenticated visitors are redirected to `/login?next=<path>`.
- `updateProfile` merges changes into the stored session only.

To wire a real backend later, replace `request(...)` in `src/lib/api/*` with `fetch(`${process.env.NEXT_PUBLIC_API_URL}/...`)`. The service contracts already match typical REST shapes.

## Dashboard

The dashboard (`/dashboard`) is composed from mock data via `getDashboard()`:

- **DashboardHeader** — greeting, study streak pill, "continue practice" CTA.
- **DashboardStats** — key metrics (questions answered, accuracy, time studied, streak) with trend indicators.
- **StudyRecommendation** — a recommended focus area.
- **PerformanceOverview** — accuracy/trend visualization.
- **SubjectPerformance** — per-subject accuracy breakdown.
- **RecentActivity** — latest practice attempts.

The progress page (`/progress`) reuses these plus a **study streak** calendar and a **learning recap** (strongest/weakest subjects, totals).

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

**Flow**

1. `/exams` lists categories; `/exams/[category]` shows the landing page (`ExamLanding`) with overview, subjects, and FAQs.
2. "Start practice" navigates to `/exam/[id]` which renders `ExamInterface`.
3. `ExamInterface` renders `QuestionCard` for each question, supports answer selection, question **flagging**, a `ExamNavigator` (jump between questions, see answered/flagged status), and an `ExamTimer`.
4. On submit, results are built by `buildResult()` in `src/lib/result.ts` and stored in `localStorage` under `qlex:result:<examId>`.
5. `/results/[id]` renders `ResultsView` with per-question correctness, subject performance, and readiness summary.

Each `Exam` mock record defines `totalQuestions`, `durationMinutes`, and `passingScore`. Questions are served from mock data through `src/lib/api/exams.ts`.

## Study System

- **Study notes** (`/study-notes`): `StudyNotesBrowser` lists notes with subject, category, favorite, and progress.
- **Resources** (`/resources`): curated `StudyResource` items (Notes, Flashcards, Guide, Cheat Sheet, Video) as `ResourceCard`s.
- **Study plan** (`/study-plan`): `StudyPlanBoard` lets users set daily questions, weekly time, target date, and active days (client state; "Plan saved (demo)").
- **Streak & recap**: tracked in `mockStreak` and surfaced on the dashboard and progress pages.

These features read from `src/data/mock` and are currently presentation/demo only — changes are not persisted to a server.

## Profile & Settings

- **Profile** (`/profile`, `/profile/edit`): view and edit name, contact, institution, study goal, and avatar; `ProfileEditForm` updates the session via `updateProfile`.
- **Settings** (`/settings`): `SettingsPanel` manages theme preference (light/dark/system), notification and study preferences. Changes are demo-local.

## Blog & Content

- **Blog** (`/blog`): grid of `BlogCard`s with category badge, author, date, reading time.
- **Article** (`/blog/[slug]`): cover image, metadata, JSON-LD `BlogPosting`, and related posts.
- **Resources**, **Study notes**, **FAQs** (`/faq`), and **Testimonials** are additional content surfaces, all backed by `src/data/mock/content.ts`.
- Blog posts include `category`, `author`, `publishedAt`, `readingMinutes`, and `content` (array of paragraphs/blocks).

## Forums & Community

- **Forums** (`/forums`): `ForumsList` of topics with category, replies, views, likes, pinned/solved badges, and `Avatar`s.
- **Topic** (`/forums/[slug]`): original post, mock replies, and `ReplyBox`.
- **New topic** (`/forums/new`): `NewTopicForm` composer (demo posting — "Posted (demo)").
- Forums require authentication (under the `(app)` group). Posting is **demo-only** and not persisted to a backend.

## UI/UX & Design System

QLexNursing uses a single, reusable component system rather than ad-hoc styles.

- **Tokens**: `app/globals.css` defines Tailwind v4 `@theme` tokens — including semantic colors (`background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`) plus brand/ink/muted/surface/canvas/subtle/track/line and a centralized z-index scale.
- **Buttons**: a single `Button` (`src/components/ui/Button.tsx`) with variants `primary`, `secondary`, `outline`, `ghost`, `danger`, `link` and sizes `sm`, `md`, `lg`, `icon`. All buttons across the app use this component.
- **Cards**: a single `Card` primitive (`Card` / `CardHeader` / `CardTitle` / `CardDescription` / `CardContent` / `CardFooter`) plus composed variants in `src/components/ui/cards.tsx`: `GlassCard`, `FeatureCard`, `ImageCard`, `BlogCard`, `ResourceCard`, `TestimonialCard`, `PortfolioCard`, `Rating`, and a `StatCard`.
- **Images**: `ImageFrame` enforces aspect ratios (`video` 16:9, `standard` 4:3, `ten` 16:10, `portrait`, `wide` 21:9, `tall` 3:4), `object-cover`, overflow clipping, hover zoom, gradient overlays, error fallback, and priority/sizes for `next/image`.
- **Glassmorphism**: `.glass` (theme-aware) and `.glass-dark` (always-dark, for overlays above imagery) keep text readable.
- **Forms**: shared `input` / `input-icon` classes plus a `Field` wrapper; labels, placeholders, and focus rings are theme-safe.
- **Navigation**: `SiteHeader` (public), `Topbar` + `Sidebar` (app), `MobileBottomNav`, and a focus-trapped mobile drawer.
- **Accessibility primitives**: `Avatar`, `Badge`, `Breadcrumb`, `Carousel`, `Dropdown`, `Modal`, `ProgressBar`, `Skeleton`/`Skeletons`, `SectionHeading`, `Accordion`, `ThemeToggle`, `NotificationBell`, `PageHeader`, `LineChart`, `DonutChart`.

Focus states use a global `:focus-visible` outline plus `ring` utilities on interactive components. Reduced-motion is respected globally (`prefers-reduced-motion` disables animations/transitions).

## Theme System

Theming is implemented without a CSS framework plugin:

- `ThemeProvider` (`src/components/theme/ThemeProvider.tsx`) manages `light` / `dark` / `system`.
- The resolved theme toggles a `.dark` class on `<html>`; CSS variables in `globals.css` flip between light and dark palettes.
- Preference is persisted in `localStorage` under `qlex:theme`.
- `ThemeScript` is injected in `<head>` and applies the class before paint to avoid a flash of incorrect theme (FOUC).
- `system` follows `prefers-color-scheme` and listens for OS changes.
- `ThemeToggle` switches the active theme.

## Component Architecture

Components follow a clear layering:

```
components/ui/        → primitives (Button, Card, Badge, Modal, …)
components/layout/    → shell (header, sidebar, footer, nav)
components/<domain>/  → feature components (dashboard, exams, forums, …)
app/                  → routes compose the above
```

Philosophy: **reuse primitives and compose feature-specific components** rather than duplicating UI logic. For example, `BlogCard`, `ResourceCard`, and `ImageCard` all build on `Card` + `ImageFrame` + `Badge`. There is no duplicate button or card implementation.

## Routing

Routes are organized into App Router groups:

| Route | Access | Purpose |
| --- | --- | --- |
| `/` | Public | Homepage (hero, sections, testimonials) |
| `/about`, `/contact`, `/faq` | Public | Marketing & help |
| `/blog`, `/blog/[slug]` | Public | Blog |
| `/exams`, `/exams/[category]` | Public | Exam library & category pages |
| `/resources`, `/study-notes` | Public | Learning resources |
| `/legal/[doc]` | Public | Legal pages (privacy, terms, refund, accessibility, disclaimer) |
| `/onboarding` | Public | Onboarding wizard |
| `/login`, `/register`, `/forgot-password`, `/reset-password`, `/verify-email` | Public | Auth screens |
| `/dashboard` | Authenticated | User dashboard |
| `/exam/[id]` | Authenticated | Practice exam interface |
| `/results/[id]` | Authenticated | Exam results |
| `/progress` | Authenticated | Progress & performance |
| `/profile`, `/profile/edit` | Authenticated | Profile |
| `/settings` | Authenticated | Settings |
| `/study-plan` | Authenticated | Study plan builder |
| `/search` | Authenticated | Search experience |
| `/forums`, `/forums/[slug]`, `/forums/new` | Authenticated | Community |

`(app)` routes are wrapped by `RequireAuth` → `AppShell`. Public groups have no auth guard.

## API Layer

There is **no HTTP API** in the repository. Instead, typed service modules in `src/lib/api` return mock data through a simulated client.

| Module | Exports | Source |
| --- | --- | --- |
| `client.ts` | `request(data, delayMs)` | Simulates latency; clone of data |
| `auth.ts` | `login`, `register`, `updateProfile`, `readSession`, `writeSession`, `clearSession` | `localStorage` |
| `exams.ts` | `getExams`, `getExam(idOrSlug)` | `data/mock/exams` |
| `dashboard.ts` | `getDashboard` | `data/mock/dashboard` |
| `result.ts` | `buildResult`, `RESULT_STORAGE_KEY` | `localStorage` |

Example usage (actual project syntax):

```ts
import { getExams } from "@/lib/api/exams";

const exams = await getExams(); // Promise<Exam[]>
```

To connect a real backend, replace the body of `request()` with a `fetch` to `process.env.NEXT_PUBLIC_API_URL`. The service function signatures already represent the intended contract.

## State Management

- **React Context** for cross-cutting state: `ThemeProvider` (theme) and `AuthProvider` (user/session).
- **Local component state** (`useState`, `useMemo`, `useReducer` where needed) for interactive UI (exam submissions, study plan, forms).
- No external state library is used.

## SEO

SEO is implemented with the Next.js Metadata API and lives in `src/lib/seo.ts` + per-page `metadata` exports:

- Title template: `%s | QLexNursing` (root `layout.tsx`).
- `description`, `keywords`, canonical `alternates`.
- **Open Graph** and **Twitter** (`summary_large_image`) tags.
- **Structured data (JSON-LD)**: `WebSite`, `Organization`, `Course`, `BreadcrumbList`, `FAQPage`, `BlogPosting`.
- **Sitemap** and **robots** are exposed as routes: `/sitemap.xml` and `/robots.txt`.
- `metadataBase` is set from `siteConfig.url` (`NEXT_PUBLIC_SITE_URL`).

## Accessibility

The following are implemented in the codebase:

- Semantic HTML and landmark elements; skip-to-content link in the root layout.
- Visible `:focus-visible` outlines and `ring` focus states on interactive components.
- ARIA roles/labels on `Carousel`, `Modal` (`role="dialog"`, `aria-modal`), and `Dropdown` (`aria-haspopup`, `aria-expanded`).
- Color contrast is enforced through semantic tokens; glass surfaces use `.glass-dark` to keep text readable over imagery.
- `prefers-reduced-motion` disables animations and transitions globally.
- Accessible form labels and `next/image` `alt` text.

The project is **not** claimed to be WCAG-certified; a full accessibility audit is recommended before production launch.

## Responsive Design

The UI is built mobile-first with Tailwind breakpoints (`sm`, `md`, `lg`, `xl`, `2xl`) and a `max-w-7xl` container. Verified behaviors:

- **Mobile (<768px)**: bottom navigation (`MobileBottomNav`), slide-in drawer with focus trap, stacked cards, full-width forms.
- **Tablet (≥768px)**: two-column grids, expanded navigation.
- **Desktop (≥1024px)**: persistent `Sidebar` (app) / top header (site), multi-column dashboards.
- **Large displays (≥1280px/1536px)**: wider content max-width; hero imagery scales up to ~72–90vh.

A centralized z-index scale (`globals.css`) keeps header → overlay → drawer/dropdown → modal ordering correct so navigation is never covered by page content.

## Performance

- **`next/image`** with `remotePatterns` for optimized, responsive images.
- **Static generation / prerendering** of public and content routes at build time.
- **Server Components** for data-reading pages; **Client Components** only where interactivity is required.
- **Route-based code splitting** via the App Router.
- No CDN or caching layer is configured in the repo (would be a deployment concern).

## Security

> The current authentication and data layer is a client-side mock and is **not** production-secure.

What exists:

- Client-side route protection via `RequireAuth`.
- No secrets are committed; `.env.example` contains only public vars and explicit warnings.

Areas that **must be reviewed before production**:

- Real authentication with server-side session/token validation (the mock accepts any credentials).
- Secure, `HttpOnly` cookies and HTTPS for sessions (currently `localStorage`).
- Server-side input validation, rate limiting, and CSRF protection.
- Password hashing (no passwords are stored or validated today).
- Authorization/roles (only guest vs authenticated exists).

## Linting & Code Quality

- **ESLint** is configured via `eslint.config.mjs` using `eslint-config-next` (`npm run lint`).
- **TypeScript** strict mode is enabled; type errors fail the production build (`npm run build`).
- No Prettier configuration, Husky, or commit hooks were found in the repository.

## Testing

**No automated tests are present** in the repository (no Vitest, Jest, Playwright, or Testing Library configuration). Testing is a recommended addition (see [Roadmap](#roadmap)).

## Deployment

QLexNursing is a standard Next.js application.

- No provider-specific configuration is committed (no `vercel.json`, `Dockerfile`, or `netlify.toml`).
- The only build-affecting config is `next.config.ts` (image `remotePatterns`).
- It can be deployed to **Vercel, Netlify, or any Node.js host** that runs Next.js. Do not assume a specific provider merely because the stack is Next.js.

### Production build

```bash
npm run build
npm run start
```

Set `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_API_URL` in the deployment environment if a backend is connected. The production server binds to the Next.js default port (3000) unless overridden.

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

## Roadmap

**Current features** (implemented, as documented above): auth mock, dashboard, six exam categories + exam interface + results, study notes/resources/plan, streak, blogs, forums (demo), FAQs, testimonials, light/dark/system theming, responsive shell.

**Recommended future improvements** (not yet implemented):

- Replace the mock API client with a real backend (`NEXT_PUBLIC_API_URL`) and server-side auth.
- Add a database and persistence for exams, results, forums, and profiles.
- Introduce role-based access (admin/moderator/instructor) if product needs require it.
- Add automated tests (unit/integration/E2E) and CI/CD.
- Add real email verification and password reset delivery.
- WCAG accessibility audit and pass.

## Known Limitations

- **No backend / database.** All data is mock data in `src/data/mock`; the API client simulates latency.
- **Mock authentication.** Any credentials sign in; sessions are in `localStorage` and are not secure.
- **No persistence beyond the browser.** Profile/settings/study-plan/forum posts are demo-only.
- **No automated tests, CI/CD, or coverage.**
- **Single access state** (guest vs authenticated); no admin/moderator roles.
- **Exam content is sample data**, not affiliated with or derived from official exams.
- **No rate limiting, CSRF, or server-side validation** in the current code.
- **No Prettier/commit-hook configuration** present.

## Disclaimer

QLexNursing is an independent study tool and is **not affiliated with, endorsed by, or sponsored by NCSBN, ATI, HESI, or any trademark holder**. Practice exams and questions are original preparation material and are not the official exams. Using QLexNursing does not guarantee a passing score on any official examination. (This wording mirrors the legal disclaimer shipped in `src/app/(site)/legal/[doc]` and the about page.)

## Contact & Support

The in-app contact form (`/contact`) is a demo and does not submit data. For project support, contact the project maintainers.

## License

No explicit open-source license file was detected in the repository. The package is marked `"private": true`. Absent a license, default copyright applies and the code should not be treated as MIT/GPL/Apache licensed. Add a `LICENSE` file to define usage terms.
