import express from "express";
import { getFeedbacksController } from "../controllers/feedback.controller";
import { submitFeedbackController } from "../controllers/submitFeedback.controller";
const router = express.Router();

router.post("/submit", submitFeedbackController);
router.get("/get-all", getFeedbacksController);

export default router;
