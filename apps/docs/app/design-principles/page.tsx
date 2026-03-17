import {
	Accessibility,
	Layers,
	Palette,
	Sparkles,
	Target,
	Users,
	Zap,
} from "lucide-react"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { getPreferredVersion } from "@/lib/version-cookie"

export default async function DesignPrinciplesPage() {
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
									<Sparkles className="h-3.5 w-3.5" />
									<span>Design Philosophy</span>
								</div>
								<h1 className="font-bold text-4xl text-typography-primary tracking-tight sm:text-5xl">
									Design Principles
								</h1>
								<p className="mt-4 max-w-2xl text-lg text-typography-secondary">
									The core principles that guide our design decisions and
									component development at BCT UI.
								</p>
							</div>
						</div>

						{/* Core Principles */}
						<div className="mt-12">
							<h2 className="mb-8 font-bold text-2xl text-typography-primary">
								Core Principles
							</h2>

							<div className="space-y-6">
								{/* Consistency */}
								<div className="relative overflow-hidden rounded-md bg-surface-1 p-8 shadow-sm transition-all">
									<div className="flex items-start gap-6">
										<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
											<Layers className="h-7 w-7" />
										</div>
										<div className="flex-1">
											<h3 className="font-bold text-typography-primary text-xl">
												Consistency
											</h3>
											<p className="mt-3 text-typography-secondary">
												Every component follows the same design patterns, naming
												conventions, and API structure. This creates a
												predictable and learnable system that scales across
												teams and projects.
											</p>
											<ul className="mt-4 space-y-2 text-sm text-typography-secondary">
												<li className="flex items-start gap-2">
													<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
													<span>Unified prop naming across all components</span>
												</li>
												<li className="flex items-start gap-2">
													<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
													<span>Consistent variant and size options</span>
												</li>
												<li className="flex items-start gap-2">
													<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
													<span>
														Standardized styling patterns with design tokens
													</span>
												</li>
											</ul>
										</div>
									</div>
								</div>

								{/* Accessibility */}
								<div className="relative overflow-hidden rounded-md bg-surface-1 p-8 shadow-sm transition-all">
									<div className="flex items-start gap-6">
										<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
											<Accessibility className="h-7 w-7" />
										</div>
										<div className="flex-1">
											<h3 className="font-bold text-typography-primary text-xl">
												Accessibility First
											</h3>
											<p className="mt-3 text-typography-secondary">
												Built on Base UI primitives with WAI-ARIA compliance,
												ensuring all components are usable by everyone,
												regardless of ability or technology.
											</p>
											<ul className="mt-4 space-y-2 text-sm text-typography-secondary">
												<li className="flex items-start gap-2">
													<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
													<span>Full keyboard navigation support</span>
												</li>
												<li className="flex items-start gap-2">
													<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
													<span>Screen reader compatibility</span>
												</li>
												<li className="flex items-start gap-2">
													<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
													<span>WCAG 2.1 AA color contrast standards</span>
												</li>
											</ul>
										</div>
									</div>
								</div>

								{/* Flexibility */}
								<div className="relative overflow-hidden rounded-md bg-surface-1 p-8 shadow-sm transition-all">
									<div className="flex items-start gap-6">
										<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-accent-1/10 text-accent-1">
											<Zap className="h-7 w-7" />
										</div>
										<div className="flex-1">
											<h3 className="font-bold text-typography-primary text-xl">
												Flexible & Composable
											</h3>
											<p className="mt-3 text-typography-secondary">
												Components are designed to be flexible and composable,
												allowing you to build complex UIs while maintaining full
												control over styling and behavior.
											</p>
											<ul className="mt-4 space-y-2 text-sm text-typography-secondary">
												<li className="flex items-start gap-2">
													<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-1" />
													<span>
														Granular className overrides with classNames prop
													</span>
												</li>
												<li className="flex items-start gap-2">
													<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-1" />
													<span>Compound components for complex patterns</span>
												</li>
												<li className="flex items-start gap-2">
													<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-1" />
													<span>
														Components copied to your project for full ownership
													</span>
												</li>
											</ul>
										</div>
									</div>
								</div>

								{/* Design System */}
								<div className="relative overflow-hidden rounded-md bg-surface-1 p-8 shadow-sm transition-all">
									<div className="flex items-start gap-6">
										<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-accent-2/10 text-accent-2">
											<Palette className="h-7 w-7" />
										</div>
										<div className="flex-1">
											<h3 className="font-bold text-typography-primary text-xl">
												Design Token Driven
											</h3>
											<p className="mt-3 text-typography-secondary">
												All styling is based on a centrally governed design
												token system, ensuring visual consistency and making
												theming straightforward.
											</p>
											<ul className="mt-4 space-y-2 text-sm text-typography-secondary">
												<li className="flex items-start gap-2">
													<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2" />
													<span>
														Semantic color system with light/dark modes
													</span>
												</li>
												<li className="flex items-start gap-2">
													<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2" />
													<span>Consistent spacing and typography scales</span>
												</li>
												<li className="flex items-start gap-2">
													<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2" />
													<span>Tailwind CSS v4 integration</span>
												</li>
											</ul>
										</div>
									</div>
								</div>

								{/* Developer Experience */}
								<div className="relative overflow-hidden rounded-md bg-surface-1 p-8 shadow-sm transition-all">
									<div className="flex items-start gap-6">
										<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-accent-3/10 text-accent-3">
											<Target className="h-7 w-7" />
										</div>
										<div className="flex-1">
											<h3 className="font-bold text-typography-primary text-xl">
												Developer Experience
											</h3>
											<p className="mt-3 text-typography-secondary">
												Built with developers in mind, featuring excellent
												TypeScript support, clear documentation, and intuitive
												APIs that make development faster and more enjoyable.
											</p>
											<ul className="mt-4 space-y-2 text-sm text-typography-secondary">
												<li className="flex items-start gap-2">
													<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-3" />
													<span>
														Full TypeScript support with comprehensive types
													</span>
												</li>
												<li className="flex items-start gap-2">
													<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-3" />
													<span>
														CLI-powered workflow for fast component addition
													</span>
												</li>
												<li className="flex items-start gap-2">
													<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-3" />
													<span>Clear documentation with live examples</span>
												</li>
											</ul>
										</div>
									</div>
								</div>

								{/* User Focused */}
								<div className="relative overflow-hidden rounded-md bg-surface-1 p-8 shadow-sm transition-all">
									<div className="flex items-start gap-6">
										<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-info/10 text-info">
											<Users className="h-7 w-7" />
										</div>
										<div className="flex-1">
											<h3 className="font-bold text-typography-primary text-xl">
												User Focused
											</h3>
											<p className="mt-3 text-typography-secondary">
												Every component is designed with the end user in mind,
												prioritizing usability, performance, and delightful
												interactions.
											</p>
											<ul className="mt-4 space-y-2 text-sm text-typography-secondary">
												<li className="flex items-start gap-2">
													<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-info" />
													<span>Smooth animations and transitions</span>
												</li>
												<li className="flex items-start gap-2">
													<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-info" />
													<span>Responsive design out of the box</span>
												</li>
												<li className="flex items-start gap-2">
													<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-info" />
													<span>Optimized for performance</span>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Component Design Guidelines */}
						<div className="mt-16">
							<h2 className="mb-6 font-bold text-2xl text-typography-primary">
								Component Design Guidelines
							</h2>

							<div className="space-y-6">
								<div className="rounded-md bg-surface-1 p-6">
									<h3 className="font-semibold text-lg text-typography-primary">
										API Design
									</h3>
									<p className="mt-2 text-sm text-typography-secondary">
										Component APIs should be intuitive and follow these
										patterns:
									</p>
									<ul className="mt-4 space-y-2 text-sm text-typography-secondary">
										<li className="flex items-start gap-2">
											<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
											<span>
												Use{" "}
												<code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-xs">
													variant
												</code>{" "}
												for visual style variations
											</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
											<span>
												Use{" "}
												<code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-xs">
													size
												</code>{" "}
												for size variations (sm, md, lg)
											</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
											<span>
												Provide{" "}
												<code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-xs">
													className
												</code>{" "}
												for root element override
											</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
											<span>
												Provide{" "}
												<code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-xs">
													classNames
												</code>{" "}
												object for granular styling
											</span>
										</li>
									</ul>
								</div>

								<div className="rounded-md bg-surface-1 p-6">
									<h3 className="font-semibold text-lg text-typography-primary">
										Visual Design
									</h3>
									<p className="mt-2 text-sm text-typography-secondary">
										Components should have clean, modern aesthetics:
									</p>
									<ul className="mt-4 space-y-2 text-sm text-typography-secondary">
										<li className="flex items-start gap-2">
											<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
											<span>Use design tokens for all colors and spacing</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
											<span>Apply subtle shadows for depth and hierarchy</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
											<span>Include smooth transitions for state changes</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
											<span>
												Ensure proper focus indicators for accessibility
											</span>
										</li>
									</ul>
								</div>

								<div className="rounded-md bg-surface-1 p-6">
									<h3 className="font-semibold text-lg text-typography-primary">
										Code Quality
									</h3>
									<p className="mt-2 text-sm text-typography-secondary">
										Maintain high code quality standards:
									</p>
									<ul className="mt-4 space-y-2 text-sm text-typography-secondary">
										<li className="flex items-start gap-2">
											<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-1" />
											<span>Write comprehensive TypeScript interfaces</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-1" />
											<span>
												Follow React best practices and hooks patterns
											</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-1" />
											<span>Keep components focused and single-purpose</span>
										</li>
										<li className="flex items-start gap-2">
											<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-1" />
											<span>Use Tailwind CSS classes, avoid inline styles</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	)
}
