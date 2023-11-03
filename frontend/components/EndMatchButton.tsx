import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import matchSocketManager from "./Sockets/MatchSocketManager";
import socketManager from "./Sockets/CommunicationSocketManager";
import { useEffect } from "react"
import collabSocketManager from "./Sockets/CollaborationSocketManager";


export default function EndMatchButton({
	code,
	language,
	difficulty,
	theme,
}) {
	const router = useRouter();
	const endLogic = async () => {
		const user1 = JSON.parse(sessionStorage.getItem("login")).email;
		const user2 = matchSocketManager.getMatchedUser();
		const questionName = "Test Question";
		const question = "Test Question";
		const data = {
			user1,
			user2,
			difficulty,
			questionName,
			question,
			language,
			theme,
			code,
		};

		const res = await axios
			.post("/history_service/create", data)
			.then((res) => console.log(res.data))
			.then(() => socketManager.emitEvent("endMatch", socketManager.getMatchedSocketId()))
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		collabSocketManager.subscribeToEvent("endCollab", () => {
			endLogic();
		});

	}, [])

	const handleEnd = () => {
		collabSocketManager.emitEvent("endCollab", "")
	}
	return (
		<Button width="100%" colorScheme="green" onClick={handleEnd}>
			End Match
		</Button>
	);
}
