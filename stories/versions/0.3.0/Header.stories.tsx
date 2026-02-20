import type { Meta, StoryObj } from "@storybook/react"
import { BarChart2, FileText, Home, Settings, Users } from "lucide-react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
// @ts-expect-error
import { Header } from "@/registry/versions/0.3.0/components/header"

const meta = {
	title: "Components/0.3.0/Header",
	component: Header,
	tags: ["version:0.3.0"],
	parameters: {
		layout: "fullscreen",
	},
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

const navItems = [
	{ label: "Dashboard", href: "/", icon: <Home className="size-4" /> },
	{ label: "Analytics", href: "/analytics", icon: <BarChart2 className="size-4" /> },
	{ label: "Documents", href: "/documents", icon: <FileText className="size-4" /> },
	{ label: "Users", href: "/users", icon: <Users className="size-4" /> },
	{ label: "Settings", href: "/settings", icon: <Settings className="size-4" /> },
]

const user = {
	name: "Jonas Blendstrup",
	email: "jonas@example.com",
	avatarUrl: "https://i.pravatar.cc/150?img=12",
}

export const Default: Story = {
	render: () => (
		<div className="min-h-screen">
			<Header navItems={navItems} user={user} />
			<main className="p-8">
				<h1 className="font-bold text-2xl">Main Content</h1>
				<p className="mt-2 text-typography-muted">The header is at the top.</p>
			</main>
		</div>
	),
}

export const WithActiveItem: Story = {
	render: () => (
		<div className="min-h-screen">
			<Header navItems={navItems} user={user} activeHref="/analytics" />
			<main className="p-8">
				<h1 className="font-bold text-2xl">Analytics</h1>
				<p className="mt-2 text-typography-muted">Analytics is the active nav item.</p>
			</main>
		</div>
	),
}

export const WithoutUser: Story = {
	render: () => (
		<div className="min-h-screen">
			<Header navItems={navItems} />
			<main className="p-8">
				<h1 className="font-bold text-2xl">Main Content</h1>
				<p className="mt-2 text-typography-muted">Header without user info.</p>
			</main>
		</div>
	),
}

export const WithLogo: Story = {
	render: () => (
		<div className="min-h-screen">
			<Header
				navItems={navItems}
				user={user}
				logo={<span className="font-bold text-lg">BCT UI</span>}
			/>
			<main className="p-8">
				<h1 className="font-bold text-2xl">Main Content</h1>
				<p className="mt-2 text-typography-muted">Header with custom logo.</p>
			</main>
		</div>
	),
}
