# Integrations & External Dependencies

**Analysis Date:** 2026-04-21

## External Services

**GitHub (raw.githubusercontent.com)**
- The CLI fetches component registry JSON at runtime from the GitHub release tag
- URL pattern: `https://raw.githubusercontent.com/BC-Technology/bct-ui/{ref}/packages/ui/src/registry/versions/{version}/registry.json`
- Implemented in `packages/ui/src/registry/registry.ts` via `packages/ui/src/lib/fetcher.ts`
- Responses are cached locally on disk (via `packages/ui/src/lib/cache.ts`)
- No authentication required — public repository

**Google Fonts**
- Loaded in `apps/docs/app/globals.css` via `@import url("https://fonts.googleapis.com/css2?")`
- Fonts: Quicksand (weights 300–700), League Spartan (weights 100–900)
- Only used by the docs app; consumer projects must load fonts themselves

## Key Libraries

**Primitive / Headless UI**
- `@base-ui/react` ^1.1.0 — headless, accessible UI primitives from the MUI team
  - Used for: Button, Dialog, Popover, Select, Accordion, Dropdown, Tooltip, Checkbox, Radio, Slider, Switch, Number Input, Progress, Tabs
  - Import pattern: `import { Dialog as BaseDialog } from "@base-ui/react/dialog"`
  - All primitives are wrapped and re-exported with BCT styling applied via Tailwind classes

**Rich Text**
- `@tiptap/react` ^2.10.0 — rich text editor framework
- `@tiptap/starter-kit` ^2.10.0 — default extensions bundle (bold, italic, lists, headings)
- `@tiptap/pm` ^2.10.0 — ProseMirror peer dependency
- Used exclusively in `packages/ui/src/registry/versions/0.4.0/components/rich-text-input.tsx`

**Date Handling**
- `@rehookify/datepicker` ^6.6.8 — headless date picker state/logic hook
  - Used in `date-picker.tsx` and `date-range-picker.tsx`
- `date-fns` ^3.0.0 — date formatting and parsing utilities
  - Used alongside `@rehookify/datepicker` for `format()` calls

**Icons**
- `lucide-react` 0.460.0 (pinned exact version) — icon library
  - Used pervasively across all components and the docs app
  - Icons imported individually, e.g., `import { X } from "lucide-react"`

**Class Utilities**
- `clsx` ^2.1.1 — conditional class name composition
- `tailwind-merge` ^2.5.0 — de-duplicates/merges Tailwind utility classes

## Design System / Component Libraries

**BCT UI (`@bctechnology/ui`)**
- This repo is itself the design system package published as `@bctechnology/ui`
- Versioned component registry: `packages/ui/src/registry/versions/` (0.2.0, 0.3.0, 0.4.0)
- 38+ components including forms, overlays, navigation, data display, and media
- Design tokens in `packages/ui/src/assets/tokens/index.css` — consumed via `@import "@bctechnology/ui/assets/tokens/index.css"`
- Shadcn/ui-inspired workflow: components are copied into consumer projects via `bct add <component>` rather than imported as a black-box library

**No third-party component libraries** — all components are custom-built on top of `@base-ui/react` primitives.

## CLI Tool (`bct`)

Bundled as a binary in `@bctechnology/ui` (bin: `bct`). Uses these libraries:

- `@clack/prompts` ^0.11.0 — interactive CLI prompt UI (spinners, confirmations, notes, outros)
- `execa` ^9.5.2 — runs shell commands (package install/remove) from Node
- `fs-extra` ^11.2.0 — enhanced file system operations (copy, ensureDir, pathExists)

**Optional integrations installed by `bct init`:**
- `@inlang/paraglide-js` — i18n (optional, user-prompted during init)
- `zustand` — state management for locale store and/or theme store (optional, user-prompted)
- `react-router-dom` — installed automatically when initializing Vite projects

## Dev Tools & Utilities

**Documentation App (`apps/docs`)**
- `shiki` ^3.4.2 — syntax highlighting for code blocks (server-side, generates pre-highlighted HTML)
  - Used in the docs component source viewer
- `next-themes` ^0.4.6 — theme switching (light/dark) for the docs site
  - Wraps the app in `ThemeProvider` in `apps/docs/app/layout.tsx`

**Monorepo Tooling**
- `pnpm` workspaces — no Turborepo or Nx; scripts run with `pnpm -r <script>` (recursive)
- `tsx` ^4.19.2 — TypeScript script runner (used for `apps/docs/scripts/add-component.ts`)

## Environment Configuration

- No `.env` files detected in the repository
- No secrets or API keys required at runtime — all external calls are to public GitHub URLs
- No database, auth provider, or backend service integrations

---

*Integration audit: 2026-04-21*
