import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { RecipeContext } from "../context/RecipeContext";
function RecipeDetails() {
    const { id } = useParams(); // Rezept-ID aus der URL
    const { recipes } = useContext(RecipeContext);  // Rezepte aus dem Context
    // Finde das Rezept mit der passenden ID
    const recipe = recipes.find((x) => x.id === parseInt(id));
    console.log("found Recipe:",recipe);
    // Falls kein Rezept gefunden wird
    if (!recipe) {
        return <p className="text-center mt-10">Recipe not found!</p>;
    }
    return (
        <div className="p-6 max-w-4xl mx-auto">
            {/* Rezeptbild */}
            <div className="relative mx-auto w-8/12">
                <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-64 object-cover rounded-xl shadow-md"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-white text-2xl font-bold bg-black bg-opacity-50 px-4 py-2 rounded-md">
                        {recipe.title}
                    </h2>
                </div>
            </div>
        </div>
    );
}
export default RecipeDetails;