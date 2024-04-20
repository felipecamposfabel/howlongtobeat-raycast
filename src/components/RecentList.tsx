import { List } from "@raycast/api";
import { useRecentItems } from "../lib/storage";
import GameItem from "./GameItem";
import { useState } from "react";

export default function RecentList() {
	const [refreshId, setRefreshId] = useState(0);
	const recentGames = useRecentItems(refreshId);

	const refresh = () => {
		setRefreshId((prev) => prev + 1);
	};

	console.log(recentGames)

	if (recentGames.length === 0) {
		return <List.EmptyView icon={{ source: '../assets/search.png' }} title="Search for a game" />
	}

	return (
		<List.Section title="Recent Games">
			{recentGames.map((game) => (
				<GameItem key={game.id} game={game} isHistory onUpdateHistory={refresh} />
			))}
		</List.Section>
	);
}