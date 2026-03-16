import { ArrowRight, Package, Palette, Sparkles, Zap } from "lucide-react"
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
				<section className="relative overflow-hidden">
					{/* Gradient Background */}
					<div className="absolute inset-0 bg-linear-to-br from-primary via-secondary to-accent opacity-95" />
					<div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

					<div className="container relative z-10 py-24 text-white md:py-32">
						<div className="mx-auto max-w-4xl text-center">
							<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
								<Sparkles className="h-4 w-4" />
								<span>Version 0.4.0 Available Now</span>
							</div>
							<h1 className="font-bold text-5xl tracking-tight sm:text-6xl md:text-7xl">
								BCT UI Component Library
							</h1>
							<p className="mt-6 text-lg text-white/90 sm:text-xl">
								A comprehensive, opinionated UI and design-system platform for
								BCT's frontend projects. Modern, accessible components built
								with React and Tailwind CSS v4.
							</p>
							<div className="mt-10 flex flex-wrap items-center justify-center gap-4">
								<Link
									href={`/components/${version}`}
									className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-white px-8 font-medium text-primary text-sm shadow-lg transition-all hover:scale-105 hover:shadow-xl"
								>
									Get Started
									<ArrowRight className="h-4 w-4" />
								</Link>
								<Link
									href="/getting-started"
									className="inline-flex h-12 items-center justify-center rounded-md border border-white/30 bg-white/10 px-8 font-medium text-sm text-white backdrop-blur-sm transition-all hover:bg-white/20"
								>
									Documentation
								</Link>
							</div>
						</div>
					</div>
				</section>

				<section className="border-border border-t bg-muted/50 py-24">
					<div className="container max-w-screen-2xl">
						<div className="grid gap-8 md:grid-cols-3">
							<div className="flex flex-col gap-4">
								<div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-on">
									<Package className="h-6 w-6" />
								</div>
								<h3 className="font-semibold text-xl">30+ Components</h3>
								<p className="text-typography-secondary">
									Comprehensive collection of form inputs, feedback, display,
									navigation, and layout components ready to use.
								</p>
							</div>
							<div className="flex flex-col gap-4">
								<div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-on">
									<Zap className="h-6 w-6" />
								</div>
								<h3 className="font-semibold text-xl">CLI Workflow</h3>
								<p className="text-typography-secondary">
									Install components with{" "}
									<code className="rounded bg-muted px-1.5 py-0.5">
										bct add
									</code>{" "}
									command. Components are copied to your project for full
									customization.
								</p>
							</div>
							<div className="flex flex-col gap-4">
								<div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-on">
									<Palette className="h-6 w-6" />
								</div>
								<h3 className="font-semibold text-xl">Design System</h3>
								<p className="text-typography-secondary">
									Built on a centrally governed design system with consistent
									tokens, spacing, and semantic colors.
								</p>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	)
}
