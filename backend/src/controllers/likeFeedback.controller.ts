import { Request, Response } from "express";
import { likeFeedback } from "../db";
import { formatZodError } from "../utils";
import { LikeFeedbackSchema } from "../validation/like.schema";

export const likeFeedbackController = async (req: Request, res: Response) => {
    const requestBody = req.body;
    const parsedBody = LikeFeedbackSchema.safeParse(requestBody);
    if (!parsedBody.success) {
        res.status(400).send(`Invalid request body. Zod errors: ${formatZodError(parsedBody.error)}`);
        return;
    }
    const { feedbackId } = parsedBody.data;

    try {
        await likeFeedback({ feedbackId });
        res.status(201).send("Feedback liked");
    } catch (error) {
        console.error("Error liking feedback", error);
        res.status(500).send("Error liking feedback");
    }
};
