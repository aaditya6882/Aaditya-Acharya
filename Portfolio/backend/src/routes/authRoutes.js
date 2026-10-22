import { Router } from "express";
import { loginAdmin, getMe, changePassword } from "../controllers/authController.js";
import { loginLimit } from "../middleware/rateLimiters.js";
import { requireAuth } from "../middleware/auth.js";

export const authRoutes = Router();
authRoutes.post("/login", loginLimit, loginAdmin);
authRoutes.get("/me", requireAuth, getMe);
authRoutes.post("/change-password", requireAuth, changePassword);

