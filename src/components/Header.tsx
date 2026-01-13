"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Jisus Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/features"
              className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
            >
              Features
            </Link>
            <Link
              href="/downloads"
              className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
            >
              Downloads
            </Link>
            <Link
              href="/compatibility"
              className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
            >
              Compatibility
            </Link>
            <Link
              href="/how-it-works"
              className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
            >
              How It Works
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <Link
              href="/downloads"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors animate-pulse-glow"
            >
              Download Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/features"
                className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/downloads"
                className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Downloads
              </Link>
              <Link
                href="/compatibility"
                className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Compatibility
              </Link>
              <Link
                href="/how-it-works"
                className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="/downloads"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Download Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
