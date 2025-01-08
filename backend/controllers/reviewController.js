import { Review } from "../models/reviewSchema.js";
import { User } from "../models/userSchema.js";
import upload from "../config/cloudinary.js";

export const createReview = [
  upload.single("imageUrl"), // middleware to handle imageUpload
  async (req, res, next) => {
    try {
      const { comment, rating } = req.body;
      if (!req.file)
        return res
          .status(400)
          .json({ msg: "File is required or is too large" });

      const imageUrl = req.file.path; // cloudinary URL for the uploaded image

      // TODO const {recipeId} = req.query ?

      const user = await User.findById(req.user.userId); // Get user from authentication middleware: req.user = { userId: user._id }

      // Create and save the new review
      const newReview = await Review.create({
        rating,
        comment,
        imageUrl,
        user,
      });

      // Add the new review's id to user's reviews (1-n relationship)
      user.reviews.push(newReview._id);
      await user.save();

      res
        .status(201)
        .json({ msg: "Review successfully posted", review: newReview });
    } catch (error) {
      next(error);
    }
  },
];
