import { initFileDb } from "../db";
import { DB_PATH } from "../env";
import { seedInitializedDatabase } from "../seed";

async function seed() {
    await initFileDb(DB_PATH);
    await seedInitializedDatabase();
}

seed();
