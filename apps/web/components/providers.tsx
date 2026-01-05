"use client"

import * as React from "react"
import { ConvexReactClient } from "convex/react"
import { ConvexProviderWithClerk } from "convex/react-clerk"
import { useAuth } from "@clerk/nextjs"

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
	throw new Error("Missing NEXT_PUBLIC_CONVEX_URL in your .env file")
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL || "")

/**
 * Wraps descendants with a Convex provider integrated with Clerk authentication.
 *
 * @param children - The React nodes to render inside the Convex + Clerk provider
 * @returns The provider element configured with the Convex client and Clerk `useAuth`, wrapping `children`
 */
export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
			{children}
		</ConvexProviderWithClerk>
	)
}