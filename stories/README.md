# BCT UI Design System

Welcome to the BCT UI component library Storybook!

This is a comprehensive, opinionated UI and design-system platform for BCT's frontend projects.

## Features

- Design System Consistency - Mandatory design tokens ensure typography, color, spacing, motion, themes, and layout behave identically across applications
- Developer Experience - shadcn/ui-inspired workflow where components are copied into projects rather than consumed as runtime packages
- CLI-Powered Bootstrap - Single command to scaffold fully-configured Vite or Next.js projects with all necessary tooling
- Version-Pinned Components - Projects pin to specific BCT versions, ensuring compatibility and preventing breaking changes

## Getting Started

Install the CLI globally:

```
npm install -g @bctechnology/ui
```

Create your project:

```
pnpm create vite@latest my-app --template react-ts
cd my-app
npx bct init
pnpm dev
```

Add components:

```
npx bct add button
```

## Using This Storybook

- Browse Components - Navigate through the sidebar to explore all available components
- Interactive Controls - Use the controls panel to modify component props in real-time
- View Source - Check the story source code to see implementation examples

## Component Categories

Form Inputs - Button, Text Input, Text Area, Checkbox, Radio, Radio Group, Select, Switch, Number Input, Slider, Color Picker, Date Picker, Date Range Picker, File Upload, Rich Text Input

Feedback - Dialog, Alert Dialog, Alert, Tooltip, Spinner, Progress, Skeleton

Display - Badge, Avatar, Card, Breadcrumbs, Pagination, Divider

Navigation - Accordion, Tabs, Dropdown Menu, Popover

Utilities - Portal
