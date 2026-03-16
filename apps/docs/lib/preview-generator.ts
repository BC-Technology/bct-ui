export interface VariantExample {
	name: string
	description: string
	code: string
	props: Record<string, any>
}

/**
 * Generates example code for a component variant
 */
export function generateVariantCode(
	componentName: string,
	props: Record<string, any>,
): string {
	const pascalName = componentName
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join("")

	const propsString = Object.entries(props)
		.map(([key, value]) => {
			if (typeof value === "string") {
				return `${key}="${value}"`
			}
			if (typeof value === "boolean") {
				return value ? key : ""
			}
			return `${key}={${JSON.stringify(value)}}`
		})
		.filter(Boolean)
		.join(" ")

	const children = props.children || "Click me"
	delete props.children

	return `<${pascalName} ${propsString}>
  ${children}
</${pascalName}>`
}

/**
 * Auto-generates variant examples for common component patterns
 */
export function generateVariantExamples(
	componentName: string,
): VariantExample[] {
	// Button variants
	if (componentName === "button") {
		return [
			{
				name: "Primary",
				description: "Default primary button for main actions",
				code: generateVariantCode("button", {
					variant: "primary",
					children: "Primary Button",
				}),
				props: { variant: "primary", children: "Primary Button" },
			},
			{
				name: "Primary Muted",
				description: "Subtle primary button for secondary actions",
				code: generateVariantCode("button", {
					variant: "primary-muted",
					children: "Primary Muted",
				}),
				props: { variant: "primary-muted", children: "Primary Muted" },
			},
			{
				name: "Secondary",
				description: "Secondary button for alternative actions",
				code: generateVariantCode("button", {
					variant: "secondary",
					children: "Secondary Button",
				}),
				props: { variant: "secondary", children: "Secondary Button" },
			},
			{
				name: "Error",
				description: "Destructive button for dangerous actions",
				code: generateVariantCode("button", {
					variant: "error",
					children: "Delete",
				}),
				props: { variant: "error", children: "Delete" },
			},
			{
				name: "Success",
				description: "Success button for positive actions",
				code: generateVariantCode("button", {
					variant: "success",
					children: "Confirm",
				}),
				props: { variant: "success", children: "Confirm" },
			},
			{
				name: "Sizes",
				description: "Available button sizes: small, medium, large",
				code: `<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`,
				props: { size: "md", children: "Medium" },
			},
		]
	}

	// Text Input variants
	if (componentName === "text-input") {
		return [
			{
				name: "Default",
				description: "Basic text input with label",
				code: generateVariantCode("text-input", {
					label: "Email",
					placeholder: "Enter your email",
				}),
				props: { label: "Email", placeholder: "Enter your email" },
			},
			{
				name: "With Helper Text",
				description: "Input with helpful context",
				code: generateVariantCode("text-input", {
					label: "Username",
					placeholder: "Choose a username",
					helperText: "Must be unique and at least 3 characters",
				}),
				props: {
					label: "Username",
					placeholder: "Choose a username",
					helperText: "Must be unique and at least 3 characters",
				},
			},
			{
				name: "Error State",
				description: "Input with validation error",
				code: generateVariantCode("text-input", {
					label: "Email",
					placeholder: "Enter your email",
					error: "Please enter a valid email address",
				}),
				props: {
					label: "Email",
					placeholder: "Enter your email",
					error: "Please enter a valid email address",
				},
			},
		]
	}

	// Checkbox variants
	if (componentName === "checkbox") {
		return [
			{
				name: "Default",
				description: "Basic checkbox with label",
				code: generateVariantCode("checkbox", {
					label: "Accept terms and conditions",
				}),
				props: { label: "Accept terms and conditions" },
			},
			{
				name: "Card Variant",
				description: "Checkbox displayed as a card",
				code: generateVariantCode("checkbox", {
					label: "Enable notifications",
					variant: "card",
				}),
				props: { label: "Enable notifications", variant: "card" },
			},
		]
	}

	// Default: return a single basic example
	return [
		{
			name: "Default",
			description: `Basic ${componentName} component`,
			code: `<${componentName
				.split("-")
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join("")} />`,
			props: {},
		},
	]
}
