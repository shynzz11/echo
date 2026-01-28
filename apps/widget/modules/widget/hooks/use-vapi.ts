import Vapi from "@vapi-ai/web"
import { useEffect, useState } from "react"

interface TranscriptMessage {
	role: "user" | "assistant"
	text: string
}

export const useVapi = () => {
	const [vapi, setVapi] = useState<Vapi | null>(null)
	const [isConnected, setIsConnected] = useState(false)
	const [isConnecting, setIsConnecting] = useState(false)
	const [isSpeaking, setIsSpeaking] = useState(false)
	const [transcript, setTranscript] = useState<TranscriptMessage[]>([])

	useEffect(() => {
		//only for testing the vapi api, otherwise customers will provide their own key
		const vapiInstance = new Vapi("a8ed25e5-f7d8-4b6d-aebb-fa81720d84ef")
		setVapi(vapiInstance)

		vapiInstance.on("call-start", () => {
			setIsConnected(true)
			setIsConnecting(false)
			setTranscript([])
		})

		vapiInstance.on("call-end", () => {
			setIsConnected(false)
			setIsConnecting(false)
			setIsSpeaking(false)
		})

		vapiInstance.on("speech-start", () => {
			setIsSpeaking(true)
		})

		vapiInstance.on("speech-end", () => {
			setIsSpeaking(false)
		})

		vapiInstance.on("error", (error) => {
			console.log(error, "VAPI_ERROR")
			setIsConnecting(false)
		})

		vapiInstance.on("message", (message) => {
			if (
				message.type === "transcript" &&
				message.transactionType === "final"
			) {
				setTranscript((prev) => [
					...prev,
					{
						role: message.role === "user" ? "user" : "assistant",
						text: message.transcript,
					},
				])
			}
		})

		return () => {
			vapiInstance?.stop()
		}
	}, [])

	const startCall = () => {
		setIsConnecting(true)

		if (vapi) {
			vapi.start("e96c785d-325a-45ee-b21e-63060dba47df") //demo bot
		}
	}

	const endCall = () => {
		if (vapi) {
			vapi.stop()
		}
	}

	return {
		isConnected,
		isConnecting,
		isSpeaking,
		transcript,
		startCall,
		endCall,
	}
}
