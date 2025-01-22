import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";


function SearchBar({ searchText, setSearchText, handleSearch }) {
  const [placeholder, setPlaceholder] = useState("Enter here your ingredients...");

  return (
    <div className="text-center mb-4 px-4 mt-6">
      <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-gray-800 m-4 sm:m-8 font-medium">Find a recipe with your ingredients 🥘✨</h2>
      <div className="mt-4 flex justify-center items-center sticky top-0">
        <label htmlFor="ingredient-search" className="sr-only">Search for recipes by ingredients</label>
        <div className="relative w-full max-w-xs m-2">
          <input
            id="ingredient-search"
            type="text"
            className="w-full p-2 border border-gray-300 rounded-full shadow-md hover:shadow-lg focus:ring-1
             focus:ring-green-800 transition duration-100 font-book placeholder-black"
            placeholder={placeholder}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => setPlaceholder("")}
            onBlur={() => setPlaceholder("Enter here your ingredients...")}
            aria-label="Search for recipes by ingredients"
          />
          <button
            className="absolute right-0 top-0 h-full px-4 bg-green-500 font-medium text-white rounded-full hover:bg-green-600 hover:scale-105 
            transition duration-300"
            onClick={handleSearch}
            aria-label="Search"
          >
            <FaSearch />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;