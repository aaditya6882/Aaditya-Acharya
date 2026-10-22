import React, { useState } from "react";

export function ExperienceTab({ content, updateContent, notify }) {
  const experience = content.experience || { items: [] };
  const items = experience.items || [];

  const [editingIndex, setEditingIndex] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const initialForm = {
    period: String(items.length + 1).padStart(2, "0"),
    title: "",
    company: "",
    date: "",
    detail: "",
  };

  const [form, setForm] = useState(initialForm);

  const handleExpField = (field, value) => {
    updateContent({
      ...content,
      experience: { ...experience, [field]: value },
    });
  };

  const handleEdit = (item, index) => {
    setEditingIndex(index);
    setForm({ ...item });
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setForm(initialForm);
    setShowAddForm(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.company.trim()) {
      notify("Job title and company name are required.", "error");
      return;
    }

    let nextItems;
    if (editingIndex !== null) {
      nextItems = items.map((item, idx) => (idx === editingIndex ? { ...form } : item));
      notify(`Updated milestone "${form.title}".`);
    } else {
      nextItems = [...items, { ...form }];
      notify(`Added milestone "${form.title}".`);
    }

    handleExpField("items", nextItems);
    handleCancel();
  };

  const handleDelete = (index) => {
    const target = items[index];
    if (!window.confirm(`Delete "${target.title} at ${target.company}"?`)) return;
    const nextItems = items.filter((_, idx) => idx !== index);
    handleExpField("items", nextItems);
    notify(`Deleted "${target.title}".`);
    if (editingIndex === index) handleCancel();
  };

  const handleMove = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    const nextItems = [...items];
    const [moved] = nextItems.splice(index, 1);
    nextItems.splice(targetIndex, 0, moved);
    handleExpField("items", nextItems);
  };

  return (
    <div className="admin-tab-content">
      <div className="tab-header">
        <div>
          <h2>Work & Leadership Experience</h2>
          <p className="tab-subtitle">
            Manage your career history, organizations, key responsibilities, and accomplishments
          </p>
        </div>
        <div className="tab-header-actions">
          {!showAddForm && (
            <button className="btn-primary" onClick={() => setShowAddForm(true)}>
              + Add Experience
            </button>
          )}
        </div>
      </div>

      <div className="admin-section-card">
        <h3>Section Headings</h3>
        <div className="form-row-2">
          <div className="form-group">
            <label>Section Eyebrow</label>
            <input
              type="text"
              value={experience.eyebrow || ""}
              onChange={(e) => handleExpField("eyebrow", e.target.value)}
              placeholder="Experience"
            />
          </div>
          <div className="form-group">
            <label>Section Title</label>
            <input
              type="text"
              value={experience.title || ""}
              onChange={(e) => handleExpField("title", e.target.value)}
              placeholder="Learning by making the systems real."
            />
          </div>
        </div>
      </div>

      {showAddForm && (
        <div className="card-form-box">
          <div className="card-form-header">
            <h3>{editingIndex !== null ? "Edit Experience" : "Add Experience Entry"}</h3>
            <button className="btn-close" onClick={handleCancel}>
              ✕
            </button>
          </div>
          <form onSubmit={handleSave} className="project-editor-form">
            <div className="form-row-3">
              <div className="form-group">
                <label>Period / Index (e.g. 01)</label>
                <input
                  type="text"
                  placeholder="01"
                  value={form.period}
                  onChange={(e) => setForm({ ...form, period: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Job Title / Role *</label>
                <input
                  type="text"
                  placeholder="AI Engineer"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Company / Organization *</label>
                <input
                  type="text"
                  placeholder="Independent AI Lab"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Date Range</label>
              <input
                type="text"
                placeholder="Dec 2024 - Present"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Role Summary & Achievements</label>
              <textarea
                rows="3"
                placeholder="Designed and implemented machine learning and deep learning systems..."
                value={form.detail}
                onChange={(e) => setForm({ ...form, detail: e.target.value })}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingIndex !== null ? "Save Changes" : "Add Entry"}
              </button>
              <button type="button" className="btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="experience-list">
        {items.length === 0 ? (
          <p className="empty-hint">No experience entries recorded yet.</p>
        ) : (
          items.map((item, idx) => (
            <div key={idx} className="experience-manage-card">
              <div className="exp-left">
                <span className="exp-period">{item.period || `0${idx + 1}`}</span>
              </div>
              <div className="exp-center">
                <div className="exp-header-line">
                  <h4>{item.title}</h4>
                  <span className="exp-company">@ {item.company}</span>
                  <span className="exp-date">({item.date})</span>
                </div>
                <p className="exp-detail">{item.detail}</p>
              </div>
              <div className="exp-actions">
                <button
                  type="button"
                  className="icon-action-btn"
                  disabled={idx === 0}
                  onClick={() => handleMove(idx, -1)}
                  title="Move Up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  className="icon-action-btn"
                  disabled={idx === items.length - 1}
                  onClick={() => handleMove(idx, 1)}
                  title="Move Down"
                >
                  ↓
                </button>
                <button
                  type="button"
                  className="icon-action-btn"
                  onClick={() => handleEdit(item, idx)}
                  title="Edit"
                >
                  ✏️
                </button>
                <button
                  type="button"
                  className="icon-action-btn delete"
                  onClick={() => handleDelete(idx)}
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
