import React, { useContext, useState, useEffect } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

function Favorites() {
  const { favorites, setFavorites, setShoppingList } = useContext(RecipeContext);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [cookTime, setCookTime] = useState('');
  const [calories, setCalories] = useState('');
  const [nutrition, setNutrition] = useState('');
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [servings, setServings] = useState(1);
  const [missingIngredients, setMissingIngredients] = useState({});
  const [pendingShoppingListUpdate, setPendingShoppingListUpdate] = useState(null);

  const navigate = useNavigate();

  const toggleDetails = (id) => {
    setSelectedRecipeId(prevId => (prevId === id ? null : id));
  };

  const handleIncreaseServings = () => {
    setServings(prev => Math.round((prev + 0.5) * 10) / 10);
  };

  const handleDecreaseServings = () => {
    setServings(prev => Math.max(0.5, Math.round((prev - 0.5) * 10) / 10));
  };

  // Manage missing ingredients for a recipe
  const toggleMissingIngredient = (recipeId, ingredient) => {
    setMissingIngredients(prev => {
      const updated = { ...prev };
      if (!updated[recipeId]) {
        updated[recipeId] = [];
      }
      const existingIndex = updated[recipeId].findIndex(item => item.name === ingredient.name);
      if (existingIndex > -1) {
        updated[recipeId].splice(existingIndex, 1);
      } else {
        updated[recipeId].push({
          name: ingredient.name,
          amount: (ingredient.amount * servings).toFixed(1),
          unit: ingredient.unit,
        });
      }
      setFavorites(prevFavorites => 
        prevFavorites.map(fav =>
          fav.id === recipeId ? { ...fav, missingIngredients: updated[recipeId] } : fav
        )
      );
      return updated;
    });
  };

  useEffect(() => {
    setMissingIngredients(prev => {
      const updatedMissing = { ...prev };
      Object.keys(updatedMissing).forEach(recipeId => {
        updatedMissing[recipeId] = updatedMissing[recipeId].map(ingredient => {
          const originalIngredient = favorites
            .find(r => r.id === parseInt(recipeId))?.ingredients
            .find(ing => ing.name === ingredient.name);
          return originalIngredient
            ? { ...ingredient, amount: (originalIngredient.amount * servings).toFixed(1) }
            : ingredient;
        });
      });
      return updatedMissing;
    });
  }, [servings, favorites]);

  useEffect(() => {
    if (selectedRecipeId) {
      const storedMissing = favorites.find(fav => fav.id === selectedRecipeId)?.missingIngredients || [];
      setMissingIngredients(prev => ({ ...prev, [selectedRecipeId]: storedMissing }));
    }
  }, [selectedRecipeId, favorites]);

  const addMissingToShoppingList = async () => {
    if (!selectedRecipeId || !missingIngredients[selectedRecipeId]) return;
    const missingNames = missingIngredients[selectedRecipeId]
      .filter(ingredient => ingredient.name)
      .map(ingredient => ingredient.name.trim().toLowerCase());
    if (missingNames.length === 0) return;
    try {
      const response = await fetch("http://localhost:3000/users/update-shoppinglist", {
        method: "PATCH",
        body: JSON.stringify({
          shoppingList: missingNames,
          action: "add",
        }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (response.ok) {
        setMissingIngredients(prev => {
          const updated = { ...prev };
          delete updated[selectedRecipeId];
          return updated;
        });
      } else {
        console.log("Failed to update shopping list.");
      }
    } catch (error) {
      console.log("Error while updating shopping list:", error);
    }
  };

  useEffect(() => {
    if (!hasInitialized) {
      setHasInitialized(true);
      return;
    }
    if (pendingShoppingListUpdate) {
      setShoppingList(prevList => {
        const updatedList = new Set([...prevList, ...pendingShoppingListUpdate]);
        return [...updatedList];
      });
      setPendingShoppingListUpdate(null);
    }
  }, [pendingShoppingListUpdate, setShoppingList]);

  const servingsText = `for ${servings} ${servings === 1 || servings === 0.5 ? 'serving' : 'servings'}`;

  return (
    <div className="min-h-screen bg-black py-10 z-0">
      {/* Filter Section */}
      {!selectedRecipeId && (
        <main className="bg-[#11151E] shadow-xl rounded-3xl w-full max-w-2xl mx-auto p-6 mb-10">
          <section>
            <div className="flex flex-wrap justify-around gap-4 mb-6">
              <label className="flex flex-col items-center">
                <span className="mb-2 text-gray-200">Cooking Time</span>
                <select
                  value={cookTime}
                  onChange={(e) => setCookTime(e.target.value)}
                  className="p-2 border border-gray-600 rounded-3xl hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600 transition-colors bg-gray-700 text-gray-200"
                >
                  <option value="">Select...</option>
                  <option value="0-15">0 - 15 minutes</option>
                  <option value="15-30">15 - 30 minutes</option>
                  <option value="30-45">30 - 45 minutes</option>
                  <option value="45-60">45 - 60 minutes</option>
                  <option value="60+">60 or more</option>
                </select>
              </label>
              <label className="flex flex-col items-center">
                <span className="mb-2 text-gray-200">Calories</span>
                <select
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  className="p-2 border border-gray-600 rounded-3xl hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600 transition-colors bg-gray-700 text-gray-200"
                >
                  <option value="">Select...</option>
                  <option value="0-100">0 - 100 calories</option>
                  <option value="100-200">100 - 200 calories</option>
                  <option value="200-300">200 - 300 calories</option>
                  <option value="300-400">300 - 400 calories</option>
                  <option value="400+">400 or more calories</option>
                </select>
              </label>
              <label className="flex flex-col items-center">
                <span className="mb-2 text-gray-200">Nutrition</span>
                <select
                  value={nutrition}
                  onChange={(e) => setNutrition(e.target.value)}
                  className="p-2 border border-gray-600 rounded-3xl hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600 transition-colors bg-gray-700 text-gray-200"
                >
                  <option value="">Select...</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="gluten-free">Gluten-free</option>
                  <option value="dairy-free">Dairy-free</option>
                </select>
              </label>
            </div>
          </section>
        </main>
      )}

      {/* Recipe Details / Favorites */}
      <div className="p-4 max-w-6xl mx-auto">
        {selectedRecipeId ? (
          <div className="border rounded-lg shadow-xl bg-gray-900 transition-all duration-500 ease-in-out">
            <div className="p-6">
              <button
                onClick={() => setSelectedRecipeId(null)}
                className="bg-green-500 text-white px-4 py-3 text-xs rounded-3xl shadow-md hover:bg-green-600 focus:outline-none mb-4"
              >
                Back to Favorites
              </button>
              <div className="w-full h-48 object-contain rounded-md mt-4">
                <img
                  src={favorites.find(fav => fav.id === selectedRecipeId)?.image}
                  alt="Selected Recipe"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <h2 className="text-2xl font-semibold mt-4 text-center text-white">
                {favorites.find(fav => fav.id === selectedRecipeId)?.title}
              </h2>

              {/* Servings & Ingredients Control */}
              <h3 className="text-md font-semibold mt-6 mb-4 text-center text-gray-200">Servings</h3>
              <div className="flex items-center justify-center mb-4">
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-green-500 text-lg font-extrabold hover:bg-green-600 hover:text-white focus:outline-none"
                  onClick={handleDecreaseServings}
                >
                  {"\u2212"}
                </button>
                <p className="mx-2 text-sm text-gray-300">Ingredients {servingsText}</p>
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-green-500 text-lg font-extrabold hover:bg-green-600 hover:text-white focus:outline-none"
                  onClick={handleIncreaseServings}
                >
                  {"\uFF0B"}
                </button>
              </div>
              <h3 className="text-md font-semibold mt-6 mb-2 text-white">Ingredients</h3>
              <h4 className="text-sm font-semibold p-1 text-green-500 mb-3 text-center">
                Choose ingredients you are missing
              </h4>
              <ul className="list-disc pl-6">
                {favorites
                  .find(fav => fav.id === selectedRecipeId)
                  ?.ingredients.map((ingredient, index) => {
                    const isSelected = (missingIngredients[selectedRecipeId] || []).some(
                      (item) => item.name === ingredient.name
                    );
                    return (
                      <li
                        key={index}
                        onClick={() => toggleMissingIngredient(selectedRecipeId, ingredient)}
                        className={`flex items-center gap-2 p-2 cursor-pointer rounded-3xl transition-colors duration-200 ${
                          isSelected ? "bg-green-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                        }`}
                      >
                        {(ingredient.amount * servings).toFixed(1)} {ingredient.unit} {ingredient.name}
                      </li>
                    );
                  })}
              </ul>

              {/* Missing Ingredients */}
              <h3 className="text-md font-semibold mt-4 mb-4 text-white">Missing Ingredients</h3>
              <ul className="list-disc pl-6 text-gray-300">
                {favorites.find(fav => fav.id === selectedRecipeId)?.missingIngredients?.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.amount} {ingredient.unit} {ingredient.name}
                  </li>
                ))}
              </ul>

              {/* Add to Shopping List Button */}
              <div className="relative group mt-4 flex justify-center">
                <button
                  onClick={addMissingToShoppingList}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg focus:outline-none"
                >
                  <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
                </button>
                <span className="absolute left-full ml-2 top-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-green-500 text-white text-xs rounded-md py-1 px-2 transition-opacity duration-300 whitespace-nowrap">
                  Add to Shopping List
                </span>
              </div>

              {/* Preparation */}
              <h3 className="text-md font-semibold mt-6 text-white">Preparation</h3>
              <ol className="list-decimal pl-6 text-gray-300">
                {favorites.find(fav => fav.id === selectedRecipeId)?.preparation.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>

              {/* Nutrition */}
              <h3 className="text-md font-semibold mt-6 text-white">Nutrition (per 100g)</h3>
              <ul className="list-disc pl-6 text-gray-300">
                {favorites.find(fav => fav.id === selectedRecipeId)?.nutrition &&
                  Object.entries(favorites.find(fav => fav.id === selectedRecipeId)?.nutrition).map(([key, value]) => (
                    <li key={key}>
                      {key.charAt(0).toUpperCase() + key.slice(1)} : {value}
                      {key === "calories" ? " kcal" : key === "sodium" ? " mg" : " g"}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        ) : (
          /* Favorites Overview */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {favorites.map((recipe) => (
              <div
                key={recipe.id}
                className="transition-all duration-500 ease-in-out border rounded-lg shadow-md bg-white"
              >
                {/* Image */}
                <div className="p-4 flex flex-col items-center">
                  <div className="w-full h-48 object-contain rounded-md">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-48 object-cover rounded-t-lg hover:opacity-90 transition-opacity"
                    />
                  </div>
                  {/* Title */}
                  <div className="mt-4 flex items-center justify-center h-16">
                    <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
                  </div>
                </div>
                {/* View Details Button */}
                <div className="flex items-center justify-center mt-4 mb-4">
                  <button
                    onClick={() => toggleDetails(recipe.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600 focus:outline-none"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Back to Home Button */}
      {!selectedRecipeId && (
        <div className="flex justify-center mt-6 w-full">
          <button
            onClick={() => {
              window.location.href = "/home";
            }}
            className="px-6 py-3 bg-green-500 text-white rounded-3xl hover:bg-green-700 focus:outline-none"
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
}

export default Favorites;
