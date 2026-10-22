import { ContactMessage } from "../models/ContactMessage.js";

export async function listMessages(request, response, next) {
  try {
    const messages = await ContactMessage.find()
      .select("name email subject message projectType isRead createdAt")
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();
    return response.json(
      messages.map((message) => ({
        ...message,
        id: message._id.toString(),
        is_read: message.isRead,
        created_at: message.createdAt,
      })),
    );
  } catch (error) {
    return next(error);
  }
}

export async function updateMessage(request, response, next) {
  try {
    if (typeof request.body.is_read !== "boolean")
      return response.status(422).json({ error: "is_read must be a boolean." });
    const message = await ContactMessage.findByIdAndUpdate(
      request.params.id,
      { isRead: request.body.is_read },
      { new: true },
    ).lean();
    if (!message)
      return response.status(404).json({ error: "Message not found." });
    return response.json({
      id: message._id.toString(),
      is_read: message.isRead,
    });
  } catch (error) {
    return next(error);
  }
}

export async function deleteMessage(request, response, next) {
  try {
    const result = await ContactMessage.findByIdAndDelete(request.params.id);
    if (!result)
      return response.status(404).json({ error: "Message not found." });
    return response.status(204).end();
  } catch (error) {
    return next(error);
  }
}

export async function markAllRead(request, response, next) {
  try {
    await ContactMessage.updateMany({ isRead: false }, { isRead: true });
    return response.json({ message: "All messages marked as read." });
  } catch (error) {
    return next(error);
  }
}

