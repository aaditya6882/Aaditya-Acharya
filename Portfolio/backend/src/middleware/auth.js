import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

export function createToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), email: user.email },
    config.jwtSecret,
    { expiresIn: "8h" },
  );
}

export function requireAuth(request, response, next) {
  const token = request.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token)
    return response.status(401).json({ error: "Authentication required." });
  try {
    request.user = jwt.verify(token, config.jwtSecret);
    return next();
  } catch {
    return response.status(401).json({ error: "Your session has expired." });
  }
}
