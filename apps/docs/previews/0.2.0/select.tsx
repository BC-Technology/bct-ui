"use client"

import { Select } from "../../../../packages/ui/src/registry/versions/0.2.0/components/select"
import type { VariantPreview } from "../types"

const frameworkOptions = [
	{ value: "next", label: "Next.js" },
	{ value: "vite", label: "Vite + React" },
	{ value: "remix", label: "Remix" },
	{ value: "astro", label: "Astro", disabled: true },
]

const countryOptions = [
	{ value: "dk", label: "Denmark" },
	{ value: "se", label: "Sweden" },
	{ value: "no", label: "Norway" },
	{ value: "fi", label: "Finland" },
	{ value: "de", label: "Germany" },
]

export const variants: VariantPreview[] = [
	{
		name: "Default",
		description: "Dropdown select with label and placeholder",
		code: `<Select
  label="Framework"
  placeholder="Select a framework"
  options={[
    { value: "next", label: "Next.js" },
    { value: "vite", label: "Vite + React" },
    { value: "remix", label: "Remix" },
  ]}
/>`,
		render: () => (
			<div className="flex w-full max-w-sm flex-col gap-4">
				<Select
					label="Framework"
					placeholder="Select a framework"
					options={frameworkOptions}
				/>
				<Select
					label="Country"
					placeholder="Select a country"
					options={countryOptions}
				/>
			</div>
		),
	},
	{
		name: "Error State",
		description: "Select with validation error",
		code: `<Select
  label="Role"
  placeholder="Select a role"
  options={options}
  error="Please select a role to continue."
/>`,
		render: () => (
			<div className="w-full max-w-sm">
				<Select
					label="Role"
					placeholder="Select a role"
					options={[
						{ value: "admin", label: "Admin" },
						{ value: "editor", label: "Editor" },
						{ value: "viewer", label: "Viewer" },
					]}
					error="Please select a role to continue."
				/>
			</div>
		),
	},
]
