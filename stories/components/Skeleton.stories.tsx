import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
// @ts-expect-error
import { Skeleton } from "@/registry/versions/0.2.0/components/skeleton"

const meta = {
	title: "Components/Skeleton",
	component: Skeleton,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {
	args: {
		variant: "text",
		className: "w-48",
	},
}

export const Circular: Story = {
	args: {
		variant: "circular",
		className: "size-12",
	},
}

export const Rectangular: Story = {
	args: {
		variant: "rectangular",
		className: "h-32 w-48",
	},
}

export const CardSkeleton: Story = {
	render: () => (
		<div className="w-80 space-y-4 rounded-lg border border-border p-4">
			<div className="flex items-center gap-4">
				<Skeleton variant="circular" className="size-12" />
				<div className="flex-1 space-y-2">
					<Skeleton variant="text" className="w-3/4" />
					<Skeleton variant="text" className="w-1/2" />
				</div>
			</div>
			<Skeleton variant="rectangular" className="h-32 w-full" />
			<div className="space-y-2">
				<Skeleton variant="text" className="w-full" />
				<Skeleton variant="text" className="w-5/6" />
			</div>
		</div>
	),
}
