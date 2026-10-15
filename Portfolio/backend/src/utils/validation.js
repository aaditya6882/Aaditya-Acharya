import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().min(1).max(160),
  message: z.string().trim().min(1).max(5000),
  projectType: z.string().trim().max(100).optional().default(""),
  website: z.string().max(100).optional().default(""),
});

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1).max(200),
});
