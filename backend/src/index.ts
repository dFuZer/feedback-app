import app from "./app";
import { initFileDb } from "./db";
import { DB_PATH, PORT } from "./env";

initFileDb(DB_PATH)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error: Failed to initialize database", err);
        process.exit(1);
    });
