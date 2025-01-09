import { React, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaSearch, FaTimes, FaUser } from "react-icons/fa";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <>
      <nav className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="flex justify-between h-16">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
          <NavLink to="/" className="text-2xl font-bold text-gray-800">
            Logo
          </NavLink>
        </div>
        {/* Icons */}
        <div className="flex items-center space-x-4">
          <FaSearch
            size={20}
            className="text-gray-800 hover:text-gray-600 cursor-pointer m-5"
          />
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
          {/* Show user icon for desktop */}
          <div className="relative hidden md:block">
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
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/settings"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Settings
                </NavLink>
                <NavLink
                  to="/favorites"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Favoriten
                </NavLink>
                <NavLink
                  to="/recipes"
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
