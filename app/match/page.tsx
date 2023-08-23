'use client';

import { getAllChampions, getVersions } from "@/api/Service";
import Champion from "@/models/iChampion";
import Image from "next/image";
import { redirect } from 'next/navigation';
import { useEffect, useReducer } from 'react';

interface State {
  champions: Champion[];
  match: [Champion | null, Champion | null];
  votes: { [key: string]: number };
}

const initialState: State = {
  champions: [],
  match: [null, null],
  votes: {},
};

const reducer = (state: State, action: any): State => {
  switch (action.type) {
  case 'setChampions':
    return { ...state, champions: action.payload };
  case 'setMatch':
    return { ...state, match: action.payload };
  case 'setVotes':
    return { ...state, votes: action.payload };
  default:
    return state;
  }
};

export default function MatchPage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchChampions = async () => {
      const version = await getVersions();
      const data = await getAllChampions(version);
      dispatch({ type: 'setChampions', payload: data });
      dispatch({ type: 'setMatch', payload: [data[0], data[1]] });
    };
    fetchChampions();
  }, []);

  const handleVote = (votedChampion: Champion, unvotedChampion: Champion) => {
    dispatch({
      type: 'setVotes',
      payload: {
        ...state.votes,
        [votedChampion.id]: (state.votes[votedChampion.id] || 0) + 1,
      },
    });

    const remainingChampions = state.champions.filter(c => c.id !== unvotedChampion.id);
    if (remainingChampions.length === 0 || state.votes[votedChampion.id] === 4) {
      redirect(`/champions/${votedChampion.id}`);
    } else {
      dispatch({
        type: 'setMatch',
        payload: [
          votedChampion,
          remainingChampions[Math.floor(Math.random() * remainingChampions.length)],
        ],
      });
      dispatch({ type: 'setChampions', payload: remainingChampions });
    }
  };

  return (
    <div className="flex justify-around items-center">
      {state.match.map((champion, index) =>
        champion ? (
          <div key={champion.id}>
            <Image src={champion.imageUrl} alt={champion.name} width={72} height={360} />
            <h3>{champion.name}</h3>
            {state.votes[champion.id] && <p>Votes: {state.votes[champion.id]}</p>}
            <button onClick={() => handleVote(champion, state.match[1 - index] as Champion)}>Vote</button>
          </div>
        ) : null)}
    </div>
  );
}
