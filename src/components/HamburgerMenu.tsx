import { useState } from "react";
import { Link } from "react-router-dom";

export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="relative">
      <button onClick={toggleMenu} className="text-white focus:outline-none z-20">
        {/* Hamburger icon */}
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="black"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={!isOpen ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"}
          />
        </svg>
      </button>

      {/* Menyn som visas vid öppning */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } absolute top-12 left-0 bg-custom-blue p-4 rounded-lg shadow-lg z-10 w-40 text-left`}
      >
        <Link to="/" className="block text-white px-3 py-2 hover:bg-custom-blue">
          Home
        </Link>
        <Link to="/my-team" className="block text-white px-3 py-2 hover:bg-custom-blue">
          My Team
        </Link>
        <Link to="/search" className="block text-white px-3 py-2 hover:bg-custom-blue">
          Search
        </Link>
      </div>
    </nav>
  );
}
