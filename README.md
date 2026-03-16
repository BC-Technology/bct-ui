# BCT UI Platform

A comprehensive, opinionated UI and design-system platform for BCT's frontend projects. Combines a centrally governed design system with a developer-friendly workflow inspired by shadcn/ui, tailored for BCT's needs.

## 🚀 Overview

The BCT UI Platform ensures **consistency, speed, and long-term maintainability** across all frontend projects at BCT. At its core is a **canonical, versioned design-token implementation** expressed as a Tailwind CSS v4–based `index.css` file, generated from the Figma design system and required for all projects using the component library.

### Key Features

- **🎨 Design System Consistency**: Mandatory design tokens ensure typography, color, spacing, motion, themes, and layout behave identically across applications
- **⚡ Developer Experience**: shadcn/ui-inspired workflow where components are copied into projects rather than consumed as runtime packages
- **🔧 CLI-Powered Bootstrap**: Single command to scaffold fully-configured Vite or Next.js projects with all necessary tooling
- **📦 Version-Pinned Components**: Projects pin to specific BCT versions, ensuring compatibility and preventing breaking changes
- **🏗️ Framework Agnostic**: Supports both Vite + React Router and Next.js + App Router
- **🎯 Type-Safe**: Full TypeScript support with Biome for linting and formatting
- **🎭 Local Ownership**: Teams fully own and customize components while maintaining design system alignment

## 📁 Folder Structure

```
bct-ui/
├── packages/
│   ├── ui/                    # @bctechnology/ui - Main CLI package
│   │   ├── src/
│   │   │   ├── commands/      # CLI command implementations
│   │   │   │   ├── init.ts    # Project initialization
│   │   │   │   ├── add.ts     # Component addition
│   │   │   │   └── doctor.ts  # Project validation
│   │   │   ├── registry/      # Versioned component registry (source-of-truth)
│   │   │   │   ├── registry.ts            # Loader (fetches remote by tag)
│   │   │   │   └── versions/              # Versioned registries + sources (tagged)
│   │   │   │       └── 0.1.0/
│   │   │   │           ├── registry.json  # Component manifests
│   │   │   │           └── components/    # Component source templates
│   │   │   ├── lib/          # CLI utilities
│   │   │   ├── assets/       # Assets shipped with the CLI (tokens)
│   │   │   └── cli.ts        # CLI entry point
│   │   └── dist/             # Built CLI
├── apps/
│   └── docs/                 # Documentation site
│       └── src/              # Generated docs from registry
└── package.json              # Root workspace config
```

## 🚀 Quick Start

### For Developers Using BCT UI (Creating New Projects)

```bash
# Install the CLI globally (once)
npm install -g @bctechnology/ui

# Create your project first
pnpm create vite@latest my-app --template react-ts
# OR
npx create-next-app@latest my-app

# Navigate to your project and configure BCT UI
cd my-app
npx bct init

# Start developing
pnpm dev

> **Note**: The CLI automatically detects your package manager (npm, pnpm, or yarn) and uses it for all installations during setup.
```

### For Platform Contributors (Working on BCT UI itself)

```bash
# Clone and setup
git clone <repo-url>
cd bct-ui
pnpm install

# Build all packages
pnpm build

# Development with watch mode
pnpm dev
```

## 📖 Usage Guide

### Setting Up Projects with BCT UI

The `npx bct init` command configures an existing Vite or Next.js project with BCT UI's design system and tooling:

```bash
npx bct init [options]
```

**Options:**
- `--src-dir <boolean>`: Override detected `src/` directory structure (optional)

**Interactive Prompts:**
- i18n with Paraglide setup
- Zustand store for locale management (if i18n enabled)
- Theme store setup

**What gets installed:**
- Design tokens (shipped inside `@bctechnology/ui`) - copied locally as `bct/index.css` or `src/bct/index.css`
- Base dependencies (`clsx`, `date-fns`, `@base-ui/react`)
- Tailwind CSS v4 with proper configuration
- Biome for linting/formatting
- TypeScript path aliases (`@/*`)
- Optional: i18n, theme stores

**Requirements:**
Run `bct init` from within an existing Vite or Next.js project directory. The CLI will automatically detect your framework and project structure.

### Adding Components

After initializing a project, add components on-demand:

```bash
cd your-project
npx bct add <component-name>
```

**Available Components:**
- `button` - Accessible button with variants
- `badge` - Status labels
- `input` - Text input field
- `checkbox` - Checkbox input
- `tabs` - Tab navigation

**What happens:**
1. CLI reads your project's `bct.config.json` to get pinned version
2. Fetches the appropriate component registry for that version from GitHub tag `vX.Y.Z`
3. Downloads only the component file(s) you requested
4. Installs any required dependencies
5. Updates your project structure

**Example:**
```bash
# Add a button component
npx bct add button

# Components are placed in src/components/ (or components/ if no src/)
# Files created: src/components/button.tsx
```

### Project Validation

Check if your project matches BCT UI platform requirements:

```bash
npx bct doctor
```

Validates:
- BCT version compatibility
- Presence of required token CSS import
- Project structure integrity

## 🤝 Contributing

### Adding New Components

1. **Create component source** in the appropriate version directory:
   ```bash
   mkdir -p packages/ui/src/registry/versions/0.1.0/components
   # Add your component: my-component.tsx
   ```

