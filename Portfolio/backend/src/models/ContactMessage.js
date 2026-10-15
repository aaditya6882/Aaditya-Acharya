import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxlength: 100, trim: true },
    email: {
      type: String,
      required: true,
      maxlength: 254,
      lowercase: true,
      trim: true,
    },
    subject: { type: String, required: true, maxlength: 160, trim: true },
    message: { type: String, required: true, maxlength: 5000, trim: true },
    projectType: { type: String, maxlength: 100, trim: true },
    isRead: { type: Boolean, default: false },
    clientIpHash: { type: String, required: true, index: true },
  },
  { timestamps: true },
);

contactMessageSchema.index({ clientIpHash: 1, createdAt: -1 });

export const ContactMessage = mongoose.model(
  "ContactMessage",
  contactMessageSchema,
);
