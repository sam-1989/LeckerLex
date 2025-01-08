import { Router } from "express";
import { authenticate } from "../middleware/jwt.js";
import * as review from "../controllers/reviewController.js";

const reviewRouter = Router();

reviewRouter.post("/", authenticate, review.createReview);

export default reviewRouter;
