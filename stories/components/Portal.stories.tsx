import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React, { useState } from "react"
// @ts-expect-error
import { Button } from "@/registry/versions/0.2.0/components/button"
// @ts-expect-error
import { Portal } from "@/registry/versions/0.2.0/components/portal"

const meta = {
	title: "Components/Portal",
	component: Portal,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Portal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => {
		const [show, setShow] = useState(false)
		return (
			<div>
				<Button onClick={() => setShow(!show)}>
					{show ? "Hide" : "Show"} Portal Content
				</Button>
				{show && (
					<Portal>
						<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
							<div className="rounded-lg bg-white p-6 shadow-lg dark:bg-surface-1">
								<h2 className="mb-4 font-semibold text-xl">Portal Content</h2>
								<p className="mb-4">
									This content is rendered in a portal at the document root.
								</p>
								<Button onClick={() => setShow(false)}>Close</Button>
							</div>
						</div>
					</Portal>
				)}
			</div>
		)
	},
}
