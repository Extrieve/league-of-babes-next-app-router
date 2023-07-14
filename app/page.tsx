'use client';

import Link from 'next/link';

const HomePage = () => {

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl p-10 text-center" style={{maxWidth: '500px'}}>
        <h1 className="text-4xl font-bold mb-6 text-blue-500">Welcome to League of Babes!</h1>
        <p className="text-xl mb-6 text-gray-700">Discover the cutest League of Legends champion that matches your preference.</p>

        <Link href="/champions" style={{ 
          background: 'linear-gradient(to right, #ff9966, #ff5e62)', 
          boxShadow: '0 4px 15px 0 rgba(255, 153, 102, 0.4), 0 4px 15px 0 rgba(255, 94, 98, 0.4)' 
        }}>
            Start Journey
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
