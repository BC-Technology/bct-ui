"use client"

import { useState } from "react"
import { Accordion } from "../../../../../packages/ui/src/registry/versions/0.4.0/components/accordion"
import type { VariantExample } from "../types"

function SingleExpansionPreview() {
	const [value, setValue] = useState<any>("")
	return (
		<Accordion
			value={value}
			onValueChange={setValue}
			items={[
				{
					value: "item-1",
					title: "What is your return policy?",
					children:
						"We offer a 30-day return policy on all items. Products must be in original condition with tags attached.",
				},
				{
					value: "item-2",
					title: "How long does shipping take?",
					children:
						"Standard shipping takes 5-7 business days. Express shipping is available for 2-3 day delivery.",
				},
				{
					value: "item-3",
					title: "Do you ship internationally?",
					children:
						"Yes, we ship to over 100 countries worldwide. International shipping times vary by location.",
				},
			]}
		/>
	)
}

function MultipleExpansionPreview() {
	const [value, setValue] = useState<any>([])
	return (
		<Accordion
			value={value}
			onValueChange={setValue}
			items={[
				{
					value: "features",
					title: "Features",
					children:
						"Advanced features include real-time collaboration, version control, and automated workflows.",
				},
				{
					value: "pricing",
					title: "Pricing",
					children:
						"Our pricing plans start at $9/month for individuals and $29/month for teams.",
				},
				{
					value: "support",
					title: "Support",
					children:
						"24/7 customer support available via email, chat, and phone for all paid plans.",
				},
			]}
		/>
	)
}

export const variants: VariantExample[] = [
	{
		name: "Single Expansion",
		description: "Only one item can be open at a time",
		code: `const [value, setValue] = useState<string>("")

<Accordion
  value={value}
  onValueChange={setValue}
  items={[
    {
      value: "item-1",
      title: "What is your return policy?",
      children: "We offer a 30-day return policy..."
    },
    {
      value: "item-2",
      title: "How long does shipping take?",
      children: "Standard shipping takes 5-7 business days..."
    },
    {
      value: "item-3",
      title: "Do you ship internationally?",
      children: "Yes, we ship to over 100 countries worldwide..."
    }
  ]}
/>`,
		preview: <SingleExpansionPreview />,
	},
	{
		name: "Multiple Expansion",
		description: "Multiple items can be open simultaneously",
		code: `const [value, setValue] = useState<string[]>([])

<Accordion
  value={value}
  onValueChange={setValue}
  items={[
    {
      value: "features",
      title: "Features",
      children: "Advanced features include..."
    },
    {
      value: "pricing",
      title: "Pricing",
      children: "Our pricing plans start at..."
    },
    {
      value: "support",
      title: "Support",
      children: "24/7 customer support available..."
    }
  ]}
/>`,
		preview: <MultipleExpansionPreview />,
	},
]
