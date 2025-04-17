import sqlite3 from "sqlite3";

const db = new sqlite3.Database("db.sqlite");

db.run("CREATE TABLE IF NOT EXISTS feedback (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT)");

export default db;
