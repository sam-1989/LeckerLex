import express from "express";
import connectDB from "./config/dbConnect.js";
import recipeRouter from "./routes/recipeRouter.js";
import userRouter from "./routes/userRouter.js";
import reviewRouter from "./routes/reviewRouter.js";

connectDB();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use("/search", recipeRouter);
app.use("/users", userRouter);
app.use("/review", reviewRouter);

// catch-all handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ msg: "Endpoint not found" });
});

// General error handler for unexpected errors
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ msg: error.message || "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
