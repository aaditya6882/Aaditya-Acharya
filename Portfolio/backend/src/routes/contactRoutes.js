import { Router } from "express";
import { createContactMessage } from "../controllers/contactController.js";
import { contactLimit } from "../middleware/rateLimiters.js";

export const contactRoutes = Router();
contactRoutes.post("/", contactLimit, createContactMessage);
