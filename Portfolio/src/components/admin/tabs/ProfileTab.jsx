import React, { useState, useEffect, useRef } from "react";
import { adminApi } from "../api";

function ResumeManager({ token, notify, site, handleSiteChange }) {
  const [resumeInfo, setResumeInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const fetchInfo = async () => {
    setIsLoading(true);
    try {
      const data = await adminApi.getResumeInfo();
      setResumeInfo(data);
    } catch {
      setResumeInfo({ exists: false });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: 10MB
    if (file.size > 10 * 1024 * 1024) {
      notify("File is too large. Maximum allowed size is 10 MB.", "error");
      return;
    }

    setIsUploading(true);
    try {
      await adminApi.uploadResume(token, file);
      notify("Resume uploaded successfully!", "success");
      await fetchInfo();
      // Set the site resume URL to view endpoint if empty or defaulted
      if (!site.resume || site.resume === "#contact") {
        handleSiteChange("resume", `${apiBase}/resume/view`);
      }
    } catch (err) {
      notify(err.message || "Failed to upload resume.", "error");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete the uploaded resume file?")) {
      return;
    }
    try {
      await adminApi.deleteResume(token);
      notify("Resume deleted successfully.", "success");
      await fetchInfo();
    } catch (err) {
      notify(err.message || "Failed to delete resume.", "error");
    }
  };

  const viewUrl = `${apiBase}/resume/view`;
  const downloadUrl = `${apiBase}/resume/download`;

  return (
    <div className="admin-section-card resume-management-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h3>Resume / CV Management</h3>
          <p className="section-subtext">
            Upload your PDF/DOC CV so visitors can view it directly in the browser or download it.
          </p>
        </div>
        {resumeInfo?.exists && (
          <span className="badge-pill active" style={{ alignSelf: "center" }}>
            File Active on Server
          </span>
        )}
      </div>

      <div style={{
        marginTop: "16px",
        padding: "16px",
        background: "#ffffff",
        borderRadius: "8px",
        border: "1px solid var(--lumo-border, #e5e7eb)"
      }}>
        {isLoading ? (
          <p style={{ color: "var(--lumo-text-muted, #6b7280)", margin: 0, fontSize: "14px" }}>Checking resume status...</p>
        ) : resumeInfo?.exists ? (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{
                width: "44px",
                height: "44px",
                borderRadius: "8px",
                background: "#f3e8ff",
                border: "1px solid #e9d5ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#7c3aed",
                fontWeight: "700",
                fontSize: "13px"
              }}>
                PDF
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "15px", color: "var(--lumo-text-dark, #111827)" }}>
                  {resumeInfo.filename}
                </div>
                <div style={{ fontSize: "13px", color: "var(--lumo-text-muted, #6b7280)", marginTop: "2px" }}>
                  {(resumeInfo.size / (1024 * 1024)).toFixed(2)} MB • Updated {new Date(resumeInfo.updatedAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
              <a
                href={viewUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-tiny"
                style={{
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 16px",
                  background: "#7c3aed",
                  color: "#ffffff",
                  borderRadius: "6px",
                  fontSize: "13px",
                  fontWeight: 600,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
                }}
              >
                👁️ View CV in Browser
              </a>

              <a
                href={downloadUrl}
                target="_blank"
                rel="noreferrer"
                download
                className="btn-tiny"
                style={{
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 16px",
                  background: "#ffffff",
                  color: "#1f2937",
                  borderRadius: "6px",
                  fontSize: "13px",
                  fontWeight: 600,
                  border: "1px solid #d1d5db",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
                }}
              >
                ⬇️ Download CV
              </a>

              <label
                className="btn-tiny"
                style={{
                  cursor: isUploading ? "not-allowed" : "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 16px",
                  background: "#ffffff",
                  color: "#1f2937",
                  borderRadius: "6px",
                  fontSize: "13px",
                  fontWeight: 600,
                  border: "1px solid #d1d5db",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
                }}
              >
                {isUploading ? "Uploading..." : "🔄 Replace File"}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  style={{ display: "none" }}
                />
              </label>

              <button
                type="button"
                onClick={handleDelete}
                className="btn-tiny"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 16px",
                  background: "#fef2f2",
                  color: "#dc2626",
                  borderRadius: "6px",
                  fontSize: "13px",
                  fontWeight: 600,
                  border: "1px solid #fecaca",
                  cursor: "pointer"
                }}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p style={{ margin: "0 0 12px 0", color: "var(--lumo-text-muted, #6b7280)", fontSize: "14px" }}>
              No resume file uploaded yet. Upload your PDF so visitors can view or download it directly.
            </p>
            <label
              style={{
                cursor: isUploading ? "not-allowed" : "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 18px",
                background: "#7c3aed",
                color: "#ffffff",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              {isUploading ? "Uploading..." : "📄 Upload Resume (PDF / DOC / DOCX)"}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                disabled={isUploading}
                style={{ display: "none" }}
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

export function ProfileTab({ content, updateContent, notify, token, onSaveToDb, isSaving, isDirty }) {
  const site = content.site || {};
  const hero = content.hero || {};

  const handleSiteChange = (field, value) => {
    updateContent({
      ...content,
      site: { ...site, [field]: value },
    });
  };

  const handleHeroChange = (field, value) => {
    updateContent({
      ...content,
      hero: { ...hero, [field]: value },
    });
  };

  return (
    <div className="admin-tab-content">
      <div className="tab-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h2>Profile & Hero Customization</h2>
          <p className="tab-subtitle">
            Configure your personal identity, hero intro, public contact links, and resume
          </p>
        </div>
        {onSaveToDb && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {isDirty && (
              <span className="dirty-pill" style={{ fontSize: "12px", padding: "4px 10px" }}>
                ● Unsaved Changes
              </span>
            )}
            <button
              type="button"
              className={`lumo-save-action-btn ${isDirty ? "active-dirty" : ""}`}
              onClick={onSaveToDb}
              disabled={isSaving}
              style={{ padding: "8px 20px", fontSize: "14px", borderRadius: "8px" }}
            >
              {isSaving ? "Saving to Database..." : isDirty ? "💾 Save Profile Changes" : "✓ Saved"}
            </button>
          </div>
        )}
      </div>

      <div className="admin-section-card">
        <h3>Hero Intro Section</h3>
        <p className="section-subtext">The first thing visitors see at the top of your portfolio</p>

        <div className="form-row-2">
          <div className="form-group">
            <label>Hero Eyebrow (Small Tag above Title)</label>
            <input
              type="text"
              value={hero.eyebrow || ""}
              onChange={(e) => handleHeroChange("eyebrow", e.target.value)}
              placeholder="e.g. AadityaAcharya"
            />
          </div>
          <div className="form-group">
            <label>Main Headline Title</label>
            <input
              type="text"
              value={hero.title || ""}
              onChange={(e) => handleHeroChange("title", e.target.value)}
              placeholder="e.g. AI Engineer"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Hero Description</label>
          <textarea
            rows="3"
            value={hero.description || ""}
            onChange={(e) => handleHeroChange("description", e.target.value)}
            placeholder="Specializing in machine learning, deep learning, and data science..."
          />
        </div>

        <div className="form-group">
          <label>Profile Image URL or Relative Path (Optional)</label>
          <input
            type="text"
            value={hero.image || ""}
            onChange={(e) => handleHeroChange("image", e.target.value)}
            placeholder="Leave empty for default asset or enter https://..."
          />
        </div>
      </div>

      <div className="admin-section-card">
        <h3>Contact & Identity Information</h3>
        <p className="section-subtext">Used in navigation, footer, and direct contact buttons</p>

        <div className="form-row-2">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={site.name || ""}
              onChange={(e) => handleSiteChange("name", e.target.value)}
              placeholder="e.g. Aaditya Acharya"
            />
          </div>
          <div className="form-group">
            <label>Role / Professional Title</label>
            <input
              type="text"
              value={site.role || ""}
              onChange={(e) => handleSiteChange("role", e.target.value)}
              placeholder="e.g. AI Engineer"
            />
          </div>
        </div>

        <div className="form-row-2">
          <div className="form-group">
            <label>Primary Email</label>
            <input
              type="email"
              value={site.email || ""}
              onChange={(e) => handleSiteChange("email", e.target.value)}
              placeholder="aadityaacharya6882@gmail.com"
            />
          </div>
          <div className="form-group">
            <label>WhatsApp Number (without + or spaces)</label>
            <input
              type="text"
              value={site.whatsapp || ""}
              onChange={(e) => handleSiteChange("whatsapp", e.target.value)}
              placeholder="9741688299"
            />
          </div>
        </div>

        <div className="form-row-2">
          <div className="form-group">
            <label>Resume Public Link or Anchor (Optional Fallback)</label>
            <input
              type="text"
              value={site.resume || ""}
              onChange={(e) => handleSiteChange("resume", e.target.value)}
              placeholder="e.g. /api/resume/download or https://drive.google.com/..."
            />
          </div>
          <div className="form-group">
            <label>Footer Subtitle</label>
            <input
              type="text"
              value={site.footer || ""}
              onChange={(e) => handleSiteChange("footer", e.target.value)}
              placeholder="AI Engineer"
            />
          </div>
        </div>
      </div>

      <ResumeManager token={token} notify={notify} site={site} handleSiteChange={handleSiteChange} />

      <div className="admin-section-card">
        <h3>Social & Developer Profiles</h3>
        <p className="section-subtext">Direct links to your code, research, and professional networks</p>

        <div className="form-row-2">
          <div className="form-group">
            <label>GitHub Profile</label>
            <input
              type="text"
              value={site.github || ""}
              onChange={(e) => handleSiteChange("github", e.target.value)}
              placeholder="https://github.com/aaditya6882"
            />
          </div>
          <div className="form-group">
            <label>LinkedIn Profile</label>
            <input
              type="text"
              value={site.linkedin || ""}
              onChange={(e) => handleSiteChange("linkedin", e.target.value)}
              placeholder="https://www.linkedin.com/in/..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
