# Digital Crew template

A Next.js application starter with localized routing, a dashboard shell, and shadcn/ui (Radix Nova style).

## Stack

- **Next.js** 16 (App Router) with **React** 19
- **TypeScript**, **ESLint**, **Prettier** (with Tailwind class sorting)
- **Tailwind CSS** 4
- **next-intl** — URL-based locales (`/en`, `/fr`, …)
- **next-themes** — light / dark / system
- **shadcn/ui** — components under `components/ui` (Lucide icons)

## Features in this repo

- **Landing** — public home per locale (`features/landing`)
- **Dashboard** — sidebar navigation, header, command palette (`app/[locale]/(dashboard)`)
- **Settings** — appearance (theme) and related UI (`features/settings`)
- **Support** — support channels page (`features/support`)
- **Locale switcher** and **theme switcher** in the shell
- **Toasts** via Sonner

## Getting started

Install dependencies and run the dev server (uses webpack for `next dev`):

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000); you will be redirected to a locale-prefixed path (default locale: **en**).

### Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Development server       |
| `npm run build`   | Production build         |
| `npm run start`   | Start production server  |
| `npm run lint`    | ESLint                   |
| `npm run format`  | Prettier (TS/TSX)        |
| `npm run typecheck` | TypeScript (no emit)   |

## Internationalization

Locales are defined in `lib/i18n/routing.ts` (currently **en**, **fr**, **es**, **zh** with `localePrefix: "always"`). Copy strings live in `messages/<locale>.json`. Middleware in `middleware.ts` wires `next-intl` to those routes.

## Project layout (high level)

| Path                 | Role                                      |
| -------------------- | ----------------------------------------- |
| `app/`               | Routes, layouts, global CSS              |
| `app/[locale]/`      | Locale-scoped pages and layouts          |
| `features/`          | Feature modules (landing, settings, …)   |
| `components/`        | Shared UI, layout chrome, `components/ui` |
| `context/`           | Theme and other client providers         |
| `lib/`               | Utilities, i18n routing helpers          |
| `messages/`          | next-intl JSON message files             |

## Adding shadcn components

Use the shadcn CLI; components are added under `components/ui` per `components.json`:

```bash
npx shadcn@latest add button
```

Example import:

```tsx
import { Button } from "@/components/ui/button"
```
