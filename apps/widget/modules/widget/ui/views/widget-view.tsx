"use client"

import { screenAtom } from "@/modules/widget/atoms/widget-atoms"
// import { WidgetFooter } from "../components/widget-footer"
// import { WidgetHeader } from "../components/widget-header"
import { WidgetAuthScreen } from "@/modules/widget/ui/screens/widget-auth-screen"
import { useAtomValue } from "jotai"
import { WidgetErrorScreen } from "@/modules/widget/ui/screens/widget-error-screen"
import { WidgetLoadingScreen } from "@/modules/widget/ui/screens/widget-loading-screen"
import { WidgetSelectionScreen } from "@/modules/widget/ui/screens/widget-selection-screen"
import { WidgetChatScreen } from "@/modules/widget/ui/screens/widget-chat-screen"
import { WidgetInboxScreen } from "@/modules/widget/ui/screens/widget-inbox-screen"

interface Props {
	organizationId: string | null
}

export const WidgetView = ({ organizationId }: Props) => {
	const screen = useAtomValue(screenAtom)

	const screenComponents = {
		error: <WidgetErrorScreen />,
		loading: <WidgetLoadingScreen organizationId={organizationId} />,
		auth: <WidgetAuthScreen />,
		voice: <p>Voice screen</p>,
		inbox: <WidgetInboxScreen />,
		selection: <WidgetSelectionScreen />,
		chat: <WidgetChatScreen />,
		contact: <p>Contact screen</p>,
	}

	return (
		<main className="min-h-screen min-w-screen flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
			{screenComponents[screen]}
			{/* <WidgetFooter /> */}
		</main>
	)
}
