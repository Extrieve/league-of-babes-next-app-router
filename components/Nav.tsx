'use client';

import NavItem from "./NavItem";

export default function Nav() {
  return (
    <nav className="flex justify-between items-center w-full mb-16 pt-3 px-5 bg-white shadow-lg text-gray-700 rounded-lg">
      <h1 className="text-blue-500 text-lg font-bold">League of Babes</h1>
      <ul className="flex space-x-4">
        <NavItem href="/" linkText="Home" />
        <NavItem href="/champions" linkText="Champions" />
        <NavItem href="/match" linkText="Match" />
        <NavItem href="/leaderboard" linkText="Leaderboards" />
      </ul>
    </nav>
  );
}
