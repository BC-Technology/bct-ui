"use client"


import { Avatar  } from "../../../../../packages/ui/src/registry/versions/0.4.0/components/avatar"
import { SAMPLE_IMAGE_1 } from "../shared/utils"
import type { VariantExample } from "../types"

export const variants: VariantExample[] = [
	{
		name: "With Image",
		description: "Avatar displaying an image",
		code: `<Avatar
  src="https://example.com/avatar.jpg"
  alt="User Avatar"
/>`,
		preview: <Avatar src={SAMPLE_IMAGE_1} alt="User Avatar" />,
	},
	{
		name: "With Initials",
		description: "Avatar with initials fallback",
		code: `<Avatar fallback="JD" />`,
		preview: <Avatar fallback="JD" />,
	},
	{
		name: "Different Sizes",
		description: "Avatar in different sizes",
		code: `<div className="flex gap-4 items-center">
  <Avatar fallback="SM" size="sm" />
  <Avatar fallback="MD" size="md" />
  <Avatar fallback="LG" size="lg" />
</div>`,
		preview: (
			<div className="flex items-center gap-4">
				<Avatar fallback="SM" size="sm" />
				<Avatar fallback="MD" size="md" />
				<Avatar fallback="LG" size="lg" />
			</div>
		),
	},
]
