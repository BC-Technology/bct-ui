# Domain Pitfalls

**Domain:** Base UI wrapper library (props-driven, single-file, registry-distributed, Tailwind v4 + CSS variables)
**Researched:** 2026-04-21
**Research mode:** Ecosystem (pitfalls dimension)
**Overall confidence:** MEDIUM (external web research was blocked; findings grounded in Base UI training knowledge, the project's own 0.4.0 source, and general React/Tailwind v4 domain expertise. Items requiring external validation are explicitly flagged.)

---

## Research Methodology Note

Context7, WebFetch, and WebSearch were all unavailable during this research pass. Findings below are derived from:

1. Direct reading of existing 0.4.0 component implementations (`accordion.tsx`, `dialog.tsx`, `select.tsx`, `dropdown-menu.tsx`) — HIGH confidence for project-specific patterns
2. The `index.css` token system — HIGH confidence for what's available vs missing
3. Training-data knowledge of Base UI's architecture and Tailwind v4 semantics — MEDIUM confidence, flagged where specifics matter
4. General knowledge of shadcn-style registry distribution — MEDIUM confidence

Where a claim depends on specific Base UI API behaviour that may have shifted since training, the pitfall is marked `[VERIFY]`.

---

## Critical Pitfalls

These mistakes will cause rewrites, silent breakage in consumer projects, or fundamental API regret.

### Pitfall 1: Losing Base UI's Sub-component Flexibility Under the `items`/`options` Array API

**What goes wrong:** The 0.4.0 pattern compresses Base UI's compound sub-components into an array prop (`items: AccordionItemProps[]`, `options: SelectOption[]`, `items: DropdownMenuItem[]`). This works for homogeneous data but breaks the moment a consumer needs: (a) one item with a trailing icon and another without, (b) a disabled section header that isn't itself selectable, (c) a destructive menu item styled differently, (d) a grouped Select with Base UI's `Select.Group` / `Select.GroupLabel`, (e) a badge/keyboard-shortcut slot beside the label.

**Why it happens:** Prematurely picking "flat array of POJOs" as the universal shape. Base UI's compound primitives (e.g., `Menu.SubmenuTrigger`, `Menu.Group`, `Select.Separator`, `NavigationMenu.List` + `Item`) have no equivalent in a flat array. Consumers end up either fork-editing the file (fine — it's a registry library) or wrapping the wrapper, losing the DX benefit.

**Consequences:** The wrapper either (a) grows a sprawling `DropdownMenuItem` discriminated union (`{type: 'separator'}`, `{type: 'group', items: [...]}`, `{type: 'submenu', items: [...]}`) that reinvents the compound API worse, or (b) gets abandoned by consumers with non-trivial use cases.

**Prevention:**
- For each component, decide up front whether the array shape is a *default convenience* or the *only* API. Document that in the component comment.
- Complex components (Menu, NavigationMenu, Combobox, Autocomplete, Menubar, ContextMenu, Toolbar) should expose a `renderItem?: (item, helpers) => ReactNode` escape hatch that returns the correct Base UI sub-component. Helpers should include pre-styled `classNames` so the consumer can opt into overrides without rebuilding visual consistency.
- Accept a discriminated union for item kinds (`{kind: 'item' | 'separator' | 'group' | 'submenu'}`) rather than forcing the consumer to a flat list — but keep the union small and orthogonal.
- Write the Storybook/docs example for the hardest realistic consumer case *first*. If the array API can't express it, the API is wrong.

**Detection signals:**
- Consumer asks "how do I add a separator" / "how do I group" / "how do I nest a submenu"
- Item interface grows past 6 optional fields
- `renderItem`, `renderTrigger`, `renderLabel` props proliferate ad hoc instead of being designed

**Phase:** API Design Phase (before mass component implementation)

---

### Pitfall 2: Composition Loss via Forwarded `...props` Collisions

**What goes wrong:** The existing pattern (`extends Omit<React.ComponentPropsWithoutRef<typeof BaseAccordion.Root>, "children">`) forwards all remaining props to the root. This silently breaks in three ways: (1) the consumer passes `className` expecting it on the *outer* wrapper but Base UI's Root is an invisible context provider with no DOM element (e.g., `Dialog.Root`, `Select.Root`, `Menu.Root` have no rendered element [VERIFY — current Base UI versions typically render Root as a context-only provider]), so the className goes nowhere; (2) the consumer passes `id` expecting it on the trigger but it lands on Root; (3) `ref` forwarding is inconsistent between sub-parts.

