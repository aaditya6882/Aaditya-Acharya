import React from "react";

export function VisibilityTab({ content, updateContent }) {
  const visibility = content.visibility || {
    about: true,
    experience: true,
    projects: true,
    skills: true,
    education: true,
    contact: true,
  };

  const handleToggle = (section) => {
    updateContent({
      ...content,
      visibility: {
        ...visibility,
        [section]: !visibility[section],
      },
    });
  };

  const sections = [
    {
      id: "about",
      name: "About Me & Highlights",
      desc: "Shows your bio paragraphs and highlight cards.",
    },
    {
      id: "experience",
      name: "Work & Leadership Experience",
      desc: "Displays your career timeline and past roles.",
    },
    {
      id: "projects",
      name: "Featured Projects Gallery",
      desc: "Exhibits all published projects and demo links.",
    },
    {
      id: "skills",
      name: "Technical Skills Matrix",
      desc: "Shows the AI, DEV, DATA, and OPS skill groups.",
    },
    {
      id: "education",
      name: "Education & Certifications",
      desc: "Renders university degree and verified certificates.",
    },
    {
      id: "contact",
      name: "Interactive Contact Section",
      desc: "Renders the message form and direct social contact channels.",
    },
  ];

  return (
    <div className="admin-tab-content">
      <div className="tab-header">
        <div>
          <h2>Section Visibility Controls</h2>
          <p className="tab-subtitle">
            Turn portfolio sections on or off without deleting any of your data
          </p>
        </div>
      </div>

      <div className="visibility-grid">
        {sections.map((sec) => {
          const isVisible = visibility[sec.id] !== false;
          return (
            <div
              key={sec.id}
              className={`visibility-card ${isVisible ? "is-active" : "is-hidden"}`}
              onClick={() => handleToggle(sec.id)}
            >
              <div className="visibility-info">
                <h4>{sec.name}</h4>
                <p>{sec.desc}</p>
              </div>
              <div className="switch-container">
                <span className={`switch-pill ${isVisible ? "on" : "off"}`}>
                  <span className="switch-thumb" />
                </span>
                <span className="switch-label">{isVisible ? "Visible" : "Hidden"}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
