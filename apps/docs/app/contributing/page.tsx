import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { DocsLayout } from "@/components/layout/docs-layout"
import { CodeBlock, TerminalBlock } from "@/components/docs/code-block"

export const metadata: Metadata = {
	title: "Contributing",
	description: "Learn how to contribute components and improvements to BCT UI.",
}

export default function ContributingPage() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<DocsLayout>
				<article className="prose max-w-3xl">
					<h1>Contributing</h1>
					<p>
						BCT UI is an internal library maintained by the BCT frontend team.
						This guide covers how to add new components, update existing ones,
						and keep the registry in sync.
					</p>

					<h2>Repository Structure</h2>
					<CodeBlock
						language="bash"
						code={`bct-ui/
├── packages/ui/               # The CLI package
│   └── src/
│       ├── cli.ts             # CLI entry (init, add, doctor)
│       ├── commands/          # CLI command implementations
│       ├── registry/
│       │   └── versions/
│       │       ├── 0.2.0/    # Legacy
│       │       ├── 0.3.0/    # Previous stable
│       │       └── 0.4.0/    # Current stable
│       │           ├── registry.json
│       │           └── components/
│       └── assets/
│           └── tokens/
│               └── index.css  # Design token system
└── apps/docs/                 # This documentation site`}
					/>

					<h2>Adding a New Component</h2>

					<h3>1. Create the component file</h3>
					<p>
						Add your component to the latest version directory:
					</p>
					<TerminalBlock code="packages/ui/src/registry/versions/0.4.0/components/my-component.tsx" />

					<p>Component conventions:</p>
					<ul>
						<li>
							Export a named function (e.g., <code>export function MyComponent</code>
							)
						</li>
						<li>
							Export a TypeScript interface (e.g.,{" "}
							<code>export interface MyComponentProps</code>)
						</li>
						<li>
							Use <code>clsx</code> + <code>tailwind-merge</code> for class
							composition
						</li>
						<li>Use BCT design tokens for all colors (e.g., <code>bg-primary</code>)</li>
						<li>No "use client" directive — components must be SSR-compatible</li>
						<li>
							Extend Base UI primitives for accessibility wherever possible
						</li>
					</ul>

					<CodeBlock
						language="tsx"
						code={`import clsx from "clsx"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface MyComponentProps extends React.ComponentPropsWithoutRef<"div"> {
  variant?: "default" | "outlined"
}

export function MyComponent({
  variant = "default",
  className,
  children,
  ...props
}: MyComponentProps) {
  const variantStyles: Record<string, string> = {
    default: "bg-surface-1 border border-border",
    outlined: "bg-transparent border-2 border-primary",
  }

  return (
    <div
      className={twMerge(
        clsx("rounded-lg p-4", variantStyles[variant]),
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}`}
					/>

					<h3>2. Register the component</h3>
					<p>
						Add an entry to{" "}
						<code>packages/ui/src/registry/versions/0.4.0/registry.json</code>:
					</p>
					<CodeBlock
						language="json"
						code={`{
  "my-component": {
    "title": "My Component",
    "description": "A brief description of what this component does.",
    "category": "display",
    "files": [
      { "src": "components/my-component.tsx", "dst": "my-component.tsx" }
    ],
    "deps": ["clsx", "tailwind-merge"],
    "registryDeps": []
  }
}`}
					/>

					<p>
						Valid categories: <code>form-inputs</code>, <code>feedback</code>,{" "}
						<code>display</code>, <code>navigation</code>, <code>layout</code>,{" "}
						<code>advanced</code>.
					</p>

					<h3>3. Create a documentation preview</h3>
					<p>
						Use the auto-generation script to scaffold a preview wrapper for the
						docs site:
					</p>
					<TerminalBlock code="pnpm docs:add-component -- --component my-component --version 0.4.0" />

					<p>
						Then open <code>apps/docs/previews/0.4.0/my-component.tsx</code> and
						fill in the variant examples.
					</p>

					<h2>Releasing a New Version</h2>

					<h3>1. Create a new version directory</h3>
					<TerminalBlock code="cp -r packages/ui/src/registry/versions/0.4.0 packages/ui/src/registry/versions/0.5.0" />

					<h3>2. Add/modify components in the new version</h3>
					<p>
						Make your changes to the component files and update
						<code>registry.json</code>.
					</p>

					<h3>3. Update the package version</h3>
					<p>
						Update <code>packages/ui/package.json</code> version to <code>0.5.0</code>.
					</p>

					<h3>4. Run the pre-publish verification</h3>
					<TerminalBlock code="pnpm prepublishOnly" />

					<p>This verifies the registry version matches the package version.</p>

					<h3>5. Build and publish</h3>
					<TerminalBlock code="pnpm build && npm publish" />

					<h3>6. Update the docs site</h3>
					<ul>
						<li>
							Add <code>"0.5.0"</code> to <code>VALID_VERSIONS</code> in{" "}
							<code>apps/docs/lib/versions.ts</code>
						</li>
						<li>
							Update <code>DEFAULT_VERSION</code> to <code>"0.5.0"</code>
						</li>
						<li>Generate preview wrappers for the new version</li>
						<li>
							Add entries to <code>apps/docs/previews/registry.ts</code>
						</li>
					</ul>

					<h2>Development Setup</h2>
					<TerminalBlock code={`git clone https://github.com/BC-Technology/bct-ui
cd bct-ui
pnpm install
pnpm dev        # Build package in watch mode
pnpm docs:dev   # Start docs site`} />

					<h2>Code Standards</h2>
					<p>
						The repo uses Biome for linting and formatting. Run before committing:
					</p>
					<TerminalBlock code="pnpm check" />
				</article>
			</DocsLayout>
		</div>
	)
}
