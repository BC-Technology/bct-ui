import clsx from "clsx"
import { useState } from "react"
import { registry } from "../../../packages/ui/src/registry/registry"

const sources = import.meta.glob(
	"../../../packages/ui/src/registry/components/*.tsx",
	{
		as: "raw",
		eager: true,
	},
) as Record<string, string>

function sourceFor(componentName: string) {
	const filename = `${componentName}.tsx`
	const entry = Object.entries(sources).find(([p]) =>
		p.endsWith(`/${filename}`),
	)
	return entry?.[1] ?? null
}

export function App() {
	const names = Object.keys(registry).sort()
	const [selected, setSelected] = useState<string>(names[0] ?? "")

	const entry = selected ? registry[selected] : null
	const code = selected ? sourceFor(selected) : null

	return (
		<main className="min-h-dvh bg-(--bct-bg) p-6 text-(--bct-fg)">
			<header className="flex flex-col gap-1">
				<h1 className="font-semibold text-2xl">BCT UI</h1>
				<p className="text-(--bct-muted-fg) text-sm">
					Docs are generated from the same registry source that the CLI copies
					into apps.
				</p>
			</header>

			<div className="mt-6 grid gap-4 md:grid-cols-[240px_1fr]">
				<nav className="rounded-(--bct-radius-lg) border border-(--bct-border) bg-(--bct-card) p-3">
					<h2 className="font-medium text-sm">Components</h2>
					<ul className="mt-2 flex flex-col gap-1">
						{names.map((name) => (
							<li key={name}>
								<button
									className={clsx(
										"w-full rounded-(--bct-radius-md) px-2 py-1 text-left text-sm",
										name === selected
											? "bg-(--bct-muted) text-(--bct-fg)"
											: "text-(--bct-muted-fg) hover:bg-(--bct-muted)",
									)}
									onClick={() => setSelected(name)}
									type="button"
								>
									{name}
								</button>
							</li>
						))}
					</ul>
				</nav>

				<section className="rounded-(--bct-radius-lg) border border-(--bct-border) bg-(--bct-card) p-4">
					{entry ? (
						<div className="flex flex-col gap-3">
							<div>
								<h2 className="font-semibold text-xl">{entry.title}</h2>
								{entry.description ? (
									<p className="mt-1 text-(--bct-muted-fg) text-sm">
										{entry.description}
									</p>
								) : null}
							</div>

							<div className="flex flex-wrap gap-2 text-xs">
								<span className="rounded bg-(--bct-muted) px-2 py-1">
									Deps: {entry.deps.join(", ")}
								</span>
								<span className="rounded bg-(--bct-muted) px-2 py-1">
									Files: {entry.files.map((f) => f.dst).join(", ")}
								</span>
							</div>

							{code ? (
								<pre className="overflow-auto rounded-(--bct-radius-md) bg-(--bct-muted) p-3 text-xs">
									<code>{code}</code>
								</pre>
							) : (
								<p className="text-(--bct-muted-fg) text-sm">
									No source found for <code>{selected}</code>.
								</p>
							)}
						</div>
					) : (
						<p className="text-(--bct-muted-fg) text-sm">Select a component.</p>
					)}
				</section>
			</div>
		</main>
	)
}
