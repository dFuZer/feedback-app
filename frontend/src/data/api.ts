import { API_URL } from "../utils/env";

type GetCategoriesResponse = {
    id: string;
    name: string;
}[];

type GetFeedbacksResponse = {
    id: string;
    title: string;
    content: string;
    likes: number;
    category_id: string;
    created_at: string;
}[];

export async function getCategories() {
    const response = await fetch(`${API_URL}/category/get-all`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch categories");
    }

    return (await response.json()) as GetCategoriesResponse;
}

export async function getFeedbacks() {
    const response = await fetch(`${API_URL}/feedback/get-all`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch feedbacks");
    }

    return (await response.json()) as GetFeedbacksResponse;
}
