import express from "express";
import { getFeedbacks, submitFeedback } from "./db";
import { formatZodError } from "./utils";
import { FeedbackSchema } from "./zodSchemas";

const app = express();

app.use(express.json());

app.post("/feedback", async (req, res) => {
    const requestBody = req.body;
    const parsedBody = FeedbackSchema.safeParse(requestBody);
    if (!parsedBody.success) {
        res.status(400).send(`Invalid request body. Zod errors: ${formatZodError(parsedBody.error)}`);
        return;
    }
    const { title, content, categoryId } = parsedBody.data;

    try {
        await submitFeedback({ title, content, categoryId });
        res.status(201).send("Feedback submitted");
    } catch (error) {
        console.error("Error submitting feedback", error);
        res.status(500).send("Error submitting feedback");
    }
});

app.get("/feedback", async (req, res) => {
    try {
        const rows = await getFeedbacks();
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching feedback", error);
        res.status(500).send("Error fetching feedback");
    }
});

export default app;
