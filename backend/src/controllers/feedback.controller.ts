import { Request, Response } from "express";
import { getFeedbacks } from "../db";

export const getFeedbacksController = async (req: Request, res: Response) => {
    try {
        const rows = await getFeedbacks();
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching feedback", error);
        res.status(500).send("Error fetching feedback");
    }
};
