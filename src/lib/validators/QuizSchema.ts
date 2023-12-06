import { z } from "zod";

export const QuizSchema = z.object({
    topic: z.string().min(2, {message: "Topic must be at least 3 characters long."}),
    amount: z.number().min(2, {message: "Questions must be at least 3 in number."}).max(25, {message: "Questions should not exceed 25 in number"}),
    type: z.enum(["mcq", "open_ended"]).optional(),
})

export const checkAnswerSchema = z.object({
    questionId:z.string(),
    userInput: z.string()
})

export const endGameSchema = z.object({
    gameId: z.string(),
  });
  