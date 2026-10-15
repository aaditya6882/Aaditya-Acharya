import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import "dotenv/config";
import { AdminUser } from "../src/models/AdminUser.js";

const [email, password] = process.argv.slice(2);
if (!email || !password) {
  console.error(
    "Usage: npm run create-admin -- admin@example.com a-strong-password",
  );
  process.exit(1);
}

if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is required");
await mongoose.connect(process.env.MONGODB_URI);
await AdminUser.findOneAndUpdate(
  { email: email.toLowerCase() },
  { email: email.toLowerCase(), passwordHash: await bcrypt.hash(password, 12) },
  { upsert: true, new: true, setDefaultsOnInsert: true },
);
console.log(`Admin account created for ${email.toLowerCase()}`);
await mongoose.disconnect();
