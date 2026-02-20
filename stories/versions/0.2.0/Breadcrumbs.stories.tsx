import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
// @ts-expect-error
import { Breadcrumbs } from "@/registry/versions/0.2.0/components/breadcrumbs"

const meta = {
	title: "Components/0.2.0/Breadcrumbs",
	component: Breadcrumbs,
	tags: ["version:0.2.0"],
	parameters: {
		layout: "centered",
	},
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
