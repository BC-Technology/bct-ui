import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { DocsLayout } from "@/components/layout/docs-layout"

export const metadata: Metadata = {
	title: "Design System",
	description: "Color tokens, typography, spacing, and visual foundations of BCT UI.",
}

interface ColorSwatch {
	name: string
	token: string
	description?: string
}

interface ColorGroup {
	title: string
	description: string
	swatches: ColorSwatch[]
}

const colorGroups: ColorGroup[] = [
	{
		title: "Primary",
		description: "The main brand color used for CTAs and interactive elements",
		swatches: [
			{ name: "Primary", token: "bg-primary text-primary-on", description: "Main action color" },
			{ name: "Primary Muted", token: "bg-primary-muted", description: "Soft background" },
			{ name: "Primary On", token: "bg-primary-on border border-border", description: "Text on primary" },
		],
	},
	{
		title: "Secondary",
		description: "Secondary brand color for supporting actions",
		swatches: [
			{ name: "Secondary", token: "bg-secondary text-secondary-on", description: "Secondary action" },
			{ name: "Secondary Muted", token: "bg-secondary-muted", description: "Soft background" },
		],
	},
	{
		title: "Tertiary",
		description: "Neutral/border-based color for subtle actions",
		swatches: [
			{ name: "Tertiary", token: "bg-tertiary text-tertiary-on", description: "Neutral action" },
			{ name: "Tertiary Muted", token: "bg-tertiary-muted border border-border", description: "Very subtle" },
		],
	},
	{
		title: "Status",
		description: "Semantic status colors for feedback and states",
		swatches: [
			{ name: "Success", token: "bg-success text-success-on", description: "Positive outcome" },
			{ name: "Success Muted", token: "bg-success-muted", description: "Soft success" },
			{ name: "Warning", token: "bg-warning text-warning-on", description: "Caution state" },
			{ name: "Warning Muted", token: "bg-warning-muted", description: "Soft warning" },
			{ name: "Error", token: "bg-error text-error-on", description: "Error state" },
			{ name: "Error Muted", token: "bg-error-muted", description: "Soft error" },
			{ name: "Info", token: "bg-info text-info-on", description: "Informational" },
			{ name: "Info Muted", token: "bg-info-muted", description: "Soft info" },
		],
	},
	{
		title: "Surfaces",
		description: "Background layers for content hierarchy",
		swatches: [
			{ name: "Background", token: "bg-background border border-border", description: "Page background" },
			{ name: "Surface 1", token: "bg-surface-1 border border-border", description: "Card/panel" },
			{ name: "Surface 2", token: "bg-surface-2 border border-border", description: "Hover state" },
			{ name: "Surface 3", token: "bg-surface-3 border border-border", description: "Active state" },
		],
	},
	{
		title: "Accents",
		description: "Accent colors for decorative and highlight use",
		swatches: [
			{ name: "Accent 1", token: "bg-accent-1 text-accent-1-on", description: "Purple" },
			{ name: "Accent 2", token: "bg-accent-2 text-accent-2-on", description: "Pink" },
			{ name: "Accent 3", token: "bg-accent-3 text-accent-3-on", description: "Orange" },
			{ name: "Accent 4", token: "bg-accent-4 text-accent-4-on", description: "Teal" },
		],
	},
	{
		title: "Typography",
		description: "Text color hierarchy",
		swatches: [
			{ name: "Typography Primary", token: "bg-surface-1 text-typography-primary border border-border", description: "Main body text" },
			{ name: "Typography Secondary", token: "bg-surface-1 text-typography-secondary border border-border", description: "Supporting text" },
			{ name: "Typography Muted", token: "bg-surface-1 text-typography-muted border border-border", description: "Placeholder/hint" },
		],
	},
]

const textSizes = [
	{ name: "2xs", class: "text-[10px]", size: "10px" },
	{ name: "xs", class: "text-xs", size: "12px" },
	{ name: "sm", class: "text-sm", size: "14px" },
	{ name: "base", class: "text-base", size: "16px" },
	{ name: "lg", class: "text-lg", size: "18px" },
	{ name: "xl", class: "text-xl", size: "20px" },
	{ name: "2xl", class: "text-2xl", size: "24px" },
	{ name: "3xl", class: "text-3xl", size: "28px" },
	{ name: "4xl", class: "text-4xl", size: "32px" },
	{ name: "5xl", class: "text-5xl", size: "36px" },
]

const radiusTokens = [
	{ name: "none", class: "rounded-none", value: "0px" },
	{ name: "sm", class: "rounded-sm", value: "2px" },
	{ name: "md", class: "rounded-md", value: "4px" },
	{ name: "lg", class: "rounded-lg", value: "8px" },
	{ name: "full", class: "rounded-full", value: "9999px" },
]

const shadowTokens = [
	{ name: "sm", class: "shadow-shadow-sm", label: "shadow-sm" },
	{ name: "md", class: "shadow-shadow-md", label: "shadow-md" },
	{ name: "lg", class: "shadow-shadow-lg", label: "shadow-lg" },
]

