import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { DocsLayout } from "@/components/layout/docs-layout"

export const metadata: Metadata = {
	title: "Changelog",
	description: "What changed in each version of BCT UI.",
}

const changelog = [
	{
		version: "0.4.0",
		date: "2024",
		badge: "Latest",
		changes: [
			{
				type: "Added",
				items: ["Category system — all components now have a category field"],
			},
			{
				type: "Improved",
				items: [
					"Enhanced component descriptions across all registry entries",
					"Removed Base UI dependency from date-picker, sidebar, and header for better flexibility",
					"Added @tiptap/pm to RichTextInput dependencies",
					"Portal component now has empty deps array (pure React)",
				],
			},
		],
	},
	{
		version: "0.3.0",
		date: "2024",
		badge: null,
		changes: [
			{
				type: "Added",
				items: [
					"FileIcon — automatic icon from filename/MIME type",
					"ImagePreviewDialog — click-to-expand fullscreen image viewer with metadata",
					"FileDetailsDialog — file metadata panel (name, size, type, uploader, date)",
					"FileUploadInput — advanced upload with image grid previews and expand dialog",
					"Sidebar — application sidebar with logo slot, nav items, and user account popover",
					"Header — responsive application header with hamburger menu",
				],
			},
			{
				type: "Improved",
				items: [
					"Checkbox — added card variant, Lucide icons, and indeterminate state",
					"Radio — added card variant and Lucide icons",
					"RadioGroup — icon/label propagation to children",
					"Button — added muted variants (primary-muted, secondary-muted, etc.)",
					"Alert — added muted background tokens",
					"Avatar — added initials fallback and size variants (sm/md/lg/xl)",
					"Dialog — added slide-in panel mode (right on desktop, bottom on mobile)",
					"Tooltip — dark background styling",
					"Badge — added solid and muted variants",
					"TextInput — added icon slots (left/right) with click handlers",
				],
			},
		],
	},
	{
		version: "0.2.0",
		date: "2024",
		badge: null,
		changes: [
			{
				type: "Added",
				items: [
					"Initial release with 33 components",
					"Accordion, Alert, AlertDialog, Avatar, Badge, Breadcrumbs",
					"Button, Card, Checkbox, ColorPicker, DatePicker, DateRangePicker",
					"Dialog, Divider, DropdownMenu, FileUpload, NumberInput",
					"Pagination, Popover, Portal, Progress, Radio, RadioGroup",
					"RichTextInput, Select, Skeleton, Slider, Spinner, Switch",
					"Tabs, TextArea, TextInput, Tooltip",
					"BCT design token system (index.css) with light/dark theme support",
					"CLI commands: init, add, doctor",
					"Biome integration for linting and formatting",
					"Support for Next.js App Router and Vite + React Router",
				],
			},
		],
	},
]

const typeColors: Record<string, string> = {
	Added: "bg-success-muted text-typography-primary",
	Improved: "bg-info-muted text-typography-primary",
	Fixed: "bg-warning-muted text-typography-primary",
	Breaking: "bg-error-muted text-typography-primary",
}

export default function ChangelogPage() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<DocsLayout>
				<div className="max-w-3xl">
					<h1 className="mb-2 font-bold text-4xl text-typography-primary tracking-tight">
						Changelog
					</h1>
					<p className="mb-12 text-typography-secondary">
						Release history for BCT UI. All notable changes are documented here.
					</p>

					<div className="relative">
						{/* Timeline line */}
						<div className="absolute left-[7px] top-0 h-full w-px bg-border md:left-[9px]" />

						<div className="flex flex-col gap-12">
							{changelog.map(({ version, date, badge, changes }) => (
								<div key={version} className="relative pl-8 md:pl-10">
									{/* Timeline dot */}
									<div className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-primary bg-background" />

									<div className="flex flex-wrap items-center gap-3 mb-6">
										<h2 className="font-bold text-2xl text-typography-primary">
											v{version}
										</h2>
										{badge && (
											<span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
												{badge}
											</span>
										)}
										<span className="text-sm text-typography-muted">{date}</span>
									</div>

									<div className="flex flex-col gap-6">
										{changes.map(({ type, items }) => (
											<div key={type}>
												<div className="mb-3 inline-flex items-center">
													<span
														className={`rounded-full px-3 py-0.5 text-xs font-semibold ${typeColors[type] ?? "bg-surface-2 text-typography-primary"}`}
													>
														{type}
													</span>
												</div>
												<ul className="flex flex-col gap-1.5">
													{items.map((item) => (
														<li
															key={item}
															className="flex items-start gap-2 text-sm text-typography-secondary"
														>
															<span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-border-hover" />
															{item}
														</li>
													))}
												</ul>
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</DocsLayout>
		</div>
	)
}
