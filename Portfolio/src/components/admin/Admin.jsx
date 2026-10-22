import React, { useEffect, useState } from "react";
import { defaultContent, mergeContent } from "../../data/content";
import { adminApi } from "./api";
import { DashboardTab } from "./tabs/DashboardTab";
import { ProjectsTab } from "./tabs/ProjectsTab";
import { ProfileTab } from "./tabs/ProfileTab";
import { AboutTab } from "./tabs/AboutTab";
import { SkillsTab } from "./tabs/SkillsTab";
import { ExperienceTab } from "./tabs/ExperienceTab";
import { VisibilityTab } from "./tabs/VisibilityTab";
import { InboxTab } from "./tabs/InboxTab";
import { SecurityTab } from "./tabs/SecurityTab";
import { JsonEditorTab } from "./tabs/JsonEditorTab";
import "./Admin.css";

export function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem("admin_token"));
  const [adminUser, setAdminUser] = useState(null);
  const [content, setContent] = useState(defaultContent);
  const [savedContentJson, setSavedContentJson] = useState("");
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);

  // Login form state
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginLoading, setLoginLoading] = useState(false);

  const notify = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((current) => (current?.message === message ? null : current));
    }, 4000);
  };

  const isDirty = savedContentJson && JSON.stringify(content) !== savedContentJson;

  useEffect(() => {
    if (!token) {
      setAdminUser(null);
      return;
    }

    let isMounted = true;

    Promise.all([
      adminApi.getMe(token),
      adminApi.getContent().catch(() => null),
      adminApi.getMessages(token).catch(() => []),
    ])
      .then(([userData, remoteContent, loadedMessages]) => {
        if (!isMounted) return;
        setAdminUser(userData);
        if (remoteContent) {
          const merged = mergeContent(remoteContent);
          setContent(merged);
          setSavedContentJson(JSON.stringify(merged));
        } else {
          setSavedContentJson(JSON.stringify(defaultContent));
        }
        setMessages(loadedMessages || []);
      })
      .catch((err) => {
        if (!isMounted) return;
        notify(err.message || "Your session has expired.", "error");
        sessionStorage.removeItem("admin_token");
        setToken(null);
      });

    return () => {
      isMounted = false;
    };
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const data = await adminApi.login(loginForm.email, loginForm.password);
      sessionStorage.setItem("admin_token", data.token);
      setToken(data.token);
      setAdminUser(data.user);
      notify("Welcome back! Signed in successfully.");
    } catch (err) {
      notify(err.message || "Unable to sign in.", "error");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    setToken(null);
    setAdminUser(null);
    notify("Signed out successfully.");
  };

  const handleSaveToDb = async () => {
    setIsSaving(true);
    try {
      const result = await adminApi.saveContent(token, content);
      const merged = mergeContent(result);
      setContent(merged);
      setSavedContentJson(JSON.stringify(merged));
      notify("All portfolio changes saved to MongoDB successfully!");
    } catch (err) {
      notify(err.message || "Failed to save content.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleMessageRead = async (message) => {
    try {
      const updated = await adminApi.updateMessage(token, message.id, !message.is_read);
      setMessages((prev) =>
        prev.map((m) => (m.id === message.id ? { ...m, is_read: updated.is_read } : m)),
      );
      notify(updated.is_read ? "Message marked as read." : "Message marked as unread.");
    } catch (err) {
      notify(err.message, "error");
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await adminApi.markAllMessagesRead(token);
      setMessages((prev) => prev.map((m) => ({ ...m, is_read: true })));
      notify("All messages marked as read.");
    } catch (err) {
      notify(err.message, "error");
    }
  };

  const handleDeleteMessage = async (message) => {
    if (!window.confirm(`Delete message from ${message.name}?`)) return;
    try {
      await adminApi.deleteMessage(token, message.id);
      setMessages((prev) => prev.filter((m) => m.id !== message.id));
      notify("Message deleted.");
    } catch (err) {
      notify(err.message, "error");
    }
  };

  if (!token) {
    return (
      <main className="lumo-login-viewport">
        <div className="lumo-login-wrapper">
          <div className="lumo-login-header">
            <h1 className="lumo-login-title">Aaditya Acharya Admin</h1>
            <p className="lumo-login-sub">Sign in to manage your portfolio.</p>
          </div>

          <form onSubmit={handleLogin} className="lumo-login-card">
            <div className="lumo-field-group">
              <label htmlFor="username">Username / Email</label>
              <input
                id="username"
                type="text"
                placeholder="aadityaacharya6882@gmail.com"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                required
                autoFocus
                autoComplete="username"
              />
            </div>

            <div className="lumo-field-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                required
                autoComplete="current-password"
              />
            </div>

            <button type="submit" className="lumo-login-submit" disabled={loginLoading}>
              {loginLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="lumo-login-back">
            <a href="/">← Return to public portfolio</a>
          </div>
        </div>

        {toast && <div className={`admin-toast ${toast.type}`}>{toast.message}</div>}
      </main>
    );
  }

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div className="lumo-admin-shell">
      {/* Sidebar with CSS reference from lumotechglobal */}
      <aside className="lumo-sidebar">
        {/* Top Brand Header */}
        <div className="lumo-brand-box" onClick={() => setActiveTab("dashboard")}>
          <span className="lumo-brand-text">Aaditya Acharya</span>
          <span className="lumo-brand-admin">admin</span>
        </div>

        {/* Navigation Items List tailored to Aaditya's portfolio */}
        <nav className="lumo-nav-menu">
          <button
            type="button"
            className={`lumo-nav-item ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            <span className="lumo-nav-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
              </svg>
            </span>
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            className={`lumo-nav-item ${activeTab === "projects" ? "active" : ""}`}
            onClick={() => setActiveTab("projects")}
          >
            <span className="lumo-nav-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="7" y1="8" x2="17" y2="8" />
                <line x1="7" y1="12" x2="17" y2="12" />
                <line x1="7" y1="16" x2="12" y2="16" />
              </svg>
            </span>
            <span>Projects</span>
            <span className="lumo-badge-count neutral">{content.projects?.length || 0}</span>
          </button>

          <button
            type="button"
            className={`lumo-nav-item ${activeTab === "messages" ? "active" : ""}`}
            onClick={() => setActiveTab("messages")}
          >
            <span className="lumo-nav-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </span>
            <span>Messages</span>
            {unreadCount > 0 && <span className="lumo-badge-count">{unreadCount}</span>}
          </button>

          <button
            type="button"
            className={`lumo-nav-item ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <span className="lumo-nav-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
            <span>Profile & Hero</span>
          </button>

          <button
            type="button"
            className={`lumo-nav-item ${activeTab === "about" ? "active" : ""}`}
            onClick={() => setActiveTab("about")}
          >
            <span className="lumo-nav-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </span>
            <span>About & Story</span>
          </button>

          <button
            type="button"
            className={`lumo-nav-item ${activeTab === "skills" ? "active" : ""}`}
            onClick={() => setActiveTab("skills")}
          >
            <span className="lumo-nav-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </span>
            <span>Skills & Tech</span>
          </button>

          <button
            type="button"
            className={`lumo-nav-item ${activeTab === "experience" ? "active" : ""}`}
            onClick={() => setActiveTab("experience")}
          >
            <span className="lumo-nav-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </span>
            <span>Experience</span>
          </button>

          <button
            type="button"
            className={`lumo-nav-item ${activeTab === "visibility" ? "active" : ""}`}
            onClick={() => setActiveTab("visibility")}
          >
            <span className="lumo-nav-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <span>Visibility & SEO</span>
          </button>

          <button
            type="button"
            className={`lumo-nav-item ${activeTab === "security" ? "active" : ""}`}
            onClick={() => setActiveTab("security")}
          >
            <span className="lumo-nav-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <span>Security</span>
          </button>

          <button
            type="button"
            className={`lumo-nav-item ${activeTab === "json" ? "active" : ""}`}
            onClick={() => setActiveTab("json")}
          >
            <span className="lumo-nav-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </span>
            <span>Raw JSON</span>
          </button>
        </nav>

        {/* Sidebar Footer Controls */}
        <div className="lumo-sidebar-footer">
          <div className="sidebar-action-row">
            {isDirty && <span className="dirty-pill">● Unsaved</span>}
            <button
              type="button"
              className={`lumo-save-action-btn ${isDirty ? "active-dirty" : ""}`}
              onClick={handleSaveToDb}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : isDirty ? "Save to DB" : "Saved"}
            </button>
          </div>

          <a href="/" target="_blank" rel="noreferrer" className="lumo-sidebar-ext-link">
            Live Portfolio ↗
          </a>

          <button type="button" className="lumo-nav-item logout-link" onClick={handleLogout}>
            <span className="lumo-nav-icon">🚪</span>
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Viewport */}
      <main className="lumo-main-viewport">
        {activeTab === "dashboard" && (
          <DashboardTab
            content={content}
            messages={messages}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === "projects" && (
          <ProjectsTab
            content={content}
            updateContent={setContent}
            notify={notify}
            token={token}
          />
        )}

        {activeTab === "messages" && (
          <InboxTab
            messages={messages}
            onToggleRead={handleToggleMessageRead}
            onDeleteMessage={handleDeleteMessage}
            onMarkAllRead={handleMarkAllRead}
          />
        )}

        {activeTab === "profile" && (
          <ProfileTab
            content={content}
            updateContent={setContent}
            notify={notify}
            token={token}
            onSaveToDb={handleSaveToDb}
            isSaving={isSaving}
            isDirty={isDirty}
          />
        )}

        {activeTab === "about" && (
          <AboutTab
            content={content}
            updateContent={setContent}
          />
        )}

        {activeTab === "skills" && (
          <SkillsTab
            content={content}
            updateContent={setContent}
            notify={notify}
            onSaveToDb={handleSaveToDb}
            isSaving={isSaving}
            isDirty={isDirty}
          />
        )}

        {activeTab === "experience" && (
          <ExperienceTab
            content={content}
            updateContent={setContent}
            notify={notify}
          />
        )}

        {activeTab === "visibility" && (
          <VisibilityTab
            content={content}
            updateContent={setContent}
          />
        )}

        {activeTab === "security" && (
          <SecurityTab
            token={token}
            adminEmail={adminUser?.email}
            notify={notify}
          />
        )}

        {activeTab === "json" && (
          <JsonEditorTab
            content={content}
            updateContent={setContent}
            notify={notify}
          />
        )}
      </main>

      {toast && <div className={`admin-toast ${toast.type}`}>{toast.message}</div>}
    </div>
  );
}
