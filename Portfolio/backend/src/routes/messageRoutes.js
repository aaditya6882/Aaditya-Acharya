import { Router } from "express";
import {
  deleteMessage,
  listMessages,
  updateMessage,
} from "../controllers/messageController.js";
import { requireAuth } from "../middleware/auth.js";

export const messageRoutes = Router();
messageRoutes.use(requireAuth);
messageRoutes.get("/", listMessages);
messageRoutes.patch("/:id", updateMessage);
messageRoutes.delete("/:id", deleteMessage);
