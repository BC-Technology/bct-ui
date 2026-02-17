import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React, { useState } from "react"
import { Pagination } from "../../packages/ui/src/registry/versions/0.2.0/components/pagination"

const meta = {
	title: "Components/Pagination",
	component: Pagination,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		currentPage: 1,
		totalPages: 10,
		// biome-ignore lint/suspicious/noConsole: allowed for stories
		onPageChange: (page) => console.log("Page changed to:", page),
	},
	render: (args) => {
		const [page, setPage] = useState(args.currentPage)
		return <Pagination {...args} currentPage={page} onPageChange={setPage} />
	},
}

export const ManyPages: Story = {
	args: {
		currentPage: 5,
		totalPages: 20,
		// biome-ignore lint/suspicious/noConsole: allowed for stories
		onPageChange: (page) => console.log("Page changed to:", page),
	},
	render: (args) => {
		const [page, setPage] = useState(args.currentPage)
		return <Pagination {...args} currentPage={page} onPageChange={setPage} />
	},
}

export const FewPages: Story = {
	args: {
		currentPage: 2,
		totalPages: 3,
		// biome-ignore lint/suspicious/noConsole: allowed for stories
		onPageChange: (page) => console.log("Page changed to:", page),
	},
	render: (args) => {
		const [page, setPage] = useState(args.currentPage)
		return <Pagination {...args} currentPage={page} onPageChange={setPage} />
	},
}
