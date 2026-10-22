import React, { useState } from "react";

export function InboxTab({
  messages,
  onToggleRead,
  onDeleteMessage,
  onMarkAllRead,
}) {
  const [filter, setFilter] = useState("all"); // all, unread, read
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMessages = messages.filter((msg) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      msg.name.toLowerCase().includes(term) ||
      msg.email.toLowerCase().includes(term) ||
      (msg.subject || "").toLowerCase().includes(term) ||
      (msg.message || "").toLowerCase().includes(term);

    if (!matchesSearch) return false;
    if (filter === "unread") return !msg.is_read;
    if (filter === "read") return msg.is_read;
    return true;
  });

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div className="admin-tab-content">
      <div className="tab-header">
        <div>
          <h2>Client Inquiries & Inbox</h2>
          <p className="tab-subtitle">
            Messages sent via your portfolio contact form
          </p>
        </div>
        <div className="tab-header-actions">
          {unreadCount > 0 && (
            <button className="btn-secondary" onClick={onMarkAllRead}>
              ✓ Mark All as Read ({unreadCount})
            </button>
          )}
        </div>
      </div>

      <div className="table-controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search by sender name, email, subject, or message..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="filter-pills">
          <button
            className={`filter-pill ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All ({messages.length})
          </button>
          <button
            className={`filter-pill ${filter === "unread" ? "active" : ""}`}
            onClick={() => setFilter("unread")}
          >
            Unread ({unreadCount})
          </button>
          <button
            className={`filter-pill ${filter === "read" ? "active" : ""}`}
            onClick={() => setFilter("read")}
          >
            Read ({messages.length - unreadCount})
          </button>
        </div>
      </div>

      <div className="inbox-messages-list">
        {filteredMessages.length === 0 ? (
          <div className="empty-state">
            <p>No messages match your criteria.</p>
          </div>
        ) : (
          filteredMessages.map((msg) => (
            <div
              key={msg.id}
              className={`message-card-admin ${!msg.is_read ? "is-unread" : "is-read"}`}
            >
              <div className="message-header">
                <div className="sender-meta">
                  <div className="avatar-circle">
                    {msg.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="sender-name-row">
                      <h4>{msg.name}</h4>
                      {!msg.is_read && (
                        <span className="badge-pill badge-urgent">NEW</span>
                      )}
                      {msg.projectType && (
                        <span className="badge-pill">{msg.projectType}</span>
                      )}
                    </div>
                    <a href={`mailto:${msg.email}`} className="sender-email">
                      {msg.email}
                    </a>
                  </div>
                </div>

                <div className="message-time">
                  {new Date(msg.created_at).toLocaleString([], {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>

              <div className="message-subject-line">
                <strong>Subject:</strong> {msg.subject}
              </div>

              <div className="message-body-text">{msg.message}</div>

              <div className="message-card-footer">
                <div className="message-actions-left">
                  <button
                    className="btn-toggle"
                    onClick={() => onToggleRead(msg)}
                  >
                    {msg.is_read ? "Mark as unread" : "✓ Mark as read"}
                  </button>
                  <a
                    href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(
                      msg.subject || "Your inquiry",
                    )}`}
                    className="btn-secondary"
                  >
                    Reply via Email ↗
                  </a>
                </div>
                <button
                  className="btn-danger"
                  onClick={() => onDeleteMessage(msg)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
