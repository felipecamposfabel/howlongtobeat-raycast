import { HowLongToBeatEntry, HowLongToBeatService } from 'howlongtobeat';
import { useEffect, useState } from 'react';

const hltbService = new HowLongToBeatService();

export function useDetail(gameId: string) {
 const [results, setResults] = useState<HowLongToBeatEntry>();
 const [loading, setLoading] = useState(false);
 useEffect(() => {
   const search = async (id: string) => {
    if (!id) {
      setResults(undefined);
      return;
    }
     setLoading(true);
     const response = await hltbService.detail(id);
     setLoading(false);
     setResults(response);
   }
   search(gameId);
 }, [gameId])
  return { data: results, loading };
}