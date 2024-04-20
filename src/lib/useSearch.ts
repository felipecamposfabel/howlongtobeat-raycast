import { HowLongToBeatEntry, HowLongToBeatService } from 'howlongtobeat';
import { useEffect, useState } from 'react';

const hltbService = new HowLongToBeatService();

export function useSearch(query: string, platform?: string) {
 const [results, setResults] = useState<HowLongToBeatEntry[]>([]);
 const [loading, setLoading] = useState(false);
 useEffect(() => {
   const search = async (q: string , p?: string) => {
    if (!q.length) {
      setResults([]);
      return;
    }
     setLoading(true);
     const response = await hltbService.search(q, platform?.length && p !== 'All' ? p : '');
     setLoading(false);
     setResults(response);
   }
   search(query, platform);
 }, [query, platform])
  return { data: results, loading };
}