import { LocalStorage } from "@raycast/api";
import { HowLongToBeatEntry } from "howlongtobeat";
import _ from "lodash";
import { useEffect, useState } from "react";

const RECENT_GAMES_KEY = "recent-games";

export async function getRecentGames() {
  const recentGames = await LocalStorage.getItem(RECENT_GAMES_KEY);
  const payload = recentGames?.toString();
  if (payload) {
    return JSON.parse(payload);
  }
  return [];
}

export async function setRecentGame(item: HowLongToBeatEntry) {
  const recentGames = await getRecentGames();
  if (recentGames) {
    const updatedGames = _.uniqBy([item, ...recentGames.slice(0, 9)], 'id');
    await LocalStorage.setItem(RECENT_GAMES_KEY, JSON.stringify(updatedGames));
  } else {
    await LocalStorage.setItem(RECENT_GAMES_KEY, JSON.stringify([item]));
  }
}

export async function removeRecentGame(itemId: string) {
  const recentGames = await getRecentGames();
  const updatedGames = recentGames.filter((game: HowLongToBeatEntry) => game.id !== itemId);
  await LocalStorage.setItem(RECENT_GAMES_KEY, JSON.stringify(updatedGames));
}

export async function clearRecentGames() {
  await LocalStorage.clear();
}

export function useRecentItems(refreshId: number) {
  const [recentItems, setRecentItems] = useState<HowLongToBeatEntry[]>([]);
  useEffect(() => {
    getRecentGames().then((items) => {
      setRecentItems(items)
      console.log('refreshed', refreshId)
    });
  }, [refreshId]);
  return recentItems;
}