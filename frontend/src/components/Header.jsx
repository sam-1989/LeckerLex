import {React, useState} from 'react'
import { NavLink } from 'react-router-dom';
import {FaBars, FaTimes, FaUser, FaSearch} from "react-icons/fa";


function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <>
        <nav className="bg-gray-100 shadow rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <NavLink to="/" className="text-2xl font-bold text-gray-800">
                  Logo
                </NavLink>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaSearch size={20} className="text-gray-800 hover:text-gray-600 cursor-pointer m-5" />
              <div className="relative">
                {/* Mobiles Menü-Symbol */}
                <div className="md:hidden">
                  {isDropdownOpen ? (
                    <FaTimes
                      onClick={() => setIsDropdownOpen(false)}
                      className="text-gray-800 hover:text-gray-600 cursor-pointer"
                    />
                  ) : (
                    <FaBars
                      onClick={() => setIsDropdownOpen(true)}
                      className="text-gray-800 hover:text-gray-600 cursor-pointer"
                    />
                  )}
                </div>
                {/* Desktop User Icon */}
                <FaUser
                size={20}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="text-gray-800 hover:text-gray-600 cursor-pointer hidden md:block active:text-blue-600"
                />
                {/* Dropdown-Menü */}
                {isDropdownOpen && (
                  <div className="absolute right-0 md:left-5 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                    <NavLink
                      to="/login"
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
        </div>
      </nav>
    </>
  )
}

export default Header