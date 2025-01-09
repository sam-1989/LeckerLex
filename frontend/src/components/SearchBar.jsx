import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({searchText, setSearchText}) {
  const [placeholder, setPlaceholder] = useState("Enter your ingredients...");

  return (
    <div className="text-center mb-6 px-4">
      <h2 className="text-xl sm:text-4xl font-bold text-gray-800 m-8">
        Got ingredients? We got the recipe! 🥘✨
      </h2>
      <div className="mt-4 flex justify-center">
        <input
          type="text"
          className="w-full sm:w-1/2 p-2 border border-gray-200 rounded-l-full shadow-lg
              hover:border-gray-400 hover:shadow-xl
              focus:border-green-500 focus:ring-3 focus:ring-green-400
              transition duration-300 outline-none"
          placeholder={placeholder}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={() => setPlaceholder("")}
          onBlur={() => setPlaceholder("Enter your ingredients...")}
        />
        <button className="p-4 bg-green-500 text-white rounded-r-full">
          <FaSearch />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
