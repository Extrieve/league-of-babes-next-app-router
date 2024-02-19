'use client';

import { getAllChampions, getVersions } from "@/api/Service";
import ChampionCard from "@/components/ChampionCard";
import Champion from "@/models/iChampion";
import { useCallback, useEffect, useState } from "react";


function ChampionsPage() {
  const [champions, setChampions] = useState<Champion[]>([]);

  const fetchData = useCallback(async () => {
    const version = await getVersions();
    const champions: Champion[] = await getAllChampions(version);
    
    setChampions(champions);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  return (
    <div className="flex flex-wrap justify-around">
      {champions && champions.map(champion => (
        <ChampionCard key={champion.name} champion={champion} />
      ))}
    </div>
  );
};

export default ChampionsPage;
