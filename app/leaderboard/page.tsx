'use client';

import { getAllLeaderboards } from "@/api/Service";
import Leaderboard from "@/models/iLeaderboard";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LeaderboardPage() {
  const [leaderboards, setLeaderboards] = useState<Leaderboard[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllLeaderboards();
      setLeaderboards(data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold text-blue-500 mb-5">Leaderboards</h1>
      <ul>
        {leaderboards.map((leaderboard) => (
          <li key={leaderboard.id} className="border-2 border-gray-300 rounded-md p-5 mb-4 flex justify-between items-center">
            <div>
              <Image src={leaderboard.imageUrl} alt={leaderboard.name} className="w-16 h-16 rounded-full mr-4" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{leaderboard.name}</h2>
              <p className="text-gray-500">{leaderboard.tags.join(', ')}</p>
            </div>
            <div>
              <p><span className="font-bold">Wins:</span> {leaderboard.wins}</p>
              <p><span className="font-bold">Votes:</span> {leaderboard.votes}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
