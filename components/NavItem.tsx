'use client';

import Link from "next/link";

type NavItemProps = {
  href: string;
  linkText?: string;
};

export default function NavItem({href, linkText}: NavItemProps) {
  return (
    <li>
      <Link href={href} className="text-gray-700 hover:text-blue-500 transition-colors duration-200">
        {linkText ? linkText : href}
      </Link>
    </li>
  );
}
