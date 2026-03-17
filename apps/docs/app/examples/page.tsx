import {
	ArrowRight,
	Code2,
	FileText,
	LayoutDashboard,
	LogIn,
	Settings,
	ShoppingCart,
	Users,
} from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { getPreferredVersion } from "@/lib/version-cookie"

export default async function ExamplesPage() {
	const version = await getPreferredVersion()

	const examples = [
		{
			title: "Authentication Forms",
			description:
				"Complete login, signup, and password reset form examples with validation and error handling.",
			icon: LogIn,
			color: "primary",
			components: ["text-input", "button", "checkbox", "alert"],
			comingSoon: false,
		},
		{
			title: "Dashboard Layouts",
			description:
				"Responsive dashboard layouts with sidebar navigation, header, and content areas.",
			icon: LayoutDashboard,
			color: "secondary",
			components: ["sidebar", "header", "card", "badge"],
			comingSoon: false,
		},
		{
			title: "Data Tables",
			description:
				"Interactive data tables with sorting, filtering, pagination, and row selection.",
			icon: FileText,
			color: "accent-1",
			components: ["pagination", "select", "text-input", "checkbox"],
			comingSoon: true,
		},
		{
			title: "E-commerce Checkout",
			description:
				"Multi-step checkout flow with cart, shipping, payment, and confirmation screens.",
			icon: ShoppingCart,
			color: "accent-2",
			components: ["card", "button", "text-input", "radio-group"],
			comingSoon: true,
		},
		{
			title: "Settings Panels",
			description:
				"User settings and preferences panels with tabs, forms, and save functionality.",
			icon: Settings,
			color: "accent-3",
			components: ["tabs", "switch", "select", "button"],
			comingSoon: true,
		},
		{
			title: "User Profiles",
			description:
				"User profile pages with avatar upload, bio editing, and activity feeds.",
			icon: Users,
			color: "info",
			components: ["avatar", "file-upload", "text-area", "badge"],
			comingSoon: true,
		},
	]

	return (
		<div className="flex min-h-screen flex-col">
			<Header currentVersion={version} />
			<div className="container flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
				<Sidebar version={version} />
				<main className="relative py-6 lg:gap-10 lg:py-8">
					<div className="mx-auto w-full min-w-0 max-w-5xl">
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
									<Code2 className="h-3.5 w-3.5" />
									<span>Real-World Patterns</span>
								</div>
								<h1 className="font-bold text-4xl text-typography-primary tracking-tight sm:text-5xl">
									Examples & Templates
								</h1>
								<p className="mt-4 max-w-2xl text-lg text-typography-secondary">
									Production-ready examples and templates to jumpstart your
									projects. Copy and customize to fit your needs.
								</p>
							</div>
						</div>

						{/* Examples Grid */}
						<div className="mt-12">
							<div className="mb-8">
								<h2 className="font-bold text-2xl text-typography-primary">
									Available Examples
								</h2>
								<p className="mt-2 text-typography-secondary">
									Common UI patterns and complete page templates built with BCT
									UI components
								</p>
							</div>

							<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
								{examples.map((example) => {
									const Icon = example.icon
									return (
										<div
											key={example.title}
											className="group relative overflow-hidden rounded-md bg-surface-1 shadow-sm transition-all"
										>
											{example.comingSoon && (
												<div className="absolute top-4 right-4 z-10 rounded-full bg-accent-2/10 px-2.5 py-1 font-medium text-accent-2 text-xs">
													Coming Soon
												</div>
											)}

											<div className="p-6">
												<div
													className={`flex h-12 w-12 items-center justify-center rounded-lg bg-${example.color}/10 text-${example.color}`}
												>
													<Icon className="h-6 w-6" />
												</div>

												<h3 className="mt-4 font-semibold text-lg text-typography-primary">
													{example.title}
												</h3>
												<p className="mt-2 text-sm text-typography-secondary">
													{example.description}
												</p>

												<div className="mt-4">
													<p className="mb-2 font-medium text-typography-muted text-xs">
														Uses components:
													</p>
													<div className="flex flex-wrap gap-1.5">
														{example.components.map((comp) => (
															<span
																key={comp}
																className="rounded-full bg-surface-2 px-2 py-0.5 text-typography-muted text-xs"
															>
																{comp}
															</span>
														))}
													</div>
												</div>

												{!example.comingSoon && (
													<div className="mt-6 flex items-center gap-2 font-medium text-primary text-sm">
														<span>View example</span>
														<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
													</div>
												)}
											</div>
										</div>
									)
								})}
							</div>
						</div>

						{/* Common Patterns */}
						<div className="mt-16">
							<div className="mb-8">
								<h2 className="font-bold text-2xl text-typography-primary">
									Common UI Patterns
								</h2>
								<p className="mt-2 text-typography-secondary">
									Reusable patterns for common interface elements
								</p>
							</div>

							<div className="grid gap-6 sm:grid-cols-2">
								<div className="rounded-md bg-surface-1 p-6">
									<h3 className="font-semibold text-lg text-typography-primary">
										Form Validation
									</h3>
									<p className="mt-2 text-sm text-typography-secondary">
										Client-side form validation with error messages and success
										states using text-input, select, and button components.
									</p>
									<div className="mt-4 rounded-lg bg-surface-1 p-4">
										<code className="text-sm text-typography-primary">
											Coming soon
										</code>
									</div>
								</div>

								<div className="rounded-md bg-surface-1 p-6">
									<h3 className="font-semibold text-lg text-typography-primary">
										Modal Dialogs
									</h3>
									<p className="mt-2 text-sm text-typography-secondary">
										Confirmation dialogs, form modals, and alert dialogs with
										proper focus management and accessibility.
									</p>
									<div className="mt-4 rounded-lg bg-surface-1 p-4">
										<code className="text-sm text-typography-primary">
											Coming soon
										</code>
									</div>
								</div>

								<div className="rounded-md bg-surface-1 p-6">
									<h3 className="font-semibold text-lg text-typography-primary">
										Loading States
									</h3>
									<p className="mt-2 text-sm text-typography-secondary">
										Skeleton screens, spinners, and progress indicators for
										async operations and data loading.
									</p>
									<div className="mt-4 rounded-lg bg-surface-1 p-4">
										<code className="text-sm text-typography-primary">
											Coming soon
										</code>
									</div>
								</div>

								<div className="rounded-md bg-surface-1 p-6">
									<h3 className="font-semibold text-lg text-typography-primary">
										Empty States
									</h3>
									<p className="mt-2 text-sm text-typography-secondary">
										Helpful empty state designs with illustrations, messages,
										and call-to-action buttons.
									</p>
									<div className="mt-4 rounded-lg bg-surface-1 p-4">
										<code className="text-sm text-typography-primary">
											Coming soon
										</code>
									</div>
								</div>
							</div>
						</div>

						{/* CTA */}
						<div className="mt-16 rounded-md bg-linear-to-br from-primary/5 via-secondary/5 to-accent-1/5 p-8 text-center">
							<h3 className="font-bold text-2xl text-typography-primary">
								Want to contribute an example?
							</h3>
							<p className="mt-2 text-typography-secondary">
								We're always looking for more real-world examples and templates.
								Share your implementations with the community!
							</p>
							<div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
								<Link
									href="https://github.com/BC-Technology/bct-ui"
									className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-6 font-medium text-primary-on text-sm transition-all hover:bg-primary-hover"
								>
									Contribute on GitHub
									<ArrowRight className="h-4 w-4" />
								</Link>
								<Link
									href={`/components/${version}`}
									className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-surface-1 px-6 font-medium text-sm text-typography-primary transition-all hover:bg-surface-1"
								>
									Browse Components
								</Link>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	)
}
