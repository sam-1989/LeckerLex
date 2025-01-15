import React, { useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";


function ResultPage() {
  const { recipes } = useContext(RecipeContext);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Results of Recipes"</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="border rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
              <p className="text-gray-700">{recipe.description}</p>
              <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
                Zum Rezept
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultPage;
