import { Router } from "express";
import {
  deleteMessage,
  listMessages,
  markAllRead,
  updateMessage,
} from "../controllers/messageController.js";
import { requireAuth } from "../middleware/auth.js";

export const messageRoutes = Router();
messageRoutes.use(requireAuth);
messageRoutes.get("/", listMessages);
messageRoutes.patch("/mark-all-read", markAllRead);
messageRoutes.patch("/:id", updateMessage);
messageRoutes.delete("/:id", deleteMessage);

