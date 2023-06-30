'use client';

import Champion from "@/models/iChampion";
import Image from "next/image";
import { FC } from "react";

interface ChampionCardProps {
  champion: Champion;
  size?: 'small' | 'medium' | 'large';
}

const ChampionCard: FC<ChampionCardProps> = ({ champion, size }: ChampionCardProps) => {
  return (
    <div className="champion-card">
      <Image src={champion.imageUrl} alt={champion.name} />
      <h3>{champion.name}</h3>
    </div>
  );
};

export default ChampionCard;