import  React, {useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaSearch, FaTimes, FaUser, FaSun, FaMoon } from "react-icons/fa";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dropdownRef = useRef(null);

  // function for closing the menu bar by clicking anywhere outside the menubar
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(()=> {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    };
  }, [isDropdownOpen]);

  // useEffect for darkmode 

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };


  return (
    <>
      <nav className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="flex justify-between h-16">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
          <NavLink to="/home" className="text-2xl font-bold text-gray-800">
            Logo
          </NavLink>
        </div>
        <div className="flex items-center space-x-4">
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            {isMobileMenuOpen ? (
              <FaTimes
                size={20}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-800 hover:text-gray-600 cursor-pointer"
              />
            ) : (
              <FaBars
                size={20}
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-gray-800 hover:text-gray-600 cursor-pointer"
              />
            )}
            
          </div>

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

          <div className="relative" ref={dropdownRef}>
            <FaUser
              size={20}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-gray-800 hover:text-gray-600 cursor-pointer active:text-blue-600"
            />
            
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                <NavLink
                  to="/home/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Profile
                </NavLink>
                
                <NavLink
                  to="/home/favorites"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Favoriten
                </NavLink>
                <NavLink
                  to="/home/recipes"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Recipes
                </NavLink>
                
                <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">
                  Log out
                </button>
              </div>
            )}
            
          </div>
          
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-300 mt-2 pt-2 space-y-1 bg-white shadow-lg">
          <NavLink
            to="/profile"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Profile
          </NavLink>
          <NavLink
            to="/settings"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Settings
          </NavLink>
          <NavLink
            to="/favorites"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Favoriten
          </NavLink>
          <NavLink
            to="/recipes"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Recipes
          </NavLink>
          <button
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Log out
          </button>
        </div>
      )}
    </nav>
    </>
  );
}

export default Navbar;
