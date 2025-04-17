import express from "express";
import { getCategoriesController } from "../controllers/getCategories.controller";

const router = express.Router();

router.get("/get-all", getCategoriesController);

export default router;
