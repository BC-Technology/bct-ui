import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
import { Breadcrumbs } from "../../packages/ui/src/registry/versions/0.2.0/components/breadcrumbs"

const meta = {
	title: "Components/Breadcrumbs",
	component: Breadcrumbs,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Breadcrumbs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		items: [
			{ label: "Home", href: "/" },
			{ label: "Products", href: "/products" },
			{ label: "Electronics", href: "/products/electronics" },
			{ label: "Laptops" },
		],
	},
}

export const Short: Story = {
	args: {
		items: [{ label: "Home", href: "/" }, { label: "About" }],
	},
}

export const Long: Story = {
	args: {
		items: [
			{ label: "Home", href: "/" },
			{ label: "Category", href: "/category" },
			{ label: "Subcategory", href: "/category/subcategory" },
			{ label: "Product Type", href: "/category/subcategory/type" },
			{ label: "Specific Item" },
		],
	},
}
