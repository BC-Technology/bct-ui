"use client"

import { Accordion } from "../../../../packages/ui/src/registry/versions/0.3.0/components/accordion"
import type { VariantPreview } from "../types"

const items = [
	{
		value: "item-1",
		title: "What is BCT UI?",
		children:
			"BCT UI is a comprehensive component library and design system for BCT's frontend projects. It provides ready-to-use components built with React and Tailwind CSS v4.",
	},
	{
		value: "item-2",
		title: "How do I install a component?",
		children:
			"Run `bct add <component-name>` to copy a component directly into your project. Components become part of your codebase, giving you full control.",
	},
	{
		value: "item-3",
		title: "Does it support dark mode?",
		children:
			"Yes! BCT UI enforces both a light and dark theme through its design token system. All components automatically adapt to the active theme.",
	},
]

export const variants: VariantPreview[] = [
	{
		name: "Default",
		description: "Collapsible accordion with animated panels",
		code: `<Accordion
  items={[
    {
      value: "item-1",
      title: "What is BCT UI?",
      children: "BCT UI is a comprehensive component library...",
    },
    {
      value: "item-2",
      title: "How do I install a component?",
      children: "Run bct add <component-name>...",
    },
  ]}
/>`,
		render: () => (
			<div className="w-full max-w-lg">
				<Accordion items={items} />
			</div>
		),
	},
]
