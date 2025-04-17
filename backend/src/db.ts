import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { SubmitFeedbackData } from "./validation/feedback.schema";
import { LikeFeedbackData } from "./validation/like.schema";

export async function getDb() {
    const db = await open({
        filename: "db.sqlite",
        driver: sqlite3.cached.Database,
    });
    return db;
}

export async function submitFeedback(feedback: SubmitFeedbackData) {
    const db = await getDb();
    const { categoryId, title, content } = feedback;
    await db.run("INSERT INTO feedback (category_id, title, content) VALUES (?, ?, ?)", [categoryId, title, content]);
}

export async function getFeedbacks() {
    const db = await getDb();
    const rows = await db.all("SELECT * FROM feedback");
    return rows;
}

export async function getCategories() {
    const db = await getDb();
    const rows = await db.all("SELECT * FROM category");
    return rows;
}

export async function likeFeedback(likeData: LikeFeedbackData) {
    const db = await getDb();
    const { feedbackId } = likeData;
    await db.run("UPDATE feedback SET likes = likes + 1 WHERE id = ?", [feedbackId]);
}
