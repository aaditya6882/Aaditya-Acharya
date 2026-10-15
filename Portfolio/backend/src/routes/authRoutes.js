import { Router } from "express";
import { loginAdmin } from "../controllers/authController.js";
import { loginLimit } from "../middleware/rateLimiters.js";

export const authRoutes = Router();
authRoutes.post("/login", loginLimit, loginAdmin);
