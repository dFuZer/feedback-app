import express from "express";
import db from "./db";
import { PORT } from "./env";
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
    const { title, content } = parsedBody.data;

    await db.run("INSERT INTO feedback (title, content) VALUES (?, ?)", [title, content]);

    res.status(201).send("Feedback submitted");
});

app.get("/feedback", async (req, res) => {
    db.all("SELECT * FROM feedback", [], (err, rows) => {
        if (err) {
            res.status(500).send("Error fetching feedback");
            return;
        }
        res.status(200).json(rows);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
