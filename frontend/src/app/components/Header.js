'use client';

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SellModal from "./SellModal";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Wishlist", path: "/wishlist" },
    { name: "Contact Us", path: "/contact" },
  ];

  const isActive = (path) => pathname === path;

  const handleModalClose = () => setModalOpen(false);

  return (
    <header className="bg-primary text-white py-5 px-8 flex justify-between items-center">
      <div className="text-2xl font-bold">
        <Link href="/">
          <img src="/logo.png" alt="Logo" className="cursor-pointer" />
        </Link>
      </div>

      <nav className="hidden md:flex space-x-6 gap-6">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={`text-base px-3 py-2 rounded ${
              isActive(item.path)
                ? "bg-white text-gray-900 font-bold"
                : "hover:bg-secondary hover:text-white"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <button
        onClick={() => setModalOpen(true)}
        className="bg-secondary py-3 px-3 rounded-lg hover:bg-white hover:text-black"
      >
        Sell Your Equipment
      </button>

      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white focus:outline-none"
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <nav className="absolute top-20 right-0 w-2/3 bg-primary shadow-lg md:hidden z-20">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              onClick={() => setMenuOpen(false)}
              className={`block text-base px-4 py-2 ${
                isActive(item.path)
                  ? "bg-white font-bold text-black"
                  : "hover:bg-dark hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      )}

      {isModalOpen && <SellModal onClose={handleModalClose} />}
    </header>
  );
};





export default Header;
