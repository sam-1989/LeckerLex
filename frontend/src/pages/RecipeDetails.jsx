import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RecipeContext } from "../context/RecipeContext";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function RecipeDetails() {
  const { id } = useParams(); // Rezept-ID aus der URL
  //const { recipes } = useContext(RecipeContext); // Rezepte aus dem Context
  const recipes = [
    {
      id: 984198,
      title: "BBQ Gochujang Cauliflower Fried Rice",
      image: "https://img.spoonacular.com/recipes/984198-312x231.png",
      usedIngredientCount: 2,
      missedIngredientCount: 2,
      missedIngredients: [
        { name: "chia seeds", amount: 2, unit: "tbsp" },
        { name: "honey/maple syrup", amount: 1, unit: "tbsp" },
      ],
      usedIngredients: [
        "1 large scallion, chopped, whites and greens divided",
        "1 egg",
      ],
      preparationTime: 45,
      servingsAmount: 1,
      servingPortion: {
        amount: 238,
        unit: "g",
      },
      nutritionPerServing: {
        calories: 179.28,
        fat: 12.61,
        saturatedFat: 8.19,
        carbohydrates: 10.58,
        sugar: 4.13,
        protein: 9.08,
        sodium: 0.12478,
      },
      nutritionPer100g: {
        calories: 75.33,
        fat: 5.3,
        saturatedFat: 3.44,
        carbohydrates: 4.45,
        sugar: 1.74,
        protein: 3.82,
        sodium: 0.05,
      },
      diet: {
        vegetarian: true,
        vegan: false,
        glutenFree: true,
        dairyFree: true,
      },
      ingredients: [
        {
          name: "cauliflower rice",
          amount: 160,
          unit: "grams",
        },
        {
          name: "scallion",
          amount: 1,
          unit: "large",
        },
        {
          name: "coconut oil",
          amount: 2,
          unit: "teaspoons",
        },
        {
          name: "egg",
          amount: 1,
          unit: "",
        },
        {
          name: "bibigo go-chu-jang barbecue sauce",
          amount: 1,
          unit: "serving",
        },
      ],
      steps: [],
    },
    {
      id: 650703,
      title: "Mama's Challah",
      image: "https://img.spoonacular.com/recipes/650703-312x231.jpg",
      usedIngredientCount: 1,
      missedIngredientCount: 2,
      missedIngredients: [
        { name: "amaretho seeds", amount: 2, unit: "tbsp" },
        { name: "vinegar", amount: 1, unit: "tbsp" },
      ],
      usedIngredients: ["2 eggs"],
      preparationTime: 45,
      servingsAmount: 16,
      servingPortion: {
        amount: 74,
        unit: "g",
      },
      nutritionPerServing: {
        calories: 233.24,
        fat: 2.86,
        saturatedFat: 0.52,
        carbohydrates: 43.44,
        sugar: 3.52,
        protein: 7.6,
        sodium: 0.04679,
      },
      nutritionPer100g: {
        calories: 315.19,
        fat: 3.86,
        saturatedFat: 0.7,
        carbohydrates: 58.7,
        sugar: 4.76,
        protein: 10.27,
        sodium: 0.06,
      },
      diet: {
        vegetarian: true,
        vegan: false,
        glutenFree: false,
        dairyFree: true,
      },
      ingredients: [
        {
          name: "bread flour",
          amount: 875,
          unit: "grams",
        },
        {
          name: "brown sugar",
          amount: 55,
          unit: "grams",
        },
        {
          name: "eggs",
          amount: 2,
          unit: "",
        },
        {
          name: "salt",
          amount: 0.25,
          unit: "teaspoons",
        },
        {
          name: "vegetable oil",
          amount: 109,
          unit: "milliliters",
        },
        {
          name: "water",
          amount: 3,
          unit: "Tbsps",
        },
        {
          name: "regular yeast",
          amount: 2,
          unit: "packages",
        },
      ],
      steps: [
        {
          number: 1,
          description:
            "Mix in tall glass: 3 T. flour, 2 T. sugar, both packages of yeast. Stir mixture slightly then add cup lukewarm water (100-11",
        },
        {
          number: 2,
          description: "measure using liquid thermometer)",
        },
        {
          number: 3,
          description:
            "Let this bubble & rise to brim of glass for about 10 minutes. (NOTE: This should bubble up to the top. If it doesnt start to foam within in a few minutes, try again with warmer water.) In the meantime.In medium bowl (bowl A), combine 3 cups flour and 2 tsp. salt",
        },
        {
          number: 4,
          description:
            "In larger bowl (bowl B) whisk together brown sugar, oil, 2 eggs",
        },
        {
          number: 5,
          description: "Pour contents from bowl A into bowl B",
        },
        {
          number: 6,
          description: "Add contents of glass into bowl B",
        },
        {
          number: 7,
          description:
            "Add another 1 cups lukewarm water (110-115 degrees) into bowl B",
        },
        {
          number: 8,
          description: "Add 4 more cups flour into bowl B",
        },
        {
          number: 9,
          description:
            "Mix everything with wooden spoon at quick pace! When its too thick to mix with spoon, transfer dough to floured wooden board or other surface for about 5 minutes.Keep hands floured, add small amounts flour by hand when dough gets sticky. It should be smoothnot too loose, not too, firm, not too sticky. Scrap off bits of dough from board, so surface is clean, & smooth. Form into a round.Lightly oil another large bowl, place dough in bowl, turn over to coat with oil.Cover bowl with lightly damp towel.Have warm oven ready (NOTE: preheat oven to 150 then turn off before putting dough in)",
        },
        {
          number: 10,
          description:
            "Place bowl in oven for 45 minutes / 1 hour. At 45 minutes check to see if doubled in size.",
        },
        {
          number: 11,
          description:
            "Remove bowl from oven, dip fist into flour, very gently punch 10-12 times to punch out air.Knead again on floured board 5 minutes, add a bit of oil to bowl again, make round; return dough to bowl, cover, return to oven, let rise again 30/40ish minutes.Punch down again, knead into a round. Gently divide into 2 loaves with sharp knife do not saw. Pre-heat oven to 35",
        },
        {
          number: 12,
          description:
            "Place 1 loaf aside in bowl. With remaining loaf, knead with 1 hand into ball (NOTE: if using raisins, add them here), then divide into 3 pieces, braid on lightly floured board.",
        },
        {
          number: 13,
          description:
            "Roll out, fatter in middle, skinny on ends of each rope. Pinch ends together, tuck under. Repeat with other loaf.",
        },
        {
          number: 14,
          description:
            "Place on oiled cookie sheet. Make egg wash mix 1 egg & a bit of water, brush over loaves.",
        },
        {
          number: 15,
          description: "Bake 30 minutes.",
        },
      ],
    },
  ];

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
        const shoppingListItems = recipe.missedIngredients.map(
          (item) => item.name
        ); // Add missed ingredients

        const response = await fetch(
          "http://localhost:3000/users/update-shoppinglist",
          {
            // TODO: use env variables for route
            method: "PATCH",
            body: JSON.stringify({
              shoppingList: shoppingListItems,
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
                  {/* {ingredient} */}
                  {ingredient.name}
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