**Why it happens:** Spreading `...props` onto `BaseAccordion.Root` is copy-paste convenient but doesn't account for which Base UI primitives are context-only vs DOM-rendering.

**Consequences:** Silent layout bugs, mis-wired test selectors, broken `aria-*` attributes (they land on the wrong element and are invisible to screen readers).

**Prevention:**
- Triage every Base UI primitive's Root before wrapping: context-only vs DOM-rendering. Document this in a table inside the API design doc.
- Choose a convention: "`...props` always goes to the most meaningful DOM element" (usually the trigger or the content container, not Root).
- Explicitly accept `rootProps`, `triggerProps`, `popupProps` for escape-hatch spreading when needed — don't let consumers guess.
- Type the wrapper props by picking specific Root props (`Pick<>`) rather than `Omit<>` over the whole set; this forces an intentional decision for each forwarded prop.

**Detection signals:**
- `className` prop on a wrapper has no visible effect in a test
- `data-testid` on wrapper doesn't appear in the rendered DOM
- Consumers adding `<div className="...">` around your component to get a className target

**Phase:** API Design Phase

---

### Pitfall 3: `classNames` Slot Map Drift Across 36 Components

**What goes wrong:** The 0.4.0 `classNames` prop uses ad-hoc slot names (`root`, `item`, `header`, `trigger`, `panel` for Accordion; `root`, `trigger`, `popup`, `option` for Select; `backdrop`, `popup`, `title`, `description`, `content`, `close` for Dialog). When a consumer styles five different components, they face five different slot vocabularies and must re-learn each one. Worse: component maintenance drifts — a slot named `popup` in one component and `content` in another describes the same concept.

**Why it happens:** Each component is implemented independently with names that felt right at the time. Without a shared vocabulary, drift is inevitable at 36 components.

**Consequences:** Consumer frustration, inconsistent docs, bug reports asking "why isn't `classNames.container` working?". Breaking changes between point releases when slot names get renamed.

**Prevention:**
- Define a canonical slot vocabulary document *before* implementing components. Suggested baseline:
  - `root` — the outer wrapper element
  - `trigger` — the interactive element that opens/activates
  - `popup` — the floating content (popovers, menus, tooltips)
  - `backdrop` — the overlay behind modal popups
  - `list` — list container when the component iterates items
  - `item` — each iterated item
  - `icon` — leading/trailing icon slot
  - `indicator` — check/dot/state indicator
  - `label`, `description`, `helperText`, `errorText` — textual slots
  - `header`, `footer`, `content` — sectioned content
- Write a lint rule (or a simple test) that verifies every `classNames` key in the codebase appears in the canonical vocabulary.
- Resist adding new slot names; prefer combining existing ones. `classNames.itemIcon` is better than a new `classNames.leadingIcon`.

**Detection signals:**
- Two components have semantically identical slots with different names
- `classNames` interface has more than ~8 keys for a single-concept component
- Documentation has to explain slot names component-by-component instead of once globally

**Phase:** API Design Phase (specifically: produce a "Slot Vocabulary" doc as a deliverable before component implementation begins)

---

### Pitfall 4: Breaking the `index.css` Token Contract

**What goes wrong:** A new component needs a colour/spacing/animation value that isn't in `index.css`, and a contributor either (a) hardcodes it (`bg-[#fafafa]`, `duration-[350ms]`), (b) adds an arbitrary value that differs from the existing scale, or (c) adds a new token without updating `index.css`. Because components are distributed as single files that reference CSS variables from the consumer's `index.css`, the component silently breaks in the consumer's project even though it works in the monorepo's docs site (where `index.css` is always present and up to date).

