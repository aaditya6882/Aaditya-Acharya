import React, { useState } from "react";
import { defaultContent } from "../../../data/content";

export function JsonEditorTab({ content, updateContent, notify }) {
  const [jsonText, setJsonText] = useState(() =>
    JSON.stringify(content, null, 2),
  );
  const [jsonError, setJsonError] = useState("");

  const handleTextChange = (e) => {
    const val = e.target.value;
    setJsonText(val);
    try {
      JSON.parse(val);
      setJsonError("");
    } catch (err) {
      setJsonError(err.message);
    }
  };

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonText(JSON.stringify(parsed, null, 2));
      setJsonError("");
      notify("JSON formatted successfully.");
    } catch (err) {
      setJsonError(err.message);
      notify("Cannot format invalid JSON.", "error");
    }
  };

  const handleApply = () => {
    try {
      const parsed = JSON.parse(jsonText);
      updateContent(parsed);
      setJsonError("");
      notify("JSON content applied to portfolio.");
    } catch (err) {
      setJsonError(err.message);
      notify("Fix JSON syntax errors before applying.", "error");
    }
  };

  const handleResetToDefaults = () => {
    if (
      !window.confirm(
        "Are you sure you want to restore the default initial portfolio structure?",
      )
    )
      return;
    setJsonText(JSON.stringify(defaultContent, null, 2));
    updateContent(defaultContent);
    setJsonError("");
    notify("Restored default content structure.");
  };

  return (
    <div className="admin-tab-content">
      <div className="tab-header">
        <div>
          <h2>Advanced Raw JSON Editor</h2>
          <p className="tab-subtitle">
            Direct schema-level access to the full content payload stored in MongoDB
          </p>
        </div>
        <div className="tab-header-actions">
          <button className="btn-secondary" onClick={handleFormat}>
            ✨ Prettify JSON
          </button>
          <button className="btn-secondary" onClick={handleResetToDefaults}>
            ↺ Reset Defaults
          </button>
          <button className="btn-primary" onClick={handleApply}>
            Apply JSON
          </button>
        </div>
      </div>

      {jsonError && (
        <div className="alert-box error">
          <strong>Syntax Error:</strong> {jsonError}
        </div>
      )}

      <div className="json-editor-wrapper">
        <textarea
          className="code-editor-textarea"
          value={jsonText}
          onChange={handleTextChange}
          spellCheck="false"
        />
      </div>
    </div>
  );
}
