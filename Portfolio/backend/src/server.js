import cors from "cors";
import express from "express";
import helmet from "helmet";
import { config } from "./config/env.js";
import { connectDatabase } from "./config/database.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { contactRoutes } from "./routes/contactRoutes.js";
import { authRoutes } from "./routes/authRoutes.js";
import { messageRoutes } from "./routes/messageRoutes.js";

const app = express();

app.set("trust proxy", 1);
app.use(helmet());
app.use(
  cors({
    origin: config.frontendUrl,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json({ limit: "16kb" }));

app.get("/api/health", (request, response) =>
  response.json({ status: "ok", service: "portfolio-api" }),
);
app.use("/api/contact", contactRoutes);
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
