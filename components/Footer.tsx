'use client';

import { FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-blue-500 text-white p-6 mt-6 flex justify-between items-center rounded-t-lg">
      <div className="text-lg">
        &copy; {new Date().getFullYear()} League of Babes. All rights reserved.
      </div>
      <div className="space-x-4">
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="text-white hover:text-blue-300 transition-colors duration-200">
          <FaInstagram />
        </a>
        <a href="https://www.twitter.com/" target="_blank" rel="noreferrer" className="text-white hover:text-blue-300 transition-colors duration-200">
          <FaTwitter />
        </a>
      </div>
    </footer>
  );
}
