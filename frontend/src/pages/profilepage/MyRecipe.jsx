import React, { useState, useEffect } from "react";

function MyRecipe() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [cookTime, setCookTime] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [preparation, setPreparation] = useState("");
  const [recipes, setRecipes] = useState([]);

  // Laden der Rezepte aus LocalStorage
  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    setRecipes(savedRecipes);
  }, []);

  // Speichert Rezepte in LocalStorage
  const saveRecipe = () => {
    if (!title || !ingredients || !preparation) {
      alert("Please fill out all fields before saving!");
      return;
    }

    const newRecipe = {
      title,
      image,
      cookTime,
      ingredients,
      preparation,
    };

    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));

    // Felder leeren
    setTitle("");
    setImage(null);
    setCookTime("");
    setIngredients("");
    setPreparation("");
    setShowAddForm(false);

    alert("Recipe saved successfully!");
  };

  const handleImageUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>My Recipe</h2>
      <p>Here you can view and manage your saved recipes.</p>
      <button onClick={() => setShowAddForm(true)}>Add</button>

      {showAddForm && (
        <div style={{ marginTop: "20px" }}>
          <h3>Add New Recipe</h3>

          <div>
            <label>
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter recipe title"
                style={{ display: "block", margin: "10px 0", width: "100%" }}
              />
            </label>
          </div>

          <div>
            <label>
              Image:
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "block", margin: "10px 0" }}
              />
            </label>
            {image && (
              <img
                src={image}
                alt="Recipe"
                style={{ width: "40px", height: "40px", marginTop: "10px" }}
              />
            )}
          </div>

          <div>
            <label>
              Cooking Time (in minutes):
              <input
                type="number"
                value={cookTime}
                onChange={(e) => setCookTime(e.target.value)}
                style={{ display: "block", margin: "10px 0", width: "100%" }}
              />
            </label>
          </div>

          <div>
            <label>
              Ingredients:
              <textarea
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="List your ingredients here"
                style={{ display: "block", margin: "10px 0", width: "100%" }}
              />
            </label>
          </div>

          <div>
            <label>
              Preparation:
              <textarea
                value={preparation}
                onChange={(e) => setPreparation(e.target.value)}
                placeholder="Describe preparation steps here"
                style={{ display: "block", margin: "10px 0", width: "100%" }}
              />
            </label>
          </div>

          <button onClick={saveRecipe} style={{ marginTop: "20px" }}>
            Save
          </button>
        </div>
      )}

      <div style={{ marginTop: "40px" }}>
        <h3>Saved Recipes</h3>
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <h4>{recipe.title}</h4>
              {recipe.image && (
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  style={{ width: "40px", height: "40px", display: "block", marginBottom: "10px" }}
                />
              )}
              <p><strong>Cooking Time:</strong> {recipe.cookTime} minutes</p>
              <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
              <p><strong>Preparation:</strong> {recipe.preparation}</p>
            </div>
          ))
        ) : (
          <p>No recipes saved yet!</p>
        )}
      </div>
    </div>
  );
}

export default MyRecipe;

// import React, { useState } from "react";

// function MyRecipe() {
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [title, setTitle] = useState("");
//   const [image, setImage] = useState(null);
//   const [cookTime, setCookTime] = useState("");
//   const [ingredients, setIngredients] = useState("");
//   const [preparation, setPreparation] = useState("");

//   const handleImageUpload = (e) => {
//     setImage(URL.createObjectURL(e.target.files[0]));
//   };

//   const saveRecipe = () => {
//     alert("Recipe saved!");
//     // You can add functionality to save the recipe data.
//   };

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <h2>My Recipe</h2>
//       <p>Here you can view and manage your saved recipes.</p>
//       <button onClick={() => setShowAddForm(true)}>Add</button>

//       {showAddForm && (
//         <div style={{ marginTop: "20px" }}>
//           <h3>Add New Recipe</h3>

//           <div>
//             <label>
//               Title:
//               <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="Enter recipe title"
//                 style={{ display: "block", margin: "10px 0", width: "100%" }}
//               />
//             </label>
//           </div>

//           <div>
//             <label>
//               Image:
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 style={{ display: "block", margin: "10px 0" }}
//               />
//             </label>
//             {image && (
//               <img
//                 src={image}
//                 alt="Recipe"
//                 style={{ width: "40px", height: "40px", marginTop: "10px" }}
//               />
//             )}
//           </div>

//           <div>
//             <label>
//               Cooking Time (in minutes):
//               <input
//                 type="number"
//                 value={cookTime}
//                 onChange={(e) => setCookTime(e.target.value)}
//                 style={{ display: "block", margin: "10px 0", width: "100%" }}
//               />
//             </label>
//           </div>

//           <div>
//             <label>
//               Ingredients:
//               <textarea
//                 value={ingredients}
//                 onChange={(e) => setIngredients(e.target.value)}
//                 placeholder="List your ingredients here"
//                 style={{ display: "block", margin: "10px 0", width: "100%" }}
//               />
//             </label>
//           </div>

//           <div>
//             <label>
//               Preparation:
//               <textarea
//                 value={preparation}
//                 onChange={(e) => setPreparation(e.target.value)}
//                 placeholder="Describe preparation steps here"
//                 style={{ display: "block", margin: "10px 0", width: "100%" }}
//               />
//             </label>
//           </div>

//           <button onClick={saveRecipe} style={{ marginTop: "20px" }}>
//             Save
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default MyRecipe;

// import React from "react";

// export default function MyRecipe() {
//   return (
//     <div>
//       <h2 className="text-xl font-semibold text-gray-800">My Recipes</h2>
//       <p className="text-gray-600">Here you can view and manage your saved recipes.</p>
//     </div>
//   );
// }