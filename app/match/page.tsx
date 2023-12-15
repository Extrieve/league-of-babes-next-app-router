'use client';

import { getAllChampions, getVersions } from "@/api/Service";
import Champion from "@/models/iChampion";
import Image from "next/image";
import router from "next/router";
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
    const updatedVotes = {
      ...state.votes,
      [votedChampion.id]: (state.votes[votedChampion.id] || 0) + 1,
    };
    dispatch({ type: 'setVotes', payload: updatedVotes });

    if (updatedVotes[votedChampion.id] === 4) {
      router.push(`/champions/${votedChampion.id}`); // Use router.push if using next/router
      return;
    }

    const remainingChampions = state.champions.filter(c => c.id !== unvotedChampion.id);
    if (remainingChampions.length === 0) {
      router.push(`/champions/${votedChampion.id}`); // Redirect if no more champions left
      return;
    }

    dispatch({
      type: 'setMatch',
      payload: [
        votedChampion,
        remainingChampions[Math.floor(Math.random() * remainingChampions.length)],
      ],
    });
    dispatch({ type: 'setChampions', payload: remainingChampions });
  };

  return (
    <div className="flex justify-around items-center">
      {state.match.map((champion: Champion | null, index: number) =>
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
};