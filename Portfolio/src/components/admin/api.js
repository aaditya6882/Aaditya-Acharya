const rawApi = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const API_BASE = rawApi.endsWith("/api") ? rawApi : `${rawApi.replace(/\/+$/, "")}/api`;

const authHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

export const adminApi = {
  async login(email, password) {
    const response = await fetch(`${API_BASE}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Login failed.");
    return data;
  },

  async getMe(token) {
    const response = await fetch(`${API_BASE}/admin/me`, {
      headers: authHeaders(token),
    });
    if (!response.ok) throw new Error("Session expired or invalid.");
    return await response.json();
  },

  async changePassword(token, currentPassword, newPassword) {
    const response = await fetch(`${API_BASE}/admin/change-password`, {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Unable to update password.");
    return data;
  },

  async getContent() {
    const response = await fetch(`${API_BASE}/content`);
    if (!response.ok) throw new Error("Unable to fetch portfolio content.");
    return await response.json();
  },

  async saveContent(token, content) {
    const response = await fetch(`${API_BASE}/content`, {
      method: "PUT",
      headers: authHeaders(token),
      body: JSON.stringify(content),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to save content.");
    return data;
  },

  async getMessages(token) {
    const response = await fetch(`${API_BASE}/admin/messages`, {
      headers: authHeaders(token),
    });
    if (!response.ok) throw new Error("Unable to load messages.");
    return await response.json();
  },

  async updateMessage(token, id, is_read) {
    const response = await fetch(`${API_BASE}/admin/messages/${id}`, {
      method: "PATCH",
      headers: authHeaders(token),
      body: JSON.stringify({ is_read }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to update message.");
    return data;
  },

  async markAllMessagesRead(token) {
    const response = await fetch(`${API_BASE}/admin/messages/mark-all-read`, {
      method: "PATCH",
      headers: authHeaders(token),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to mark all as read.");
    return data;
  },

  async deleteMessage(token, id) {
    const response = await fetch(`${API_BASE}/admin/messages/${id}`, {
      method: "DELETE",
      headers: authHeaders(token),
    });
    if (!response.ok) throw new Error("Failed to delete message.");
    return true;
  },

  async getResumeInfo() {
    try {
      const response = await fetch(`${API_BASE}/resume/info`);
      if (!response.ok) return { exists: false };
      return await response.json();
    } catch {
      return { exists: false };
    }
  },

  async uploadResume(token, file) {
    const formData = new FormData();
    formData.append("resume", file);
    const response = await fetch(`${API_BASE}/resume/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to upload resume.");
    return data;
  },

  async uploadProjectImage(token, file) {
    const formData = new FormData();
    formData.append("image", file);
    const response = await fetch(`${API_BASE}/upload/project-image`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to upload project image.");
    return data;
  },

  async deleteResume(token) {
    const response = await fetch(`${API_BASE}/resume`, {
      method: "DELETE",
      headers: authHeaders(token),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to delete resume.");
    return data;
  },
};
