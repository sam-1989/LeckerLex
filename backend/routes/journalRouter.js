import { Router } from "express";
import { authenticate } from "../middleware/jwt.js";
import * as journal from "../controllers/journalController.js";

const journalRouter = Router();

journalRouter
  .post("/", authenticate, journal.createJournalEntry)
  .get("/history", authenticate, journal.getAllUserJournalEntries);

export default journalRouter;
