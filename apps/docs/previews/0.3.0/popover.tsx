"use client"

import { Bell, Settings } from "lucide-react"
import { Button } from "../../../../packages/ui/src/registry/versions/0.3.0/components/button"
import { Popover } from "../../../../packages/ui/src/registry/versions/0.3.0/components/popover"
import type { VariantPreview } from "../types"

export const variants: VariantPreview[] = [
	{
		name: "Default",
		description: "Popover with title and custom content",
		code: `<Popover
  title="Notifications"
  trigger={<Button variant="icon"><Bell /></Button>}
>
  <p>You have 3 unread notifications.</p>
</Popover>`,
		render: () => (
			<div className="flex items-center justify-center gap-4">
				<Popover
					title="Notifications"
					trigger={
						<Button variant="icon">
							<Bell className="h-4 w-4" />
						</Button>
					}
				>
					<div className="flex flex-col gap-2 p-4 text-sm">
						<div className="flex items-start gap-2 rounded-md p-2 hover:bg-surface-2">
							<div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
							<p className="text-typography-secondary">
								New component available: File Upload Input
							</p>
						</div>
						<div className="flex items-start gap-2 rounded-md p-2 hover:bg-surface-2">
							<div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-success" />
							<p className="text-typography-secondary">Build succeeded</p>
						</div>
					</div>
				</Popover>
				<Popover
					title="Settings"
					trigger={
						<Button variant="icon">
							<Settings className="h-4 w-4" />
						</Button>
					}
					side="right"
				>
					<div className="flex flex-col gap-3 p-4 text-sm">
						<div className="flex items-center justify-between">
							<span className="text-typography-primary">Dark mode</span>
							<input type="checkbox" className="h-4 w-4 accent-primary" />
						</div>
						<div className="flex items-center justify-between">
							<span className="text-typography-primary">Notifications</span>
							<input type="checkbox" defaultChecked className="h-4 w-4 accent-primary" />
						</div>
					</div>
				</Popover>
			</div>
		),
	},
]
