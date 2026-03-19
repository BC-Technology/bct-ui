"use client"


import { Bell, ChevronDown, LogOut, Mail, Settings, User } from "lucide-react"
import { Button  } from "../../../../../packages/ui/src/registry/versions/0.4.0/components/button"
import { DropdownMenu  } from "../../../../../packages/ui/src/registry/versions/0.4.0/components/dropdown-menu"
import type { VariantExample } from "../types"

export const variants: VariantExample[] = [
	{
		name: "Basic Menu",
		description: "Simple dropdown menu with text items",
		code: `<DropdownMenu
  trigger={<Button>Options <ChevronDown /></Button>}
  items={[
    { label: "Edit", value: "edit", onClick: () => console.log("Edit") },
    { label: "Duplicate", value: "duplicate", onClick: () => console.log("Duplicate") },
    { label: "Archive", value: "archive", onClick: () => console.log("Archive") },
    { label: "Delete", value: "delete", onClick: () => console.log("Delete") }
  ]}
/>`,
		preview: (
			<DropdownMenu
				trigger={
					<Button>
						Options <ChevronDown className="ml-2 h-4 w-4" />
					</Button>
				}
				items={[
					{
						label: "Edit",
						value: "edit",
						onClick: () => {},
					},
					{
						label: "Duplicate",
						value: "duplicate",
						onClick: () => {},
					},
					{
						label: "Archive",
						value: "archive",
						onClick: () => {},
					},
					{
						label: "Delete",
						value: "delete",
						onClick: () => {},
					},
				]}
			/>
		),
	},
	{
		name: "With Icons",
		description: "Menu items with leading icons",
		code: `<DropdownMenu
  trigger={<Button>Account <ChevronDown /></Button>}
  items={[
    { label: "Profile", value: "profile", icon: <User />, onClick: () => {} },
    { label: "Settings", value: "settings", icon: <Settings />, onClick: () => {} },
    { label: "Notifications", value: "notifications", icon: <Bell />, onClick: () => {} },
    { label: "Messages", value: "messages", icon: <Mail />, onClick: () => {} },
    { label: "Logout", value: "logout", icon: <LogOut />, onClick: () => {} }
  ]}
/>`,
		preview: (
			<DropdownMenu
				trigger={
					<Button>
						Account <ChevronDown className="ml-2 h-4 w-4" />
					</Button>
				}
				items={[
					{
						label: "Profile",
						value: "profile",
						icon: <User className="h-4 w-4" />,
						onClick: () => {},
					},
					{
						label: "Settings",
						value: "settings",
						icon: <Settings className="h-4 w-4" />,
						onClick: () => {},
					},
					{
						label: "Notifications",
						value: "notifications",
						icon: <Bell className="h-4 w-4" />,
						onClick: () => {},
					},
					{
						label: "Messages",
						value: "messages",
						icon: <Mail className="h-4 w-4" />,
						onClick: () => {},
					},
					{
						label: "Logout",
						value: "logout",
						icon: <LogOut className="h-4 w-4" />,
						onClick: () => {},
					},
				]}
			/>
		),
	},
	{
		name: "With Disabled Items",
		description: "Menu with some disabled options",
		code: `<DropdownMenu
  trigger={<Button variant="secondary">Actions</Button>}
  items={[
    { label: "View", value: "view", onClick: () => {} },
    { label: "Edit", value: "edit", onClick: () => {} },
    { label: "Share", value: "share", disabled: true, onClick: () => {} },
    { label: "Delete", value: "delete", disabled: true, onClick: () => {} }
  ]}
/>`,
		preview: (
			<DropdownMenu
				trigger={<Button variant="secondary">Actions</Button>}
				items={[
					{
						label: "View",
						value: "view",
						onClick: () => {},
					},
					{
						label: "Edit",
						value: "edit",
						onClick: () => {},
					},
					{
						label: "Share",
						value: "share",
						disabled: true,
						onClick: () => {},
					},
					{
						label: "Delete",
						value: "delete",
						disabled: true,
						onClick: () => {},
					},
				]}
			/>
		),
	},
]
