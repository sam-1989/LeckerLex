
import React, { useContext, useEffect, useState } from "react";

import { RecipeContext } from "../context/RecipeContext";
import { Link } from "react-router-dom";
import shoppingCartImage from "../assets/images/shoppingcart.webp";

function MyShoppingList() {
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [showAddIngredient, setShowAddIngredient] = useState(false);
  const { shoppingList, setShoppingList } = useContext(RecipeContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [markedForRemoval, setMarkedForRemoval] = useState([]);

  // get request on mount (empty dependency array)
  useEffect(() => {
    const getShoppingList = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:3000/users/shoppinglist",
          { credentials: "include" }
        );

        if (!response.ok) {
          setError("Failed to fetch shopping list.");
        }

        const result = await response.json();
        console.log(result);

        setShoppingList(result);
      } catch (error) {
        console.log("Error while updating shopping list:", error);
        setError(error.msg);
      } finally {
        setLoading(false);
      }
    };

    getShoppingList();
  }, []);

  // Loading state UI
  if (loading) {
    return (
      <p className="min-h-screen flex items-center justify-center text-md font-semibold text-gray-800">
        Loading shopping list...
      </p>
    );
  }

  // Error state UI
  if (error) {
    return (
      <p className="min-h-screen flex items-center justify-center text-md font-semibold text-gray-800">
        Error: {error}
      </p>
    );
  }



  const [missingIngredients, setMissingIngredients] = useState([
    { name: "Tomatos", amount: 2, unit: "piece/s" },
    { name: "Cucumbers", amount: 1, unit: "piece/s" },
    { name: "Onions", amount: 3, unit: "piece/s" },
    { name: "Olive Oil", amount: 100, unit: "ml" },
    { name: "Salt", amount: 1, unit: "prize" },
  ]);

  // Function to handle the checkbox change event
  const handleIngredientChoise = (name) => {
    setPurchasedItems(
      (prev) =>
        prev.includes(name)
          ? prev.filter((item) => item !== name) // Remove item if already purchased
          : [...prev, name] // Add item if not purchased
    );
  };

  // mark all items as purchased
  const markAllAsPurchased = () => {
    setPurchasedItems(missingIngredients.map((item) => item.name));
    setShowSaveButton(true);
  };

  // mark all items as not purchased
  const handleSaveAndRemoveAll = () => {
    setMissingIngredients([]);
    setPurchasedItems([]);
    setShowSaveButton(false);
  };

  const handleAddIngredientClick = () => {
    setShowAddIngredient(true);
  };

  const handleSaveNewIngredient = () => {
    setMissingIngredients((prev) => [
      ...prev,
      { name: newIngredient, amount: 1, unit: "piece/s" },
    ]);
    setNewIngredient("");
    setShowAddIngredient(false);
  };

  return (
    <div className="flex min-h-fit">
      {/* Image Section */}
      <div className="hidden lg:flex w-auto mt-4 flex-col items-center justify-center">
        <img
          src={shoppingCartImage}
          alt="Shopping Cart"
          className="w-2/4 h-auto rounded-lg object-cover"
        />
      </div>

      {/* Shopping List Section */}
      <div className="p-8 m-10 w-full lg:w-2/3 bg-gray-100 rounded-3xl shadow-md">
        {/* Link to navigate back to recipe details */}
        <Link
          to="/recipe-details"
          className="bg-green-600 text-white px-4 py-3 mb-8 rounded-full hover:bg-green-700 shadow-md transition inline-block"
        >
          Back to your Recipe
        </Link>

        {/* Title of the shopping list page */}
        <h1 className="text-3xl font-medium mb-16 text-center">
          Shop Smart, Stay Organized
        </h1>

        {/* Buttons all items as purchased and adding an ingredient */}
        <div className="flex flex-col justify-between mb-8 relative">
          <div className="flex justify-between mb-8">
            <button
              className="bg-blue-500 text-white px-4 py-2 mr-2 rounded-full hover:bg-blue-600 shadow-md transition"
              onClick={markAllAsPurchased}
            >
              Mark All as Purchased
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 mr-2 rounded-full hover:bg-blue-600 shadow-md transition"
              onClick={handleAddIngredientClick}
            >
              Add an Ingredient
            </button>
          </div>

          {/* add a new ingredient */}

          {showAddIngredient && (
            <div className="absolute -top-16 left-80 mt-2 bg-white p-4 rounded-3xl shadow-md">
              <h2 className="text-xl mb-2">Add a new ingredient</h2>
              <input
                type="text"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                className="border p-2 mb-2 w-full"
              />
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 shadow-md transition mr-2"
                onClick={handleSaveNewIngredient}
              >
                Save
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 shadow-md transition"
                onClick={() => setShowAddIngredient(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* List of missing ingredients */}
        {missingIngredients.length > 0 ? (
          <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {missingIngredients.map((item, index) => (
              <li
                key={index}
                onClick={() => handleIngredientChoise(item.name)}
                className={`flex flex-col sm:flex-row justify-between items-center p-4 hover:bg-gray-300 rounded-3xl transition-transform transform
                                                     hover:scale-105 hover:shadow-md cursor-pointer ${
                                                       purchasedItems.includes(
                                                         item.name
                                                       )
                                                         ? "line-through text-gray-700 bg-gray-200"
                                                         : "bg-white hover:bg-gray-50"
                                                     }`}
              >
                <div className="flex items-center mb-2 sm:mb-0">
                  <span className="font-semibold">{item.name}</span>
                </div>
                <span className="text-sm text-gray-700">
                  {item.amount} {item.unit}
                </span>
              </li>
            ))}
            {showSaveButton && (
              <button
                onClick={handleSaveAndRemoveAll}
                className="bg-green-600 text-white px-4 py-3 mb-8 rounded-full hover:bg-green-700
                     shadow-md transition inline-block"
              >
                Save and Remove All
              </button>
            )}
          </ul>
        ) : (
          // Display if the shopping list is empty
          <p className="text-gray-600 text-center mt-6">
            Your shopping list is empty.
          </p>
        )}
      </div>
    </div>
  );
}

export default MyShoppingList;
