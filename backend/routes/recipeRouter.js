import { Router } from "express";
import * as recipe from "../controllers/recipeController.js";

const recipeRouter = Router();

recipeRouter.get("/search-recipes", recipe.searchRecipesAndDetails);

export default recipeRouter;