2. **Update the registry manifest**:
   Edit `packages/ui/src/registry/versions/0.1.0/registry.json` and add an entry:
   ```json
   {
     "my-component": {
       "title": "My Component",
       "description": "Description of what this component does",
       "files": [{ "src": "components/my-component.tsx", "dst": "my-component.tsx" }],
       "deps": ["@base-ui/react", "clsx"]
     }
   }
   ```

3. **Component Guidelines**:
   - Use **Tailwind CSS v4 classes only** - no local CSS files
   - Import tokens from the canonical CSS variables
   - Build on **Base UI primitives** for accessibility
   - Export TypeScript interfaces for props
   - Follow the existing component patterns
   - Use `clsx` for conditional classes

4. **Test the component**:
   ```bash
   # Build the CLI
   pnpm build

   # Test in a fresh project
   mkdir test-project && cd test-project
   node ../packages/ui/dist/cli.js init --template vite --name test
   cd test
   node ../../packages/ui/dist/cli.js add my-component
   ```

### Versioning Components

When releasing breaking changes (or adding new components in a new pinned version):

1. **Create new version directory**:
   ```bash
   cp -r packages/ui/src/registry/versions/0.1.0 packages/ui/src/registry/versions/0.2.0
   ```

2. **Update `@bctechnology/ui` version**:
   - Update `packages/ui/package.json` version to `0.2.0`
   - The CLI and library will automatically use this version (no need to update constants in code)

3. **Tag the release (required)**:
   `bct add` fetches component sources from GitHub by tag. After merging to `main`:
   ```bash
   git tag v0.2.0
   git push origin v0.2.0
   ```

4. **Publish to npm**:
   ```bash
   cd packages/ui
   npm publish --access public
   ```

**Important:** once a tag `vX.Y.Z` is published, treat `packages/ui/src/registry/versions/X.Y.Z` as immutable. If you need changes, create a new version folder and tag.

### Design Token Updates

1. **Update canonical tokens** in `packages/ui/src/assets/tokens/index.css`
2. **Test with existing components** to ensure compatibility
3. **Update component examples** if needed
4. **Version bump** if breaking changes

### Documentation

The docs site in `apps/docs/` is **auto-generated** from the component registry. When you add new components, the docs will automatically include them.

## 🛠️ Development Setup

### Prerequisites

- Node.js 20+
- pnpm 9+
- Git

### Local Development

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run type checking
pnpm typecheck

# Run linting/formatting
pnpm check

# Development with watch mode
pnpm dev

# Test CLI locally
node packages/ui/dist/cli.js --help
```

### Testing Changes

```bash
# Create a test project to validate your changes
mkdir ../test-bct && cd ../test-bct
node ../bct-ui/packages/ui/dist/cli.js init --template vite --name test-app
cd test-app
node ../../bct-ui/packages/ui/dist/cli.js add button
pnpm dev
```

### Release Process

1. **Update version** in `packages/ui/package.json` (the CLI automatically uses this version)
2. **Build and test** all packages
3. **Publish packages** to npm:
   ```bash
   cd packages/ui && npm publish --access public
   ```
4. **Tag release** in git with version number:
   ```bash
   git tag v0.4.0
   git push origin v0.4.0
   ```

### Deployment

#### Deploying the UI Package

The `@bctechnology/ui` package is published to npm and consumed via the CLI:

```bash
# Build the package
cd packages/ui
pnpm build

# Publish to npm (requires npm login)
npm publish --access public

# Verify publication
npm view @bctechnology/ui
```

**Important:** After publishing a new version, create a corresponding git tag so the CLI can fetch component sources:

```bash
git tag v0.4.0
git push origin v0.4.0
```

#### Deploying the Documentation Site

The documentation site can be deployed to any static hosting platform:

**Vercel (Recommended):**
```bash
cd apps/docs

# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

**Netlify:**
```bash
cd apps/docs

# Install Netlify CLI
npm i -g netlify-cli

# Build the site
pnpm build

# Deploy
netlify deploy --prod --dir=.next
```

**Manual Deployment:**
```bash
cd apps/docs
pnpm build

# The static site is in .next/
# Upload to your hosting provider
```

**Environment Variables:**
No environment variables are required for the documentation site. All component data is loaded from the local registry files.

## 🏗️ Architecture

### Design Token System

- **Canonical Source**: `packages/tokens/index.css` contains all design tokens
- **Local Copy**: Each project gets its own copy of tokens for ownership
- **Tailwind Integration**: CSS variables map to Tailwind utilities via `@theme` directive
- **Version Pinning**: Token changes require version bumps

### Component Registry

- **Versioned Storage**: Components stored by BCT platform version
- **Source Copy**: Components copied into projects, not imported as packages
- **Dependency Declaration**: Each component declares required npm packages
- **Type Safety**: Full TypeScript support with proper prop interfaces

### CLI Architecture

- **Framework Agnostic**: Supports Vite and Next.js with different configurations
- **Config-Driven**: `bct.config.json` stores project metadata and preferences
- **Idempotent Operations**: Safe to re-run commands
- **Interactive Prompts**: Clack-based UI for better developer experience

### Build System

- **Monorepo**: pnpm workspaces for package management
- **TypeScript**: Strict type checking across all packages
- **Biome**: Fast linting and formatting
- **ESM First**: Modern module system throughout

<!-- ## 📄 License

Internal BCT use only.
 -->
