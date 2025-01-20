import React, { useEffect } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  selectedIngredients,
  handleRemoveIngredient,
  handleRemoveAll,
}) {

  // open the sidebar once an ingredient is clicked
  
  useEffect(()=> {
    if (selectedIngredients.length > 0){
    setIsSidebarOpen(true);
    }
  }, [selectedIngredients, setIsSidebarOpen]);

   // close the sidebar once "remove all" is clicked
  
   const handleRemoveAllClick = () => {
    handleRemoveAll();
    setIsSidebarOpen(false);
   };

  const handleRemoveIngredientClick = (ingredientIndex) => () => {
    handleRemoveIngredient(ingredientIndex);

  };

  return (
    <div className="relative">
      <div
        className={`fixed top-16 left-0 w-64 h-full rounded-r-3xl bg-gray-100 shadow-2xl p-4
          overflow-y-auto transition-transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <h2 className="text-xl font-book mb-4">
          Chosen Ingredients {selectedIngredients.length}
        </h2>
        <ul>
          {selectedIngredients.map((ingredient, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 mb-2 font-book hover:bg-gray-200"
            >
            {ingredient}
            <button
                onClick={handleRemoveIngredientClick(index)}
                className="ml-4 text-red-500"
              >
                X
              </button>
            </li>
          ))}
        </ul>
        <button
          className="mt-auto bg-red-500 text-white py-2 px-4 rounded-lg hover:scale-105"
          onClick={handleRemoveAllClick}
        >
          Remove All
        </button>
      </div>
      <div
        className={`fixed bottom-4 left-4 transition-all duration-300 ${
          isSidebarOpen ? "translate-x-64" : "translate-x-0"
        }`}
      >
        <button
          className="bg-blue-500 text-white px-4 py-4 rounded-full shadow-lg flex items-center justify-center"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
