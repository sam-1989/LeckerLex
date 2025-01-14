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
    { id: "Fruits", name: "Fruits" },
    { id: "Vegetables", name: "Vegetables" },
    { id: "Dairy Products", name: "Dairy Products" },
    { id: "Meat", name: "Meat" },
    { id: "Seafood", name: "Seafood" },
    { id: "Flour and Baking Ingredients", name: "Flour and Baking Ingredients" },
    { id: "Grains and Legumes", name: "Grains and Legumes" },
    { id: "Eggs and Proteins", name: "Eggs and Proteins" },
    { id: "Canned Goods and Sauces", name: "Canned Goods and Sauces" },
    { id: "Herbs and Spices", name: "Herbs and Spices" },
    { id: "Oils and Fats", name: "Oils and Fats" },
    { id: "Snacks and Side Dishes", name: "Snacks and Side Dishes" },
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
