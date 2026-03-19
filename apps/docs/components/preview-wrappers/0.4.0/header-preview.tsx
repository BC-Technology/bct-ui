"use client"


import { Home, Info, Package } from "lucide-react"
import { Header  } from "../../../../../packages/ui/src/registry/versions/0.4.0/components/header"
import type { VariantExample } from "../types"

export const variants: VariantExample[] = [
	{
		name: "Basic Header",
		description: "Header with navigation items",
		code: `<Header
  logo={<span className="font-bold text-xl">Logo</span>}
  navItems={[
    { icon: Home, label: "Home", href: "/" },
    { icon: Package, label: "Products", href: "/products" },
    { icon: Info, label: "About", href: "/about" }
  ]}
/>`,
		preview: (
			<div className="w-full">
				<Header
					logo={<span className="font-bold text-xl">Logo</span>}
					navItems={[
						{ icon: Home, label: "Home", href: "/" },
						{ icon: Package, label: "Products", href: "/products" },
						{ icon: Info, label: "About", href: "/about" },
					]}
				/>
			</div>
		),
	},
	{
		name: "With User Account",
		description: "Header with user account section",
		code: `<Header
  logo={<span className="font-bold text-xl">App Name</span>}
  navItems={[
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Info, label: "Settings", href: "/settings" }
  ]}
  user={{
    name: "John Doe",
    email: "john@example.com"
  }}
/>`,
		preview: (
			<div className="w-full">
				<Header
					logo={<span className="font-bold text-xl">App Name</span>}
					navItems={[
						{ icon: Home, label: "Dashboard", href: "/dashboard" },
						{ icon: Info, label: "Settings", href: "/settings" },
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
