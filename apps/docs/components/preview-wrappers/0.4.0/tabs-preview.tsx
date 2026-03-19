"use client"


import { useState } from "react"
import { Tabs  } from "../../../../../packages/ui/src/registry/versions/0.4.0/components/tabs"
import type { VariantExample } from "../types"

function BasicTabsPreview() {
	const [value, setValue] = useState("overview")
	return (
		<Tabs
			value={value}
			onValueChange={setValue}
			items={[
				{
					value: "overview",
					label: "Overview",
					content: (
						<div className="text-typography-primary">
							<h3 className="mb-2 font-semibold">Overview</h3>
							<p className="text-sm text-typography-secondary">
								This is the overview section with general information about
								the product.
							</p>
						</div>
					),
				},
				{
					value: "details",
					label: "Details",
					content: (
						<div className="text-typography-primary">
							<h3 className="mb-2 font-semibold">Details</h3>
							<p className="text-sm text-typography-secondary">
								Detailed specifications and technical information can be
								found here.
							</p>
						</div>
					),
				},
				{
					value: "settings",
					label: "Settings",
					content: (
						<div className="text-typography-primary">
							<h3 className="mb-2 font-semibold">Settings</h3>
							<p className="text-sm text-typography-secondary">
								Configure your preferences and options in this section.
							</p>
						</div>
					),
				},
			]}
		/>
	)
}

function DisabledTabPreview() {
	const [value, setValue] = useState("profile")
	return (
		<Tabs
			value={value}
			onValueChange={setValue}
			items={[
				{
					value: "profile",
					label: "Profile",
					content: (
						<div className="text-typography-primary">
							<h3 className="mb-2 font-semibold">Profile Settings</h3>
							<p className="text-sm text-typography-secondary">
								Manage your personal information and preferences.
							</p>
						</div>
					),
				},
				{
					value: "account",
					label: "Account",
					content: (
						<div className="text-typography-primary">
							<h3 className="mb-2 font-semibold">Account Settings</h3>
							<p className="text-sm text-typography-secondary">
								Update your account credentials and security settings.
							</p>
						</div>
					),
				},
				{
					value: "billing",
					label: "Billing",
					disabled: true,
					content: (
						<div className="text-typography-primary">
							<h3 className="mb-2 font-semibold">Billing Information</h3>
							<p className="text-sm text-typography-secondary">
								View and manage your billing details.
							</p>
						</div>
					),
				},
			]}
		/>
	)
}

export const variants: VariantExample[] = [
	{
		name: "Basic Tabs",
		description: "Simple tabbed interface with text content",
		code: `const [value, setValue] = useState("overview")

<Tabs
  value={value}
  onValueChange={setValue}
  items={[
    {
      value: "overview",
      label: "Overview",
      content: <div>Overview content...</div>
    },
    {
      value: "details",
      label: "Details",
      content: <div>Details content...</div>
    },
    {
      value: "settings",
      label: "Settings",
      content: <div>Settings content...</div>
    }
  ]}
/>`,
		preview: <BasicTabsPreview />,
	},
	{
		name: "With Disabled Tab",
		description: "Tabs with one disabled option",
		code: `const [value, setValue] = useState("profile")

<Tabs
  value={value}
  onValueChange={setValue}
  items={[
    {
      value: "profile",
      label: "Profile",
      content: <div>Profile settings...</div>
    },
    {
      value: "account",
      label: "Account",
      content: <div>Account settings...</div>
    },
    {
      value: "billing",
      label: "Billing",
      disabled: true,
      content: <div>Billing information...</div>
    }
  ]}
/>`,
		preview: <DisabledTabPreview />,
	},
]
