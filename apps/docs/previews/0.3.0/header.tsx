"use client"

import { BarChart2, FileText, Home, Layers, Users } from "lucide-react"
import { Header } from "../../../../packages/ui/src/registry/versions/0.3.0/components/header"
import type { SidebarNavItem } from "../../../../packages/ui/src/registry/versions/0.3.0/components/sidebar"
import type { VariantPreview } from "../types"

const navItems: SidebarNavItem[] = [
	{ href: "/", label: "Dashboard", icon: Home, isActive: true },
	{ href: "/projects", label: "Projects", icon: Layers },
	{ href: "/team", label: "Team", icon: Users },
	{ href: "/reports", label: "Reports", icon: BarChart2 },
	{ href: "/docs", label: "Documentation", icon: FileText },
]

const user = {
	name: "Jonas Blendstrup",
	email: "jonas@bctechnology.dk",
}

export const variants: VariantPreview[] = [
	{
		name: "Default",
		description:
			"Application header with navigation, user section, and mobile hamburger menu",
		code: `<Header
  logo={<span className="font-bold">MyApp</span>}
  navItems={navItems}
  user={user}
  onSettings={() => {}}
  onLogout={() => {}}
/>`,
		render: () => (
			<div className="relative min-h-16 w-full translate-x-0 overflow-hidden rounded-xl border border-border">
				<Header
					logo={
						<div className="flex items-center gap-2">
							<div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
								<Layers className="h-4 w-4 text-primary-on" />
							</div>
							<span className="font-bold text-sm">BCT App</span>
						</div>
					}
					navItems={navItems}
					user={user}
					onNavItemClick={() => {}}
					onSettings={() => {}}
					onLogout={() => {}}
				/>
			</div>
		),
	},
]
