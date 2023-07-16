'use client';

import { getAllChampions, getVersions } from "@/api/Service";
import Champion from "@/models/iChampion";
import Image from "next/image";
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MatchPage() {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [match, setMatch] = useState<[Champion | null, Champion | null]>([null, null]);
  const [votes, setVotes] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchChampions = async () => {
      const version = await getVersions();
      const data = await getAllChampions(version);
      setChampions(data);
      setMatch([data[0], data[1]]);
    };
    fetchChampions();
  }, []);

  const handleVote = (votedChampion: Champion, unvotedChampion: Champion) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [votedChampion.id]: (prevVotes[votedChampion.id] || 0) + 1,
    }));

    const remainingChampions = champions.filter((c) => c.id !== unvotedChampion.id);
    if (remainingChampions.length === 0 || votes[votedChampion.id] === 4) {
      redirect(`/champions/${votedChampion.id}`);
    } else {
      setMatch([
        votedChampion,
        remainingChampions[Math.floor(Math.random() * remainingChampions.length)],
      ]);
      setChampions(remainingChampions);
    }
  };

  return (
    <div className="flex justify-around items-center">
      {match.map((champion, index) =>
        champion ? (
          <div key={champion.id}>
            <Image src={champion.imageUrl} alt={champion.name} width={72}  height={360}/>
            <p>{champion.name}</p>
            {votes[champion.id] && <p>Votes: {votes[champion.id]}</p>}
            <button onClick={() => handleVote(champion, match[1 - index] as Champion)}>Vote</button>
          </div>
        ) : null)}
    </div>
  );
}
