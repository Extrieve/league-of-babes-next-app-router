'use client';

import NavItem from "./NavItem";

export default function Nav() {
  return (
    <nav className="felx-between w-full mb-16 pt-3">
      <h1 className="text-white text-lg font-bold">Nav</h1>
      <ul className="flex space-x-4">
        <NavItem href="/" linkText="Home" />
        <NavItem href="/champions" linkText="Champions" />
        <NavItem href="/match" linkText="Match" />
        <NavItem href="/leaderboard" linkText="Leaderboards" />
      </ul>
    </nav>
  );
}
