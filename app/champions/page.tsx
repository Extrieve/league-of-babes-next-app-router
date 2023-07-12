'use client';

import { getAllChampions, getVersions } from "@/api/Service";
import ChampionCard from "@/components/ChampionCard";
import Champion from "@/models/iChampion";
import { useEffect, useState } from "react";


const ChampionsPage = (props: any) => {
  const [champions, setChampions] = useState<Champion[]>([] as Champion[]);

  useEffect(() => {
    const fetchData = async () => {
      const version = await getVersions();
      const champions: Champion[] = await getAllChampions(version);
      
      setChampions(champions);
    };
    
    fetchData();
  }, []); // Empty dependency array means this effect runs once on component mount
  
  return (
    <div className="flex flex-wrap justify-around">
      {champions && champions.map(champion => (
        <ChampionCard key={champion.id} champion={champion} />
      ))}
    </div>
  );
};

export default ChampionsPage;
