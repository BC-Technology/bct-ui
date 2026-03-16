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

	// Select variants
	if (componentName === "select") {
		const options = [
			{ value: "apple", label: "Apple" },
			{ value: "banana", label: "Banana" },
			{ value: "orange", label: "Orange" },
		]
		return [
			{
				name: "Default",
				description: "Basic select dropdown",
				code: `<Select 
  label="Choose a fruit"
  options={[
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" }
  ]}
/>`,
				props: { label: "Choose a fruit", options },
			},
		]
	}

	// Switch variants
	if (componentName === "switch") {
		return [
			{
				name: "Default",
				description: "Basic toggle switch",
				code: generateVariantCode("switch", {
					label: "Enable notifications",
				}),
				props: { label: "Enable notifications" },
			},
		]
	}

	// Slider variants
	if (componentName === "slider") {
		return [
			{
				name: "Default",
				description: "Basic range slider",
				code: generateVariantCode("slider", {
					label: "Volume",
					min: 0,
					max: 100,
					defaultValue: 50,
				}),
				props: { label: "Volume", min: 0, max: 100, defaultValue: 50 },
			},
		]
	}

	// Radio Group variants
	if (componentName === "radio-group") {
		return [
			{
				name: "Default",
				description: "Basic radio group",
				code: `<RadioGroup label="Choose size">
  <Radio value="small" label="Small" />
  <Radio value="medium" label="Medium" />
  <Radio value="large" label="Large" />
</RadioGroup>`,
				props: { label: "Choose size" },
			},
		]
	}

	// Text Area variants
	if (componentName === "text-area") {
		return [
			{
				name: "Default",
				description: "Basic text area",
				code: generateVariantCode("text-area", {
					label: "Description",
					placeholder: "Enter description...",
				}),
				props: { label: "Description", placeholder: "Enter description..." },
			},
		]
	}

	// Number Input variants
	if (componentName === "number-input") {
		return [
			{
				name: "Default",
				description: "Basic number input",
				code: generateVariantCode("number-input", {
					label: "Quantity",
					min: 0,
					max: 100,
				}),
				props: { label: "Quantity", min: 0, max: 100 },
			},
		]
	}

	// Radio variants
	if (componentName === "radio") {
		return [
			{
				name: "Default",
				description: "Basic radio button",
				code: generateVariantCode("radio", {
					label: "Option 1",
					value: "option1",
				}),
				props: { label: "Option 1", value: "option1" },
			},
		]
	}

	// Badge variants
	if (componentName === "badge") {
		return [
			{
				name: "Default",
				description: "Basic badge",
				code: generateVariantCode("badge", {
					children: "New",
				}),
				props: { children: "New" },
			},
		]
	}

	// Avatar variants
	if (componentName === "avatar") {
		return [
			{
				name: "Default",
				description: "Avatar with initials",
				code: generateVariantCode("avatar", {
					initials: "JD",
				}),
				props: { initials: "JD" },
			},
		]
	}

	// Alert variants
	if (componentName === "alert") {
		return [
			{
				name: "Default",
				description: "Info alert",
				code: generateVariantCode("alert", {
					variant: "info",
					children: "This is an informational message",
				}),
				props: {
					variant: "info",
					children: "This is an informational message",
				},
			},
		]
	}

	// Progress variants
	if (componentName === "progress") {
		return [
			{
				name: "Default",
				description: "Progress bar",
				code: generateVariantCode("progress", {
					value: 60,
					label: "Loading...",
				}),
				props: { value: 60, label: "Loading..." },
			},
		]
	}

	// Pagination variants
	if (componentName === "pagination") {
		return [
			{
				name: "Default",
				description: "Basic pagination",
				code: generateVariantCode("pagination", {
					currentPage: 1,
					totalPages: 10,
				}),
				props: { currentPage: 1, totalPages: 10, onPageChange: () => {} },
			},
		]
	}

	// Breadcrumbs variants
	if (componentName === "breadcrumbs") {
		return [
			{
				name: "Default",
				description: "Basic breadcrumbs",
				code: `<Breadcrumbs items={[
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Details" }
]} />`,
				props: {
					items: [
						{ label: "Home", href: "/" },
						{ label: "Products", href: "/products" },
						{ label: "Details" },
					],
				},
			},
		]
	}

	// Components that don't need props or have sensible defaults
	const noPropsComponents = [
		"spinner",
		"skeleton",
		"divider",
		"portal",
		"card",
		"tooltip",
	]

	if (noPropsComponents.includes(componentName)) {
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

	// Complex components that need special handling - don't show variants
	const complexComponents = [
		"dialog",
		"alert-dialog",
		"accordion",
		"tabs",
		"dropdown-menu",
		"popover",
		"sidebar",
		"header",
		"file-icon",
		"image-preview-dialog",
		"file-details-dialog",
		"file-upload-input",
		"file-upload",
		"color-picker",
		"date-picker",
		"date-range-picker",
		"rich-text-input",
	]

	if (complexComponents.includes(componentName)) {
		return []
	}

	// For any remaining components, don't show variants to be safe
	return []
}