export default function DesignSystemPage() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<DocsLayout>
				<div className="max-w-4xl">
					<h1 className="mb-2 font-bold text-4xl text-typography-primary tracking-tight">
						Design System
					</h1>
					<p className="mb-12 text-typography-secondary">
						BCT UI's design system is defined through CSS custom properties. All
						tokens are available as Tailwind utilities and are automatically
						adapted for light and dark themes.
					</p>

					{/* Color Tokens */}
					<section className="mb-16">
						<h2 className="mb-1 font-semibold text-2xl text-typography-primary">
							Color Tokens
						</h2>
						<p className="mb-8 text-typography-secondary">
							Semantic color tokens that change between light and dark mode.
							Designers use these same token names in Figma.
						</p>

						<div className="flex flex-col gap-10">
							{colorGroups.map((group) => (
								<div key={group.title}>
									<h3 className="mb-1 font-semibold text-lg text-typography-primary">
										{group.title}
									</h3>
									<p className="mb-4 text-sm text-typography-secondary">
										{group.description}
									</p>
									<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
										{group.swatches.map((swatch) => (
											<div key={swatch.name} className="flex flex-col gap-2">
												<div
													className={`h-14 rounded-lg ${swatch.token}`}
													title={swatch.token}
												>
													{swatch.token.includes("text-") &&
													swatch.token.includes("typography") ? (
														<div className="flex h-full items-center justify-center text-sm font-medium">
															Aa
														</div>
													) : null}
												</div>
												<div>
													<p className="text-xs font-medium text-typography-primary">
														{swatch.name}
													</p>
													{swatch.description && (
														<p className="text-xs text-typography-muted">
															{swatch.description}
														</p>
													)}
												</div>
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					</section>

					{/* Typography */}
					<section className="mb-16">
						<h2 className="mb-1 font-semibold text-2xl text-typography-primary">
							Typography
						</h2>
						<p className="mb-8 text-typography-secondary">
							BCT UI uses <strong>Quicksand</strong> as the sans-serif font and{" "}
							<strong>League Spartan</strong> as the display font.
						</p>

						<div className="mb-8 flex flex-col gap-4 rounded-xl border border-border bg-surface-1 p-6">
							<div className="font-sans">
								<p className="mb-1 text-xs text-typography-muted">
									--font-sans (Quicksand)
								</p>
								<p className="text-2xl">
									The quick brown fox jumps over the lazy dog
								</p>
							</div>
							<div className="h-px bg-border" />
							<div className="font-serif">
								<p className="mb-1 text-xs text-typography-muted">
									--font-serif (League Spartan)
								</p>
								<p className="text-2xl">
									The quick brown fox jumps over the lazy dog
								</p>
							</div>
						</div>

						<h3 className="mb-4 font-semibold text-lg text-typography-primary">
							Type Scale
						</h3>
						<div className="overflow-hidden rounded-xl border border-border bg-surface-1">
							{textSizes.map((size, i) => (
								<div
									key={size.name}
									className={`flex items-baseline gap-4 px-5 py-3 ${i !== 0 ? "border-t border-border" : ""}`}
								>
									<div className="w-16 shrink-0 font-mono text-xs text-typography-muted">
										{size.name}
									</div>
									<div className="w-12 shrink-0 text-xs text-typography-muted">
										{size.size}
									</div>
									<div
										className={`${size.class} text-typography-primary`}
									>
										BCT UI
									</div>
								</div>
							))}
						</div>
					</section>

					{/* Border Radius */}
					<section className="mb-16">
						<h2 className="mb-1 font-semibold text-2xl text-typography-primary">
							Border Radius
						</h2>
						<p className="mb-6 text-typography-secondary">
							Consistent corner rounding across all components.
						</p>
						<div className="flex flex-wrap items-end gap-6">
							{radiusTokens.map((r) => (
								<div key={r.name} className="flex flex-col items-center gap-2">
									<div
										className={`h-16 w-16 bg-primary/20 border-2 border-primary/40 ${r.class}`}
									/>
									<div className="text-center">
										<p className="text-xs font-medium text-typography-primary">
											{r.name}
										</p>
										<p className="text-xs text-typography-muted">{r.value}</p>
									</div>
								</div>
							))}
						</div>
					</section>

					{/* Shadows */}
					<section className="mb-16">
						<h2 className="mb-1 font-semibold text-2xl text-typography-primary">
							Shadows
						</h2>
						<p className="mb-6 text-typography-secondary">
							Box shadow tokens for depth and elevation.
						</p>
						<div className="flex flex-wrap gap-6">
							{shadowTokens.map((s) => (
								<div key={s.name} className="flex flex-col items-center gap-3">
									<div
										className={`h-20 w-32 rounded-lg bg-surface-1 ${s.class}`}
									/>
									<p className="text-xs text-typography-muted">{s.label}</p>
								</div>
							))}
						</div>
					</section>

					{/* Spacing */}
					<section className="mb-16">
						<h2 className="mb-1 font-semibold text-2xl text-typography-primary">
							Spacing
						</h2>
						<p className="mb-6 text-typography-secondary">
							BCT UI uses a base unit of <code>0.25rem (4px)</code>. All spacing
							values are multiples of this base.
						</p>
						<div className="flex flex-wrap items-end gap-4">
							{[1, 2, 3, 4, 6, 8, 10, 12, 16, 20].map((n) => (
								<div key={n} className="flex flex-col items-center gap-2">
									<div
										className="bg-primary/30"
										style={{ width: `${n * 4}px`, height: "32px" }}
									/>
									<p className="text-xs text-typography-muted">{n}</p>
									<p className="text-xs text-typography-muted">{n * 4}px</p>
								</div>
							))}
						</div>
					</section>

					{/* Dark Mode */}
					<section className="mb-16">
						<h2 className="mb-1 font-semibold text-2xl text-typography-primary">
							Dark Mode
						</h2>
						<p className="mb-4 text-typography-secondary">
							BCT UI enforces both light and dark themes. All components adapt
							automatically. Toggle dark mode using the button in the header.
						</p>
						<p className="text-typography-secondary">
							Dark mode is activated via the <code>.dark</code> class or{" "}
							<code>data-theme="dark"</code> attribute on any ancestor element.
							This lets you scope dark mode to specific sections of your UI.
						</p>
					</section>
				</div>
			</DocsLayout>
		</div>
	)
}
