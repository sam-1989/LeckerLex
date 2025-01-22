import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  FaUser,
  FaSun,
  FaMoon,
  FaHeart,
  FaCartArrowDown,
  FaSignOutAlt,
} from "react-icons/fa";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // state for dropdown menu
  const [isDarkMode, setIsDarkMode] = useState(false); // state for darkMode
  const { setIsLoggedIn } = useContext(AuthContext);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // function for closing the menu bar by clicking anywhere outside the menubar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/users/logout", {
        // TODO: use env variables for route
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        console.error("Failed to logout", errorMessage); // debug log
        return;
      }
      navigate("/home");
      setIsDropdownOpen(false);
      setTimeout(() => setIsLoggedIn(false), 0);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav
      className={`hidden sm:block max-w-full mx-auto px-4 sm:px-6 lg:px-8 relative ${
        isDarkMode ? "dark" : "light"
      }`}
    >
      <div className="flex justify-between h-16 z-50">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
          <NavLink
            to="/home"
            className="text-2xl font-medium hover:text-gray-500 text-gray-800 dark:text-gray-200"
          >
            Logo
          </NavLink>
        </div>
        <div className="flex items-center space-x-4">
          {/* User icon and darkmode toggle */}
          <button
            onClick={toggleDarkMode}
            className="focus:outline-none transition duration-300 ease-in-out"
          >
            {isDarkMode ? (
              <FaSun className="text-yellow-500 transition duration-300 ease-in-out" />
            ) : (
              <FaMoon className="text-gray-800 dark:text-gray-200 transition duration-300 ease-in-out" />
            )}
          </button>

          <div className="relative z-50" ref={dropdownRef}>
            <FaUser
              size={20}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-gray-800 hover:text-gray-500 cursor-pointer active:text-blue-600"
            />

            {isDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-700 border
               border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50"
              >
                <NavLink
                  to="/home/profile"
                  className="flex items-center px-4 py-2 text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <FaUser className="mr-2" /> Profile
                </NavLink>
                <NavLink
                  to="/home/favorites"
                  className="flex items-center px-4 py-2 text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <FaHeart className="mr-2" /> Favorites
                </NavLink>
                <NavLink
                  to="/home/shopping-list"
                  className="flex items-center px-4 py-2 text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <FaCartArrowDown className="mr-2" /> My Shopping List
                </NavLink>
                <button
                  className="flex items-center w-full px-4 py-2 text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
