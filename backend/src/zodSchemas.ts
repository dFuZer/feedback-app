import z from "zod";

export const FeedbackSchema = z.object({
    title: z.string().max(30),
    content: z.string().max(200),
});

export type Feedback = z.infer<typeof FeedbackSchema>;
