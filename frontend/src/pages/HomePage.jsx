import React, { useState, useContext } from "react";
import RecipeContextProvider from "../context/RecipeContext";
import CategorySlider from "../components/CategorySlider";
import Ingredients from "../components/Ingredients";
import SearchBar from "../components/SearchBar";

export default function HomePage() {
  // access setRecipes from context to store fetched recipes
  const { setRecipes } = useContext(RecipeContextProvider);

  // manage error message text
  const [errorMessage, setErrorMessage] = useState("");

  // category selection
  const [selectedCategory, setSelectedCategory] = useState(null);

  // collect chosen ingredients
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  // manage the search input text
  const [searchText, setSearchText] = useState("");

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
  };

  setErrorMessage(""); // clear previous errors

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
