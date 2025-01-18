import { Router } from "express";
import * as user from "../controllers/userController.js";
// import { authenticate } from "../middleware/jwt.js";

const userRouter = Router();

userRouter
  .post("/signup", user.registerUser)
  .get("/verify-email/:token", user.verifyUser)
  .post("/login", user.loginUser)
  .post("/logout", user.logoutUser)
  .get("/verify-user", user.authenticateUser);

export default userRouter;
