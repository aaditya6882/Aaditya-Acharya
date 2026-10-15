import crypto from "node:crypto";
import { config } from "../config/env.js";

export const clientHash = (ip) =>
  crypto.createHmac("sha256", config.jwtSecret).update(ip).digest("hex");
