import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { DocsLayout } from "@/components/layout/docs-layout"
import { CodeBlock, TerminalBlock } from "@/components/docs/code-block"

export const metadata: Metadata = {
	title: "Getting Started",
	description: "Learn how to install and use BCT UI in your project.",
}

export default function GettingStartedPage() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<DocsLayout>
				<article className="prose max-w-3xl">
					<h1>Getting Started</h1>
					<p>
						BCT UI is a CLI-driven component library. Components are copied
						directly into your project, giving you full ownership and the freedom
						to customize without abstraction layers.
					</p>

					<h2>Prerequisites</h2>
					<ul>
						<li>Node.js 20 or later</li>
						<li>pnpm, npm, or yarn</li>
						<li>React 18+ project (Next.js App Router or Vite + React Router)</li>
					</ul>

					<h2>Installation</h2>
					<p>
						Run the <code>init</code> command inside an existing React project.
						BCT UI will detect your framework and configure everything
						automatically.
					</p>
					<TerminalBlock code="npx @bctechnology/ui@latest init" />

					<p>The init command will:</p>
					<ul>
						<li>
							Install Tailwind CSS v4 and configure it for your framework
						</li>
						<li>
							Copy the BCT design token CSS file to your project
						</li>
						<li>
							Set up Biome for linting and formatting (replaces ESLint/Prettier)
						</li>
						<li>Configure the @ path alias in tsconfig.json</li>
						<li>
							Optionally set up i18n with Paraglide and a Zustand theme store
						</li>
					</ul>

					<h2>Framework Support</h2>

					<h3>Next.js (App Router)</h3>
					<p>
						BCT UI configures <code>@tailwindcss/postcss</code>, creates
						<code>postcss.config.mjs</code>, and imports the design tokens in your
						global CSS file.
					</p>

					<h3>Vite + React Router</h3>
					<p>
						BCT UI installs <code>@tailwindcss/vite</code> and updates
						<code>vite.config.ts</code> to include the Tailwind plugin.
					</p>

					<h2>Adding Your First Component</h2>
					<p>
						Use the <code>add</code> command to copy any component into your
						project:
					</p>
					<TerminalBlock code="npx @bctechnology/ui@latest add button" />

					<p>
						The component will be copied to <code>src/components/</code> (or{" "}
						<code>components/</code> if no <code>src</code> directory exists). You
						can override the output directory with <code>--out</code>:
					</p>
					<TerminalBlock code="npx @bctechnology/ui@latest add button --out src/ui" />

					<p>Then import and use it:</p>
					<CodeBlock
						language="tsx"
						code={`import { Button } from "@/components/button"

export function MyPage() {
  return (
    <div>
      <Button variant="primary">Save changes</Button>
      <Button variant="tertiary">Cancel</Button>
    </div>
  )
}`}
					/>

					<h2>Interactive Component Selection</h2>
					<p>
						Running <code>add</code> without a component name opens an interactive
						selector:
					</p>
					<TerminalBlock code="npx @bctechnology/ui@latest add" />

					<h2>Adding Multiple Components</h2>
					<TerminalBlock code="npx @bctechnology/ui@latest add button text-input select" />

					<h2>Version Pinning</h2>
					<p>
						BCT UI reads the version of <code>@bctechnology/ui</code> from your
						project's <code>package.json</code> and fetches components matching
						that version. To upgrade, update the package version:
					</p>
					<TerminalBlock code="pnpm update @bctechnology/ui@latest" />

					<h2>Validating Your Setup</h2>
					<p>
						Run <code>doctor</code> to verify your project has the correct BCT UI
						configuration:
					</p>
					<TerminalBlock code="npx @bctechnology/ui@latest doctor" />

					<h2>What Gets Installed</h2>
					<p>
						When you run <code>bct init</code>, the following packages are
						installed:
					</p>
					<ul>
						<li>
							<code>tailwindcss@4</code> — Utility-first CSS framework
						</li>
						<li>
							<code>@base-ui/react</code> — Headless accessible UI primitives
						</li>
						<li>
							<code>clsx</code> + <code>tailwind-merge</code> — Class utilities
						</li>
						<li>
							<code>date-fns</code> — Date utilities for date picker components
						</li>
						<li>
							<code>lucide-react</code> — Icon library used by components
						</li>
						<li>
							<code>@biomejs/biome</code> — All-in-one linter and formatter
						</li>
					</ul>
					<p>
						Each component may declare additional dependencies (e.g.,{" "}
						<code>@tiptap/react</code> for RichTextInput) that are installed
						automatically when you add that component.
					</p>
				</article>
			</DocsLayout>
		</div>
	)
}
