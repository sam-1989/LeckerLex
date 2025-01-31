import React, { useContext, useState, useEffect } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import shoppingCartImage from "../assets/images/shoppingcart.webp";



function Favorites() {
  const { favorites, setFavorites } = useContext(RecipeContext);
  const { setShoppingList } = useContext(RecipeContext);
  const [hasInitialized, setHasInitialized] = useState(false);
  
  

  
  const [cookTime, setCookTime] = useState('');
  const [calories, setCalories] = useState('');
  const [nutrition, setNutrition] = useState('');

  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [servings, setServings] = useState(1);
  const [missingIngredients,setMissingIngredients] = useState({});
  const [pendingShoppingListUpdate, setPendingShoppingListUpdate] = useState(null);
  
  const toggleDetails = (id) => {
    setSelectedRecipeId((prevId) => (prevId === id ? null : id));  // Zustand toggeln
   };

  const handleIncreaseServings = () => {
    setServings((prev) => Math.round((prev + 0.5) * 10) / 10);
  };
  const handleDecreaseServings = () => {
    setServings((prev) => Math.max(0.5, Math.round((prev - 0.5) * 10) / 10));
  };



  // Diese Funktion verwaltet das Hinzufügen / Entfernen von Zutaten zur missingIngredients-Liste, basierend auf dem recipeId. Sie aktualisiert auch die Menge der fehlenden Zutaten abhängig von servings.
  const toggleMissingIngredient = (recipeId, ingredient) => {
    setMissingIngredients((prev) => {
      const updated = { ...prev };
      

      if (!updated[recipeId]) {
        // Wenn die Zutat schon fehlt, entfernen wir sie
        updated[recipeId] = [];
      } 

      const existingIndex = updated[recipeId].findIndex(
        (item) => item.name === ingredient.name);
        
      if (existingIndex > -1) {
        // Entfernen, wenn bereits vorhanden
        updated[recipeId].splice(existingIndex, 1);  // Entferne die Zutat, wenn sie schon da ist
      } else {
        // Hinzufügen mit angepasster Menge
        updated[recipeId].push({
          name: ingredient.name,
          amount: (ingredient.amount * servings).toFixed(1),
          unit: ingredient.unit,
        });
      }
      // Speichern in Favoriten, damit die Daten bestehen bleiben
    setFavorites((prevFavorites) => 
    prevFavorites.map((fav) =>
    fav.id === recipeId ? { ...fav, missingIngredients: updated[recipeId] } : fav
    )
  );
  
  return updated;
  });
};

// useEffect zur automatischen Aktualisierung der Mengen. Wenn servings geändert wird, wird die Menge der bereits gespeicherten fehlenden Zutaten aktualisiert.
  useEffect(() => {
    setMissingIngredients((prev) => {
      const updatedMissing = { ...prev };
      Object.keys(updatedMissing).forEach((recipeId) => {
        updatedMissing[recipeId] = updatedMissing[recipeId].map((ingredient) => {
          const originalIngredient = favorites
          .find((r) => r.id === parseInt(recipeId))?.ingredients
          .find((ing) => ing.name === ingredient.name);

          return originalIngredient
          ? {
            ...ingredient,
            amount: (originalIngredient.amount * servings).toFixed(1)
          }
          : ingredient;
      });
    });
      return updatedMissing;
    });
  }, [servings]); // Abhängig von servings, um neu zu berechnen

  // useEffect zum Laden der gespeicherten fehlenden Zutaten aus favorites. Wenn ein Rezept aus den Favoriten ausgewählt wird, lädt dieser Effekt die missingIngredients.

  useEffect(() => {
    if (selectedRecipeId) {
      const storedMissing = favorites.find((fav) => fav.id === selectedRecipeId)?.missingIngredients || [];
      setMissingIngredients((prev) => ({ ...prev, [selectedRecipeId]: storedMissing}));
      console.log("Loaded missing ingredients:", storedMissing);
    }
  }, [selectedRecipeId, favorites]);

  // addMissingToShoppingList, diese Funktion speichert die Zutaten nur temporär in "pendingShoppingListUpdate", anstatt "setShoppinglist direkt im Render-Prozess auszuführen"

  const addMissingToShoppingList = async () => {
  
    if (!selectedRecipeId || !missingIngredients[selectedRecipeId]) return; 

    // Liste der fehlenden Zutaten nur mit Namen formatieren
    const missingNames = missingIngredients[selectedRecipeId]
    .filter(ingredient => ingredient.name)  // Sicherstellen, dass nur gültige Zutaten enthalten sind
    .map(ingredient => ingredient.name.trim().toLowerCase());

    if (missingNames.length === 0) return; // Falls keine Zutaten fehlen, nichts tun (abbrechen)
    
    try {
      const response = await fetch("http://localhost:3000/users/update-shoppinglist", {
        method: "PATCH",
        body: JSON.stringify({
          shoppingList: missingNames,
          action: "add",
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Falls Authentifizierung nötig ist
      });

      if (response.ok) {
        console.log("Shopping list updated successfully");

        // Entferne die hinzugefügten Zutaten aus "missingIngredients"
        setMissingIngredients((prev) => {
          const updated = { ...prev};
          delete updated[selectedRecipeId]; // Köscht die Zutaten für das aktuelle Rezept
          return updated;
        });
      } else {
        console.log("Failed to update shopping list.");
      }
    } catch (error) {
      console.log("Error while updating shopping list:", error);
    }
  };

  // useEffect wartet auf "pendingShoppingListUpdate und aktualisiert dann shoppingList". Nach der Aktualisierung wird "pendingShoppingListUpdate auf null gesetzt, damit es nicht erneut ungewollt  ausgelöst(getriggert) wird."
  useEffect(() => {
    if (!hasInitialized) {
      // hasInitialized sorgt dafür, dass useEffect erst nach dem ersten render triggert
      setHasInitialized(true); // Nur beim ersten Mal setzen
      return; // Verhindert, dass die Shopping List direkt beim ersten Render aktualisiert wird
    }

    if (pendingShoppingListUpdate) {
      setShoppingList(prevList => {
        const updatedList = new Set([...prevList, ...pendingShoppingListUpdate]);
        console.log("Auto-updated Shopping List:", updatedList);
        return [...updatedList];
      });

      setPendingShoppingListUpdate(null);  // Setzt die Variable zurück, um erneute Updates zu vermeiden
    }
  }, [pendingShoppingListUpdate]);  // Wird nur ausgeführt, wenn "pendingShoppingListUpdate" sich ändert
 

  const servingsText = `for ${servings} ${servings === 1 || servings === 0.5 ? 'serving' : 'servings'}`;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-10">
      {/* Bedingung: Wenn kein Rezept augewählt wurde, dann die Filterleiste anzeigen */}
      {!selectedRecipeId && (
      <main className="p-6 bg-white shadow-lg rounded-lg w-full max-w-2xl">
        <section>
          
          <div className="flex flex-wrap justify-around gap-4 mb-6">
            <label className="flex flex-col">
              <span className="mb-2 text-gray-700">Cooking time</span>
              <select
                value={cookTime}
                onChange={(e) => setCookTime(e.target.value)}
                className="p-2 border border-gray-300 rounded-3xl hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select...</option>
                <option value="0-15">0 - 15 minutes</option>
                <option value="15-30">15 - 30 minutes</option>
                <option value="30-45">30 - 45 minutes</option>
                <option value="45-60">45 - 60 minutes</option>
                <option value="60+">60 or more</option>
              </select>
            </label>
            <label className="flex flex-col">
              <span className="mb-2 text-gray-700">Calories</span>
              <select
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="p-2 border border-gray-300 rounded-3xl hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select...</option>
                <option value="0-100">0 - 100 calories</option>
                <option value="100-200">100 - 200 calories</option>
                <option value="200-300">200 - 300 calories</option>
                <option value="300-400">300 - 400 calories</option>
                <option value="400+">400 or more calories</option>
              </select>
            </label>
            <label className="flex flex-col">
              <span className="mb-2 text-gray-700">Nutrition</span>
              <select
                value={nutrition}
                onChange={(e) => setNutrition(e.target.value)}
                className="p-2 border border-gray-300 rounded-3xl hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
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

      {/* Übertragung von RecipeDetails */}
      <div className='p-4 max-w-6xl mx-auto'>
        {/* Bedingte Darstellung */}
        {selectedRecipeId ? (
          <div className='transition-all duration-500 ease-in-out border rounded-lg shadow-md bg-gray-100'>
            {/* Details des ausgewählten Rezepts */}
            {favorites
            .filter((recipe) => recipe.id === selectedRecipeId)
            .map((recipe) => (
              <div key={recipe.id} className='p-4'>
                {/* Zurück-Button */}
                <button
                onClick={() => setSelectedRecipeId(null)}
                className='bg-green-500 text-white px-1 py-1 text-xs rounded-3xl shadow-md hover:bg-green-600 focus:outline-none'
                >
                  Back to Favorites
                </button>
                {/* Bild */}
                <div className='w-full h-48 object-contain rounded-md mt-4'>
                  <img
                  src={recipe.image}
                  alt={recipe.title}
                  className='w-full h-full object-contain rounded-md'
                  />
                </div>

                {/* Titel */}
                
                <h2 className='text-2xl font-semibold  mt-4 text-center'>{recipe.title}</h2>

                {/* Serving + Ingredients */}
                
                <h3 className='text-md font-semibold mt-6 mb-4'>Servings</h3>
                <ul className="list-disc pl-6">
                  <div className="flex items-center mb-4">
                    <button
                    className=" w-5 h-5 sm:w-5 sm:h-5 flex items-center justify-center rounded-full  bg-gray-100 text-green-500 text-lg font-extrabold sm:text-xl   hover:bg-green-600 hover:text-white focus:outline-none"
                    onClick={handleDecreaseServings}
                    >
                      {"\u2212"} {/* Unicode Minus-zeichen */}
                    </button>
                      <p className="mx-2 sm:mx-4 text-sm sm:text-base lg:text-lg xl:text-base text-gray-600">
                        Ingredients {servingsText}
                      </p>
                        <button
                          className="w-5 h-5 sm:w-5 sm:h-5 flex items-center justify-center rounded-full  bg-gray-100 text-green-500 text-lg font-extrabold sm:text-xl   hover:bg-green-600 hover:text-white focus:outline-none"
                          onClick={handleIncreaseServings}
                          >
                            {"\uFF0B"}  {/* Unicode Plus-Zeichen */}
                          </button>
                    </div>
                    <h3 className='text-md font-semibold mt-6 mb-2'>Ingredients</h3>
                      
                      <h4 className='text-sm font-semibold p-1 text-green-500 mb-3'>Choose ingredients you are missing</h4>
                      {recipe.ingredients.map((ingredient, index) => {
                        const isSelected = (missingIngredients[recipe.id] || []).some(
                          (item) => item.name === ingredient.name
                        );
                        return (
                          <li
                          key={index}
                          onClick={() => toggleMissingIngredient(recipe.id, ingredient)}
                          className={`flex items-center gap-2 p-2 cursor-pointer rounded-3xl transition-colors duration-200 ${isSelected ? "bg-green-500 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                          >
                            {(ingredient.amount * servings).toFixed(1)} {ingredient.unit} {ingredient.name}
                          </li>
                        );
                      })}
                      </ul>

                {/* Missing Ingredients */}
                <h3 className='text-md font-semibold mt-4 mb-4'>Missing Ingredients</h3>
                
                <ul
                 className='list-disc pl-6'>
                  {favorites.find(fav => fav.id === recipe.id)?.missingIngredients?.map((ingredient, index) => (
                     <li key={index}>
                      {ingredient.amount} {ingredient.unit} {ingredient.name}
                    </li>
                    
                  ))}
                  </ul>
                  <div className='relative group'>
                  <button
                onClick={addMissingToShoppingList}
                className='bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg focus:outline-none mt-4'>
                  <FontAwesomeIcon icon={faShoppingCart} className='text-xl' />
                </button>
                {/* Tooltip */}
                <span className='absolut left-full ml-2 top-1/2 transform -translate-x-1/2  opacity-0 group-hover:opacity-100 bg-green-500 text-white text-xs rounded-md py-1 px-2 transition-opacity duration-300 whitespace-nowrap'>Add to Shopping List</span>
                </div>
                

                {/* Preparation */}
                <h3 className='text-md font-semibold mt-6'>Preparation</h3>
                <ol className='list-decimal pl-6'>
                  {recipe.preparation.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>

                {/* Nutrition */}
                <h3 className='text-md font-semibold mt-6'>Nutrition (pro 100g)</h3>
                <ul className='list-disc pl-6'>
                  {Object.entries(recipe.nutrition).map(([key, value]) => (
                    <li key={key}>
                      {key.charAt(0).toUpperCase() + key.slice(1)} : {value}
                      {key === "calories"
                      ? " kcal"
                      : key === "sodium"
                      ? " mg"
                      : " g"}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          /* Favoriten-Übersicht */
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {favorites.map((recipe) => (
              <div
              key={recipe.id}
              className='transition-all duration-500 ease-in-out border rounded-lg shadow-md'
              >
                {/* Bild */}
                <div className='p-4 flex flex-col items-center'>
                  <div className='w-full h-48 object-contain rounded-md'>
                    <img 
                    src={recipe.image}
                    alt={recipe.title}
                    className='w-full h-48 object-contain rounded-md mb-4'
                    />
                  </div>
                {/* Titel */}
                <div className='mt-4  flex  items-center justify-center  h-16'>
                <h2 className='text-lg font-semibold '>{recipe.title}</h2>
                </div>
                </div>

                {/* View-Details-Button */}
                <div className='flex items-center justify-center mt-4 mb-4'>
                  <button
                  onClick={() => toggleDetails(recipe.id)}
                  className='bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none'
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Bedingung: wenn kein Rezept ausgewählt wurde,dann dann den Button anzeigen */}
      {!selectedRecipeId && (
      <div className="flex justify-center mt-6 w-full">
        <button
          onClick={() => {
            // Logic to navigate back to home
            window.location.href = "/home";
          }}
          className="px-6 py-3 bg-blue-500 text-white rounded-3xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Back to Home
        </button>
      </div>
      )}
    </div>
  );
};

export default Favorites;
