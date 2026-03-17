import { Copy, Palette, Type } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { getPreferredVersion } from "@/lib/version-cookie"

export default async function TokensPage() {
	const version = await getPreferredVersion()

	const colorTokens = [
		{
			category: "Primary",
			tokens: [
				{ name: "--color-primary", value: "hsl(221, 83%, 53%)" },
				{ name: "--color-primary-hover", value: "hsl(221, 83%, 48%)" },
				{ name: "--color-primary-focus", value: "hsl(221, 83%, 43%)" },
				{ name: "--color-primary-on", value: "hsl(0, 0%, 100%)" },
			],
		},
		{
			category: "Secondary",
			tokens: [
				{ name: "--color-secondary", value: "hsl(262, 83%, 58%)" },
				{ name: "--color-secondary-hover", value: "hsl(262, 83%, 53%)" },
				{ name: "--color-secondary-focus", value: "hsl(262, 83%, 48%)" },
				{ name: "--color-secondary-on", value: "hsl(0, 0%, 100%)" },
			],
		},
		{
			category: "Semantic",
			tokens: [
				{ name: "--color-success", value: "hsl(142, 71%, 45%)" },
				{ name: "--color-warning", value: "hsl(38, 92%, 50%)" },
				{ name: "--color-error", value: "hsl(0, 84%, 60%)" },
				{ name: "--color-info", value: "hsl(199, 89%, 48%)" },
			],
		},
		{
			category: "Surface",
			tokens: [
				{ name: "--color-background", value: "hsl(0, 0%, 100%)" },
				{ name: "--color-surface-1", value: "hsl(210, 20%, 98%)" },
				{ name: "--color-surface-2", value: "hsl(214, 15%, 91%)" },
				{ name: "--color-surface-3", value: "hsl(213, 12%, 84%)" },
				{ name: "--color-border", value: "hsl(214, 15%, 91%)" },
			],
		},
		{
			category: "Typography",
			tokens: [
				{ name: "--color-typography-primary", value: "hsl(222, 47%, 11%)" },
				{ name: "--color-typography-secondary", value: "hsl(215, 14%, 34%)" },
				{ name: "--color-typography-muted", value: "hsl(215, 10%, 55%)" },
			],
		},
	]

	const spacingTokens = [
		{ name: "--spacing-0", value: "0px" },
		{ name: "--spacing-1", value: "0.25rem (4px)" },
		{ name: "--spacing-2", value: "0.5rem (8px)" },
		{ name: "--spacing-3", value: "0.75rem (12px)" },
		{ name: "--spacing-4", value: "1rem (16px)" },
		{ name: "--spacing-5", value: "1.25rem (20px)" },
		{ name: "--spacing-6", value: "1.5rem (24px)" },
		{ name: "--spacing-8", value: "2rem (32px)" },
		{ name: "--spacing-10", value: "2.5rem (40px)" },
		{ name: "--spacing-12", value: "3rem (48px)" },
		{ name: "--spacing-16", value: "4rem (64px)" },
		{ name: "--spacing-20", value: "5rem (80px)" },
	]

	const typographyTokens = [
		{ name: "--font-size-xs", value: "0.75rem (12px)" },
		{ name: "--font-size-sm", value: "0.875rem (14px)" },
		{ name: "--font-size-base", value: "1rem (16px)" },
		{ name: "--font-size-lg", value: "1.125rem (18px)" },
		{ name: "--font-size-xl", value: "1.25rem (20px)" },
		{ name: "--font-size-2xl", value: "1.5rem (24px)" },
		{ name: "--font-size-3xl", value: "1.875rem (30px)" },
		{ name: "--font-size-4xl", value: "2.25rem (36px)" },
		{ name: "--font-size-5xl", value: "3rem (48px)" },
	]

	const shadowTokens = [
		{ name: "--shadow-sm", value: "0 1px 2px 0 rgb(0 0 0 / 0.05)" },
		{
			name: "--shadow-md",
			value: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
		},
		{
			name: "--shadow-lg",
			value:
				"0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
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
									<Palette className="h-3.5 w-3.5" />
									<span>Design System</span>
								</div>
								<h1 className="font-bold text-4xl text-typography-primary tracking-tight sm:text-5xl">
									Design Tokens
								</h1>
								<p className="mt-4 max-w-2xl text-lg text-typography-secondary">
									Explore the design tokens that power BCT UI. All tokens are
									CSS variables that can be customized to match your brand.
								</p>
							</div>
						</div>

						{/* Color Tokens */}
						<div className="mt-12">
							<h2 className="mb-8 font-bold text-2xl text-typography-primary">
								Color Palette
							</h2>

							<div className="space-y-8">
								{colorTokens.map((group) => (
									<div key={group.category}>
										<h3 className="mb-4 font-semibold text-lg text-typography-primary">
											{group.category}
										</h3>
										<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
											{group.tokens.map((token) => (
												<div
													key={token.name}
													className="group relative overflow-hidden rounded-md bg-surface-1 shadow-sm transition-all"
												>
													<div
														className="h-24 w-full"
														style={{
															backgroundColor: `var(${token.name})`,
														}}
													/>
													<div className="p-4">
														<div className="flex items-center justify-between">
															<code className="font-mono text-sm text-typography-primary">
																{token.name}
															</code>
															<button
																type="button"
																className="opacity-0 transition-opacity group-hover:opacity-100"
																aria-label="Copy token name"
															>
																<Copy className="h-4 w-4 text-typography-muted hover:text-typography-primary" />
															</button>
														</div>
														<p className="mt-1 text-typography-muted text-xs">
															{token.value}
														</p>
													</div>
												</div>
											))}
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Spacing Scale */}
						<div className="mt-16">
							<h2 className="mb-8 font-bold text-2xl text-typography-primary">
								Spacing Scale
							</h2>
							<div className="overflow-hidden rounded-lg bg-background">
								<div className="divide-y divide-border">
									{spacingTokens.map((token) => (
										<div
											key={token.name}
											className="group flex items-center justify-between p-4 transition-colors hover:bg-surface-1"
										>
											<div className="flex items-center gap-6">
												<code className="w-32 font-mono text-sm text-typography-primary">
													{token.name}
												</code>
												<div
													className="h-6 rounded bg-primary"
													style={{
														width: `var(${token.name})`,
														minWidth: "2px",
													}}
												/>
											</div>
											<div className="flex items-center gap-4">
												<span className="text-sm text-typography-muted">
													{token.value}
												</span>
												<button
													type="button"
													className="opacity-0 transition-opacity group-hover:opacity-100"
													aria-label="Copy token name"
												>
													<Copy className="h-4 w-4 text-typography-muted hover:text-typography-primary" />
												</button>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>

						{/* Typography Scale */}
						<div className="mt-16">
							<h2 className="mb-8 font-bold text-2xl text-typography-primary">
								Typography Scale
							</h2>
							<div className="overflow-hidden rounded-lg bg-background">
								<div className="divide-y divide-border">
									{typographyTokens.map((token) => (
										<div
											key={token.name}
											className="group flex items-center justify-between p-6 transition-colors hover:bg-surface-1"
										>
											<div className="flex flex-1 items-center gap-6">
												<code className="w-40 font-mono text-sm text-typography-primary">
													{token.name}
												</code>
												<span
													className="font-medium text-typography-primary"
													style={{
														fontSize: `var(${token.name})`,
													}}
												>
													The quick brown fox
												</span>
											</div>
											<div className="flex items-center gap-4">
												<span className="text-sm text-typography-muted">
													{token.value}
												</span>
												<button
													type="button"
													className="opacity-0 transition-opacity group-hover:opacity-100"
													aria-label="Copy token name"
												>
													<Copy className="h-4 w-4 text-typography-muted hover:text-typography-primary" />
												</button>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>

						{/* Shadow Scale */}
						<div className="mt-16">
							<h2 className="mb-8 font-bold text-2xl text-typography-primary">
								Shadow Scale
							</h2>
							<div className="grid gap-6 sm:grid-cols-2">
								{shadowTokens.map((token) => (
									<div
										key={token.name}
										className="group relative overflow-hidden rounded-md bg-surface-1 p-6"
									>
										<div className="mb-4 flex items-center justify-between">
											<code className="font-mono text-sm text-typography-primary">
												{token.name}
											</code>
											<button
												type="button"
												className="opacity-0 transition-opacity group-hover:opacity-100"
												aria-label="Copy token name"
											>
												<Copy className="h-4 w-4 text-typography-muted hover:text-typography-primary" />
											</button>
										</div>
										<div
											className="h-24 rounded-lg bg-background"
											style={{
												boxShadow: `var(${token.name})`,
											}}
										/>
										<p className="mt-4 text-typography-muted text-xs">
											{token.value}
										</p>
									</div>
								))}
							</div>
						</div>

						{/* Usage Example */}
						<div className="mt-16">
							<h2 className="mb-6 font-bold text-2xl text-typography-primary">
								Usage in Your Project
							</h2>
							<div className="overflow-hidden rounded-lg bg-surface-2">
								<div className="border-border border-b bg-surface-1 px-4 py-3">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<Type className="h-4 w-4 text-typography-muted" />
											<span className="font-mono text-sm text-typography-primary">
												Custom Component
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
										<code className="text-typography-primary">{`// Use tokens in your Tailwind classes
<div className="bg-primary text-primary-on p-4 rounded-lg shadow-md">
  Primary colored box
</div>

// Or use CSS variables directly
<div style={{ 
  backgroundColor: 'var(--color-primary)',
  color: 'var(--color-primary-on)',
  padding: 'var(--spacing-4)',
  borderRadius: 'var(--rounded-md)',
  boxShadow: 'var(--shadow-md)'
}}>
  Custom styled box
</div>`}</code>
									</pre>
								</div>
							</div>
						</div>

						{/* Customization */}
						<div className="mt-16 rounded-md bg-linear-to-br from-primary/5 via-secondary/5 to-accent-1/5 p-8">
							<h3 className="font-bold text-2xl text-typography-primary">
								Customizing Tokens
							</h3>
							<p className="mt-4 text-typography-secondary">
								All design tokens are CSS variables defined in the{" "}
								<code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-sm">
									tokens/index.css
								</code>{" "}
								file. You can override any token by redefining it in your own
								CSS file.
							</p>
							<div className="mt-6 rounded-md bg-surface-1 p-4">
								<pre className="overflow-x-auto text-sm">
									<code className="text-typography-primary">{`:root {
  /* Override primary color */
  --color-primary: hsl(200, 90%, 50%);
  --color-primary-hover: hsl(200, 90%, 45%);
  
  /* Override spacing */
  --spacing-4: 1.25rem;
}`}</code>
								</pre>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	)
}
