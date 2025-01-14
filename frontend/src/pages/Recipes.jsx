import React, { useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";

function Recipes() {
  const { recipes } = useContext(RecipeContext);
  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Recipes</h1>
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <img
            src={recipe.image}
            alt={recipe.title}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "8px",
              marginRight: "15px",
              objectFit: "cover",
            }}
          />
          <div>
            <h2 style={{ margin: "0 0 5px" }}>{recipe.title}</h2>
            <p style={{ margin: "5px 0" }}>
              <strong>Cooking Time:</strong> {recipe.preparationTime} minutes
            </p>
            <p style={{ margin: "5px 0" }}>
              <strong>Calories:</strong>{" "}
              {recipe.nutritionPerServing.calories.toFixed(2)} kcal
            </p>
            <p style={{ margin: "5px 0" }}>
              <strong>Missed ingredients:</strong>{" "}
              {recipe.missedIngredientCount}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Recipes;
