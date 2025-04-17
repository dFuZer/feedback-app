import express from "express";
import feedbackRouter from "./routers/feedback.router";
const app = express();

app.use(express.json());

app.use("/feedback", feedbackRouter);

export default app;
