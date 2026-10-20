import { Router } from "express";
import { getContent, updateContent } from "../controllers/contentController.js";
import { requireAuth } from "../middleware/auth.js";

export const contentRoutes = Router();
contentRoutes.get("/", getContent);
contentRoutes.put("/", requireAuth, updateContent);
