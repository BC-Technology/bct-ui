# @bctechnology/ui

A comprehensive, opinionated UI and design-system platform for BCT's frontend projects. Combines a centrally governed design system with a developer-friendly workflow inspired by shadcn/ui, tailored for BCT's needs.

## Installation

```bash
npm install -g @bctechnology/ui
# or
pnpm add -g @bctechnology/ui
# or
yarn global add @bctechnology/ui
```

## Quick Start

### Create a new project

```bash
# Create a Vite + React Router project
bct init --template vite --name my-app

# Create a Next.js project
bct init --template next --name my-app

# Enter your new project
cd my-app
pnpm dev
```

### Add components to existing projects

```bash
# Add a button component
bct add button

# Add multiple components
bct add input checkbox
```

## Commands

| Command | Description |
|---------|-------------|
| `bct init` | Initialize a new project with BCT UI conventions |
| `bct add <component>` | Add components to your project |
| `bct doctor` | Validate project setup and requirements |

### `bct init` Options

- `--template <vite|next>`: Framework choice (required)
- `--name <string>`: Project name (optional, will prompt if not provided)
- `--src-dir <boolean>`: Use `src/` directory structure (default: true)
- `--existing`: Configure current directory instead of creating new project

## What You Get

When you initialize a project with BCT UI, you get:

- **Design System**: Mandatory design tokens ensuring typography, color, spacing, and themes are consistent
- **Component Library**: shadcn/ui-inspired workflow where components are copied into your project
- **Framework Support**: Full support for both Vite + React Router and Next.js + App Router
- **Tooling**: Biome for linting/formatting, TypeScript path aliases, and proper configurations
- **Type Safety**: Full TypeScript support with proper component interfaces

## Requirements

- Node.js 20+
- pnpm (recommended) or npm/yarn

## Available Components

- `button` - Accessible button with variants
- `badge` - Status labels
- `input` - Text input field
- `checkbox` - Checkbox input
- `tabs` - Tab navigation

## Project Structure

After initialization, your project will have:

```
my-app/
├── src/                    # Source directory
│   ├── components/         # UI components
│   ├── bct/               # Design tokens
│   │   └── index.css
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Entry point
├── biome.json             # Linting/formatting config
├── bct.config.json        # BCT project configuration
└── package.json
```
