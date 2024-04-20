import { Action, ActionPanel, Color, Detail, Icon } from "@raycast/api";
import { useDetail } from "../lib/useDetail";
import { HowLongToBeatEntry } from "howlongtobeat";
import { useEffect } from "react";
import { setRecentGame } from "../lib/storage";

export default function GameDetails({ game }: { game: HowLongToBeatEntry }) {
	const { data, loading } = useDetail(game.id);

	useEffect(() => {
		setRecentGame(game);
	}, []);

	if (!game) {
		return (
			<Detail isLoading={loading}></Detail>
		);
	}
	const finalPlatforms = game.platforms.length > 0 ? game.platforms : game.platforms;

	const getReviewColor = (score: number) => {
		if (score >= 80) return Color.Green;
		if (score >= 65) return Color.Yellow;
		if (score > 0) return Color.Red;
		return Color.PrimaryText;
	}
	
	return (
		<Detail
			isLoading={loading}
			navigationTitle={game.name}
			markdown={`![${game.name}](${game.imageUrl}?raycast-width=180)\n\n# ${game.name} (${game.releaseYear})\n\n${data?.description ?? '--'}`}
			metadata={
				<Detail.Metadata>
					<Detail.Metadata.Label title="Main Story" text={game.gameplayMain + 'h'} icon={{ source: Icon.Book, tintColor: Color.Blue }} />
					<Detail.Metadata.Label title="Main + Extra" text={game.gameplayMainExtra + 'h'} icon={{ source: Icon.Heart, tintColor: Color.Orange }} />
					<Detail.Metadata.Label title="Completionist" text={game.gameplayCompletionist + 'h'} icon={{ source: Icon.Trophy, tintColor: Color.Green }} />
					<Detail.Metadata.Separator />
					<Detail.Metadata.Label title="Release Date" text={game.releaseYear.toString()} />
					<Detail.Metadata.TagList title="Review Score">
						<Detail.Metadata.TagList.Item text={game.reviewScore ? game.reviewScore.toString() : 'NA'} color={getReviewColor(game.reviewScore)} />
					</Detail.Metadata.TagList>
					{finalPlatforms.length > 0 && (
					<>
						<Detail.Metadata.Separator />
						<Detail.Metadata.TagList title="Platforms">
							{finalPlatforms.map((platform) => (
								<Detail.Metadata.TagList.Item key={platform} text={platform} />
							))}
						</Detail.Metadata.TagList>
					</>
					)}
					<Detail.Metadata.Separator />
					<Detail.Metadata.Link title="View on HowLongToBeat" target={`https://howlongtobeat.com/game/${game.id}`} text={game.name} />
				</Detail.Metadata>
			}
			actions={
				<ActionPanel>
					<Action.OpenInBrowser title="Open in Browser" icon={Icon.Globe} url={`https://howlongtobeat.com/game/${game.id}`} />
				</ActionPanel>
			}
  	/>
 )
}