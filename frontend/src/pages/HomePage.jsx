import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RecipeContext } from "../context/RecipeContext";
import CategorySlider from "../components/CategorySlider";
import Ingredients from "../components/Ingredients";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/Sidebar";

export default function HomePage() {
  // access setRecipes from context to store fetched recipes
  const { recipes, setRecipes } = useContext(RecipeContext);

  // manage error message text
  const [errorMessage, setErrorMessage] = useState("");

  // category selection
  const [selectedCategory, setSelectedCategory] = useState("null");

  // collect chosen ingredients
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  // manage the search input text
  const [searchText, setSearchText] = useState("");

  // manage the sidebar

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // selectedIngredients query format
  const formattedIngredients = selectedIngredients.map((ingredient) =>
    ingredient.replace(/\s+/g, "_")
  ); // replace spaces with underscores in ingredient name
  const ingredientQuery = formattedIngredients.join(","); // join ingredients with comma
  console.log(ingredientQuery); // works!

  const navigate = useNavigate();

  // List of all categories

  const categories = [
    { id: "Fruits", name: "Fruits" },
    { id: "Vegetables", name: "Vegetables" },
    { id: "Dairy Products", name: "Dairy Products" },
    { id: "Meat", name: "Meat" },
    { id: "Seafood", name: "Seafood" },
    {
      id: "Flour and Baking Ingredients",
      name: "Flour and Baking Ingredients",
    },
    { id: "Grains and Legumes", name: "Grains and Legumes" },
    { id: "Eggs and Proteins", name: "Eggs and Proteins" },
    { id: "Canned Goods and Sauces", name: "Canned Goods and Sauces" },
    { id: "Herbs and Spices", name: "Herbs and Spices" },
    { id: "Oils and Fats", name: "Oils and Fats" },
    { id: "Snacks and Side Dishes", name: "Snacks and Side Dishes" },
  ];

  const handleSearch = async () => {
    if (selectedIngredients.length < 2) {
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
      navigate("results"); // navigate to recipes page
    } catch (error) {
      console.error("Error fetching recipes", error); // debug log
      setErrorMessage("An error occured. Please try again later.");
    }
  };

  const handleRemoveIngredient = (index) => {
    setSelectedIngredients((prevIngredients) => {
      const updatedIngredients = prevIngredients.filter((_, i) => i !== index);
      return updatedIngredients;
    });
  };

  const handleRemoveAll = () => {
    setSelectedIngredients([]);
    setSearchText("");
  };

  return (
    <div className="min-h-screen overflow-hidden bg-white">
      <div className="flex justify-center items-center">
      
        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          handleSearch={handleSearch}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          selectedIngredients={selectedIngredients}
        />
      </div>
      {errorMessage && (
        <p className="text-red-500 text-center mt-4">{errorMessage}</p>
      )}
      <CategorySlider
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Ingredients
        selectedCategory={selectedCategory}
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={setSelectedIngredients}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        selectedIngredients={selectedIngredients}
        handleRemoveIngredient={handleRemoveIngredient}
        handleRemoveAll={handleRemoveAll}
      />
    </div>
  );
}
