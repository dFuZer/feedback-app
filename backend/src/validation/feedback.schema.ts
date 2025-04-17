import z from "zod";

export const SubmitFeedbackSchema = z.object({
    title: z.string().max(30),
    content: z.string().max(200),
    categoryId: z.number(),
});

export type SubmitFeedbackData = z.infer<typeof SubmitFeedbackSchema>;
