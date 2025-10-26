import React from 'react'

import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md w-full ">
      <div className="container mx-auto min-w-[80%] flex justify-between items-center py-3 px-1">

        <div className="text-[23px] ml-5 font-semibold text-pink-600 no-underline">
          <a href="/">
            XYZ Hospital
          </a>
        </div>

        <ul className="hidden md:flex items-center space-x-6 scroll-smooth">
          <li >
            <a href="#home" className="text-black hover:text-pink-600 no-underline">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="text-black hover:text-pink-600 no-underline">
              About
            </a>
          </li>
          <li>
            <a href="#department" className="text-black hover:text-pink-600 no-underline">
              Department
            </a>
          </li>
          <li>
            <a href="#doctor" className="text-black hover:text-pink-600 no-underline">
              Doctor
            </a>
          </li>
          <li>
            <a href="#contact" className="text-black hover:text-pink-600 no-underline">
              Contact
            </a>
          </li>
        </ul>

        <div className="min-w-[100px] ml-[30px] lg:ml-[10px] md:flex flex justify-around items-center gap-3 px-3">
          <Link to="/signin">
            <button className="bg-red-500 rounded-[100px] px-4 font-bold hover:opacity-70 min-w-[60px] h-[40px] text-[13px] text-white">
              Sign In
            </button>
          </Link>

          <button
            className="md:hidden text-3xl md:ml-[2rem] border-2 border-grey rounded-[10px] w-[40px]"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 px-4 pb-3 scroll-smooth">
            <a href="#home" className="text-black ml-[15px] hover:text-pink-600 no-underline">
              Home
            </a>
          <a href="#about" className="text-black ml-[15px] hover:text-pink-600 no-underline">
            About
          </a>
          <a href="#department" className="text-black ml-[15px] hover:text-pink-600 no-underline">
            Department
          </a>
          <a href="#doctor" className="text-black ml-[15px] hover:text-pink-600 no-underline">
            Doctor
          </a>
          <a href="#contact" className="text-black ml-[15px] hover:text-pink-600 no-underline">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
