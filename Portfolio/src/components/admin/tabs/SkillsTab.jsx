import React, { useState } from "react";

export function SkillsTab({ content, updateContent, notify, onSaveToDb, isSaving, isDirty }) {
  const skills = content.skills || {
    groups: [],
    items: [],
    additional: [],
    education: {},
    certifications: [],
  };

  const [newSkillTag, setNewSkillTag] = useState({});
  const [newAdditionalTag, setNewAdditionalTag] = useState("");
  const [newCert, setNewCert] = useState({ title: "", issuer: "", text: "" });
  const [showAddCert, setShowAddCert] = useState(false);

  const handleSkillsField = (field, value) => {
    updateContent({
      ...content,
      skills: { ...skills, [field]: value },
    });
  };

  // Additional technologies management
  const handleAddAdditional = () => {
    const tag = newAdditionalTag.trim();
    if (!tag) return;
    const currentList = skills.additional || [];
    if (!currentList.includes(tag)) {
      handleSkillsField("additional", [...currentList, tag]);
      if (notify) notify(`Added "${tag}" to Additional Technologies.`);
    }
    setNewAdditionalTag("");
  };

  const handleRemoveAdditional = (index) => {
    const currentList = skills.additional || [];
    const removed = currentList[index];
    const updated = currentList.filter((_, i) => i !== index);
    handleSkillsField("additional", updated);
    if (notify) notify(`Removed "${removed}" from Additional Technologies.`);
  };

  // Group skill management
  const handleAddSkillToGroup = (groupIndex) => {
    const tag = (newSkillTag[groupIndex] || "").trim();
    if (!tag) return;
    const nextGroups = [...(skills.groups || [])];
    const groupItems = nextGroups[groupIndex].items || [];
    if (!groupItems.includes(tag)) {
      nextGroups[groupIndex] = {
        ...nextGroups[groupIndex],
        items: [...groupItems, tag],
      };
      handleSkillsField("groups", nextGroups);
    }
    setNewSkillTag({ ...newSkillTag, [groupIndex]: "" });
  };

  const handleRemoveSkillFromGroup = (groupIndex, itemIndex) => {
    const nextGroups = [...(skills.groups || [])];
    nextGroups[groupIndex] = {
      ...nextGroups[groupIndex],
      items: nextGroups[groupIndex].items.filter((_, i) => i !== itemIndex),
    };
    handleSkillsField("groups", nextGroups);
  };

  // Education management
  const handleEducationChange = (field, value) => {
    handleSkillsField("education", {
      ...(skills.education || {}),
      [field]: value,
    });
  };

  // Certifications management
  const handleAddCert = (e) => {
    e.preventDefault();
    if (!newCert.title.trim()) return;
    const nextCerts = [...(skills.certifications || []), newCert];
    handleSkillsField("certifications", nextCerts);
    setNewCert({ title: "", issuer: "", text: "" });
    setShowAddCert(false);
  };

  const handleRemoveCert = (index) => {
    handleSkillsField(
      "certifications",
      (skills.certifications || []).filter((_, i) => i !== index),
    );
  };

  return (
    <div className="admin-tab-content">
      <div className="tab-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h2>Skills, Education & Certifications</h2>
          <p className="tab-subtitle">
            Manage your technical competencies, categorization, additional technologies, and academic credentials
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
              {isSaving ? "Saving to Database..." : isDirty ? "💾 Save Skills Changes" : "✓ Saved"}
            </button>
          </div>
        )}
      </div>

      <div className="admin-section-card">
        <h3>Section Headings</h3>
        <div className="form-row-2">
          <div className="form-group">
            <label>Section Eyebrow</label>
            <input
              type="text"
              value={skills.eyebrow || ""}
              onChange={(e) => handleSkillsField("eyebrow", e.target.value)}
              placeholder="Technical Skills"
            />
          </div>
          <div className="form-group">
            <label>Section Title</label>
            <input
              type="text"
              value={skills.title || ""}
              onChange={(e) => handleSkillsField("title", e.target.value)}
              placeholder="Tools and technologies I work with."
            />
          </div>
        </div>
      </div>

      <div className="admin-section-card">
        <h3>Category Skill Groups (AI, DEV, DATA, OPS)</h3>
        <p className="section-subtext">The organized skill clusters shown on the skills board</p>

        <div className="skill-groups-edit-grid">
          {(skills.groups || []).map((group, gIdx) => (
            <div key={gIdx} className="skill-group-box">
              <div className="group-header">
                <strong>{group.name}</strong>
                <span className="badge-pill">{group.items?.length || 0} skills</span>
              </div>

              <div className="chip-list">
                {(group.items || []).map((item, iIdx) => (
                  <span key={iIdx} className="skill-chip">
                    {item}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkillFromGroup(gIdx, iIdx)}
                      title="Remove"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>

              <div className="add-chip-row">
                <input
                  type="text"
                  placeholder={`Add to ${group.name}...`}
                  value={newSkillTag[gIdx] || ""}
                  onChange={(e) =>
                    setNewSkillTag({ ...newSkillTag, [gIdx]: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddSkillToGroup(gIdx);
                    }
                  }}
                />
                <button
                  type="button"
                  className="btn-tiny"
                  onClick={() => handleAddSkillToGroup(gIdx)}
                >
                  + Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-section-card">
        <div className="panel-header">
          <div>
            <h3>Additional Technologies</h3>
            <p className="section-subtext">The cloud tags shown at the bottom of the Technical Skills section (e.g. Hugging Face, LangChain, REST APIs)</p>
          </div>
          <span className="badge-pill">{(skills.additional || []).length} technologies</span>
        </div>

        <div className="chip-list" style={{ minHeight: "44px", padding: "10px", background: "var(--lumo-hover-gray, #f9fafb)", borderRadius: "8px", border: "1px solid var(--lumo-border, #e5e7eb)", marginBottom: "14px" }}>
          {(skills.additional || []).length === 0 ? (
            <span style={{ color: "var(--lumo-text-muted, #6b7280)", fontSize: "13px" }}>No additional technologies added yet.</span>
          ) : (
            (skills.additional || []).map((tech, idx) => (
              <span key={idx} className="skill-chip">
                {tech}
                <button
                  type="button"
                  onClick={() => handleRemoveAdditional(idx)}
                  title="Remove"
                >
                  ✕
                </button>
              </span>
            ))
          )}
        </div>

        <div className="add-chip-row" style={{ maxWidth: "420px" }}>
          <input
            type="text"
            placeholder="Add technology (e.g. LangChain, Whisper, Ollama)..."
            value={newAdditionalTag}
            onChange={(e) => setNewAdditionalTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddAdditional();
              }
            }}
          />
          <button
            type="button"
            className="btn-tiny"
            onClick={handleAddAdditional}
          >
            + Add Technology
          </button>
        </div>
      </div>

      <div className="admin-section-card">
        <h3>Education Degree</h3>
        <div className="form-row-2">
          <div className="form-group">
            <label>Eyebrow Tag</label>
            <input
              type="text"
              value={skills.education?.eyebrow || ""}
              onChange={(e) => handleEducationChange("eyebrow", e.target.value)}
              placeholder="Education"
            />
          </div>
          <div className="form-group">
            <label>Degree Title</label>
            <input
              type="text"
              value={skills.education?.title || ""}
              onChange={(e) => handleEducationChange("title", e.target.value)}
              placeholder="BSc, Computer Science"
            />
          </div>
        </div>
        <div className="form-group">
          <label>Institution & Timeline</label>
          <input
            type="text"
            value={skills.education?.text || ""}
            onChange={(e) => handleEducationChange("text", e.target.value)}
            placeholder="Herald College Kathmandu · 2023 — Present"
          />
        </div>
      </div>

      <div className="admin-section-card">
        <div className="panel-header">
          <div>
            <h3>Professional Certifications</h3>
            <p className="section-subtext">Issued by DataCamp, DeepLearning.AI, Coursera, etc.</p>
          </div>
          {!showAddCert && (
            <button className="btn-secondary" onClick={() => setShowAddCert(true)}>
              + Add Certification
            </button>
          )}
        </div>

        {showAddCert && (
          <form onSubmit={handleAddCert} className="sub-edit-card cert-form">
            <div className="form-row-2">
              <div className="form-group">
                <label>Certificate Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Supervised Machine Learning"
                  value={newCert.title}
                  onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Issuing Organization</label>
                <input
                  type="text"
                  placeholder="e.g. DataCamp"
                  value={newCert.issuer}
                  onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Skills / Topics Covered</label>
              <textarea
                rows="2"
                placeholder="Classification, regression, evaluation metrics..."
                value={newCert.text}
                onChange={(e) => setNewCert({ ...newCert, text: e.target.value })}
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                Add to List
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setShowAddCert(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="cards-edit-grid">
          {(skills.certifications || []).map((cert, idx) => (
            <div key={idx} className="sub-edit-card">
              <div className="card-top-action">
                <span className="badge-pill">{cert.issuer || "Certificate"}</span>
                <button
                  type="button"
                  className="btn-tiny delete"
                  onClick={() => handleRemoveCert(idx)}
                  title="Delete"
                >
                  ✕
                </button>
              </div>
              <h4>{cert.title}</h4>
              <p className="card-subtext">{cert.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
