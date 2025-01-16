import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { RecipeContext } from "../context/RecipeContext";

function RecipeDetails() {
    const { id } = useParams(); // Rezept-ID aus der URL
    const { recipes } = useContext(RecipeContext);  // Rezepte aus dem Context
    // Finde das Rezept mit der passenden ID
    const recipe = recipes.find((x) => x.id === parseInt(id));

    const [visibleSection, setVisibleSection] = useState(null); 

    const toggleSection = (section) => {
        setVisibleSection(visibleSection === section ? null : section);
    };

    // Falls kein Rezept gefunden wird
    if (!recipe) {
        return <p className="text-center mt-10">Recipe not found!</p>;
    }
    return (
        <div className="p-6 max-w-4xl mx-auto">
            {/* Rezeptbild */}
            <div className="relative mx-auto w-8/12" id="RecipeBild">
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
            {/* Buttons */}
            <div className="flex justify-center mt-6 space-x-4">
                <button
                className="bg-green-500 text-white px-6 py-2 rounded-md"
                onClick={() => toggleSection("ingredients")}
                >
                    Ingredients
                </button>
                <button
                className="bg-green-500 text-white px-6 py-2 rounded-md"
                onClick={() => toggleSection("nutrition")}
                >
                    Nutritional Values
                </button>
                <button
                className="bg-green-500 text-white px-6 py-2 rounded-md"
                onClick={() => toggleSection("preparation")}
                >
                    Preparation
                </button>
            </div>

            {/* Inhaltsabschnitte */}
            <div className="mt-8">
                {visibleSection === "ingredients" && (
                    <div className="border p-4 rounded-md shadow-md">
                        <h3 className="text-lg font-bold mb-4">Ingredients</h3>
                        <ul className="list-disc pl-6">
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>
                                    {ingredient.amount} {ingredient.unit} {ingredient.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {visibleSection === "nutrition" && (
                    <div className="border p-4 rounded-md shadow-md">
                        <h3 className="text-lg font-bold mb-4">Nutritional Values (per 100g)</h3>
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
        </div>
    );
}
export default RecipeDetails;