"use client"

import { useOrganization } from "@clerk/nextjs"
import { AuthLayout } from "@/modules/auth/ui/layouts/auth-layout"
import { OrgSelectionView } from "@/modules/auth/ui/views/org-selection-view"

// Component that guards routes requiring an organization to be selected
export const OrganizationGuard = ({
	children,
}: {
	children: React.ReactNode
}) => {
	// Get the current organization from Clerk
	const { organization } = useOrganization()

	// If no organization is selected, show the organization selection view
	if (!organization) {
		return (
			<AuthLayout>
				<OrgSelectionView />
			</AuthLayout>
		)
	}
	// If an organization is selected, render the protected content
	return <>{children}</>
}
