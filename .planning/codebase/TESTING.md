# Testing

**Analysis Date:** 2026-04-21

## Testing Approach

There are **no automated tests** in this codebase. No test runner, no test files (`.test.ts`, `.spec.ts`), no `__tests__/` directories, no Storybook stories, and no visual regression tooling exist anywhere in the project.

The primary quality assurance mechanism is the **live component preview system** built into the docs app (`apps/docs`). Every component has a corresponding preview file that renders real, interactive examples in the browser across multiple named variants. This serves as a manual visual testing and demonstration layer, not an automated assertion layer.

## Frameworks & Tools

- **Test runner:** None
- **Assertion library:** None
- **Component testing:** None (no Vitest, Jest, React Testing Library, Playwright, Cypress, or Storybook)
- **Type checking:** TypeScript strict mode (`"strict": true` in `tsconfig.base.json`) — this is the primary static correctness mechanism
- **Linting:** Biome (`biome.json`) — catches unused imports, explicit any, unsorted Tailwind classes, and console usage

## Test File Locations

No test files exist in the project. The closest equivalent is the preview system:

- **Component previews:** `apps/docs/previews/{version}/{component-name}.tsx` — one file per component per version, exporting a `variants: VariantPreview[]` array
- **Preview registry:** `apps/docs/previews/registry.ts` — lazy import map keyed by version and component name
- **Preview type:** `apps/docs/previews/types.ts` — defines the `VariantPreview` interface

Each preview file follows this structure:
```typescript
"use client"

import { ComponentName } from "../../../../packages/ui/src/registry/versions/{version}/components/{component-name}"
import type { VariantPreview } from "../types"

export const variants: VariantPreview[] = [
  {
    name: "Variant Name",
    description: "Optional description shown in the Code tab",
    code: `<ComponentName prop="value">...</ComponentName>`,
    render: () => (
      <div className="flex flex-wrap items-center gap-3">
        <ComponentName prop="value">...</ComponentName>
      </div>
    ),
  },
]
```

Preview files import directly from the package source (relative path traversal), not from the published package. This means they always reflect the current source state.

## Coverage

- **Automated coverage:** None — no coverage tooling configured or enforced
- **TypeScript coverage:** Full strict-mode type checking on `packages/ui/src/**/*.ts` and `packages/ui/src/**/*.tsx` (excluding `src/registry/**/*` per `packages/ui/tsconfig.json`)
- **Visual coverage:** All current components (35+) across all supported versions (0.2.0, 0.3.0, 0.4.0) have preview files registered in `apps/docs/previews/registry.ts`

## CI Integration

No CI configuration exists (no `.github/workflows/` directory, no CI service config files). There is no automated test, lint, or type-check pipeline.

## Adding Tests — Recommended Starting Point

Since no test infrastructure exists, introducing tests would require:

1. **Install a test runner** — Vitest is the natural choice given the ESM/TypeScript/Vite ecosystem already in use for this kind of project
2. **Co-locate test files** next to source files: `packages/ui/src/registry/versions/0.4.0/components/button.test.tsx`
3. **Use React Testing Library** for component behavior tests
4. **Write unit tests for utilities** in `packages/ui/src/lib/` (e.g. `fetcher.ts`, `cache.ts`, `args.ts`) — these have no UI dependencies and are the easiest to test first

The `packages/ui/tsconfig.json` currently excludes `src/registry/**/*` from type-checking — this exclusion would need to be removed or adjusted to enable test compilation for registry components.
