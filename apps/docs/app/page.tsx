import {
	ArrowRight,
	Check,
	Code2,
	Github,
	Layers,
	Package,
	Palette,
	Shield,
	Sparkles,
	Terminal,
	Zap,
} from "lucide-react"
import Link from "next/link"
import { TerminalBlock } from "@/components/docs/code-block"
import { Header } from "@/components/layout/header"
import { DEFAULT_VERSION } from "@/lib/versions"

const features = [
	{
		icon: Palette,
		title: "Design System First",
		description:
			"A centralized CSS token system used by both developers and designers in Figma — 1:1 design-to-code handover.",
	},
	{
		icon: Shield,
		title: "Accessible by Default",
		description:
			"Built on Base UI, all components are ARIA-compliant with full keyboard navigation and screen reader support.",
	},
	{
		icon: Code2,
		title: "TypeScript Native",
		description:
			"Full TypeScript support with exported interfaces, prop types, and IDE autocompletion out of the box.",
	},
	{
		icon: Package,
		title: "Copy & Own",
		description:
			"Inspired by shadcn/ui — components are copied into your project, giving you full control to customize.",
	},
	{
		icon: Zap,
		title: "Biome Enforced",
		description:
			"Code quality, formatting, and Tailwind class ordering are enforced via Biome for a consistent codebase.",
	},
	{
		icon: Layers,
		title: "Version Pinned",
		description:
			"Pin your project to a specific component version and update on your own schedule, never forced migrations.",
	},
]

const steps = [
	{
		step: "01",
		title: "Initialize",
		description:
			"Set up your project with BCT UI's design system, Tailwind v4, and Biome.",
		code: "npx @bctechnology/ui@latest init",
	},
	{
		step: "02",
		title: "Add Components",
		description:
			"Copy any component directly into your project with a single command.",
		code: "npx @bctechnology/ui@latest add button",
	},
	{
		step: "03",
		title: "Use & Customize",
		description:
			"Import from your components folder — it's your code now, customize freely.",
		code: `import { Button } from "@/components/button"

export function App() {
  return <Button variant="primary">Hello BCT</Button>
}`,
	},
]

