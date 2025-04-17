import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { Feedback } from "./zodSchemas";

export async function initializeDb() {
    const db = await getDb();
    // Initialize the missing tables
    await db.run(
        "CREATE TABLE IF NOT EXISTS feedback (id INTEGER PRIMARY KEY AUTOINCREMENT, category_id INTEGER NOT NULL, title VARCHAR(30), content TEXT, likes INTEGER DEFAULT 0, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (category_id) REFERENCES category(id))"
    );
    await db.run("CREATE TABLE IF NOT EXISTS category (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255))");

    // Initialize the default categories
    await db.run("INSERT INTO category (name) VALUES ('Enseignement & Encadrement')");
    await db.run("INSERT INTO category (name) VALUES ('Contenu pédagogique')");
    await db.run("INSERT INTO category (name) VALUES ('Évaluations & Devoirs')");
    await db.run("INSERT INTO category (name) VALUES ('Organisation & Planning')");
    await db.run("INSERT INTO category (name) VALUES ('Administration')");
    await db.run("INSERT INTO category (name) VALUES ('Autre')");
}

export async function getDb() {
    const db = await open({
        filename: "db.sqlite",
        driver: sqlite3.cached.Database,
    });
    return db;
}

export async function submitFeedback(feedback: Feedback) {
    const db = await getDb();
    const { categoryId, title, content } = feedback;
    await db.run("INSERT INTO feedback (category_id, title, content) VALUES (?, ?, ?)", [categoryId, title, content]);
}

export async function getFeedbacks() {
    const db = await getDb();
    const rows = await db.all("SELECT * FROM feedback");
    return rows;
}
