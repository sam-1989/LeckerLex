import React, { useContext, useEffect, useState } from "react";
import { RecipeContext } from "../context/RecipeContext";

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
}

export default MyShoppingList;
