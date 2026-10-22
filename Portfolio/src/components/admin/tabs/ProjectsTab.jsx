import React, { useState, useRef } from "react";
import { adminApi } from "../api";

export function ProjectsTab({ content, updateContent, notify, token }) {
  const projects = content.projects || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // all, published, draft, featured
  const [editingIndex, setEditingIndex] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const imageInputRef = useRef(null);

  const initialForm = {
    title: "",
    format: "AI project",
    visual: "",
    image: "",
    description: "",
    tags: "",
    link: "",
    featured: false,
    published: true,
  };

  const [form, setForm] = useState(initialForm);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      notify("Image file size must be less than 5 MB.", "error");
      return;
    }

    setIsUploadingImage(true);
    try {
      const data = await adminApi.uploadProjectImage(token, file);
      // Construct full backend image URL or relative path
      const backendBase = import.meta.env.VITE_API_URL?.replace(/\/api$/, "") || "http://localhost:5000";
      const fullUrl = data.url.startsWith("http") ? data.url : `${backendBase}${data.url}`;
      setForm((prev) => ({ ...prev, image: fullUrl }));
      notify("Project image uploaded successfully!", "success");
    } catch (err) {
      notify(err.message || "Failed to upload image.", "error");
    } finally {
      setIsUploadingImage(false);
      if (imageInputRef.current) imageInputRef.current.value = "";
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.description || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.tags || []).some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;
    if (filter === "published") return project.published !== false;
    if (filter === "draft") return project.published === false;
    if (filter === "featured") return project.featured;
    return true;
  });

  const handleEdit = (project, index) => {
    setEditingIndex(index);
    setForm({
      title: project.title || "",
      format: project.format || "AI project",
      visual: project.visual || "",
      image: project.image || "",
      description: project.description || "",
      tags: Array.isArray(project.tags) ? project.tags.join(", ") : project.tags || "",
      link: project.link || "",
      featured: Boolean(project.featured),
      published: project.published !== false,
    });
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setForm(initialForm);
    setShowAddForm(false);
  };

  const handleSaveProject = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      notify("Title and description are required.", "error");
      return;
    }

    const tagsArray = form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const projectData = {
      title: form.title.trim(),
      format: form.format.trim() || "Project",
      visual: form.visual.trim() || form.title.trim(),
      image: form.image.trim(),
      description: form.description.trim(),
      tags: tagsArray,
      link: form.link.trim() || "#",
      featured: form.featured,
      published: form.published,
    };

    let nextProjects;
    if (editingIndex !== null) {
      nextProjects = projects.map((p, i) => (i === editingIndex ? projectData : p));
      notify(`Project "${projectData.title}" updated.`);
    } else {
      nextProjects = [...projects, projectData];
      notify(`Project "${projectData.title}" added.`);
    }

    updateContent({ ...content, projects: nextProjects });
    handleCancel();
  };

  const handleDelete = (index) => {
    const target = projects[index];
    if (!window.confirm(`Are you sure you want to delete "${target.title}"?`)) return;
    const next = projects.filter((_, i) => i !== index);
    updateContent({ ...content, projects: next });
    notify(`Deleted "${target.title}".`);
    if (editingIndex === index) handleCancel();
  };

  const handleToggle = (index, field) => {
    const next = projects.map((p, i) =>
      i === index ? { ...p, [field]: !p[field] } : p,
    );
    updateContent({ ...content, projects: next });
  };

  return (
    <div className="admin-tab-content">
      <div className="tab-header">
        <div>
          <h2>Projects Management</h2>
          <p className="tab-subtitle">
            Create, edit, showcase, and publish projects on your portfolio
          </p>
        </div>
        <div className="tab-header-actions">
          {!showAddForm && (
            <button className="btn-primary" onClick={() => setShowAddForm(true)}>
              + Add New Project
            </button>
          )}
        </div>
      </div>

      {showAddForm && (
        <div className="card-form-box">
          <div className="card-form-header">
            <h3>{editingIndex !== null ? "Edit Project" : "Add New Project"}</h3>
            <button className="btn-close" onClick={handleCancel}>
              ✕
            </button>
          </div>
          <form onSubmit={handleSaveProject} className="project-editor-form">
            <div className="form-row-2">
              <div className="form-group">
                <label>Project Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Vehicle Rental System"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Format / Category Badge</label>
                <input
                  type="text"
                  placeholder="e.g. Web system / 01"
                  value={form.format}
                  onChange={(e) => setForm({ ...form, format: e.target.value })}
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>Visual Tag</label>
                <input
                  type="text"
                  placeholder="e.g. Rental flow, Dashboard"
                  value={form.visual}
                  onChange={(e) => setForm({ ...form, visual: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Project Link (GitHub or Live Demo URL)</label>
                <input
                  type="text"
                  placeholder="https://github.com/..."
                  value={form.link}
                  onChange={(e) => setForm({ ...form, link: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Project Cover Image (Upload or Image URL)</label>
              <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                <input
                  type="text"
                  style={{ flex: "1 1 240px" }}
                  placeholder="https://... or upload below"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                />
                <label
                  className="btn-tiny"
                  style={{
                    cursor: isUploadingImage ? "not-allowed" : "pointer",
                    padding: "9px 16px",
                    background: "rgba(124, 58, 237, 0.15)",
                    color: "#a855f7",
                    border: "1px solid rgba(124, 58, 237, 0.3)",
                    borderRadius: "6px",
                    fontWeight: 600,
                    fontSize: "13px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  {isUploadingImage ? "Uploading..." : "📷 Upload Image"}
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    disabled={isUploadingImage}
                    style={{ display: "none" }}
                  />
                </label>
                {form.image && (
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, image: "" })}
                    className="btn-tiny"
                    style={{
                      padding: "9px 12px",
                      background: "rgba(239, 68, 68, 0.15)",
                      color: "#f87171",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                      borderRadius: "6px",
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                  >
                    ✕ Remove Image
                  </button>
                )}
              </div>
              <p style={{ margin: "6px 0 0", fontSize: "12px", color: "var(--text-muted, #94a3b8)" }}>
                Leave empty to display the stylish gradient banner with tech icon.
              </p>
              {form.image && (
                <div style={{ marginTop: "10px", width: "160px", height: "90px", borderRadius: "6px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <img src={form.image} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Technologies & Tags (comma-separated)</label>
              <input
                type="text"
                placeholder="Python, TensorFlow, React, FastAPI, Docker"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
              />
              {form.tags && (
                <div className="tag-preview">
                  {form.tags
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean)
                    .map((t, idx) => (
                      <span key={idx} className="tag-chip">
                        {t}
                      </span>
                    ))}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Project Description *</label>
              <textarea
                rows="4"
                placeholder="Detailed summary of the architecture, key highlights, and outcome..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              />
            </div>

            <div className="form-checks-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                />
                <span>Published (Visible on site)</span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                />
                <span>⭐ Featured Project (Highlighted on top)</span>
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingIndex !== null ? "Save Changes" : "Create Project"}
              </button>
              <button type="button" className="btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="table-controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search projects by title, tech, or keywords..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="filter-pills">
          <button
            className={`filter-pill ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All ({projects.length})
          </button>
          <button
            className={`filter-pill ${filter === "published" ? "active" : ""}`}
            onClick={() => setFilter("published")}
          >
            Published ({projects.filter((p) => p.published !== false).length})
          </button>
          <button
            className={`filter-pill ${filter === "draft" ? "active" : ""}`}
            onClick={() => setFilter("draft")}
          >
            Drafts ({projects.filter((p) => p.published === false).length})
          </button>
          <button
            className={`filter-pill ${filter === "featured" ? "active" : ""}`}
            onClick={() => setFilter("featured")}
          >
            Featured ({projects.filter((p) => p.featured).length})
          </button>
        </div>
      </div>

      <div className="projects-grid">
        {filteredProjects.length === 0 ? (
          <div className="empty-state">
            <p>No projects match your filter.</p>
          </div>
        ) : (
          filteredProjects.map((project, idx) => {
            const originalIndex = projects.findIndex((p) => p === project);
            return (
              <div
                key={originalIndex}
                className={`project-manage-card ${project.published === false ? "is-draft" : ""} ${
                  project.featured ? "is-featured" : ""
                }`}
              >
                <div className="project-card-header">
                  <div className="project-badges">
                    <span className="badge-format">{project.format || "Project"}</span>
                    {project.featured && <span className="badge-featured">⭐ Featured</span>}
                    {project.published === false ? (
                      <span className="badge-draft">Draft</span>
                    ) : (
                      <span className="badge-live">● Live</span>
                    )}
                  </div>
                  <div className="project-actions-quick">
                    <button
                      title="Edit"
                      className="icon-action-btn"
                      onClick={() => handleEdit(project, originalIndex)}
                    >
                      ✏️
                    </button>
                    <button
                      title="Delete"
                      className="icon-action-btn delete"
                      onClick={() => handleDelete(originalIndex)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>

                <div className="project-tags-list">
                  {(project.tags || []).map((tag, tIdx) => (
                    <span key={tIdx} className="tag-chip">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="project-card-footer">
                  <div className="toggle-group">
                    <button
                      className={`btn-toggle ${project.published !== false ? "active" : ""}`}
                      onClick={() => handleToggle(originalIndex, "published")}
                    >
                      {project.published !== false ? "Live" : "Draft"}
                    </button>
                    <button
                      className={`btn-toggle ${project.featured ? "active" : ""}`}
                      onClick={() => handleToggle(originalIndex, "featured")}
                    >
                      {project.featured ? "⭐ Featured" : "Feature"}
                    </button>
                  </div>
                  {project.link && project.link !== "#" && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="project-link-btn"
                    >
                      Visit ↗
                    </a>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
