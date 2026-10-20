import mongoose from "mongoose";

const portfolioContentSchema = new mongoose.Schema(
  { key: { type: String, unique: true, default: "main" }, content: { type: mongoose.Schema.Types.Mixed, required: true } },
  { timestamps: true },
);

export const PortfolioContent = mongoose.model("PortfolioContent", portfolioContentSchema);
