import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // ✅ Function to check login status
  const checkLoginStatus = () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      setIsLoggedIn(true);
      setUsername(user.name || user.username || "User");
    } else {
      setIsLoggedIn(false);
      setUsername("");
    }
  };

  // ✅ Re-check when storage or custom event changes
  useEffect(() => {
    checkLoginStatus();

    const handleStorageChange = () => checkLoginStatus();
    const handleUserUpdate = () => checkLoginStatus();

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("userUpdate", handleUserUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userUpdate", handleUserUpdate);
    };
  }, []);

  // ✅ Logout
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/v1/users/logout",
        {},
        { withCredentials: true }
      );

      const user = JSON.parse(localStorage.getItem("user"));
      toast.success(`Logout successful, ${user?.name || "User"} 👋`, {
        position: "top-center",
        autoClose: 3000,
      });

      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        navigate("/signin");

        // ✅ Notify Navbar and other tabs
        window.dispatchEvent(new Event("storage"));
        window.dispatchEvent(new Event("userUpdate"));
      }, 1000);
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <nav className="bg-white shadow-md w-full">
        <div className="container mx-auto min-w-[80%] flex justify-between items-center py-3 px-1">
          {/* Logo */}
          <div className="text-[23px] ml-5 font-semibold text-pink-600 no-underline">
            <Link to="/">XYZ Hospital</Link>
          </div>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center space-x-6 scroll-smooth">
            <li><a href="/" className="text-black hover:text-pink-600 no-underline">Home</a></li>
            <li><a href="#about" className="text-black hover:text-pink-600 no-underline">About</a></li>
            <li><a href="#department" className="text-black hover:text-pink-600 no-underline">Department</a></li>
            <li><a href="#doctor" className="text-black hover:text-pink-600 no-underline">Doctor</a></li>
            <li><a href="#contact" className="text-black hover:text-pink-600 no-underline">Contact</a></li>
          </ul>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3 px-3">
            {!isLoggedIn ? (
              <Link to="/signin">
                <button className="bg-red-500 rounded-[100px] px-4 font-bold hover:opacity-70 min-w-[60px] h-[40px] text-[13px] text-white">
                  Sign In
                </button>
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-gray-700 font-semibold">
                  👋 Welcome back, <span className="text-pink-600">{username}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-gray-600 rounded-[100px] px-4 font-bold hover:opacity-70 min-w-[60px] h-[40px] text-[13px] text-white"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-3xl border-2 border-gray-400 rounded-[10px] w-[40px]"
              onClick={() => setIsOpen(!isOpen)}
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col space-y-4 px-4 pb-3 scroll-smooth">
            <a href="#home" className="text-black ml-[15px] hover:text-pink-600 no-underline">Home</a>
            <a href="#about" className="text-black ml-[15px] hover:text-pink-600 no-underline">About</a>
            <a href="#department" className="text-black ml-[15px] hover:text-pink-600 no-underline">Department</a>
            <a href="#doctor" className="text-black ml-[15px] hover:text-pink-600 no-underline">Doctor</a>
            <a href="#contact" className="text-black ml-[15px] hover:text-pink-600 no-underline">Contact</a>

            {isLoggedIn ? (
              <>
                <span className="text-gray-700 font-semibold ml-[15px]">
                  👋 Welcome, <span className="text-pink-600">{username}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-gray-600 rounded-[100px] px-4 py-2 font-bold hover:opacity-70 text-[13px] text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/signin">
                <button className="bg-red-500 rounded-[100px] px-4 py-2 font-bold hover:opacity-70 text-[13px] text-white">
                  Sign In
                </button>
              </Link>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
