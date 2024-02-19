'use client';

import { getAllChampions, getVersions } from "@/api/Service";
import Champion from "@/models/iChampion";
import Image from "next/image";
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MatchPage() {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [totalVotes, setVotes] = useState<{ [key: string]: number }>({});
  const [currentVotes, setCurrentVotes] = useState<number>(0);
  const [leftChampion, setLeftChampion] = useState<Champion | undefined>();
  const [rightChampion, setRightChampion] = useState<Champion | undefined>();
  const [winner, setWinner] = useState<Champion | undefined>();

  useEffect(() => {
    const fetchChampions = async () => {
      const version = await getVersions();
      const data = await getAllChampions(version);
      setChampions(data);

      // Safely assign champions without directly mutating state
      if (data.length >= 2) {
        setLeftChampion(data[data.length - 1]);
        setRightChampion(data[data.length - 2]);
        // Update champions without the last two
        setChampions(prev => prev.slice(0, -2));
      }
    };
    fetchChampions();
  }, []);

  const handleWinner = (votedChampion: Champion) => {
    setWinner(votedChampion);
    // Redirect to the champions page
    redirect('/champions');
  };

  const handleVote = (votedChampion: Champion) => {
    setVotes(prevVotes => ({
      ...prevVotes,
      [votedChampion.id]: (prevVotes[votedChampion.id] || 0) + 1
    }));

    setCurrentVotes(prevVotes => prevVotes + 1);

    // Update champions without directly mutating state
    setChampions(prevChampions => {
      if (prevChampions.length >= 1) {
        const newChampions = [...prevChampions];
        if (votedChampion === leftChampion) {
          setRightChampion(newChampions.pop());
        } else {
          setLeftChampion(newChampions.pop());
        }
        return newChampions;
      }
      return prevChampions;
    });

    if (currentVotes + 1 === 5) {
      handleWinner(votedChampion);
    }
  };

  return (
    <div className="flex justify-around items-center">
      {[leftChampion, rightChampion].map((champion) =>
        champion && <div key={champion.id}>
          <Image src={champion.imageUrl} alt={champion.name} width={200} height={200} />
          <h2>{champion.name}</h2>
          <button onClick={() => handleVote(champion)}>Vote {currentVotes}</button>
        </div>)}
    </div>
  );
};
