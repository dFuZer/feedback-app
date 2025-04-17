import app from "./app";
import { initializeDb } from "./db";
import { PORT } from "./env";

initializeDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error initializing database", error);
        process.exit(1);
    });
