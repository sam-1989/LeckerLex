
import React, { useContext, useEffect, useState } from "react";

import { RecipeContext } from "../context/RecipeContext";
import { Link } from "react-router-dom";
import shoppingCartImage from "../assets/images/shoppingcart.webp";

function MyShoppingList() {
  const { shoppingList, setShoppingList } = useContext(RecipeContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // one function to update shoppingList on save/submit (onClick)
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Shopping List</h1>
      {shoppingList.length > 0 ? (
        <ul className="list-disc pl-6">
          {shoppingList.map((item, index) => (
            <li key={index} className="mb-2">
              {item.name} {item.amount} {item.unit}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">Your shopping list is empty.</p>
      )}
    </div>
  );
=======
  const { shoppingList } = useContext(RecipeContext); // brauchen wir das noch? 
  const [purchasedItems, setPurchasedItems] = useState([]);

  const missingIngredients = [
    { name: "Tomatos", amount: 2, unit: "piece/s" },
    { name: "Cucumbers", amount: 1, unit: "piece/s" },
    { name: "Onions", amount: 3, unit: "piece/s" },
    { name: "Olive Oil", amount: 100, unit: "ml" },
    { name: "Salt", amount: 1, unit: "prize" },
  ];

// Function to handle the checkbox change event
const handleCheckboxChange = (name) => {
    setPurchasedItems((prev) =>
        prev.includes(name)
            ? prev.filter((item) => item !== name) // Remove item if already purchased
            : [...prev, name] // Add item if not purchased
    );
};

// Function to mark all items as purchased
const markAllAsPurchased = () => {
    setPurchasedItems(missingIngredients.map((item) => item.name));
};

// Function to mark all items as not purchased
const markAllAsNotPurchased = () => {
    setPurchasedItems([]); 
};

return (
    <div className="flex min-h-fit">
        {/* Image Section */}
        <div className="hidden lg:flex w-1/2 flex-col items-center justify-center bg-green-50 text-white">
            <img
                src={shoppingCartImage}
                alt="Shopping Cart"
                className="w-2/4 h-auto rounded-r-md object-cover"
            />
        </div>

       { /* Shopping List Section */}
        <div className="p-8 w-full lg:w-1/2 bg-gray-100 rounded-l-3xl shadow-md">

            {/* Link to navigate back to recipe details */}
            <Link
                to="/recipe-details"
                className="bg-green-600 text-white px-4 py-3 mb-8 rounded-full hover:bg-green-700 shadow-md transition inline-block"
            >
                Back to your Recipe 
            </Link>

            {/* Title of the shopping list page */}
            <h1 className="text-3xl font-medium mb-16 text-center">Shop Smart, Stay Organized</h1>

            {/* Buttons all items as purchased or not purchased */}
            <div className="flex justify-between mb-8">
                <button
                    className="bg-blue-500 text-white px-4 py-2 mr-2 rounded-full hover:bg-blue-600 shadow-md transition"
                    onClick={markAllAsPurchased}
                >
                    Mark All as Purchased
                </button>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 shadow-md transition"
                    onClick={markAllAsNotPurchased}
                >
                    Mark All as Not Purchased
                </button>
            </div>

            {/* List of missing ingredients */}
            {missingIngredients.length > 0 ? (
                <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {missingIngredients.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => handleCheckboxChange(item.name)}
                            className={`flex flex-col sm:flex-row justify-between items-center p-4 rounded-3xl border transition-transform transform
                                                     hover:scale-105 hover:shadow-md cursor-pointer ${
                                purchasedItems.includes(item.name)
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
                </ul>
            ) : (
                // Display if the shopping list is empty
                <p className="text-gray-600 text-center mt-6">Your shopping list is empty.</p>
            )}
        </div>
    </div>
);
}

export default MyShoppingList;
