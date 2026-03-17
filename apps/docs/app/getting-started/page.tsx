import {
	ArrowRight,
	Check,
	Code2,
	Copy,
	Package,
	Rocket,
	Zap,
} from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { getPreferredVersion } from "@/lib/version-cookie"

export default async function GettingStartedPage() {
	const version = await getPreferredVersion()

	return (
		<div className="flex min-h-screen flex-col">
			<Header currentVersion={version} />
			<div className="container flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
				<Sidebar version={version} />
				<main className="relative py-6 lg:gap-10 lg:py-8">
					<div className="mx-auto w-full min-w-0 max-w-4xl">
						{/* Hero Section */}
						<div className="relative overflow-hidden rounded-md bg-surface-1 shadow-md">
							<div className="absolute inset-0 bg-linear-to-br from-primary/5 via-secondary/5 to-accent-1/5" />
							<div
								className="absolute inset-0 opacity-20"
								style={{
									backgroundImage:
										"radial-gradient(circle at 1px 1px, rgb(var(--color-border) / 0.2) 1px, transparent 0)",
									backgroundSize: "32px 32px",
								}}
							/>

							<div className="relative z-10 p-8 sm:p-12">
								<div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-medium text-primary text-sm">
									<Rocket className="h-3.5 w-3.5" />
									<span>Quick Start Guide</span>
								</div>
								<h1 className="font-bold text-4xl text-typography-primary tracking-tight sm:text-5xl">
									Getting Started
								</h1>
								<p className="mt-4 max-w-2xl text-lg text-typography-secondary">
									Install and configure BCT UI in your project in just a few
									minutes. Follow our step-by-step guide to get up and running.
								</p>
							</div>
						</div>

						{/* Prerequisites */}
						<div className="mt-12">
							<h2 className="mb-6 font-bold text-2xl text-typography-primary">
								Prerequisites
							</h2>
							<div className="grid gap-4 sm:grid-cols-2">
								<div className="rounded-md bg-surface-1 p-6">
									<div className="flex items-start gap-4">
										<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-success/10 text-success">
											<Check className="h-5 w-5" />
										</div>
										<div>
											<h3 className="font-semibold text-typography-primary">
												Node.js 20+
											</h3>
											<p className="mt-1 text-sm text-typography-secondary">
												Required for running the CLI and build tools
											</p>
										</div>
									</div>
								</div>
								<div className="rounded-md bg-surface-1 p-6">
									<div className="flex items-start gap-4">
										<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-success/10 text-success">
											<Check className="h-5 w-5" />
										</div>
										<div>
											<h3 className="font-semibold text-typography-primary">
												React 18+
											</h3>
											<p className="mt-1 text-sm text-typography-secondary">
												Vite or Next.js project with React
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Installation Steps */}
						<div className="mt-12">
							<h2 className="mb-8 font-bold text-2xl text-typography-primary">
								Installation Steps
							</h2>

							{/* Step 1 */}
							<div className="relative pb-12 pl-8">
								<div className="absolute top-0 left-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary font-semibold text-primary-on text-sm">
									1
								</div>
								<div className="absolute top-8 bottom-0 left-4 w-px bg-border" />

								<div className="space-y-4">
									<div>
										<h3 className="font-semibold text-typography-primary text-xl">
											Install the CLI
										</h3>
										<p className="mt-2 text-typography-secondary">
											Install the BCT UI CLI globally or use npx to run commands
											without installing.
										</p>
									</div>

									<div className="rounded-md bg-surface-1 p-4">
										<div className="flex items-center justify-between">
											<code className="font-mono text-sm text-typography-primary">
												npm install -g @bctechnology/ui
											</code>
											<button
												type="button"
												className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-typography-muted transition-colors hover:bg-surface-2 hover:text-typography-primary"
												aria-label="Copy command"
											>
												<Copy className="h-4 w-4" />
											</button>
										</div>
									</div>

									<div className="rounded-lg border border-info/20 bg-info/5 p-4">
										<p className="text-sm text-typography-secondary">
											<strong className="text-typography-primary">Tip:</strong>{" "}
											You can also use{" "}
											<code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs">
												npx @bctechnology/ui
											</code>{" "}
											to run commands without global installation.
										</p>
									</div>
								</div>
							</div>

							{/* Step 2 */}
							<div className="relative pb-12 pl-8">
								<div className="absolute top-0 left-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary font-semibold text-primary-on text-sm">
									2
								</div>
								<div className="absolute top-8 bottom-0 left-4 w-px bg-border" />

								<div className="space-y-4">
									<div>
										<h3 className="font-semibold text-typography-primary text-xl">
											Create Your Project
										</h3>
										<p className="mt-2 text-typography-secondary">
											Create a new Vite or Next.js project if you don't have one
											already.
										</p>
									</div>

									<div className="space-y-3">
										<div className="rounded-md bg-surface-1 p-4">
											<div className="mb-2 font-medium text-sm text-typography-muted">
												Vite + React
											</div>
											<div className="flex items-center justify-between">
												<code className="font-mono text-sm text-typography-primary">
													pnpm create vite@latest my-app --template react-ts
												</code>
												<button
													type="button"
													className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-typography-muted transition-colors hover:bg-surface-2 hover:text-typography-primary"
													aria-label="Copy command"
												>
													<Copy className="h-4 w-4" />
												</button>
											</div>
										</div>

										<div className="rounded-md bg-surface-1 p-4">
											<div className="mb-2 font-medium text-sm text-typography-muted">
												Next.js
											</div>
											<div className="flex items-center justify-between">
												<code className="font-mono text-sm text-typography-primary">
													npx create-next-app@latest my-app
												</code>
												<button
													type="button"
													className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-typography-muted transition-colors hover:bg-surface-2 hover:text-typography-primary"
													aria-label="Copy command"
												>
													<Copy className="h-4 w-4" />
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Step 3 */}
							<div className="relative pb-12 pl-8">
								<div className="absolute top-0 left-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary font-semibold text-primary-on text-sm">
									3
								</div>
								<div className="absolute top-8 bottom-0 left-4 w-px bg-border" />

								<div className="space-y-4">
									<div>
										<h3 className="font-semibold text-typography-primary text-xl">
											Initialize BCT UI
										</h3>
										<p className="mt-2 text-typography-secondary">
											Navigate to your project and run the init command to set
											up configuration files and dependencies.
										</p>
									</div>

									<div className="rounded-md bg-surface-1 p-4">
										<div className="flex items-center justify-between">
											<code className="font-mono text-sm text-typography-primary">
												cd my-app && npx bct init
											</code>
											<button
												type="button"
												className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-typography-muted transition-colors hover:bg-surface-2 hover:text-typography-primary"
												aria-label="Copy command"
											>
												<Copy className="h-4 w-4" />
											</button>
										</div>
									</div>

									<div className="rounded-md bg-surface-2 p-4">
										<p className="mb-3 font-medium text-sm text-typography-primary">
											This command will:
										</p>
										<ul className="space-y-2 text-sm text-typography-secondary">
											<li className="flex items-start gap-2">
												<Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
												<span>
													Install design tokens and Tailwind CSS v4
													configuration
												</span>
											</li>
											<li className="flex items-start gap-2">
												<Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
												<span>Set up Base UI and required dependencies</span>
											</li>
											<li className="flex items-start gap-2">
												<Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
												<span>Configure TypeScript path aliases</span>
											</li>
											<li className="flex items-start gap-2">
												<Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
												<span>Create bct.config.json for version pinning</span>
											</li>
										</ul>
									</div>
								</div>
							</div>

							{/* Step 4 */}
							<div className="relative pl-8">
								<div className="absolute top-0 left-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary font-semibold text-primary-on text-sm">
									4
								</div>

								<div className="space-y-4">
									<div>
										<h3 className="font-semibold text-typography-primary text-xl">
											Add Components
										</h3>
										<p className="mt-2 text-typography-secondary">
											Add individual components to your project as needed.
											Components are copied to your project for full
											customization.
										</p>
									</div>

									<div className="rounded-md bg-surface-1 p-4">
										<div className="flex items-center justify-between">
											<code className="font-mono text-sm text-typography-primary">
												npx bct add button
											</code>
											<button
												type="button"
												className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-typography-muted transition-colors hover:bg-surface-2 hover:text-typography-primary"
												aria-label="Copy command"
											>
												<Copy className="h-4 w-4" />
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Usage Example */}
						<div className="mt-16">
							<h2 className="mb-6 font-bold text-2xl text-typography-primary">
								Usage Example
							</h2>
							<div className="overflow-hidden rounded-lg bg-surface-2">
								<div className="border-border border-b bg-surface-1 px-4 py-3">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<Code2 className="h-4 w-4 text-typography-muted" />
											<span className="font-mono text-sm text-typography-primary">
												MyComponent.tsx
											</span>
										</div>
										<button
											type="button"
											className="flex h-8 items-center gap-2 rounded-lg px-3 text-sm text-typography-muted transition-colors hover:bg-surface-2 hover:text-typography-primary"
										>
											<Copy className="h-4 w-4" />
											Copy
										</button>
									</div>
								</div>
								<div className="p-4">
									<pre className="overflow-x-auto text-sm">
										<code className="text-typography-primary">{`import { Button } from "@/components/button"

export function MyComponent() {
  return (
    <div className="space-y-4">
      <Button variant="primary">
        Primary Button
      </Button>
      <Button variant="secondary">
        Secondary Button
      </Button>
    </div>
  )
}`}</code>
									</pre>
								</div>
							</div>
						</div>

						{/* Next Steps */}
						<div className="mt-16">
							<h2 className="mb-6 font-bold text-2xl text-typography-primary">
								Next Steps
							</h2>
							<div className="grid gap-4 sm:grid-cols-2">
								<Link
									href={`/components/${version}`}
									className="relative cursor-pointer overflow-hidden rounded-md bg-surface-1 p-6 shadow-sm transition-all hover:bg-surface-2"
								>
									<div className="flex items-start gap-4">
										<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
											<Package className="h-5 w-5" />
										</div>
										<div className="flex-1">
											<h3 className="font-semibold text-typography-primary group-hover:text-primary">
												Browse Components
											</h3>
											<p className="mt-1 text-sm text-typography-secondary">
												Explore all 38 available components
											</p>
											<div className="mt-3 flex items-center gap-2 text-primary text-sm">
												<span>View components</span>
												<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
											</div>
										</div>
									</div>
								</Link>

								<Link
									href="/tokens"
									className="group relative cursor-pointer overflow-hidden rounded-md bg-surface-1 p-6 shadow-sm transition-all hover:bg-surface-2"
								>
									<div className="flex items-start gap-4">
										<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
											<Zap className="h-5 w-5" />
										</div>
										<div className="flex-1">
											<h3 className="font-semibold text-typography-primary group-hover:text-secondary">
												Design Tokens
											</h3>
											<p className="mt-1 text-sm text-typography-secondary">
												Learn about the design system
											</p>
											<div className="mt-3 flex items-center gap-2 text-secondary text-sm">
												<span>Explore tokens</span>
												<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
											</div>
										</div>
									</div>
								</Link>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	)
}
