import { useEffect, useState } from "react";
import "./Admin.css";

const endpoint = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export function Admin() {
  const [token, setToken] = useState(() =>
    sessionStorage.getItem("admin_token"),
  );
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    fetch(`${endpoint}/admin/messages`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Your session has expired.");
        setMessages(await response.json());
      })
      .catch((loadError) => {
        setError(loadError.message);
        setToken(null);
        sessionStorage.removeItem("admin_token");
      });
  }, [token]);

  const login = async (event) => {
    event.preventDefault();
    setError("");
    const response = await fetch(`${endpoint}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const result = await response.json();
    if (!response.ok) return setError(result.error);
    sessionStorage.setItem("admin_token", result.token);
    setToken(result.token);
  };

  const updateMessage = async (message, action) => {
    if (action === "delete") {
      await fetch(`${endpoint}/admin/messages/${message.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      return setMessages((current) =>
        current.filter((item) => item.id !== message.id),
      );
    }
    await fetch(`${endpoint}/admin/messages/${message.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_read: !message.is_read }),
    });
    setMessages((current) =>
      current.map((item) =>
        item.id === message.id ? { ...item, is_read: !item.is_read } : item,
      ),
    );
  };

  if (!token)
    return (
      <main className="admin-page">
        <form className="admin-login" onSubmit={login}>
          <p className="admin-kicker">Private workspace</p>
          <h1>Admin sign in</h1>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm({ ...form, email: event.target.value })
              }
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={form.password}
              onChange={(event) =>
                setForm({ ...form, password: event.target.value })
              }
              required
            />
          </label>
          <button type="submit">Sign in</button>
          {error && <p className="admin-error">{error}</p>}
        </form>
      </main>
    );

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <p className="admin-kicker">Aaditya Acharya / CMS</p>
          <h1>Messages</h1>
        </div>
        <button
          onClick={() => {
            sessionStorage.removeItem("admin_token");
            setToken(null);
          }}
        >
          Sign out
        </button>
      </header>
      <section className="admin-summary">
        <strong>{messages.length}</strong>
        <span>Total messages</span>
        <strong>{messages.filter((message) => !message.is_read).length}</strong>
        <span>Unread</span>
      </section>
      <section className="message-list">
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((message) => (
            <article
              className={message.is_read ? "message read" : "message"}
              key={message.id}
            >
              <div>
                <span>{new Date(message.created_at).toLocaleDateString()}</span>
                <h2>{message.subject}</h2>
                <p>
                  {message.name} /{" "}
                  <a href={`mailto:${message.email}`}>{message.email}</a>
                </p>
                <p>{message.message}</p>
              </div>
              <div className="message-actions">
                <button onClick={() => updateMessage(message, "read")}>
                  {message.is_read ? "Mark unread" : "Mark read"}
                </button>
                <a
                  href={`https://wa.me/${(import.meta.env.VITE_WHATSAPP_NUMBER || "9741688299").replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${message.name}, thanks for reaching out through my portfolio.`)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>
                <button onClick={() => updateMessage(message, "delete")}>
                  Delete
                </button>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
