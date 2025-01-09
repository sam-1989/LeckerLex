import React, { useState } from "react";
import CategorySlider from "../components/CategorySlider";
import Ingredients from "../components/Ingredients";
import SearchBar from "../components/SearchBar";

export default function HomePage() {
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
    "Fish",
    "Flour and Baking Ingredients",
    "Grains and Legumes",
    "Eggs and Proteins",
    "Canned Goods and Sauces",
    "Herbs and Spices",
    "Oils and Fats",
    "Snacks and Side Dishes",
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Pass searchText & setSearchText to SearchBar */}
      <SearchBar searchText={searchText} setSearchText={setSearchText} />

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
