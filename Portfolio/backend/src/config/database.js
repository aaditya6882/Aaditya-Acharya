import dns from "node:dns";
import mongoose from "mongoose";
import { config } from "./env.js";

// Ensure Node's c-ares DNS resolver works reliably on Windows network adapters
const servers = dns.getServers();
if (!servers.length || servers.every((s) => s.startsWith("127."))) {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
}

export async function connectDatabase() {
  await mongoose.connect(config.mongoUri, { serverSelectionTimeoutMS: 10_000 });
  console.log("MongoDB connected");
}
