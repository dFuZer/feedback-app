import express from "express";
import { getFeedbacksController } from "../controllers/feedback.controller";
import { likeFeedbackController } from "../controllers/likeFeedback.controller";
import { submitFeedbackController } from "../controllers/submitFeedback.controller";
const router = express.Router();

router.post("/submit", submitFeedbackController);
router.get("/get-all", getFeedbacksController);
router.post("/like", likeFeedbackController);

export default router;
