import bcrypt from "bcryptjs";
import { AdminUser } from "../models/AdminUser.js";
import { createToken } from "../middleware/auth.js";
import { loginSchema } from "../utils/validation.js";

export async function loginAdmin(request, response, next) {
  try {
    const result = loginSchema.safeParse(request.body);
    if (!result.success)
      return response.status(401).json({ error: "Invalid credentials." });
    const user = await AdminUser.findOne({
      email: result.data.email.toLowerCase(),
    });
    if (
      !user ||
      !(await bcrypt.compare(result.data.password, user.passwordHash))
    )
      return response.status(401).json({ error: "Invalid credentials." });
    return response.json({ token: createToken(user) });
  } catch (error) {
    return next(error);
  }
}
