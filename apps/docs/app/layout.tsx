import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/providers/theme-provider"

export const metadata: Metadata = {
	title: {
		default: "BCT UI",
		template: "%s — BCT UI",
	},
	description:
		"A comprehensive, opinionated UI and design-system platform for BCT's frontend projects. Modern accessible components built with React and Tailwind CSS v4.",
	keywords: ["BCT", "UI", "components", "design system", "React", "Tailwind"],
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="antialiased">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
