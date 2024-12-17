import express from "express";
import connectDB from "./config/dbConnect.js";
import recipeRouter from "./routes/recipeRouter.js";

connectDB();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use("/recipes", recipeRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
