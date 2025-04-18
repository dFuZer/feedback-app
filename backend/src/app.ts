import cors from "cors";
import express from "express";
import categoryRouter from "./routers/category.router";
import feedbackRouter from "./routers/feedback.router";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/feedback", feedbackRouter);
app.use("/category", categoryRouter);

export default app;
