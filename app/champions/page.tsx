import { getAllChampions, getVersions } from '@/api/Service';
import ChampionCard from '@/components/ChampionCard';
import Champion from '@/models/iChampion';
import React from 'react';

interface ChampionsPageProps {
    champions: Champion[];
}

const ChampionsPage: React.FC<ChampionsPageProps> = ({ champions }) => {
  return (
    <div className="flex flex-wrap justify-around">
      {champions.map(champion => (
        <ChampionCard key={champion.id} champion={champion} />
      ))}
    </div>
  );
};

// This will be called server-side and the returned object will be passed as props to your component
export async function getServerSideProps() {
  const version = await getVersions();
  const champions = await getAllChampions(version);

  // Will be passed to the page component as props
  return { props: { champions } };
}

export default ChampionsPage;