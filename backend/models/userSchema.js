import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

// Define Schema for a user
// TODO validators
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name field is missing."],
      minlength: [2, "Name has fewer than 2 characters."],
      maxlength: [10, "Name exceeds 10 characters."],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Email field is missing."],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password field is missing."],
      trim: true,
    },
    reviews: [
      // TODO reviews model (1-n)
      {
        type: Schema.Types.ObjectId, // Reference to reviews created by the user
        ref: "Review",
      },
    ],
    favorites: [
      // TODO reviews model (1-n)
      {
        type: Schema.Types.ObjectId, // Reference to recipes saved under favorites
        ref: "Recipes",
      },
    ],
    validationToken: String,
    isEmailValidated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// // Pre-save middleware to hash the user's password before saving it to the database
userSchema.pre("save", async function (next) {
  try {
    const saltRounds = 12;
    const hash = await bcrypt.hash(this.password, saltRounds);
    this.password = hash;
  } catch (error) {
    next(error);
  }
});

// Custom method to validate the user's password during login
userSchema.methods.authenticate = async function (password) {
  // Compare the entered (clear-text) password with the stored hashed password
  return await bcrypt.compare(password, this.password);
};

// Custom method to modify the user object when converted to JSON -> remove password
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

export const User = model("User", userSchema);
