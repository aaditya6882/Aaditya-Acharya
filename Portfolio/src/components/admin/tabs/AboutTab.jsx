import React from "react";

export function AboutTab({ content, updateContent }) {
  const about = content.about || { paragraphs: [], cards: [] };
  const expertise = content.expertise || { items: [] };

  const handleAboutField = (field, value) => {
    updateContent({
      ...content,
      about: { ...about, [field]: value },
    });
  };

  const handleParagraphChange = (index, value) => {
    const nextParagraphs = [...(about.paragraphs || [])];
    nextParagraphs[index] = value;
    handleAboutField("paragraphs", nextParagraphs);
  };

  const handleAddParagraph = () => {
    handleAboutField("paragraphs", [...(about.paragraphs || []), ""]);
  };

  const handleRemoveParagraph = (index) => {
    handleAboutField(
      "paragraphs",
      about.paragraphs.filter((_, i) => i !== index),
    );
  };

  const handleCardChange = (index, field, value) => {
    const nextCards = [...(about.cards || [])];
    nextCards[index] = { ...nextCards[index], [field]: value };
    handleAboutField("cards", nextCards);
  };

  const handleExpertiseField = (field, value) => {
    updateContent({
      ...content,
      expertise: { ...expertise, [field]: value },
    });
  };

  const handleExpertiseItemChange = (index, field, value) => {
    const nextItems = [...(expertise.items || [])];
    nextItems[index] = { ...nextItems[index], [field]: value };
    handleExpertiseField("items", nextItems);
  };

  return (
    <div className="admin-tab-content">
      <div className="tab-header">
        <div>
          <h2>About & Key Expertise</h2>
          <p className="tab-subtitle">
            Craft your personal story, educational focus, and key value propositions
          </p>
        </div>
      </div>

      <div className="admin-section-card">
        <h3>About Me Section</h3>
        <p className="section-subtext">Detailed narrative and focus highlights</p>

        <div className="form-row-2">
          <div className="form-group">
            <label>Section Eyebrow</label>
            <input
              type="text"
              value={about.eyebrow || ""}
              onChange={(e) => handleAboutField("eyebrow", e.target.value)}
              placeholder="About Me"
            />
          </div>
          <div className="form-group">
            <label>Section Title</label>
            <input
              type="text"
              value={about.title || ""}
              onChange={(e) => handleAboutField("title", e.target.value)}
              placeholder="Curious, practical, and always building."
            />
          </div>
        </div>

        <div className="form-group">
          <label>Bio / Journey Paragraphs</label>
          {(about.paragraphs || []).map((paragraph, idx) => (
            <div key={idx} className="item-row">
              <textarea
                rows="2"
                value={paragraph}
                onChange={(e) => handleParagraphChange(idx, e.target.value)}
                placeholder={`Paragraph ${idx + 1}...`}
              />
              <button
                type="button"
                className="btn-tiny delete"
                onClick={() => handleRemoveParagraph(idx)}
                title="Remove paragraph"
              >
                ✕
              </button>
            </div>
          ))}
          <button type="button" className="btn-secondary" onClick={handleAddParagraph}>
            + Add Another Paragraph
          </button>
        </div>

        <div className="form-group" style={{ marginTop: "24px" }}>
          <label>Highlight Cards (Appears alongside bio)</label>
          <div className="cards-edit-grid">
            {(about.cards || []).map((card, idx) => (
              <div key={idx} className="sub-edit-card">
                <span className="card-badge">Card #{idx + 1}</span>
                <input
                  type="text"
                  placeholder="Card Title (e.g. Student)"
                  value={card.title || ""}
                  onChange={(e) => handleCardChange(idx, "title", e.target.value)}
                />
                <textarea
                  rows="2"
                  placeholder="Card Description..."
                  value={card.text || ""}
                  onChange={(e) => handleCardChange(idx, "text", e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="admin-section-card">
        <h3>Key Expertise Section</h3>
        <p className="section-subtext">The 3 core domains of your specialized services</p>

        <div className="form-row-2">
          <div className="form-group">
            <label>Expertise Eyebrow</label>
            <input
              type="text"
              value={expertise.eyebrow || ""}
              onChange={(e) => handleExpertiseField("eyebrow", e.target.value)}
              placeholder="Key Expertise"
            />
          </div>
          <div className="form-group">
            <label>Expertise Title</label>
            <input
              type="text"
              value={expertise.title || ""}
              onChange={(e) => handleExpertiseField("title", e.target.value)}
              placeholder="Turning complex ideas into useful products."
            />
          </div>
        </div>

        <div className="cards-edit-grid">
          {(expertise.items || []).map((item, idx) => (
            <div key={idx} className="sub-edit-card">
              <span className="card-badge">Expertise #{idx + 1}</span>
              <input
                type="text"
                placeholder="Domain Title (e.g. AI Engineer)"
                value={item.title || ""}
                onChange={(e) => handleExpertiseItemChange(idx, "title", e.target.value)}
              />
              <textarea
                rows="3"
                placeholder="Value proposition and outcome..."
                value={item.text || ""}
                onChange={(e) => handleExpertiseItemChange(idx, "text", e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
