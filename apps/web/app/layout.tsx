import { ClerkProvider } from "@clerk/nextjs"
import { Geist, Geist_Mono } from "next/font/google"

import "@workspace/ui/globals.css"
import { Providers } from "@/components/providers"

const fontSans = Geist({
	subsets: ["latin"],
	variable: "--font-sans",
})

const fontMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
})

/**
 * Render the application's HTML root with global font variables, authentication, and context providers.
 *
 * @param children - The page content to render inside the Providers and Clerk authentication context.
 * @returns The top-level `<html>` element containing the `<body>` with fonts applied and children nested inside `ClerkProvider` and `Providers`.
 */
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
			>
				<ClerkProvider>
					<Providers>{children}</Providers>
				</ClerkProvider>
			</body>
		</html>
	)
}