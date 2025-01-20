import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

// Generate a json web token with desired payload that expires in a desired time
export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
};

// Check whether a token is valid (correct secret key, matching payload and header (type of token and signing algorithm) and not expired)
// If valid and not expired, return decoded payload
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET); // Decode and verify the token
  } catch (error) {
    throw new Error("Forbidden: Invalid or expired token!");
  }
};

// Authenticate a user via json web token (verify the token attached to a cookie sent by the client) and determine if the user has permission to access protected route/s
export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; // cookie named jwt defined in userController.js
    if (!token) return res.status(401).json({ msg: "Unauthorized!" });

    const decoded = verifyToken(token);

    const user = await User.findById(decoded.userId); // userId:user._id defined in userController.js
    if (!user) return res.status(404).json({ msg: "User not found!" });

    req.user = { userId: user._id };
    next();
  } catch (error) {
    return res.status(403).json({ msg: "Authorization failed!" });
  }
};
