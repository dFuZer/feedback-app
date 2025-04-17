import { Request, Response } from "express";
import { submitFeedback } from "../db";
import { formatZodError } from "../utils";
import { FeedbackSchema } from "../zodSchemas";

export const submitFeedbackController = async (req: Request, res: Response) => {
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
};
