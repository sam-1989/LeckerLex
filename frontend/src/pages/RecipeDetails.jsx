import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RecipeContext } from "../context/RecipeContext";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

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

  const [showMissingIngredients, setShowMissingIngredients] = useState(true); // Fehlende Zutaten-Fenster
  const [visibleSection, setVisibleSection] = useState(null); // Zum Umschalten der Abschnitte
  const [showShoppingListModal, setShowShoppingListModal] = useState(false);
  const [pauseBanner, setPauseBanner] = useState(false);
  const [servings, setServings] = useState(1 || recipe.servingsAmount); // Standardmäßig 1
  const [showFavoriteModal, setShowFavoriteModal] = useState(false); // Zustand für das Modul

  const toggleSection = (section) => {
    setVisibleSection(visibleSection === section ? null : section);
    setPauseBanner(visibleSection === section ? false : true); // Pause, wenn ein Fenster aktiv ist
  };

  /* Übertragung zur Favoriten */

  const toggleFavorite = () => {
    const currentRecipe = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      ingredients: recipe.ingredients.map((ingredient) => ({
        name: ingredient.name,
        amount: (ingredient.amount * servings).toFixed(1),
        unit: ingredient.unit,
      })),
      nutrition: recipe.nutritionPer100g,
      preparation: recipe.steps.map((step) => step.description),
    };

    if (isFavorite.includes(recipe.id)) {
      // Wenn schon Favorit -> Entfernen
      setIsFavorite(isFavorite.filter((favId) => favId !== recipe.id));
      setFavorites(favorites.filter((fav) => fav.id !== recipe.id));
    } else {
      // Wenn nicht Favorit -> Hinzuzufügen
      setIsFavorite([...isFavorite, recipe.id]);
      setFavorites([...favorites, currentRecipe]);
      console.log("updated favorites:", [...favorites, currentRecipe]);

      // Modul-Fenster anzeigen
      setShowFavoriteModal(true);
      setTimeout(() => setShowFavoriteModal(false), 3000); // Automatisch schließen nach 3 Sekunden
    }
  };

  // Funktion, um zur "Einkaufsliste" hinzuzufügen

  const handleAddToShoppingList = async () => {
    try {
      if (!isLoggedIn) {
        // User ist nicht eingeloggt -> navigiere zur Login-Seite mit Rezept-ID als Query-Parameter
        navigate(`/home/login?redirectTo=/home/recipe-details/${id}`);
      } else {
        // User ist eingelogt -> Funktionalität ausführen
        setShowShoppingListModal(true);
        let shoppingListItems = recipe.missedIngredients.map(
          (item) => item.name
        ); // Add missed ingredients
        /* shoppingList = shoppingList.map((item) => item.trim().toLowerCase()); */
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

  // Funktion, die sowohl das "Shopping List Modal" als auch das "Missing Ingredients Fenster" schließt

  const handleCloseShoppingListModal = () => {
    setShowShoppingListModal(false); // Schließt das Shopping List Modal
    setShowMissingIngredients(false); // Schließt das Missing Ingredients Fenster
  };

  // Funktion zur Anpassung der Portionen

  const handleIncreaseServings = () => {
    setServings((prev) => Math.round((prev + 0.5) * 10) / 10); // Runden auf eine Dezimalstelle
  };
  const handleDecreaseServings = () => {
    setServings((prev) => Math.max(0.5, Math.round((prev - 0.5) * 10) / 10)); // Mindestens 0,5
  };

  // Dynamischer Text für "serving" in Singular oder Plural

  const servingsText = `for ${servings} ${
    servings === 1 || servings === 0.5 ? "serving" : "servings"
  }`;

  // Falls kein Rezept gefunden wird
  if (!recipe) {
    return <p className="text-center mt-10">Recipe not found!</p>;
  }

  return (
    <div className="p-4 max-w-6xl mx-auto relative">
      {/* Banner - Enjoy Cooking! */}
      <div className="fixed top-13 left-0 w-full bg-white text-green-500 text-center py-2 overflow-hidden -z-10">
        <div
          className={`animate-marquee whitespace-nowrap text-lg sm:text-xl md:text-2xl lg:text-4xl font-semibold z-10 ${
            pauseBanner ? "animate-none" : ""
          }`}
        >
          Enjoy Cooking!
        </div>
      </div>
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
      </div>
      {/* </div>  */}
      {/* Buttons - Inhaltsabschnitte */}
      <div className="mt-6 mx-4 sm:mx-8 lg:mx-10 flex flex-wrap justify-center sm:justify-around gap-4">
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
                  {(ingredient.amount * servings).toFixed(1)} {ingredient.unit}{" "}
                  {ingredient.name}
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
                  {/* {ingredient}  */}
                  {ingredient.amount} {ingredient.unit} {ingredient.name}
                </li>
              ))}
            </ul>
            {/* Button zur Einkaufsliste hinzufügen */}
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
