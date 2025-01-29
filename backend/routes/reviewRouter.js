import { Router } from "express";
import { authenticate } from "../middleware/jwt.js";
import * as review from "../controllers/reviewController.js";

const reviewRouter = Router();

reviewRouter
  .post("/", authenticate, review.createReview)
  .get("/history", authenticate, review.getAllUserReviews);

export default reviewRouter;
