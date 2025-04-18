import { initFileDb } from "../db";
import { DB_PATH } from "../env";
import { addSampleDataToInitializedDatabase } from "../sampleData";

async function addSampleData() {
    await initFileDb(DB_PATH);
    await addSampleDataToInitializedDatabase();
}

addSampleData();
