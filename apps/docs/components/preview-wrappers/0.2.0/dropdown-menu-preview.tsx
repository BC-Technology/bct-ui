"use client"

import { Bell, ChevronDown, LogOut, Mail, Settings, User } from "lucide-react"
import { Button } from "../../../../../packages/ui/src/registry/versions/0.2.0/components/button"
import { DropdownMenu } from "../../../../../packages/ui/src/registry/versions/0.2.0/components/dropdown-menu"
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
		description: "Dropdown menu with icons",
		code: `<DropdownMenu
  trigger={<Button>Actions</Button>}
  items={[
    {
      value: "profile",
      label: (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>Profile</span>
        </div>
      )
    },
    {
      value: "settings",
      label: (
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </div>
      )
    }
  ]}
/>`,
		preview: (
			<DropdownMenu
				trigger={<Button>Actions</Button>}
				items={[
					{
						value: "profile",
						label: (
							<div className="flex items-center gap-2">
								<User className="h-4 w-4" />
								<span>Profile</span>
							</div>
						),
					},
					{
						value: "settings",
						label: (
							<div className="flex items-center gap-2">
								<Settings className="h-4 w-4" />
								<span>Settings</span>
							</div>
						),
					},
					{
						value: "notifications",
						label: (
							<div className="flex items-center gap-2">
								<Bell className="h-4 w-4" />
								<span>Notifications</span>
							</div>
						),
					},
					{
						value: "messages",
						label: (
							<div className="flex items-center gap-2">
								<Mail className="h-4 w-4" />
								<span>Messages</span>
							</div>
						),
					},
					{
						value: "logout",
						label: (
							<div className="flex items-center gap-2">
								<LogOut className="h-4 w-4" />
								<span>Logout</span>
							</div>
						),
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
