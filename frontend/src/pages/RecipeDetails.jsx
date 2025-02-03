import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RecipeContext } from "../context/RecipeContext";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faHeart,
  faLeaf,
  faSeedling,
  faWheatAlt,
  faTint,
  faUtensils,
  faFire,
} from "@fortawesome/free-solid-svg-icons";

function RecipeDetails() {
  const { id } = useParams(); // Rezept-ID aus der URL
  const { recipes } = useContext(RecipeContext); // Rezepte aus dem Context
  const { isLoggedIn } = useContext(AuthContext);
  const { isFavorite, setIsFavorite, favorites, setFavorites } =
    useContext(RecipeContext);

  console.log("Initial favorites in RecipeDetails:", favorites);

  const navigate = useNavigate();

  // Finde das Rezept mit der passenden ID
  const recipe = recipes.find((x) => x.id === Number(id));

  // State declarations
  const [showMissingIngredients, setShowMissingIngredients] = useState(true);
  const [visibleSection, setVisibleSection] = useState(null);
  const [showShoppingListModal, setShowShoppingListModal] = useState(false);
  const [pauseBanner, setPauseBanner] = useState(false);
  const [servings, setServings] = useState(recipe?.servingsAmount || 1);
  const [showFavoriteModal, setShowFavoriteModal] = useState(false);

  // Toggle between sections (Ingredients, Nutrition, Preparation)
  const toggleSection = (section) => {
    setVisibleSection(visibleSection === section ? null : section);
    setPauseBanner(visibleSection === section ? false : true);
  };

  // Toggle recipe as favorite
  const toggleFavorite = () => {
    const currentRecipe = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      ingredients: recipe.ingredients.map((ingredient) => ({
        name: ingredient.name,
        amount: Number.isInteger(ingredient.amount * servings)
          ? ingredient.amount * servings // Ganze Zahl ohne Dezimalstellen
          : (ingredient.amount * servings).toFixed(1), // Eine Nachkommastelle bei Dezimalzahlen
        unit: ingredient.unit,
      })),
      preparation: recipe.steps.map((step) => step.description),
      preparationTime: recipe.preparationTime,
      diet: {
        vegetarian: recipe.diet?.vegetarian || false,
        vegan: recipe.diet?.vegan || false,
        glutenFree: recipe.diet?.glutenFree || false,
        dairyFree: recipe.diet?.dairyFree || false,
      },
      nutrition: recipe.nutritionPer100g,
      calories: recipe.nutritionPer100g?.calories,
    };
    console.log("Current Recipe being saved:", currentRecipe);

    if (isFavorite.includes(recipe.id)) {
      setIsFavorite(isFavorite.filter((favId) => favId !== recipe.id));
      setFavorites(favorites.filter((fav) => fav.id !== recipe.id));
    } else {
      setIsFavorite([...isFavorite, recipe.id]);
      setFavorites([...favorites, currentRecipe]);
      setShowFavoriteModal(true);
      setTimeout(() => setShowFavoriteModal(false), 3000);
    }
  };

  // Add missing ingredients to the shopping list
  const handleAddToShoppingList = async () => {
    try {
      if (!isLoggedIn) {
        navigate(`/home/login?redirectTo=/home/recipe-details/${id}`);
      } else {
        setShowShoppingListModal(true);
        let shoppingListItems = recipe.missedIngredients.map(
          (item) => item.name
        ); // Add missed ingredients

        const formattedShoppingListItems = shoppingListItems.map((item) =>
          item.trim().toLowerCase()
        );

        const response = await fetch(
          "http://localhost:3000/users/update-shoppinglist",
          {
            // TODO: use env variables for route
            method: "PATCH",
            body: JSON.stringify({
              shoppingList: formattedShoppingListItems,
              action: "add",
            }),
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (response.ok) {
          console.log("Shopping list updated successfully");
        } else {
          console.log("Failed to update shopping list.");
        }
      }
    } catch (error) {
      console.log("Error while updating shopping list:", error);
    }
  };

  // Close the shopping list modal and missing ingredients window
  const handleCloseShoppingListModal = () => {
    setShowShoppingListModal(false);
    setShowMissingIngredients(false);
  };

  // Adjust servings
  const handleIncreaseServings = () => {
    setServings((prev) => Math.round((prev + 0.5) * 10) / 10);
  };
  const handleDecreaseServings = () => {
    setServings((prev) => Math.max(0.5, Math.round((prev - 0.5) * 10) / 10));
  };

  // Dynamic text for servings
  const servingsText = `for ${servings} ${
    servings === 1 || servings === 0.5 ? "serving" : "servings"
  }`;

  if (!recipe) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <p className="text-center text-2xl font-semibold text-orange-100">
          Recipe not found 😔
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto relative">
      {/* Rezeptbild */}
      <div className="relative mx-auto w-full sm:w-8/12 lg:w-6/12 h-64 sm:h-64 lg:h-80 mt-16">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-contain"
        />
        {/* Herz für Favoriten */}
        <div className="absolute top-4 sm:top-2 right-6 sm:right-2">
          <button onClick={toggleFavorite} className="focus:outline-none">
            <FontAwesomeIcon
              icon={faHeart}
              size="2x"
              color={isFavorite.includes(recipe.id) ? "red" : "gray"}
            />
          </button>
        </div>
        {/* Modul-Fenster für Favoriten */}
        {showFavoriteModal && (
          <div
            className="absolute bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
            style={{
              top: "-50px",
              right: "0",
              transform: "translateX(50%)",
            }}
          >
            Added to Favorites!
          </div>
        )}

        <div
          className="absolute top-1/2  left-1/2  transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-40 px-4 py-1 rounded-lg"
          style={{
            maxWidth: "80%",
          }}
        >
          <h2 className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-center">
            {recipe.title}
          </h2>
        </div>

        {/* Kochzeit, Kalorien und Ernährungs-Icons */}
        <div className="flex justify-between items-center mt-4 text-gray-600 mb-6 ">
          {/* Kochzeit */}
          <div className="flex items-center gap-2 mt-2">
            <FontAwesomeIcon icon={faClock} className="text-lg" />
            <span className="text-md text-gray-500">
              {recipe.preparationTime} min
            </span>
          </div>

          {/* Ernährung */}
          <div className="flex items-center gap-10 mt-2">
            {recipe.diet?.vegetarian && (
              <FontAwesomeIcon
                icon={faLeaf}
                className="text-green-500"
                title="vegetarian"
              />
            )}
            {recipe.diet?.vegan && (
              <FontAwesomeIcon
                icon={faSeedling}
                className="text-green-500"
                title="vegan"
              />
            )}
            {!recipe.diet?.glutenFree && (
              <FontAwesomeIcon
                icon={faWheatAlt}
                className="text-yellow-500"
                title="contains gluten"
              />
            )}
            {!recipe.diet?.dairyFree && (
              <FontAwesomeIcon
                icon={faTint}
                className="text-blue-500"
                title="contains dairy"
              />
            )}
            {!recipe.diet?.vegetarian &&
              !recipe.diet?.vegan &&
              recipe.diet?.glutenFree &&
              recipe.diet?.dairyFree && (
                <FontAwesomeIcon
                  icon={faUtensils}
                  className="text-gray-500"
                  title="no diet"
                />
              )}
          </div>

          {/* Kalorien */}
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faFire} className="text-lg text-red-500" />
            <span className="text-md text-gray-500">
              {recipe.nutritionPer100g?.calories || "N/A"} kcal
            </span>
          </div>
        </div>
      </div>

      {/* Buttons - Inhaltsabschnitte */}
      <div className="mt-16 mx-4 sm:mx-8 lg:mx-10 flex flex-wrap justify-center sm:justify-around gap-4">
        <button
          className="px-4 py-2 w-full sm:w-auto bg-green-500 text-white rounded-lg shadow-md text-sm sm:text-base"
          onClick={() => toggleSection("ingredients")}
        >
          Ingredients
        </button>
        <button
          className="px-4 py-2 w-full sm:w-auto bg-green-500 text-white rounded-lg shadow-md text-sm sm:text-base"
          onClick={() => toggleSection("nutrition")}
        >
          Nutritional Values
        </button>
        <button
          className="px-4 py-2 w-full sm:w-auto bg-green-500 text-white rounded-lg shadow-md text-sm sm:text-base"
          onClick={() => toggleSection("preparation")}
        >
          Preparation
        </button>
      </div>
      {/* Inhaltsabschnitte anzeigen */}
      <div className="mt-8">
        {visibleSection === "ingredients" && (
          <div className="border p-4 rounded-md shadow-md">
            <h3 className="text-lg font-bold mb-4">Ingredients</h3>
            <ul className="list-disc pl-6">
              <div className="flex items-center mb-4">
                <button
                  className=" w-5 h-5 sm:w-5 sm:h-5 flex items-center justify-center rounded-full  bg-green-500 text-white text-lg sm:text-xl   hover:bg-green-600 focus:outline-none"
                  onClick={handleDecreaseServings}
                >
                  {"\u2212"} {/* Unicode Minus-zeichen */}
                </button>
                <p className="mx-2 sm:mx-4 text-sm sm:text-base lg:text-lg xl:text-base text-gray-600">
                  Ingredients {servingsText}
                </p>
                <button
                  className="w-5 h-5 sm:w-5 sm:h-5 flex items-center justify-center rounded-full  bg-green-500 text-white text-lg sm:text-xl   hover:bg-green-600 focus:outline-none"
                  onClick={handleIncreaseServings}
                >
                  {"\uFF0B"} {/* Unicode Plus-Zeichen */}
                </button>
              </div>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  {/* {(ingredient.amount * servings).toFixed(1)} {ingredient.unit}{" "}
                  {ingredient.name} */}
                  {Number.isInteger(ingredient.amount * servings)
                    ? ingredient.amount * servings
                    : (ingredient.amount * servings).toFixed(1)}{" "}
                  {ingredient.unit} {ingredient.name}
                </li>
              ))}
            </ul>
          </div>
        )}
        {visibleSection === "nutrition" && (
          <div className="border p-4 rounded-md shadow-md">
            <h3 className="text-lg font-bold mb-4">
              Nutritional Values (per 100g)
            </h3>
            <ul className="list-disc pl-6">
              <li>Calories: {recipe.nutritionPer100g.calories} kcal</li>
              <li>Fat: {recipe.nutritionPer100g.fat} g</li>
              <li>Saturated Fat: {recipe.nutritionPer100g.saturatedFat} g</li>
              <li>Carbohydrates: {recipe.nutritionPer100g.carbohydrates} g</li>
              <li>Sugar: {recipe.nutritionPer100g.sugar} g</li>
              <li>Protein: {recipe.nutritionPer100g.protein} g</li>
              <li>Sodium: {recipe.nutritionPer100g.sodium} g</li>
            </ul>
          </div>
        )}
        {visibleSection === "preparation" && (
          <div className="border p-4 rounded-md shadow-md">
            <h3 className="text-lg font-bold mb-4">Preparation Steps</h3>
            <ol className="list-decimal pl-6">
              {recipe.steps.map((step, index) => (
                <li key={index}>{step.description}</li>
              ))}
            </ol>
          </div>
        )}
      </div>

      {/* Fenster für fehlende Zutaten mit Animation*/}
      {showMissingIngredients &&
        recipe.missedIngredients &&
        recipe.missedIngredients.length > 0 && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg p-6 rounded-lg w-3/4 sm:w-1/2 lg:w-1/3 animate-spin-and-grow z-50">
            {/* Schließen-Button */}
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setShowMissingIngredients(false)}
            >
              x
            </button>
            <h3 className="text-lg font-semibold mb-4 text-center">
              Missing Ingredients
            </h3>
            <ul className="space-y-2">
              {recipe.missedIngredients.map((ingredient, index) => (
                <li
                  key={index}
                  className="flex justify-between text-sm sm:text-base text-gray-700"
                >
                  {Number.isInteger(ingredient.amount * servings)
                    ? ingredient.amount * servings
                    : (ingredient.amount * servings).toFixed(1)}{" "}
                  {ingredient.unit} {ingredient.name}
                </li>
              ))}
            </ul>
            {/* Button "zur Einkaufsliste hinzufügen" */}
            <button
              className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
              onClick={handleAddToShoppingList}
            >
              Add to Shopping List
            </button>
            {/* Modales Fenster für "Zur Einkaufsliste hinzugefügt" */}
            {showShoppingListModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 sm:w-1/2 lg:w-1/3">
                  <h2 className="text-lg font-semibold mb-4 text-center">
                    Item Added to Shopping List
                  </h2>
                  <p className="text-gray-700 text-center mb-6">
                    The missing ingredients have been added to your shopping
                    list.
                  </p>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 w-full"
                    onClick={handleCloseShoppingListModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
    </div>
  );
}
export default RecipeDetails;
