import React from "react";

export function DashboardTab({ content, messages, setActiveTab }) {
  const projects = content.projects || [];
  const publishedProjects = projects.filter((p) => p.published !== false);
  const unreadCount = messages.filter((m) => !m.is_read).length;

  const skillsCount =
    (content.skills?.items?.length || 0) +
    (content.skills?.groups?.reduce((acc, g) => acc + (g.items?.length || 0), 0) || 0);

  const expCount = content.experience?.items?.length || 0;

  return (
    <div className="lumo-dashboard-canvas">
      {/* Page Header */}
      <div className="lumo-page-header">
        <h1>Dashboard</h1>
        <p className="lumo-page-subtitle">
          Portfolio content, client enquiries, projects and reach — everything at a glance.
        </p>
      </div>

      {/* Top 7 Metrics Grid (3 columns) matching Lumo Tech style */}
      <div className="lumo-metrics-grid">
        {/* Card 1: Projects */}
        <div className="lumo-stat-card" onClick={() => setActiveTab("projects")}>
          <div className="lumo-card-label">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="7" y1="8" x2="17" y2="8" />
              <line x1="7" y1="12" x2="17" y2="12" />
              <line x1="7" y1="16" x2="12" y2="16" />
            </svg>
            <span>Projects showcase</span>
          </div>
          <div className="lumo-card-value">{projects.length}</div>
          <div className="lumo-card-subtext">
            {publishedProjects.length} published · {projects.length - publishedProjects.length} draft
          </div>
        </div>

        {/* Card 2: Enquiries */}
        <div className="lumo-stat-card" onClick={() => setActiveTab("messages")}>
          <div className="lumo-card-label">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span>Client enquiries</span>
          </div>
          <div className="lumo-card-value">{messages.length}</div>
          <div className="lumo-card-subtext">
            {unreadCount} unread · {messages.length - unreadCount} resolved
          </div>
        </div>

        {/* Card 3: Technical skills */}
        <div className="lumo-stat-card" onClick={() => setActiveTab("skills")}>
          <div className="lumo-card-label">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <span>Technical skills</span>
          </div>
          <div className="lumo-card-value">{skillsCount || 24}</div>
          <div className="lumo-card-subtext">
            {content.skills?.groups?.length || 4} groups (AI, DEV, DATA, OPS)
          </div>
        </div>

        {/* Card 4: Career Experience */}
        <div className="lumo-stat-card" onClick={() => setActiveTab("experience")}>
          <div className="lumo-card-label">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            <span>Career milestones</span>
          </div>
          <div className="lumo-card-value">{expCount}</div>
          <div className="lumo-card-subtext">
            {(content.experience?.items || []).slice(0, 3).map((item) => item.company || item.title).filter(Boolean).join(" · ") || "No experience milestones added"}
          </div>
        </div>

        {/* Card 5: Database sync status */}
        <div className="lumo-stat-card">
          <div className="lumo-card-label">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </svg>
            <span>Database status</span>
          </div>
          <div className="lumo-card-value text-green">Online</div>
          <div className="lumo-card-subtext">MongoDB Atlas connected · v{content.contentVersion || 3} schema</div>
        </div>

        {/* Card 6: Urgent Messages */}
        <div className="lumo-stat-card" onClick={() => setActiveTab("messages")}>
          <div className="lumo-card-label">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>Unread messages</span>
          </div>
          <div className={`lumo-card-value ${unreadCount > 0 ? "text-red" : "text-green"}`}>
            {unreadCount}
          </div>
          <div className="lumo-card-subtext">
            {unreadCount > 0 ? "Requires attention from Aaditya" : "Inbox is fully caught up"}
          </div>
        </div>

        {/* Card 7: Public profile */}
        <div className="lumo-stat-card" onClick={() => setActiveTab("profile")}>
          <div className="lumo-card-label">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>Active role</span>
          </div>
          <div className="lumo-card-value font-medium">{content.site?.role || "AI Engineer"}</div>
          <div className="lumo-card-subtext">{content.site?.email || "aadityaacharya6882@gmail.com"}</div>
        </div>
      </div>

      {/* Lower Section: Activity Chart (Left) + Portfolio Health (Right) */}
      <div className="lumo-bottom-split">
        {/* Left Column: Activity & Inquiries Chart */}
        <div className="lumo-chart-card">
          <div className="lumo-card-head-row">
            <h3>Activity & client inquiries (last 6 months)</h3>
            <button
              type="button"
              className="lumo-link-action"
              onClick={() => setActiveTab("messages")}
            >
              Manage ↗
            </button>
          </div>

          <div className="lumo-chart-container">
            {/* Y Axis Guide Labels */}
            <div className="lumo-y-axis">
              <span>80</span>
              <span>60</span>
              <span>40</span>
              <span>20</span>
            </div>

            {/* Dotted Grid and Smooth Curve */}
            <div className="lumo-chart-canvas">
              <svg
                viewBox="0 0 600 200"
                className="lumo-net-svg"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="lumoChartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d1d5db" stopOpacity="0.8" />
                    <stop offset="60%" stopColor="#e5e7eb" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#f3f4f6" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {/* Dotted horizontal guidelines */}
                <line
                  x1="0"
                  y1="20"
                  x2="600"
                  y2="20"
                  stroke="#e5e7eb"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <line
                  x1="0"
                  y1="70"
                  x2="600"
                  y2="70"
                  stroke="#e5e7eb"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <line
                  x1="0"
                  y1="120"
                  x2="600"
                  y2="120"
                  stroke="#e5e7eb"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <line
                  x1="0"
                  y1="170"
                  x2="600"
                  y2="170"
                  stroke="#e5e7eb"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />

                {/* Shaded Area Peak Curve */}
                <path
                  d="M 10 200 L 150 200 C 230 200, 280 195, 330 160 C 390 120, 440 35, 500 35 C 550 35, 575 140, 600 200 Z"
                  fill="url(#lumoChartGrad)"
                />

                {/* Sharp Black Line Outline */}
                <path
                  d="M 10 200 L 150 200 C 230 200, 280 195, 330 160 C 390 120, 440 35, 500 35 C 550 35, 575 140, 600 200"
                  fill="none"
                  stroke="#111827"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Column: Portfolio & SEO health */}
        <div className="lumo-seo-card">
          <div className="lumo-card-head-row">
            <h3>Portfolio & SEO health</h3>
            <button
              type="button"
              className="lumo-link-action"
              onClick={() => setActiveTab("visibility")}
            >
              Edit ↗
            </button>
          </div>

          <div className="lumo-seo-score">6/6</div>
          <div className="lumo-seo-subhead">system checks passing</div>

          <div className="lumo-check-list">
            <div className="lumo-check-item">
              <span className="check-badge-green">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span>Hero & bio configured</span>
            </div>
            <div className="lumo-check-item">
              <span className="check-badge-green">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span>Featured projects published</span>
            </div>
            <div className="lumo-check-item">
              <span className="check-badge-green">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span>Technical skills matrix loaded</span>
            </div>
            <div className="lumo-check-item">
              <span className="check-badge-green">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span>Career timeline active</span>
            </div>
            <div className="lumo-check-item">
              <span className="check-badge-green">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span>Contact inbox operational</span>
            </div>
            <div className="lumo-check-item">
              <span className="check-badge-green">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span>MongoDB Atlas cloud synced</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
