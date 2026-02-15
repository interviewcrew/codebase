import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().optional(),
});

export const updatePostSchema = z.object({
  id: z.string().min(1, { message: "ID is required" }),
  title: z.string().min(1, { message: "Title is required" }).optional(),
  content: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
});
