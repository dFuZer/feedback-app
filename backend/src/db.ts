import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { DB_PATH } from "./env";
export async function initializeDb() {
    const db = await open({
        filename: DB_PATH,
        driver: sqlite3.Database,
    });
    await db.exec("CREATE TABLE IF NOT EXISTS feedback (id INTEGER PRIMARY KEY, title TEXT, content TEXT)");
    return db;
}