export default function HomePage() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header version={DEFAULT_VERSION} />

			<main className="flex-1">
				{/* Hero */}
				<section className="relative overflow-hidden">
					<div className="absolute inset-0 bg-linear-to-br from-primary/8 via-background to-accent-1/8" />
					<div
						className="pointer-events-none absolute inset-0 opacity-40"
						style={{
							backgroundImage:
								"radial-gradient(circle at 1px 1px, var(--color-border) 1px, transparent 0)",
							backgroundSize: "32px 32px",
						}}
					/>
					<div className="absolute top-0 right-0 h-[600px] w-[600px] translate-x-1/4 -translate-y-1/4 rounded-full bg-primary/10 blur-3xl" />
					<div className="absolute bottom-0 left-0 h-[400px] w-[400px] -translate-x-1/4 translate-y-1/4 rounded-full bg-accent-1/10 blur-3xl" />

					<div className="relative mx-auto max-w-7xl px-4 pt-20 pb-24 sm:px-6 sm:pt-28 lg:px-8 lg:pt-36">
						<div className="mx-auto flex max-w-4xl flex-col items-center text-center">
							<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 font-medium text-primary text-sm">
								<Sparkles className="h-3.5 w-3.5" />v{DEFAULT_VERSION} — 39
								Components
							</div>

							<h1 className="bg-linear-to-br from-typography-primary via-typography-primary to-typography-secondary bg-clip-text font-bold text-5xl text-transparent tracking-tight sm:text-6xl lg:text-7xl">
								The BCT Design System
								<br />
								<span className="bg-linear-to-r from-primary via-accent-1 to-secondary bg-clip-text">
									for React
								</span>
							</h1>

							<p className="mt-6 max-w-2xl text-lg text-typography-secondary sm:text-xl">
								A comprehensive, opinionated component library built for BCT's
								frontend projects. Modern, accessible, and deeply integrated
								with the design system your designers use in Figma.
							</p>

							<div className="mt-10 flex flex-wrap items-center justify-center gap-4">
								<Link
									href={`/components/${DEFAULT_VERSION}`}
									className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-6 font-semibold text-primary-on shadow-sm transition-all hover:bg-primary-hover active:scale-[0.98]"
								>
									Browse Components
									<ArrowRight className="h-4 w-4" />
								</Link>
								<Link
									href="/getting-started"
									className="inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-surface-1 px-6 font-semibold text-typography-primary transition-all hover:bg-surface-2 active:scale-[0.98]"
								>
									<Terminal className="h-4 w-4" />
									Get Started
								</Link>
								<a
									href="https://github.com/BC-Technology/bct-ui"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex h-11 items-center gap-2 rounded-lg px-4 font-medium text-typography-secondary transition-all hover:text-typography-primary"
								>
									<Github className="h-4 w-4" />
									GitHub
								</a>
							</div>

							<div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-typography-muted">
								{["Open Source", "TypeScript", "Tailwind v4", "Base UI"].map(
									(item) => (
										<div key={item} className="flex items-center gap-1.5">
											<Check className="h-3.5 w-3.5 text-success" />
											{item}
										</div>
									),
								)}
							</div>
						</div>
					</div>
				</section>

				{/* Quick Start */}
				<section className="border-border border-y bg-surface-1/50 py-16">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="mx-auto max-w-3xl">
							<h2 className="mb-2 text-center font-bold text-3xl text-typography-primary">
								Up and running in minutes
							</h2>
							<p className="mb-10 text-center text-typography-secondary">
								Three commands to set up your project with BCT UI.
							</p>
							<div className="flex flex-col gap-4">
								{steps.map(({ step, title, description, code }) => (
									<div
										key={step}
										className="flex gap-4 rounded-xl border border-border bg-background p-5"
									>
										<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 font-bold font-mono text-primary text-xs">
											{step}
										</div>
										<div className="flex-1 overflow-hidden">
											<h3 className="mb-0.5 font-semibold text-typography-primary">
												{title}
											</h3>
											<p className="mb-3 text-sm text-typography-secondary">
												{description}
											</p>
											<TerminalBlock code={code} />
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* Features */}
				<section className="py-16">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="mb-12 text-center">
							<h2 className="mb-3 font-bold text-3xl text-typography-primary">
								Why BCT UI?
							</h2>
							<p className="text-typography-secondary">
								Everything you need for consistent, high-quality frontend
								development at BCT.
							</p>
						</div>
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{features.map(({ icon: Icon, title, description }) => (
								<div
									key={title}
									className="rounded-xl border border-border bg-surface-1 p-6 transition-shadow hover:shadow-shadow-md"
								>
									<div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
										<Icon className="h-5 w-5 text-primary" />
									</div>
									<h3 className="mb-2 font-semibold text-typography-primary">
										{title}
									</h3>
									<p className="text-sm text-typography-secondary">
										{description}
									</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Stats */}
				<section className="border-border border-y bg-surface-1/50 py-12">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="grid grid-cols-2 gap-8 md:grid-cols-4">
							{[
								{ value: "39", label: "Components" },
								{ value: "3", label: "Versions" },
								{ value: "100+", label: "Design Tokens" },
								{ value: "0", label: "Runtime deps" },
							].map(({ value, label }) => (
								<div key={label} className="text-center">
									<div className="font-bold text-4xl text-primary">{value}</div>
									<div className="mt-1 text-sm text-typography-muted">
										{label}
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* CTA */}
				<section className="py-20">
					<div className="mx-auto max-w-2xl px-4 text-center">
						<h2 className="mb-4 font-bold text-3xl text-typography-primary">
							Ready to build?
						</h2>
						<p className="mb-8 text-typography-secondary">
							Start using BCT UI in your project today. It takes less than 5
							minutes to get set up.
						</p>
						<div className="flex flex-wrap items-center justify-center gap-4">
							<Link
								href="/getting-started"
								className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-6 font-semibold text-primary-on shadow-sm transition-all hover:bg-primary-hover"
							>
								Read the Docs
								<ArrowRight className="h-4 w-4" />
							</Link>
							<Link
								href={`/components/${DEFAULT_VERSION}`}
								className="inline-flex h-11 items-center gap-2 rounded-lg border border-border px-6 font-semibold text-typography-primary transition-all hover:bg-surface-1"
							>
								View Components
							</Link>
						</div>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className="border-border border-t py-8">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
						<div className="flex items-center gap-2 text-sm text-typography-muted">
							<div className="flex h-5 w-5 items-center justify-center rounded bg-primary">
								<Layers className="h-3 w-3 text-primary-on" />
							</div>
							<span>BCT UI — Built by Black Capital Technology</span>
						</div>
						<div className="flex items-center gap-6 text-sm text-typography-muted">
							<Link
								href="/getting-started"
								className="hover:text-typography-primary"
							>
								Docs
							</Link>
							<Link href="/changelog" className="hover:text-typography-primary">
								Changelog
							</Link>
							<a
								href="https://github.com/BC-Technology/bct-ui"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-typography-primary"
							>
								GitHub
							</a>
						</div>
					</div>
				</div>
			</footer>
		</div>
	)
}
