import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RecipeContext } from "../context/RecipeContext";
import CategorySlider from "../components/CategorySlider";
import Ingredients from "../components/Ingredients";
import SearchBar from "../components/SearchBar";

export default function HomePage() {
  // access setRecipes from context to store fetched recipes
  const { recipes, setRecipes } = useContext(RecipeContext);

  // manage error message text
  const [errorMessage, setErrorMessage] = useState("");

  // category selection
  const [selectedCategory, setSelectedCategory] = useState(null);

  // collect chosen ingredients
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  // manage the search input text
  const [searchText, setSearchText] = useState("");

  // selectedIngredients query format
  const formattedIngredients = selectedIngredients.map((ingredient) =>
    ingredient.replace(/\s+/g, "_")
  ); // replace spaces with underscores in ingredient name
  const ingredientQuery = formattedIngredients.join(","); // join ingredients with comma
  console.log(ingredientQuery); // works!

  const navigate = useNavigate();

  // List of all categories

  const categories = [
    "Fruits",
    "Vegetables",
    "Dairy Products",
    "Meat",
    "Seafood",
    "Flour and Baking Ingredients",
    "Grains and Legumes",
    "Eggs and Proteins",
    "Canned Goods and Sauces",
    "Herbs and Spices",
    "Oils and Fats",
    "Snacks and Side Dishes",
  ];

  const handleSearch = async () => {
    if (selectedIngredients.length < 4) {
      setErrorMessage("Please select at least 4 ingredients.");
      return;
    }
    setErrorMessage(""); // clear previous errors

    try {
      const response = await fetch(
        `http://localhost:3000/search/recipes?ingredients=${ingredientQuery}`, // TODO pfad mit .env variable ersetzen
        {
          credentials: "include", // include cors credentials
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.msg || "Failed to fetch recipes");
        return;
      }
      const data = await response.json();
      setRecipes(data.data); // Update the recipes state with the response from backend
      console.log("recipes:", recipes); // debug log
      navigate("recipes"); // navigate to recipes page
    } catch (error) {
      console.error("Error fetching recipes", error); // debug log
      setErrorMessage("An error occured. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Pass searchText & setSearchText to SearchBar */}
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        handleSearch={handleSearch}
      />
      {errorMessage && (
        <p className="text-red-500 text-center mt-4">{errorMessage}</p>
      )}
      <CategorySlider
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {/* Pass everything needed for selecting ingredients */}
      <Ingredients
        selectedCategory={selectedCategory}
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={setSelectedIngredients}
        searchText={searchText}
        setSearchText={setSearchText}
      />
    </div>
  );
}
