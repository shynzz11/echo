import { OrganizationList } from "@clerk/nextjs"

// View for selecting or creating an organization
export const OrgSelectionView = () => {
	return (
		// Render the organization list component with specific props
		<OrganizationList
			afterCreateOrganizationUrl="/"
			afterSelectOrganizationUrl="/"
			hidePersonal
			skipInvitationScreen
		/>
	)
}
