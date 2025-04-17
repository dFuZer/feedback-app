import { Request, Response } from "express";
import { getCategories } from "../db";

export const getCategoriesController = async (req: Request, res: Response) => {
    try {
        const rows = await getCategories();
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching categories", error);
        res.status(500).send("Error fetching categories");
    }
};
