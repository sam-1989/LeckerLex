import React from 'react';

function Sidebar({ isSidebarOpen, setIsSidebarOpen, selectedIngredients, handleRemoveIngredient, handleRemoveAll }) {
  return (
    <>
      <button
        className="fixed top-20 left-0 ml-4 p-2 bg-blue-500 text-white rounded"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? "Close Sidebar" : `Show selected Ingredients (${selectedIngredients.length})`}
      </button>
      {isSidebarOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg p-4">
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
            className="mt-4 p-2 bg-red-500 text-white rounded w-full"
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