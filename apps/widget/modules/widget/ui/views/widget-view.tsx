"use client"

import { screenAtom } from "@/modules/widget/atoms/widget-atoms"
// import { WidgetFooter } from "../components/widget-footer"
// import { WidgetHeader } from "../components/widget-header"
import { WidgetAuthScreen } from "@/modules/widget/ui/screens/widget-auth-screen"
import { useAtomValue } from "jotai"

interface Props {
	organizationId: string
}

export const WidgetView = ({ organizationId }: Props) => {
	const screen = useAtomValue(screenAtom)

	const screenComponents = {
		error: <p>Error screen</p>,
		loading: <p>Loading screen</p>,
		auth: <WidgetAuthScreen />,
		voice: <p>Voice screen</p>,
		inbox: <p>Inbox screen</p>,
		selection: <p>Selection screen</p>,
		chat: <p>Chat screen</p>,
		contact: <p>Contact screen</p>,
	}

	return (
		<main className="min-h-screen min-w-screen flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
			{screenComponents[screen]}
			{/* <WidgetFooter /> */}
		</main>
	)
}
