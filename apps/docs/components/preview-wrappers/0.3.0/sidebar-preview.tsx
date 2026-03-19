"use client"


import { FileText, Home, Settings, Users } from "lucide-react"
import { Sidebar  } from "../../../../../packages/ui/src/registry/versions/0.3.0/components/sidebar"
import type { VariantExample } from "../types"

export const variants: VariantExample[] = [
	{
		name: "Basic Sidebar",
		description: "Sidebar with navigation items",
		code: `<Sidebar
  logo={<span className="font-bold">App</span>}
  navItems={[
    { icon: Home, label: "Home", href: "/" },
    { icon: FileText, label: "Documents", href: "/docs" },
    { icon: Users, label: "Team", href: "/team" },
    { icon: Settings, label: "Settings", href: "/settings" }
  ]}
/>`,
		preview: (
			<div className="h-96 w-64">
				<Sidebar
					logo={<span className="font-bold">App</span>}
					navItems={[
						{ icon: Home, label: "Home", href: "/" },
						{
							icon: FileText,
							label: "Documents",
							href: "/docs",
						},
						{
							icon: Users,
							label: "Team",
							href: "/team",
						},
						{
							icon: Settings,
							label: "Settings",
							href: "/settings",
						},
					]}
				/>
			</div>
		),
	},
	{
		name: "With User Section",
		description: "Sidebar with user account at bottom",
		code: `<Sidebar
  logo={<span className="font-bold">Dashboard</span>}
  navItems={[
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: FileText, label: "Projects", href: "/projects" }
  ]}
  user={{
    name: "John Doe",
    email: "john@example.com"
  }}
/>`,
		preview: (
			<div className="h-96 w-64">
				<Sidebar
					logo={<span className="font-bold">Dashboard</span>}
					navItems={[
						{
							icon: Home,
							label: "Dashboard",
							href: "/",
						},
						{
							icon: FileText,
							label: "Projects",
							href: "/projects",
						},
					]}
					user={{
						name: "John Doe",
						email: "john@example.com",
					}}
				/>
			</div>
		),
	},
]
