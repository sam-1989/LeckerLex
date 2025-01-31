import React, { useContext, useState } from "react";
import { RecipeContext } from "../context/RecipeContext";
import { FaLeaf } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ResultPage() {
  const [cookTime, setCookTime] = useState("");
  const [calories, setCalories] = useState("");
  const [nutrition, setNutrition] = useState("");

  const { recipes } = useContext(RecipeContext);
  const navigate = useNavigate();

  console.log(recipes);

  return (
    <div className="mx-auto max-w-screen-lg p-4 mb-16">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
        Discover Delicious Recipes
      </h1>

      <section>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <label className="flex flex-col">
            <span className="mb-2 text-gray-700">Cooking time</span>
            <select
              value={cookTime}
              onChange={(e) => setCookTime(e.target.value)}
              className="p-2 border border-gray-300 rounded-3xl hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-gray-50 "
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
              className="p-2 border border-gray-300 rounded-3xl hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-gray-50 "
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
              className="p-2 border border-gray-300 rounded-3xl hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-gray-50 "
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="flex flex-col border rounded-lg shadow-md
                       transition duration-100 transform hover:scale-95
                       hover:outline hover:outline-1 hover:outline-gray-300 
                       hover:shadow-md"
            onClick={() =>
              recipe.id && navigate(`/home/recipe-details/${recipe.id}`)
            }
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover rounded-t-lg hover:opacity-90 
                         transition-opacity"
            />
            <div
              className="p-4 flex-1 flex flex-col justify-between bg-white hover:bg-green-50 
                            transition-colors"
            >
              <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-700 font-light text-sm">
                  {recipe.preparationTime} mins
                </p>
                {recipe.diet.vegan && <FaLeaf className="text-green-500" />}
                <p className="text-gray-700 font-light text-sm">
                  {recipe.nutritionPerServing.calories} kcal
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button
          className="px-5 py-2 bg-blue-500 text-white rounded-3xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => navigate("/home")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default ResultPage;
