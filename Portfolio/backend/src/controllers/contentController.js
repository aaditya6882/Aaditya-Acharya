import { PortfolioContent } from "../models/PortfolioContent.js";

export async function getContent(request, response, next) {
  try {
    const document = await PortfolioContent.findOne({ key: "main" }).lean();
    return response.json(document?.content || null);
  } catch (error) {
    return next(error);
  }
}

export async function updateContent(request, response, next) {
  try {
    if (!request.body || typeof request.body !== "object" || Array.isArray(request.body))
      return response.status(422).json({ error: "Content must be a JSON object." });
    const document = await PortfolioContent.findOneAndUpdate(
      { key: "main" },
      { key: "main", content: request.body },
      { new: true, upsert: true, runValidators: true },
    ).lean();
    return response.json(document.content);
  } catch (error) {
    return next(error);
  }
}
