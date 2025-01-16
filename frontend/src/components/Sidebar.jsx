import React from 'react';

function Sidebar({ isSidebarOpen, setIsSidebarOpen, selectedIngredients, handleRemoveIngredient, handleRemoveAll }) {
  return (
    <>
      <button
        className="fixed md:top-40 md:left-0 bottom-52 left-1/2 transform -translate-x-1/2 md:ml-4 p-2 bg-blue-500 text-white rounded-lg md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? "Close Sidebar" : `Show selected Ingredients (${selectedIngredients.length})`}
      </button>
      {isSidebarOpen && (
        <div className="fixed md:top-60 md:left-0 bottom-16 left-1/2 transform -translate-x-1/2 w-11/12 md:w-64 h-auto md:h-full bg-white shadow-lg p-4 overflow-y-auto max-h-52 md:max-h-full">
          <h2 className="text-xl font-bold mb-4">Selected Ingredients</h2>
          <ul>
            {selectedIngredients.map((ingredient, index) => (
              <li key={index} className="flex justify-between items-center mb-2">
                <span>{ingredient}</span>
                <button
                  className="text-red-500"
                  onClick={() => handleRemoveIngredient(ingredient)}
                >
                  x
                </button>
              </li>
            ))}
          </ul>
          <button
            className="mt-4 p-2 bg-red-500 text-white rounded-lg w-full"
            onClick={handleRemoveAll}
          >
            Remove All
          </button>
        </div>
      )}
    </>
  );
}

export default Sidebar;