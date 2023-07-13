'use client';

import Champion from '@/models/iChampion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ChampionCard: React.FC<{ champion: Champion }> = ({ champion }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-2 flex flex-col">
      <Image className="w-full" src={champion.imageUrl} alt={champion.name} width={80} height={180} />
      <Link href={`/champions/${champion.id}`}>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{champion.name}</div>
          <p className="text-gray-700 text-base">
            {champion.title}
          </p>
          <p className="text-gray-700 text-sm">
            {champion.blurb}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          {champion.tags.map((tag, index) => (
            <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{tag}</span>
          ))}
        </div>
      </Link>
    </div>
  );
};

export default ChampionCard;
