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
					<div className="mx-auto w-full min-w-0">
						<div className="space-y-2">
							<h1 className="scroll-m-20 font-bold text-4xl tracking-tight">
								Getting Started
							</h1>
							<p className="text-lg text-typography-secondary">
								Install and configure BCT UI in your project.
							</p>
						</div>

						<div className="mt-8 space-y-8">
							<section className="space-y-4">
								<h2 className="scroll-m-20 border-border border-b pb-2 font-semibold text-3xl tracking-tight">
									Installation
								</h2>
								<p className="text-typography-secondary">
									Install the BCT UI CLI globally or use npx to run commands.
								</p>
								<div className="rounded-md border border-border bg-muted p-4">
									<code className="text-sm">
										npm install -g @bctechnology/ui
									</code>
								</div>
							</section>

							<section className="space-y-4">
								<h2 className="scroll-m-20 border-border border-b pb-2 font-semibold text-3xl tracking-tight">
									Initialize Your Project
								</h2>
								<p className="text-typography-secondary">
									Run the init command to set up your project with the necessary
									configuration files and dependencies.
								</p>
								<div className="rounded-md border border-border bg-muted p-4">
									<code className="text-sm">bct init</code>
								</div>
								<p className="text-sm text-typography-secondary">
									This will create the necessary configuration files and install
									required dependencies including Tailwind CSS v4 and Base UI.
								</p>
							</section>

							<section className="space-y-4">
								<h2 className="scroll-m-20 border-border border-b pb-2 font-semibold text-3xl tracking-tight">
									Add Components
								</h2>
								<p className="text-typography-secondary">
									Add individual components to your project as needed.
								</p>
								<div className="rounded-md border border-border bg-muted p-4">
									<code className="text-sm">bct add button</code>
								</div>
								<p className="text-sm text-typography-secondary">
									Components are copied directly to your project, giving you
									full control to customize them as needed.
								</p>
							</section>

							<section className="space-y-4">
								<h2 className="scroll-m-20 border-border border-b pb-2 font-semibold text-3xl tracking-tight">
									Version Selection
								</h2>
								<p className="text-typography-secondary">
									BCT UI supports multiple versions. You can specify which
									version to use when adding components.
								</p>
								<div className="rounded-md border border-border bg-muted p-4">
									<code className="text-sm">
										bct add button --version 0.4.0
									</code>
								</div>
								<p className="text-sm text-typography-secondary">
									Available versions: 0.2.0, 0.3.0, 0.4.0 (latest)
								</p>
							</section>

							<section className="space-y-4">
								<h2 className="scroll-m-20 border-border border-b pb-2 font-semibold text-3xl tracking-tight">
									Usage
								</h2>
								<p className="text-typography-secondary">
									Import and use components in your React application.
								</p>
								<div className="rounded-md border border-border bg-muted p-4">
									<pre className="text-sm">
										<code>{`import { Button } from "@/components/button"

export function MyComponent() {
  return (
    <Button variant="primary">
      Click me
    </Button>
  )
}`}</code>
									</pre>
								</div>
							</section>
						</div>
					</div>
				</main>
			</div>
		</div>
	)
}
