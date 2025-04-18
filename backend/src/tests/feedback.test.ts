import request from "supertest";
import app from "../app";
import { getDb } from "../db";

const invalidTestCases = [
	{ title: "a".repeat(31), content: "valid", categoryId: 1 }, // Titre trop long
	{ title: "valid", content: "a".repeat(1001), categoryId: 1 }, // Contenu trop long
	{ title: "valid", content: "valid", categoryId: 999 }, // Catégorie inexistante
	{ title: "valid" }, // Champs manquants
];

invalidTestCases.forEach((payload) => {
	it(`should reject invalid payload: ${JSON.stringify(
		payload
	)}`, async () => {
		const res = await request(app).post("/feedback/submit").send(payload);
		expect(res.status).toBe(400);
		expect(res.text).toMatch(/Invalid request body/);
	});
});

beforeAll(async () => {
	const db = await getDb();
	await db.run("DELETE FROM feedback");
});

describe("POST /feedback/submit", () => {
	it("should return 201 and insert valid feedback", async () => {
		const feedback = {
			title: "test",
			content: "test",
			categoryId: 1,
		};
		const res = await request(app).post("/feedback/submit").send(feedback);
		expect(res.status).toBe(201);
	});

	describe("Validation errors", () => {
		invalidTestCases.forEach((testCase) => {
			it(`should reject invalid payload: ${JSON.stringify(
				testCase
			)}`, async () => {
				const res = await request(app)
					.post("/feedback/submit")
					.send(testCase);
				expect(res.status).toBe(400);
				expect(res.text).toMatch(/Invalid request body/);
			});
		});
	});
});

describe("GET /feedback/get-all", () => {
	it("should return empty array initially", async () => {
		const res = await request(app).get("/feedback/get-all");
		expect(res.body).toEqual([]);
		expect(res.status).toBe(200);
	});

	it("should return all feedbacks after insertion", async () => {
		// Insérez des données de test ici
		const res = await request(app).get("/feedback/get-all");
		expect(res.body).not.toEqual([]);
		expect(res.status).toBe(200);
	});
});
