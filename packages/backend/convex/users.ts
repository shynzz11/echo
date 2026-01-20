import { query, mutation } from "./_generated/server"

// Get all users
export const getMany = query({
	args: {},
	handler: async (ctx) => {
		// Query the database for all users
		const users = await ctx.db.query("users").collect()
		return users
	},
})
// Add a new user
export const add = mutation({
	args: {},
	handler: async (ctx) => {
		// Ensure the user is authenticated
		const identity = await ctx.auth.getUserIdentity()
		// If not authenticated, throw an error
		if (identity === null) {
			throw new Error("Not authenticated")
		}

		// Extract organization ID from user identity
		const orgId = identity.orgId as string
		// If no organization ID, throw an error
		if (!orgId) {
			throw new Error(
				"No organization ID found in user identity - missing organization?"
			)
		}

		throw new Error("Tracking test")

		// Insert a new user into the database
		const userId = await ctx.db.insert("users", {
			name: "New User",
		})

		return userId
	},
})
