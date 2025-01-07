import { Schema, model } from "mongoose";

// Define schema for a review
// TODO validators

const reviewSchema = new Schema({
  rating: {
    type: Number,
    required: [true, "Rating field is missing"],
    minlength: [1, "Rating cannot be lower than 1"],
    maxlength: [5, "Rating cannot be higher than 5"],
  },
  comment: {
    type: String,
    required: [true, "Comment field is missing"],
    minlength: 10,
    maxlength: 500,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  recipeId: {
    type: String,
    // required: true
  },
  recipeName: {
    type: String,
    // required: true
  },
});

export const Review = model("Review", reviewSchema);
