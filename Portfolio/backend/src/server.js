import cors from "cors";
import express from "express";
import helmet from "helmet";
import { config } from "./config/env.js";
import { connectDatabase } from "./config/database.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { contactRoutes } from "./routes/contactRoutes.js";
import { authRoutes } from "./routes/authRoutes.js";
import { messageRoutes } from "./routes/messageRoutes.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { contentRoutes } from "./routes/contentRoutes.js";
import { resumeRoutes } from "./routes/resumeRoutes.js";
import { uploadRoutes } from "./routes/uploadRoutes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.set("trust proxy", 1);
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server) or matching localhost
      if (!origin || origin.includes("localhost") || origin.includes("127.0.0.1") || origin === config.frontendUrl) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));

// Serve uploaded static files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/api/health", (request, response) =>
  response.json({ status: "ok", service: "portfolio-api" }),
);
app.use("/api/contact", contactRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/admin", authRoutes);
app.use("/api/admin/messages", messageRoutes);
app.use(errorHandler);

connectDatabase()
  .then(() => {
    app.listen(config.port, () =>
      console.log(`Portfolio API listening on http://localhost:${config.port}`),
    );
  })
  .catch((error) => {
    console.error("Unable to start Portfolio API", error);
    process.exit(1);
  });