**Why it happens:** The development loop (monorepo's docs site) uses the *current* `index.css`, which drifts ahead of what consumers have installed via `bct init`. New tokens added during 0.5.0 development may never be distributed to existing consumers.

**Consequences:** Consumer installs a new 0.5.0 component; it references `var(--color-accent-new)` which is undefined in their older `index.css`; the component renders with an invalid colour (inherited or default). Looks fine in dev (if they're using the latest `index.css`), broken in production for anyone who `bct init`-ed earlier.

**Prevention:**
- **Freeze the token set at the start of the milestone.** Audit all 36 Base UI components against the current `index.css`; if new tokens are needed, add them *once* at the start and document the `index.css` version bump.
- Make `bct add <component>` warn if the consumer's `index.css` is older than the component's minimum required version. Store the version in a comment header in `index.css` and in the component file.
- Forbid arbitrary Tailwind values (`bg-[#...]`, `text-[12.5px]`) in component source via an ESLint rule. Arbitrary values defeat the token contract.
- Every component must pass a "token-only" grep check in CI: no hex codes, no rgba literals, no hardcoded px/rem values outside of structural layout (borders, radii reference tokens; sizes come from Tailwind's spacing scale).
- Document a "token addition" process: any new token requires updating `index.css`, the docs page, the CHANGELOG, and bumping the minimum `index.css` version the registry declares as required.

**Detection signals:**
- Component source contains `#` outside of comments or URL fragments
- Component source contains `bg-[` / `text-[` / `p-[` arbitrary-value brackets
- `registry.json` doesn't record a minimum `index.css` version
- New token added to `index.css` but no tracker entry for "what needs this"

**Phase:** Preparation Phase (token audit) + every component implementation phase (enforcement)

---

### Pitfall 5: Animation Regression via Base UI's `data-open` / `data-closed` Lifecycle

**What goes wrong:** Base UI uses `data-open` and `data-closed` attributes for presence animations and waits for all sibling animations to finish before unmounting [VERIFY — confirmed by the extensive comment in `index.css` around `.bct-dialog-*` rules]. A naive wrapper applies `data-open:animate-fade-in` without a matching `data-closed:animate-fade-out forwards`. Result: the element snaps out when un-mounting, or the backdrop disappears before the panel finishes sliding. The 0.4.0 codebase already hit this and solved it with the `bct-dialog-*` CSS classes — but that knowledge must be re-applied per component.

**Why it happens:** Animations are often an afterthought ("we'll add it later"). The `animation-fill-mode: forwards` requirement is non-obvious and only shows up as a visual bug (flash/snap) that's easy to miss without careful review. Tailwind's `animate-*` utility doesn't emit `animation-fill-mode: forwards` by default.

**Consequences:** Flash-of-content on close, double-flash when paired elements (backdrop + popup) have different durations, elements that visibly snap back to their open state before unmounting.

**Prevention:**
- Standardise a per-component-family animation convention **and** enforce `animation-fill-mode: forwards` on every close animation.
- Either (a) declare reusable named classes in `index.css` per primitive family (the `.bct-dialog-*` approach — works, but grows the CSS file), or (b) author a `@utility` in `index.css` that bakes in `forwards` (`@utility animate-out-fill { animation-fill-mode: forwards; }`) and apply it alongside every `data-closed:animate-*`.
- For every component with open/close state (Dialog, AlertDialog, Drawer, Popover, Tooltip, Menu, Select, Combobox, Autocomplete, ContextMenu, PreviewCard, NavigationMenu submenus, Toast), add an explicit checklist item: "close animation uses `forwards` fill mode, matches duration of sibling animations."
- Write a visual regression test (Playwright or Storybook interaction test) for the close animation of each such component.

**Detection signals:**
- Close animation uses `animate-fade-out` without a paired `forwards`
- Two elements animate simultaneously with different durations and no synchronization
- Visual "flash" or "snap" during close, usually only catchable at slowed-down playback
- Bug reports about "flicker" or "double flash" on dismiss

**Phase:** Preparation Phase (animation convention) + Complex Components Phase (Dialog, Drawer, Menu families)

---

### Pitfall 6: Required Portals Breaking Inside Consumer Layouts

**What goes wrong:** Base UI's floating primitives (Dialog, Popover, Tooltip, Menu, Select, Combobox, Autocomplete, NavigationMenu, ContextMenu, PreviewCard, Drawer, Toast) use `Portal` to escape stacking context. The wrapper hides the Portal choice from the consumer. But Portals have known failure modes: (a) inside a `transform: *`, `filter: *`, or `contain: layout|paint` ancestor, `position: fixed` inside a portal can be clipped to the transformed ancestor [VERIFY — CSS spec behaviour]; (b) consumers using CSS `@scope` or Shadow DOM can't reach the portal's styles; (c) SSR hydration mismatches if the Portal mounts on a target that doesn't exist server-side.

**Why it happens:** The wrapper hides Portal configuration in pursuit of API simplicity. Consumers don't know there's a portal; when layout breaks they can't diagnose it.

**Consequences:** Tooltips rendered in the wrong stacking order, dialogs clipped by an ancestor with `transform: translateZ(0)`, z-index wars where the consumer's CSS can't reach the portalled element.

**Prevention:**
- For every floating component, expose a `container?: HTMLElement | null` prop (pass-through to Base UI's Portal container) so consumers can mount into their own root.
- Document in the component JSDoc: "This component portals to `document.body`. If inside a transformed/filtered ancestor, provide `container`."
- Ensure z-index tokens (`--z-popover: 50`, `--z-tooltip: 60`, `--z-dialog-backdrop: 100`, `--z-dialog-popup: 110`) are used *from the portal root* — do not rely on "portal automatically escapes stacking." The `index.css` already has these; use them consistently.
- Add a "portal-aware" row in the per-component implementation checklist.
- Provide SSR notes: components should render a stable structure with `null` before hydration to avoid hydration warnings.

**Detection signals:**
- Tooltip z-index looks right in isolation but is occluded inside a real page
- Popover appears clipped at the ancestor's edge
- Hydration warning in the console mentioning the floating component
- Consumer asks "why is my dialog appearing behind my header?"

**Phase:** Floating Components Phase

---

### Pitfall 7: Ref Forwarding Loss on the "Real" Element

**What goes wrong:** Wrappers that don't forward refs (or forward to the wrong sub-part) break integrations with form libraries (react-hook-form's `register()` needs a ref to the input), positioning libraries, imperative focus management, and analytics (tooltip-on-hover helpers that need the underlying DOM node). The 0.4.0 components [confirmed from reading] do not use `forwardRef`/`ref` forwarding — they're function components taking props. At React 19 this is less painful because refs are now regular props, but *where the ref lands* matters.

**Why it happens:** Convenience. Adding ref plumbing for sub-parts (trigger vs input vs root) is fiddly.

**Consequences:** `react-hook-form` `register` attaches the ref to the wrong element; `inputRef.current.focus()` focuses nothing; tests using `getByRole` + `focus()` fail.

**Prevention:**
- Decide per component where the "canonical" ref should land (usually: trigger for interactive disclosure, input for form controls, root for layout-ish things like Separator/Avatar/Progress).
- Document this in the component JSDoc: `@param ref — forwarded to the <input> element`.
- For form components (Field, Input, Checkbox, Radio, RadioGroup, Switch, NumberField, OTPField, Slider, TextArea, Combobox, Autocomplete, Select), the ref MUST go to the native form element so react-hook-form works without friction. This is non-negotiable.
- Expose `triggerRef`, `popupRef`, `contentRef` as separate props for advanced cases, but pick one element for the default `ref`.

**Detection signals:**
- `react-hook-form` example in docs requires `Controller` for a simple input — should work with `register` directly
- Consumer needs to add `<div ref={...}>` around your component to get a ref
- No `@param ref` in the component's JSDoc

**Phase:** API Design Phase + Form Components Phase

---

### Pitfall 8: Controlled/Uncontrolled Prop Confusion

**What goes wrong:** Base UI primitives typically support both controlled (`value` + `onValueChange`) and uncontrolled (`defaultValue`) modes [VERIFY — current Base UI convention]. If the wrapper accepts both but coerces `undefined` incorrectly, or narrows the type to only one mode, consumers hit "component is changing from uncontrolled to controlled" React warnings, or silently lose state.

**Why it happens:** Picking the wrong TypeScript type (`value: string` without a union for `undefined`) forces consumers into one mode. Using Dialog's `open` / `onOpenChange` as an example: if the wrapper always passes `open={open}` even when `open` is undefined, Base UI will think it's controlled.

**Consequences:** React warns about uncontrolled-to-controlled transitions; Dialog appears "stuck" when consumer passes `defaultOpen` because the wrapper overrode it with `open={undefined}`.

**Prevention:**
- For every stateful component, spread the root props (`...rootProps`) rather than explicitly passing each stateful prop. This preserves both modes cleanly.
- If the wrapper renames a prop (e.g., `dismissible` → `disablePointerDismissal` as Dialog does), apply the transform only when the friendly prop is defined, and never pass both.
- Write tests for both modes per component.

**Detection signals:**
- React console warning: "A component is changing a controlled input to be uncontrolled"
- `defaultOpen`/`defaultValue` prop silently ignored
- Component type forces `value: string` without `| undefined`

**Phase:** API Design Phase + every stateful component implementation

---

## Moderate Pitfalls

### Pitfall 9: Lucide Bundle Bloat via Barrel Imports

**What goes wrong:** `import { X, ChevronDown, Check, Search, ... } from "lucide-react"` in many component files appears fine, but if a consumer's bundler does not tree-shake effectively (older Vite + specific CJS interop, Next.js Pages Router without `modularizeImports`, Webpack 4 legacy setups) they pull the entire Lucide icon pack per component.

**Why it happens:** `lucide-react` is designed to tree-shake, but the default barrel can still cause issues in misconfigured bundlers [VERIFY — behaviour varies by bundler version].

**Prevention:**
- Document `modularizeImports` config for Next.js Pages Router users in the installation docs.
- Prefer `import { Icon } from "lucide-react"` (named imports already used in 0.4.0 — good) over `import * as Icons`.
- Keep only *one* icon import per component file where possible; redundant icons balloon the per-component footprint.
- In per-component docs, list the icons used so consumers can predict bundle impact.

**Phase:** Documentation Phase

---

### Pitfall 10: Tailwind v4 JIT Scan Missing Dynamic Class Names

**What goes wrong:** Tailwind v4's scanner extracts class names via a regex that looks for strings [VERIFY — v4 behaviour]. Dynamic class concatenation like `` `bg-${color}-500` `` is invisible to the scanner, so the class is never generated. Worse: values *inside* arbitrary-value brackets stop at commas (`max-w-[calc(100vw-2rem,...)]` may fail — the 0.4.0 `dialog.tsx` already has an explicit comment about this). Any dynamic or composed class name must be written as a literal elsewhere in the codebase.

**Why it happens:** Contributors refactor conditional styles into `` `size-${size}` `` thinking it's cleaner, not realising the generator doesn't run the JS.

**Prevention:**
- No template-literal class names. Use `clsx`/`twMerge` with full literal strings for every branch.
- For size/variant maps, write a record type with complete literal classes (the 0.4.0 `MODAL_WIDTH` / `PANEL_WIDTH` pattern) — HIGH confidence, this is already the project's convention.
- Add an ESLint rule (`eslint-plugin-tailwindcss` classnames-in-template-strings or a custom rule) to forbid dynamic class construction.
- When using `calc()` or other commas inside `[...]` arbitrary values, split into separate utilities (as `PANEL_WIDTH` already does: `w-[380px] max-w-[calc(100vw-2rem)]`).

**Phase:** Preparation Phase (lint rules) + every component implementation

---

### Pitfall 11: `@theme` Self-Referential Token Declarations

**What goes wrong:** The project's `index.css` declares tokens self-referentially: `--color-primary: var(--color-primary);` inside `@theme`, then defines the *value* of `--color-primary` in `@layer base [data-theme="light"]`. This is an intentional pattern [confirmed from reading index.css] that makes the token a Tailwind-recognised utility (`bg-primary`) while allowing theme overrides. The pitfall: a contributor adds a new token to `@theme` but forgets to define it in `[data-theme="light"]` and `[data-theme="dark"]`. The utility class works in dev (resolves to `var(--color-new)`), but the variable is undefined so the element renders transparent/default.

**Why it happens:** The two-file/two-block pattern requires keeping three things in sync. Contributors see the `@theme` line and stop.

**Prevention:**
- Keep a single source of truth document (a `tokens.md` or the `STACK.md` research file) listing every token and its light/dark values in one table.
- Add a CI check that parses `index.css` and asserts every token in `@theme` has a value in both `[data-theme="light"]` and `.dark`/`[data-theme="dark"]`.
- When adding a new token, follow the convention exactly: declare in `@theme`, define in both themes, never skip the dark-mode definition.

**Phase:** Preparation Phase (token audit + CI check)

---

### Pitfall 12: Base UI Version Lock Drift

**What goes wrong:** 0.4.0 pinned `@base-ui/react` at a specific version; 0.5.0 bumps to a newer one. Consumers who `bct add <component>` get a file that imports from `@base-ui/react/accordion`; their lockfile may still hold the old version, whose API differs subtly (e.g., prop rename, sub-component rename, removed deprecated export). The component breaks on install — in the consumer's project, not the monorepo.

**Why it happens:** Registry distribution decouples the component source from the dependency resolution. The registry `registry.json` lists deps but typically with loose ranges.

**Prevention:**
- Every component file declares the minimum Base UI version in a comment header.
- `registry.json` pins `@base-ui/react` to a tight range (e.g., `^X.Y.0` where Y is the tested minor).
- `bct add` should check the consumer's installed `@base-ui/react` version against the component's requirement and warn/refuse on mismatch.
- Keep a compatibility matrix in the docs: "bct-ui 0.5.x requires @base-ui/react >= X.Y.Z."
- When Base UI ships a breaking change, cut a new minor of bct-ui rather than silently updating all registry files.

**Phase:** Preparation Phase (version matrix) + Release Phase (CLI check)

---

### Pitfall 13: `twMerge` Precedence Surprises with `classNames` Slot Overrides

**What goes wrong:** The pattern `twMerge("default-classes", classNames?.slot)` gives the consumer's class last-wins priority for the same Tailwind property — great. But `twMerge` only understands Tailwind utilities it knows about; it cannot resolve arbitrary CSS classes (including the project's own `.bct-dialog-*` named classes) against Tailwind utilities. A consumer passing `classNames={{ popup: "my-custom-popup" }}` where `.my-custom-popup` sets `background`, won't win against the component's `bg-surface-1` — `twMerge` leaves both classes on the element and the later one wins by CSS source order, which depends on how Tailwind emitted the utility [VERIFY — exact Tailwind v4 source-order rules].

**Why it happens:** Consumers assume `classNames` overrides always win. `twMerge` only resolves conflicts for classes it recognizes.

**Prevention:**
- Document that `classNames` slot values should use *Tailwind utilities* for predictable override behaviour, not custom class names with external CSS.
- For consumers who must use custom CSS, guide them to pass `style` props or author their own Tailwind utilities via `@utility` in their own CSS.
- Alternative: use a `cva`/`tv`-style variant system for variants so that conflicts are resolved at the variant level, not at merge time. (Caveat: this adds a dep; tailwind-variants is already in the ecosystem.)

**Phase:** Documentation Phase

---

### Pitfall 14: Dark Mode Assumption Failure for Consumer-Overridden Tokens

**What goes wrong:** A consumer brings their own `index.css` (they `bct init`-ed, then customized tokens). They override `--color-primary` in light mode but forget dark mode. One bct-ui component has a hover state that looks awful in dark mode. The component is blamed, but the root cause is the consumer's incomplete theme.

**Why it happens:** The project's surface of promise is "components follow your tokens." If those tokens are broken, components are broken — but users file bugs against bct-ui.

**Prevention:**
- Ship a `bct doctor` or `bct validate-tokens` CLI command that parses the consumer's `index.css` and verifies every required token is defined in both themes.
- In the docs, show the "required tokens" list prominently on the theming page.
- When `bct add <component>` runs, the CLI emits the list of tokens this specific component depends on so consumers know what to verify.

**Phase:** CLI Phase / Release Phase

---

### Pitfall 15: Over-Opinionated Defaults That Leak Domain Semantics

**What goes wrong:** 0.4.0's Select wrapper bakes in `label`, `error`, `helperText`, and wraps the control in a `<div>` with `flex flex-col gap-1`. This is a *form field* wrapping, not a *select* wrapping. Consumers who want a Select as part of a toolbar, or inside a table cell, or composed inside a custom field layout, fight the wrapper. The same pattern risks repeating across Input, TextArea, Checkbox, Radio, NumberField, OTP Field, Slider, Switch.

**Why it happens:** The most common consumer flow is "form with labelled fields," so defaults bake that in. But a neutral primitive-wrapper library should keep form-field concerns separate from control concerns.

**Prevention:**
- Separate the *control* (Select, Input, Checkbox) from the *field wrapper* (Field). Base UI provides `Field.Root`, `Field.Label`, `Field.Description`, `Field.Error` for exactly this purpose — don't bake Field semantics into every control.
- Export the control as *just* the control. If form-field convenience is wanted, provide a separate `FormField` composition component or a `field: {label, error, ...}` prop that is opt-in (present → renders the wrapper; absent → renders just the control).
- Audit 0.4.0's assumptions component-by-component: which wrappers are form-field-shaped vs control-shaped? Document the decision.

**Phase:** API Design Phase

---

### Pitfall 16: Icon Prop Ambiguity (ReactNode vs Component vs Slot)

**What goes wrong:** The PROJECT.md says "components using icons use Lucide defaults with a prop to override (`triggerIcon`, `closeIcon`, etc.)." Three different shapes are possible and each has trade-offs:

- `triggerIcon: React.ReactNode` (pass a rendered element) — most flexible, but the consumer must remember to pass the right size: `<Check className="size-4" />`
- `triggerIcon: React.ComponentType<LucideProps>` (pass the component) — the wrapper can apply consistent size, but restricts to Lucide-compatible APIs
- `classNames.triggerIcon: string` (override styling of the default) — can't change the glyph, only style it

Mixing these across 36 components creates a scavenger hunt.

**Prevention:**
- Pick one convention. Recommendation: `triggerIcon?: React.ReactNode` for full flexibility, paired with explicit documentation that the expected size is `size-4`/`size-5` depending on context, and `classNames?.icon` for restyling the default when no custom icon is passed.
- If icon sizing matters, document a `<Icon size={16} />` convention in the icon-override docs.
- All 36 components use the same prop shape — no exceptions.

**Phase:** API Design Phase

---

## Minor Pitfalls

### Pitfall 17: `data-*` Attribute Styling Quirks

**What goes wrong:** Base UI exposes state via `data-open`, `data-closed`, `data-active`, `data-highlighted`, `data-disabled`, `data-selected`, `data-focused`, etc. [VERIFY — exact attribute names]. The 0.4.0 components use `data-open:rotate-180`, `data-[selected]:font-medium` in mixed syntaxes. Tailwind v4 prefers the shorter `data-open:` form when the attribute has no value. Using `data-[open]:` also works but adds noise.

**Prevention:** Standardise on the short form (`data-open:`) for boolean data attributes and `data-[state=value]:` only for attributes that carry a value. Audit existing components for consistency.

**Phase:** Preparation Phase (style guide) + migration

---

### Pitfall 18: `disabled:` Styling Not Cascading to Sub-parts

**What goes wrong:** The consumer passes `disabled` to the wrapper, expecting the whole component (trigger + popup + items) to appear disabled. Base UI's disabled state typically lives on the Root and cascades via `data-disabled` to children — but only children that *read* that attribute. A trigger styled with `disabled:opacity-50` styles only the trigger; the popup/icon remain full opacity.

**Prevention:**
- For each component, decide what "disabled" means visually and style every sub-part that should reflect it.
- Prefer `data-disabled:` over native `disabled:` when styling sub-parts that aren't form controls themselves (e.g., a div popup).

**Phase:** per-component implementation

---

### Pitfall 19: SSR Hydration With Id-Generating Base UI Primitives

**What goes wrong:** Base UI primitives generate `id` attributes for `aria-labelledby` / `aria-controls` relationships. If the generation isn't SSR-stable [VERIFY — Base UI uses `useId` which is SSR-safe in React 18+, but the app must be on React 18+], hydration warnings appear. Consumers on older React or with mixed SSR/CSR pipelines can hit this.

**Prevention:**
- State in README that bct-ui 0.5.0 requires React 18+ (ideally 19).
- Don't manually generate ids in wrappers — let Base UI do it.
- Test at least one component under Next.js App Router SSR during development.

**Phase:** Documentation Phase

---

### Pitfall 20: Docs Site Preview Wrapper Drift

**What goes wrong:** The docs site has preview wrappers per component. When the component API changes during 0.5.0 development, the preview wrapper lags or is forgotten. Consumers visit docs.bct-ui.com and see a deprecated API.

**Prevention:**
- Make updating the preview wrapper part of the component's Definition-of-Done checklist.
- Lint: the docs site build fails if a component's named exports don't match the preview wrapper's imports.
- Each component PR updates: component file, registry entry, preview wrapper, docs page, token audit (if applicable).

**Phase:** Every component implementation phase

---

### Pitfall 21: Naming Collisions With 0.4.0 When Consumers Upgrade

**What goes wrong:** A consumer has `components/ui/accordion.tsx` from 0.4.0. They `bct add accordion --version 0.5.0`. The CLI either overwrites silently (losing their customizations) or refuses (blocking the upgrade). Either way, consumer friction.

**Prevention:**
- `bct add` must prompt on overwrite, with a `--force` escape hatch.
- Provide `bct diff <component> --from 0.4.0 --to 0.5.0` to show what changed API-wise.
- Document migration guide: "When upgrading 0.4.0 → 0.5.0, these props renamed/removed; here's a codemod."
- For 0.5.0, keep 0.4.0 fully available (it already lives in `versions/0.4.0/`); consumers can adopt 0.5.0 component-by-component.

**Phase:** Release Phase

---

### Pitfall 22: Re-Renders from Object/Array Identity in Item Props

**What goes wrong:** `<Accordion items={[{value: 'a', ...}]} />` creates a new array literal every render. Internally the wrapper maps it; React re-reconciles everything. For small components this is fine. For a Menu with 50 items and a hot parent render, this becomes a perf cliff.

**Prevention:**
- Document: "For dynamic item lists, memoize the `items` array."
- Avoid deriving expensive data inside `items.map(...)` in the wrapper; keep the mapping as cheap as possible.
- Use `key={item.value}` consistently (already done in 0.4.0).

**Phase:** Documentation Phase

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Preparation / Foundation | #3 Slot drift, #4 Token contract, #10 Tailwind scan, #11 Theme token sync | Deliverables: slot vocabulary doc, token audit, ESLint rules, CI checks |
| API Design (cross-cutting) | #1 Array API limits, #2 Props forwarding, #7 Ref location, #8 Controlled/uncontrolled, #15 Field vs control, #16 Icon prop shape | Produce an API Conventions doc before implementing any component |
| Simple Components (Button, Separator, Avatar, Progress, Meter, Badge-less Skeleton) | #5 Animation fill-mode (low relevance), #7 Ref forwarding | Get these right early; they set patterns for the rest |
| Form Components (Field, Input, Checkbox, Radio, Switch, NumberField, OTPField, Slider, TextArea) | #7 Ref must reach the native element, #8 Controlled mode, #15 Field vs control separation | react-hook-form integration test per component |
| Floating Components (Dialog, AlertDialog, Drawer, Popover, Tooltip, Menu, ContextMenu, Menubar, Select, Combobox, Autocomplete, NavigationMenu, PreviewCard, Toast) | #5 Animation lifecycle, #6 Portals, #12 Base UI version | `.bct-*` CSS class convention, `container` prop, version matrix |
| Collection Components (Menu, NavigationMenu, Combobox, Autocomplete, Toolbar, Menubar, CheckboxGroup, ToggleGroup, RadioGroup, Tabs) | #1 Array API limits, #22 Re-renders | Provide `renderItem` escape hatch; document memoization |
| Registry & CLI | #4 Token contract, #12 Version drift, #14 Consumer theme validation, #21 Upgrade naming | `bct doctor`, minimum-version checks, migration guide |
| Documentation | #3 Slot vocabulary, #9 Bundle docs, #13 twMerge rules, #19 SSR notes, #20 preview drift | Preview-wrapper-drift lint; per-component icon & token lists |

---

## Summary for Roadmap

**Blocking pitfalls to resolve in a Preparation/API Design phase before mass implementation:**
- #3 Canonical slot vocabulary
- #4 Token contract freeze + enforcement rules
- #5 Animation convention (`.bct-*` classes or `@utility` with `forwards`)
- #10 Dynamic-class-name lint rule
- #11 Token completeness CI check
- Cross-cutting API convention doc covering #1 (array API + `renderItem`), #2 (props forwarding), #7 (ref location), #8 (controlled/uncontrolled), #15 (field vs control), #16 (icon shape)

**Implementation-phase pitfalls** (apply per component):
- #5 animation lifecycle (floating components)
- #6 portal `container` prop (floating components)
- #7 ref to native element (form components)
- #18 disabled cascading
- #20 preview wrapper updated in same PR

**Release-phase pitfalls:**
- #12 Base UI version pin
- #14 `bct doctor` for consumer theme
- #21 upgrade path from 0.4.0

**Highest-confidence recommendations:** #4, #10, #11 (grounded in the project's own `index.css` and 0.4.0 source). #5 (grounded in the existing `bct-dialog-*` comment).

**Medium-confidence, flagged `[VERIFY]`:** Exact Base UI API surfaces (Root-as-context, `data-*` attribute names, Portal API). These should be confirmed against current Base UI docs at the start of the API Design phase.

---

## Sources

- `/Users/jonasblendstrup/Documents/work/projects/bct ui/code/bct-ui/.planning/PROJECT.md` — project scope and constraints (HIGH)
- `/Users/jonasblendstrup/Documents/work/projects/bct ui/code/bct-ui/packages/ui/src/assets/tokens/index.css` — token system, animation conventions, theme layering (HIGH)
- `/Users/jonasblendstrup/Documents/work/projects/bct ui/code/bct-ui/packages/ui/src/registry/versions/0.4.0/components/accordion.tsx` — existing wrapper pattern (HIGH)
- `/Users/jonasblendstrup/Documents/work/projects/bct ui/code/bct-ui/packages/ui/src/registry/versions/0.4.0/components/dialog.tsx` — animation lifecycle, panel/modal mode switching (HIGH)
- `/Users/jonasblendstrup/Documents/work/projects/bct ui/code/bct-ui/packages/ui/src/registry/versions/0.4.0/components/select.tsx` — field-wrapper pattern in control (HIGH)
- `/Users/jonasblendstrup/Documents/work/projects/bct ui/code/bct-ui/packages/ui/src/registry/versions/0.4.0/components/dropdown-menu.tsx` — array-API + compound flattening pattern (HIGH)
- Base UI framework architectural knowledge — training data (MEDIUM; `[VERIFY]` markers on specific API claims)
- Tailwind v4 `@theme`, `@utility`, JIT scanning behaviour — training data (MEDIUM)
- shadcn/ui-style registry distribution — general ecosystem knowledge (MEDIUM)

External validation (Base UI current API, Tailwind v4 current release, `lucide-react` current tree-shaking) was not possible this pass — Context7, WebFetch, and WebSearch were unavailable. Flagged items should be confirmed by a contributor with access to current docs before the API Design phase completes.
