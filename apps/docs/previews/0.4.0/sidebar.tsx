"use client"

import {
	BarChart2,
	FileText,
	Home,
	Layers,
	Settings,
	Users,
} from "lucide-react"
import type { SidebarNavItem } from "../../../../packages/ui/src/registry/versions/0.4.0/components/sidebar"
import { Sidebar } from "../../../../packages/ui/src/registry/versions/0.4.0/components/sidebar"
import type { VariantPreview } from "../types"

const navItems: SidebarNavItem[] = [
	{ href: "/", label: "Dashboard", icon: Home, isActive: true },
	{ href: "/projects", label: "Projects", icon: Layers },
	{ href: "/team", label: "Team", icon: Users },
	{ href: "/reports", label: "Reports", icon: BarChart2 },
	{ href: "/docs", label: "Documentation", icon: FileText },
	{ href: "/settings", label: "Settings", icon: Settings },
]

const user = {
	name: "Jonas Blendstrup",
	email: "jonas@bctechnology.dk",
}

export const variants: VariantPreview[] = [
	{
		name: "Default",
		description:
			"Application sidebar with logo, nav items, and user account section",
		code: `<Sidebar
  logo={<span className="font-bold text-lg">MyApp</span>}
  navItems={navItems}
  user={{ name: "Jonas", email: "jonas@bct.dk" }}
  onSettings={() => {}}
  onLogout={() => {}}
/>`,
		render: () => (
			<div className="h-[480px] w-64 overflow-hidden rounded-xl border border-border">
				<Sidebar
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
