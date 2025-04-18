import getDb from "./db";

export async function seedInitializedDatabase() {
    const db = getDb();

    await db.run(
        "CREATE TABLE feedback (id INTEGER PRIMARY KEY AUTOINCREMENT, category_id INTEGER NOT NULL, title VARCHAR(30), content TEXT, likes INTEGER DEFAULT 0, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (category_id) REFERENCES category(id))"
    );
    await db.run("CREATE TABLE category (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255))");

    // Initialize the default categories
    await db.run("INSERT INTO category (name) VALUES ('Enseignement & Encadrement')");
    await db.run("INSERT INTO category (name) VALUES ('Contenu pédagogique')");
    await db.run("INSERT INTO category (name) VALUES ('Évaluations & Devoirs')");
    await db.run("INSERT INTO category (name) VALUES ('Organisation & Planning')");
    await db.run("INSERT INTO category (name) VALUES ('Administration')");
    await db.run("INSERT INTO category (name) VALUES ('Autre')");
}
