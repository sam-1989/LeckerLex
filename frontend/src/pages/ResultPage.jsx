import React, { useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";
import { FaLeaf } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ResultPage() {
  // const { recipes } = useContext(RecipeContext);

  const { recipes } = useContext(RecipeContext);
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-screen-lg p-4">
    <h1 className="text-3xl font-bold mb-6 text-center md:text-left">Discover Delicious Recipes</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className="flex flex-col border rounded-lg shadow-lg
                     transition duration-300 transform hover:scale-105
                     hover:outline hover:outline-1 hover:outline-gray-400 
                     hover:shadow-2xl"
                     onClick={() => recipe.id && navigate(`/home/recipe-details/${recipe.id}`)}
        >
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-48 object-cover rounded-t-lg hover:opacity-90 
                       transition-opacity"
          />
          <div className="p-4 flex-1 flex flex-col justify-between hover:bg-green-50 
                          transition-colors">
            <h2 className="text-xl font-thin mb-2 flex items-center">
              {recipe.title}
              
            </h2>
           
            <p className="text-gray-700 font-thin text-sm mb-2">{recipe.preparationTime} mins</p>
            <p className="text-gray-700 font-thin text-sm mb-2">{recipe.nutritionPerServing.calories} kcal</p>
            {recipe.diet.vegan && <FaLeaf className="ml-2 text-green-500" />}
            
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}

export default ResultPage;
