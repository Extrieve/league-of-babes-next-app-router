interface Leaderboard {
    id: string;
    name: string;
    wins: number;
    votes: number;
    imageUrl: string;
    tags: string[];
};

export default Leaderboard;