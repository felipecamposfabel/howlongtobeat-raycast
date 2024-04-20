import { List } from "@raycast/api";
import { useSearch } from "./lib/useSearch";
import { useState } from "react";
import FilterDropdown from "./components/FilterDropdown";
import GameItem from "./components/GameItem";
import RecentList from "./components/RecentList";

export default function Command() {
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState("");
  const { data, loading } = useSearch(query, platform);

  return (
    <List
      onSearchTextChange={setQuery}
      throttle
      isLoading={loading}
      isShowingDetail={false}
      searchBarAccessory={<FilterDropdown onPlatformChange={setPlatform} />}
    >
      {query.length === 0 && <RecentList />}
      {loading && query.length > 0 && <List.EmptyView title="Searching..." />}
      {!loading && query.length > 0 && data.map((game) => (<GameItem key={game.id} game={game} />))}
    </List>
  );
}
