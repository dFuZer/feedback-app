import request from "supertest";
import app from "../app";
import { initInMemoryDb } from "../db";
import { seedInitializedDatabase } from "../seed";

const invalidBodyTestCases = [
    { title: "a".repeat(31), content: "valid", categoryId: 1 }, // Titre trop long
    { title: "valid", content: "a".repeat(1001), categoryId: 1 }, // Contenu trop long
    { title: "valid" }, // Champs manquants
];

const internalErrorTestCases = [
    { title: "valid", content: "valid", categoryId: 999 }, // Catégorie inexistante
];

beforeAll(async () => {
    await initInMemoryDb();
    await seedInitializedDatabase();
});

describe("/feedback routes", () => {
    it("should return empty array initially", async () => {
        const res = await request(app).get("/feedback/get-all");
        expect(res.body).toEqual([]);
        expect(res.status).toBe(200);
    });

    it("should return 201 and insert valid feedback", async () => {
        const feedback = {
            title: "test",
            content: "test",
            categoryId: 1,
        };
        const res = await request(app).post("/feedback/submit").send(feedback);
        expect(res.status).toBe(201);
    });

    it("should return all feedbacks after insertion", async () => {
        // Insérez des données de test ici
        const res = await request(app).get("/feedback/get-all");
        expect(res.body).not.toEqual([]);
        expect(res.status).toBe(200);
    });

    describe("Validation errors", () => {
        test.each(invalidBodyTestCases)("should reject invalid payload: %s", async (testCase) => {
            const res = await request(app).post("/feedback/submit").send(testCase);
            expect(res.status).toBe(400);
            expect(res.text).toMatch(/Invalid request body/);
        });
        test.each(internalErrorTestCases)("should reject invalid payload: %s", async (testCase) => {
            const res = await request(app).post("/feedback/submit").send(testCase);
            expect(res.status).toBe(500);
            expect(res.text).toMatch(/Error submitting feedback/);
        });
    });
});
