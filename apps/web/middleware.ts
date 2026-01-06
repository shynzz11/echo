import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

// Define public routes that do not require authentication
const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"])

const isOrgFreeRoute = createRouteMatcher([
	// Routes that don't require org context
	"/org-selection(.*)",
	"/sign-in(.*)",
	"/sign-up(.*)",
])

// Middleware to protect routes based on authentication status
export default clerkMiddleware(async (auth, req) => {
	const { userId, orgId } = await auth()

	// Protect all routes except the public ones and org-free routes
	if (!isPublicRoute(req) && !isOrgFreeRoute(req)) {
		await auth.protect()
	}

	// Redirect authenticated users without an org to the org selection page
	if (userId && !orgId && !isOrgFreeRoute(req)) {
		// Prepare redirect URL parameters
		const searchParams = new URLSearchParams({ redirectUrl: req.url })
		// Construct the org selection URL with redirect parameters
		const orgSelection = new URL(
			`/org-selection?${searchParams.toString()}`,
			req.url
		)
		// Redirect to the org selection page
		return NextResponse.redirect(orgSelection)
	}
})

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
	],
}
