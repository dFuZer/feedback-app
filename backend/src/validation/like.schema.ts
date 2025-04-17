import z from "zod";

export const LikeFeedbackSchema = z.object({
    feedbackId: z.number(),
});

export type LikeFeedbackData = z.infer<typeof LikeFeedbackSchema>;
