import { Review } from "../models/reviewSchema.js";
import { User } from "../models/userSchema.js";
import upload from "../config/cloudinary.js";

export const createReview = [
  upload.single("imageUrl"),
  async (req, res, next) => {
    try {
    } catch (error) {}
  },
];
