import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";
import { SubmitFeedbackData } from "./validation/feedback.schema";
import { LikeFeedbackData } from "./validation/like.schema";

let dbSingleton = {
    db: null as null | Database,
};

export default function getDb() {
    return dbSingleton.db!;
}

export async function initFileDb(filename: string) {
    dbSingleton.db = await open({
        filename: filename,
        driver: sqlite3.cached.Database,
    });
}

export async function initInMemoryDb() {
    dbSingleton.db = await open({
        filename: ":memory:",
        driver: sqlite3.cached.Database,
    });
}

export async function submitFeedback(feedback: SubmitFeedbackData) {
    const db = getDb();
    const { categoryId, title, content } = feedback;
    const category = await db.get("SELECT * FROM category WHERE id = ?", [categoryId]);
    if (category === undefined) {
        throw new Error("Category not found");
    }
    await db.run("INSERT INTO feedback (category_id, title, content) VALUES (?, ?, ?)", [categoryId, title, content]);
}

export async function getFeedbacks() {
    const db = getDb();
    const rows = await db.all("SELECT * FROM feedback");
    return rows;
}

export async function getCategories() {
    const db = getDb();
    const rows = await db.all("SELECT * FROM category");
    return rows;
}

export async function likeFeedback(likeData: LikeFeedbackData) {
    const db = getDb();
    const { feedbackId } = likeData;
    await db.run("UPDATE feedback SET likes = likes + 1 WHERE id = ?", [feedbackId]);
}
