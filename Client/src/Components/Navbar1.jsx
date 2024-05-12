import React, { useState } from "react";

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-filter backdrop-blur-lg bg-opacity-70 bg-gray-200">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo and toggle button on left side */}
        <div className="flex items-center">
          <img src="/path/to/logo.png" alt="Logo" className="h-8 mr-4" />
          <span className="text-lg font-bold text-white">Your Website</span>
        </div>

        {/* Mobile menu toggle for small devices */}
        <div className="md:hidden">
          <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              )}
            </svg>
          </button>
        </div>

        {/* Menu options on right side */}
        <div
          className={`md:flex items-center space-x-6 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <a href="#" className="text-white font-bold hover:opacity-80">
            Jobs
          </a>
          <a href="#" className="text-white font-bold hover:opacity-80">
            About us
          </a>
          <a href="#" className="text-white font-bold hover:opacity-80">
            Contact
          </a>
          <button className="bg-white py-2 px-6 rounded-lg text-gray-800 font-bold hover:opacity-80 transition-transform duration-300 transform hover:-translate-y-1">
            Get started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
