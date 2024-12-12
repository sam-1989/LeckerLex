import express from "express";
import connectDB from "./config/dbConnect.js";

connectDB();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
});
