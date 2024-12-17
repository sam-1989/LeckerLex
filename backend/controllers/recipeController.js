import fetch from "node-fetch";

export const searchRecipesAndDetails = async (req, res, next) => {
  const { ingredients } = req.query; // eg. =query=chicken,tomato,eggs
  const apiKey = process.env.SPONACULAR_API_KEY;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
  };

  // Convert the ingredients string to an array to check that at least 4 ingredients are entered
  const ingredientArray = ingredients?.split(",").map((item) => item.trim());

  // at least 4 ingredients needed for the search
  if (!ingredientArray || ingredientArray.length < 4)
    return res
      .status(400)
      .json({ msg: "Search is permitted with a minimum of 4 ingredients." });

  try {
    // Fetch basic recipe list based on ingredients: hard-coded salt, water, oil, sugar as something everyone has at home; set to prioritize minimising missing ingredients, limited to 5 results
    const response = await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=salt,water,oil,sugar,${ingredients}&ranking=2&ignorePantry=true&number=5`,
      options
    );
    const recipes = await response.json();

    // Fetch detailed data for each recipe
    const detailedRecipes = await Promise.all(
      recipes.map(async (recipe) => {
        const detailResponse = await fetch(
          `https://api.spoonacular.com/recipes/${recipe.id}/information?includeNutrition=true`,
          options
        );

        const recipeDetail = await detailResponse.json();

        return {
          id: recipe.id,
          title: recipe.title,
          image: recipe.image,
          usedIngredientCount: recipe.usedIngredientCount,
          missedIngredientCount: recipe.missedIngredientCount,
          missedIngredients: recipe.missedIngredients.map(
            (ingredient) => ingredient.name
          ),
          usedIngredients: recipe.usedIngredients.map(
            (ingredient) => ingredient.name
          ),
          preparationTime: recipeDetail.readyInMinutes,
          servingsAmount: recipeDetail.servings || 0,
          servingPortion: {
            amount: recipeDetail.nutrition.weightPerServing?.amount || 0,
            unit: recipeDetail.nutrition.weightPerServing?.unit || "",
          },
          nutritionPerServing: {
            calories:
              recipeDetail.nutrition.nutrients.find(
                (nutrient) => nutrient.name === "Calories"
              )?.amount || 0, // check if Calories or calories TODO
            fat:
              recipeDetail.nutrition.nutrients.find(
                (nutrient) => nutrient.name === "Fat"
              )?.amount || 0,
            saturatedFat:
              recipeDetail.nutrition.nutrients.find(
                (nutrient) => nutrient.name === "Saturated Fat"
              )?.amount || 0,
            carbohydrates:
              recipeDetail.nutrition.nutrients.find(
                (nutrient) => nutrient.name === "Carbohydrates"
              )?.amount || 0,
            sugar:
              recipeDetail.nutrition.nutrients.find(
                (nutrient) => nutrient.name === "Sugar"
              )?.amount || 0,
            protein:
              recipeDetail.nutrition.nutrients.find(
                (nutrient) => nutrient.name === "Protein"
              )?.amount || 0,
            sodium:
              recipeDetail.nutrition.nutrients.find(
                (nutrient) => nutrient.name === "Sodium"
              )?.amount || 0,
          },
          diet: {
            vegetarian: recipeDetail.vegetarian,
            vegan: recipeDetail.vegan,
            glutenFree: recipeDetail.glutenFree,
            dairyFree: recipeDetail.dairyFree,
          },
          ingredients: recipeDetail.extendedIngredients.map((ingredient) => ({
            name: ingredient.name,
            amount: ingredient.measures.metric.amount,
            unit: ingredient.measures.metric.unitLong,
          })),
          steps: recipeDetail.analyzedInstructions.flatMap((instruction) =>
            instruction.steps.map((step) => ({
              number: step.number,
              description: step.step,
            }))
          ),
        };
      })
    );

    // send the combined data as a single response used for search results and for each recipe detail
    res.status(200).json({ data: detailedRecipes });
  } catch (error) {
    next(error);
  }
};

/* export const searchRecipes = async (req, res, next) => {
  const url =
    "https://api.spoonacular.com/recipes/findByIngredients?ingredients=eggs,sugar,salt,oil,water,pepper,cheese,salad,onions&ranking=2&ignorePantry=true&number=5";

  const url2 =
    "https://api.spoonacular.com/recipes/findByIngredients?ingredients=eggs,sugar,salt,oil,water,pepper,cheese,salad,onions&ranking=2&ignorePantry=true&number=5";

  const url3 =
    "https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+sugar&number=2";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
    });
    const result = await response.json();
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);

    next(error);
  }
}; */
