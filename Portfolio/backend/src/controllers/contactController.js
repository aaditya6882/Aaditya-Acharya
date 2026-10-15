import { ContactMessage } from "../models/ContactMessage.js";
import { contactSchema } from "../utils/validation.js";
import { clientHash } from "../utils/security.js";

export async function createContactMessage(request, response, next) {
  try {
    const result = contactSchema.safeParse(request.body);
    if (!result.success)
      return response
        .status(422)
        .json({ error: "Please provide valid contact details." });
    if (result.data.website)
      return response
        .status(400)
        .json({ error: "Unable to process this request." });

    const ipHash = clientHash(request.ip);
    const since = new Date(Date.now() - 15 * 60 * 1000);
    const recent = await ContactMessage.countDocuments({
      clientIpHash: ipHash,
      createdAt: { $gte: since },
    });
    if (recent >= 5)
      return response
        .status(429)
        .json({ error: "Too many messages. Please try again later." });

    await ContactMessage.create({
      ...result.data,
      projectType: result.data.projectType || undefined,
      clientIpHash: ipHash,
    });
    return response.status(201).json({ message: "Message saved." });
  } catch (error) {
    return next(error);
  }
}
