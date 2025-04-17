import express from "express";
import { initializeDb } from "./db";
import { PORT } from "./env";

const app = express();

initializeDb().then((db) => {
    app.get("/", (req, res) => {
        res.send("Hello World");
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
