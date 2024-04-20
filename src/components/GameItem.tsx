import { Action, ActionPanel, Color, Icon, List } from "@raycast/api";
import { HowLongToBeatEntry } from "howlongtobeat";
import GameDetails from "./GameDetails";
import { clearRecentGames, removeRecentGame } from "../lib/storage";

interface GameItemProps {
	game: HowLongToBeatEntry,
	isHistory?: boolean,
	onUpdateHistory?: () => void,
}

export default function GameItem({ game, isHistory, onUpdateHistory }: GameItemProps) {
	const onRemove = async () => {
		await removeRecentGame(game.id);
		onUpdateHistory?.();
	}

	const onClear = async () => {
		await clearRecentGames();
		onUpdateHistory?.();
	}

	return(
		<List.Item
			key={game.id}
			icon={game.imageUrl}
			title={game.name}
			subtitle={game.releaseYear ? `(${game.releaseYear})` : ''}
			accessories={[
				{ text: game.gameplayMain + 'h', icon: { source: Icon.Book, tintColor: Color.Blue } },
				{ text: game.gameplayMainExtra + 'h', icon: { source: Icon.Heart, tintColor: Color.Orange } },
				{ text: game.gameplayCompletionist + 'h', icon: { source: Icon.Trophy, tintColor: Color.Green } },
			]}
			actions={
				<ActionPanel>
					<Action.Push title="Show Details" target={<GameDetails game={game} />} />
					<Action.OpenInBrowser title="Open in Browser" icon={Icon.Globe} url={`https://howlongtobeat.com/game/${game.id}`} />
					{isHistory && (
						<ActionPanel.Section title="History">
							<Action onAction={onRemove} title="Remove Entry" icon={Icon.HeartDisabled} style={Action.Style.Destructive} shortcut={{ modifiers: ['ctrl'], key: 'x' }} />
							<Action onAction={onClear} title="Clear History" icon={Icon.Trash} style={Action.Style.Destructive} shortcut={{ modifiers: ['ctrl', 'shift'], key: 'x' }} />
						</ActionPanel.Section>
					)}
				</ActionPanel>
			}
		/>
	);
}