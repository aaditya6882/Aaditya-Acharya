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
    return response.json({
      token: createToken(user),
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    return next(error);
  }
}

export async function getMe(request, response, next) {
  try {
    const user = await AdminUser.findById(request.user.sub).select("email createdAt");
    if (!user) return response.status(404).json({ error: "Admin user not found." });
    return response.json({ id: user._id, email: user.email, createdAt: user.createdAt });
  } catch (error) {
    return next(error);
  }
}

export async function changePassword(request, response, next) {
  try {
    const { currentPassword, newPassword } = request.body;
    if (!currentPassword || !newPassword) {
      return response.status(422).json({ error: "Both current and new password are required." });
    }
    if (newPassword.length < 6) {
      return response.status(422).json({ error: "New password must be at least 6 characters long." });
    }
    const user = await AdminUser.findById(request.user.sub);
    if (!user || !(await bcrypt.compare(currentPassword, user.passwordHash))) {
      return response.status(401).json({ error: "Current password is incorrect." });
    }
    user.passwordHash = await bcrypt.hash(newPassword, 12);
    await user.save();
    return response.json({ message: "Password updated successfully." });
  } catch (error) {
    return next(error);
  }
}
