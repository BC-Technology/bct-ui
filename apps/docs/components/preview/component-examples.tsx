"use client"

import { useEffect, useState } from "react"
import { VariantSection } from "./variant-section"
import type { VariantExample } from "@/lib/preview-generator"

interface ComponentExamplesProps {
	version: string
	componentName: string
	serverVariants: VariantExample[]
}

export function ComponentExamples({ version, componentName, serverVariants }: ComponentExamplesProps) {
	const [clientVariants, setClientVariants] = useState<VariantExample[] | null>(null)

	useEffect(() => {
		let isMounted = true

		async function loadClientVariants() {
			try {
				// Dynamically import the wrapper. Webpack will create chunks for these.
				// Need to use absolute or relative path that works with Next.js dynamic import bundling
				const mod = await import(`@/components/preview-wrappers/${version}/${componentName}-preview.tsx`)
				if (isMounted) {
					setClientVariants(mod.variants || [])
				}
			} catch (error) {
				console.error("Failed to load client variants:", error);
				// No client wrapper exists for this component
				if (isMounted) {
					setClientVariants([])
				}
			}
		}

		loadClientVariants()

		return () => {
			isMounted = false
		}
	}, [version, componentName])

	// If clientVariants is still loading, maybe show a skeleton or just use server variants for now
	const variantsToShow = clientVariants !== null && clientVariants.length > 0 
		? clientVariants 
		: serverVariants

	if (!variantsToShow || variantsToShow.length === 0) {
		return null
	}

	return (
		<div className="mt-12">
			<div className="mb-8">
				<h2 className="font-bold text-3xl text-typography-primary">
					Examples
				</h2>
				<p className="mt-2 text-typography-secondary">
					Explore different variants and use cases for this component
				</p>
			</div>
			<div className="space-y-8">
				{variantsToShow.map((variant, index) => (
					<VariantSection
						key={`${variant.name}-${index}`}
						name={variant.name}
						description={variant.description}
						code={variant.code}
						preview={variant.preview}
					/>
				))}
			</div>
		</div>
	)
}
