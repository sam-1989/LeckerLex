import { Router } from "express";
import * as guest from "../controllers/guestController.js";


const guestRouter = Router();

guestRouter
  .post("/add-visit", guest.addGuestVisit)
  .get("/count", guest.getGuestCount)
  

export default guestRouter;