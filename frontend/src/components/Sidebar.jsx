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

  useEffect(() => {
    if (selectedIngredients.length > 0) {
      setIsSidebarOpen(true);
    }
  }, [selectedIngredients, setIsSidebarOpen]);

  // close the sidebar once "remove all" is clicked

  const handleRemoveAllClick = () => {
    handleRemoveAll();
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    console.log("Sidebar mounted");
    return () => {
      console.log("Sidebar unmounted");
    };
  }, []);

  useEffect(() => {
    console.log("Selected ingredients in Sidebar:", selectedIngredients);
  }, [selectedIngredients]);

  const handleRemoveIngredientClick = (ingredientIndex) => () => {
    handleRemoveIngredient(ingredientIndex);
  };

  return (
    <div className="relative">
      <div
        className={`
          fixed bottom-10 left-0 w-full h-64 rounded-r-3xl bg-slate-200 overflow-y-auto transition-transform duration-500
          ${isSidebarOpen ? "translate-y-0" : "translate-y-full"} 
          md:top-20 md:left-0 md:w-64 md:h-full md:${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <h2 className="text-lg font-medium mb-6 m-2">
          Chosen Ingredients {selectedIngredients.length}
        </h2>
        <ul>
          {selectedIngredients.map((ingredient, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 mb-2 font-normal hover:bg-gray-200"
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
          className="mt-auto bg-red-500 text-white m-2 py-2 px-3 rounded-lg hover:scale-105"
          onClick={handleRemoveAllClick}
        >
          Remove All
        </button>
      </div>
      <div
        className={`fixed bottom-4 left-4 transition-all duration-500 ${
          isSidebarOpen ? "translate-x-64" : "translate-x-0"
        }`}
      >
        <button
          className="bg-blue-500 text-white md:mb-10 mb-72 px-4 py-4 rounded-full shadow-lg flex items-center justify-center"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
