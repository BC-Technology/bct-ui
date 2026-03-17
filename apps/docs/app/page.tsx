import {
	ArrowRight,
	Check,
	Code2,
	Github,
	Layers,
	Package,
	Palette,
	Sparkles,
	Terminal,
	Zap,
} from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { getPreferredVersion } from "@/lib/version-cookie"

export default async function Home() {
	const version = await getPreferredVersion()

	return (
		<div className="flex min-h-screen flex-col">
			<Header currentVersion={version} />
			<main className="flex-1">
				{/* Hero Section */}
				<section className="relative overflow-hidden bg-background">
					{/* Animated Gradient Background */}
					<div className="absolute inset-0 bg-linear-to-br from-primary/10 via-tertiary/10 to-accent-1/10" />
					<div
						className="absolute inset-0 opacity-30"
						style={{
							backgroundImage:
								"radial-gradient(circle at 1px 1px, rgb(var(--color-border) / 0.15) 1px, transparent 0)",
							backgroundSize: "40px 40px",
						}}
					/>
					{/* Gradient orbs */}
					<div className="absolute top-0 right-1/4 h-96 w-96 animate-pulse rounded-full bg-primary/20 blur-3xl" />
					<div className="animation-delay-2000 absolute bottom-0 left-1/4 h-96 w-96 animate-pulse rounded-full bg-secondary/20 blur-3xl" />

					<div className="container relative z-10 mx-auto px-4 py-20 sm:px-6 sm:py-24 md:py-32 lg:px-8 lg:py-40">
						<div className="mx-auto flex max-w-5xl flex-col items-center text-center">
							<div className="mb-8 inline-flex items-center gap-2 rounded-full bg-primary/5 px-4 py-2 font-medium text-primary text-sm backdrop-blur-sm transition-all hover:bg-primary/10">
								<Sparkles className="h-4 w-4" />
								<span>Version 0.4.0 • 38 Components</span>
							</div>

							<h1 className="bg-linear-to-br from-typography-primary via-typography-primary to-typography-secondary bg-clip-text font-bold text-5xl text-transparent tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
								Build faster with
								<br />
								<span className="bg-linear-to-r from-primary via-secondary to-accent-1 bg-clip-text text-transparent">
									BCT UI
								</span>
							</h1>

							<p className="mt-6 max-w-2xl text-lg text-typography-secondary sm:text-xl md:text-2xl">
								A comprehensive, opinionated UI and design-system platform.
								Modern, accessible components built with React and Tailwind CSS
								v4.
							</p>

							<div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
								<Link
									href={`/components/${version}`}
									className="group inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 font-semibold text-primary-on text-sm shadow-sm transition-all hover:bg-primary-hover active:scale-[0.98] sm:w-auto"
								>
									Browse Components
									<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
								</Link>
								<Link
									href="/getting-started"
									className="inline-flex h-12 items-center gap-2 rounded-md bg-surface-1 px-6 font-semibold text-sm text-typography-primary shadow-sm transition-all hover:bg-surface-2 active:scale-[0.98]"
								>
									<Code2 className="h-4 w-4" />
									Get Started
								</Link>
							</div>

							<div className="mt-8 flex items-center gap-6 text-sm text-typography-muted">
								<div className="flex items-center gap-2">
									<Check className="h-4 w-4 text-success" />
									<span>Open Source</span>
								</div>
								<div className="flex items-center gap-2">
									<Check className="h-4 w-4 text-success" />
									<span>TypeScript</span>
								</div>
								<div className="flex items-center gap-2">
									<Check className="h-4 w-4 text-success" />
									<span>Accessible</span>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Quick Start Section */}
				<section className="border-border border-y bg-surface-1/50 py-16">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<div className="mx-auto max-w-4xl">
							<div className="text-center">
								<h2 className="font-bold text-3xl text-typography-primary sm:text-4xl">
									Get started in seconds
								</h2>
								<p className="mt-4 text-lg text-typography-secondary">
									Install the CLI and add components to your project
								</p>
							</div>

							<div className="mt-12 grid gap-6 md:grid-cols-2">
								<div className="relative overflow-hidden rounded-md bg-surface-1 p-6 shadow-sm">
									<div className="flex items-start gap-4">
										<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
											<Terminal className="h-5 w-5" />
										</div>
										<div className="flex-1">
											<h3 className="font-semibold text-lg text-typography-primary">
												1. Install CLI
											</h3>
											<div className="mt-3 rounded-lg bg-surface-2 p-3">
												<code className="font-mono text-sm text-typography-primary">
													npm install -g @bctechnology/ui
												</code>
											</div>
										</div>
									</div>
								</div>

								<div className="relative overflow-hidden rounded-md bg-surface-1 p-6 shadow-sm">
									<div className="flex items-start gap-4">
										<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
											<Package className="h-5 w-5" />
										</div>
										<div className="flex-1">
											<h3 className="font-semibold text-lg text-typography-primary">
												2. Add Components
											</h3>
											<div className="mt-3 rounded-lg bg-surface-2 p-3">
												<code className="font-mono text-sm text-typography-primary">
													npx bct add button
												</code>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section className="py-20 sm:py-24">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<div className="mx-auto max-w-7xl">
							<div className="text-center">
								<h2 className="font-bold text-3xl text-typography-primary sm:text-4xl">
									Everything you need to build modern UIs
								</h2>
								<p className="mt-4 text-lg text-typography-secondary">
									Powerful features that make development faster and more
									enjoyable
								</p>
							</div>

							<div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
								<div className="relative overflow-hidden rounded-md bg-surface-1 p-8 shadow-sm transition-all">
									<div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-primary/5" />
									<div className="relative">
										<div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
											<Package className="h-7 w-7" />
										</div>
										<h3 className="mt-6 font-semibold text-typography-primary text-xl">
											38+ Components
										</h3>
										<p className="mt-3 text-typography-secondary">
											Comprehensive collection of form inputs, feedback,
											display, navigation, and layout components ready to use.
										</p>
									</div>
								</div>

								<div className="relative overflow-hidden rounded-md bg-surface-1 p-8 shadow-sm transition-all">
									<div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-secondary/5" />
									<div className="relative">
										<div className="flex h-14 w-14 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
											<Zap className="h-7 w-7" />
										</div>
										<h3 className="mt-6 font-semibold text-typography-primary text-xl">
											CLI Workflow
										</h3>
										<p className="mt-3 text-typography-secondary">
											Install components with{" "}
											<code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-sm">
												bct add
											</code>{" "}
											command. Components are copied to your project for full
											customization.
										</p>
									</div>
								</div>

								<div className="relative overflow-hidden rounded-md bg-surface-1 p-8 shadow-sm transition-all">
									<div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-accent-1/5" />
									<div className="relative">
										<div className="flex h-14 w-14 items-center justify-center rounded-lg bg-accent-1/10 text-accent-1">
											<Palette className="h-7 w-7" />
										</div>
										<h3 className="mt-6 font-semibold text-typography-primary text-xl">
											Design System
										</h3>
										<p className="mt-3 text-typography-secondary">
											Built on a centrally governed design system with
											consistent tokens, spacing, and semantic colors.
										</p>
									</div>
								</div>

								<div className="relative overflow-hidden rounded-md bg-surface-1 p-8 shadow-sm transition-all">
									<div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-primary/5" />
									<div className="relative">
										<div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
											<Code2 className="h-7 w-7" />
										</div>
										<h3 className="mt-6 font-semibold text-typography-primary text-xl">
											TypeScript First
										</h3>
										<p className="mt-3 text-typography-secondary">
											Full TypeScript support with comprehensive type
											definitions and IntelliSense for better developer
											experience.
										</p>
									</div>
								</div>

								<div className="relative overflow-hidden rounded-md bg-surface-1 p-8 shadow-sm transition-all">
									<div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-secondary/5" />
									<div className="relative">
										<div className="flex h-14 w-14 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
											<Layers className="h-7 w-7" />
										</div>
										<h3 className="mt-6 font-semibold text-typography-primary text-xl">
											Tailwind CSS v4
										</h3>
										<p className="mt-3 text-typography-secondary">
											Built with the latest Tailwind CSS v4, leveraging modern
											CSS features and design tokens for maximum flexibility.
										</p>
									</div>
								</div>

								<div className="relative overflow-hidden rounded-md bg-surface-1 p-8 shadow-sm transition-all">
									<div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-accent-1/5" />
									<div className="relative">
										<div className="flex h-14 w-14 items-center justify-center rounded-lg bg-accent-1/10 text-accent-1">
											<Check className="h-7 w-7" />
										</div>
										<h3 className="mt-6 font-semibold text-typography-primary text-xl">
											Accessible
										</h3>
										<p className="mt-3 text-typography-secondary">
											Built on Base UI primitives with WAI-ARIA compliance,
											ensuring screen reader support and keyboard navigation.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className="relative overflow-hidden border-border border-y bg-linear-to-br from-primary/5 via-secondary/5 to-accent-1/5 py-20 sm:py-24">
					<div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
					<div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
						<div className="mx-auto max-w-3xl text-center">
							<h2 className="font-bold text-3xl text-typography-primary sm:text-4xl md:text-5xl">
								Ready to build something amazing?
							</h2>
							<p className="mt-6 text-lg text-typography-secondary sm:text-xl">
								Start using BCT UI in your next project and experience the power
								of a well-designed component library.
							</p>
							<div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
								<Link
									href={`/components/${version}`}
									className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 font-semibold text-primary-on text-sm shadow-md transition-all hover:bg-primary-hover active:scale-[0.98] sm:w-auto"
								>
									Explore Components
									<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
								</Link>
								<Link
									href="https://github.com/BC-Technology/bct-ui"
									className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-border bg-surface-1 px-8 font-semibold text-sm text-typography-primary transition-all hover:bg-surface-1 active:scale-[0.98] sm:w-auto"
								>
									<Github className="h-4 w-4" />
									View on GitHub
								</Link>
							</div>
						</div>
					</div>
				</section>

				{/* Footer */}
				<footer className="border-border border-t bg-surface-1/30 py-12">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
							<div className="flex items-center gap-2">
								<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-on">
									<Package className="h-5 w-5" />
								</div>
								<span className="font-semibold text-typography-primary">
									BCT UI
								</span>
							</div>
							<div className="flex items-center gap-6">
								<Link
									href="/getting-started"
									className="text-sm text-typography-secondary transition-colors hover:text-typography-primary"
								>
									Documentation
								</Link>
								<Link
									href={`/components/${version}`}
									className="text-sm text-typography-secondary transition-colors hover:text-typography-primary"
								>
									Components
								</Link>
								<Link
									href="https://github.com/BC-Technology/bct-ui"
									className="text-sm text-typography-secondary transition-colors hover:text-typography-primary"
								>
									GitHub
								</Link>
								<Link
									href="https://www.npmjs.com/package/@bctechnology/ui"
									className="text-sm text-typography-secondary transition-colors hover:text-typography-primary"
								>
									npm
								</Link>
							</div>
						</div>
						<div className="mt-8 border-border border-t pt-8 text-center">
							<p className="text-sm text-typography-muted">
								© {new Date().getFullYear()} BC Technology. Built with React and
								Tailwind CSS v4.
							</p>
						</div>
					</div>
				</footer>
			</main>
		</div>
	)
}
