import React, { useState } from "react";
import { adminApi } from "../api";

export function SecurityTab({ token, adminEmail, notify }) {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.currentPassword || !form.newPassword) {
      notify("Please fill in both current and new passwords.", "error");
      return;
    }
    if (form.newPassword.length < 6) {
      notify("New password must be at least 6 characters.", "error");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      notify("New password and confirmation do not match.", "error");
      return;
    }

    try {
      setLoading(true);
      await adminApi.changePassword(token, form.currentPassword, form.newPassword);
      notify("Password updated successfully!");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      notify(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-tab-content">
      <div className="tab-header">
        <div>
          <h2>Account & Security Settings</h2>
          <p className="tab-subtitle">
            Manage your credentials and access permissions
          </p>
        </div>
      </div>

      <div className="admin-section-card">
        <h3>Authenticated Admin Account</h3>
        <div className="info-badge-row">
          <div className="account-avatar">🔐</div>
          <div>
            <strong>{adminEmail || "Admin User"}</strong>
            <p className="account-role">Full Administrator · MongoDB Backed</p>
          </div>
        </div>
      </div>

      <div className="admin-section-card">
        <h3>Change Password</h3>
        <p className="section-subtext">
          Use a strong combination of letters, numbers, and symbols
        </p>

        <form onSubmit={handleSubmit} className="security-form">
          <div className="form-group">
            <label>Current Password *</label>
            <input
              type="password"
              placeholder="Enter current password"
              value={form.currentPassword}
              onChange={(e) =>
                setForm({ ...form, currentPassword: e.target.value })
              }
              required
            />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>New Password *</label>
              <input
                type="password"
                placeholder="Minimum 6 characters"
                value={form.newPassword}
                onChange={(e) =>
                  setForm({ ...form, newPassword: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm New Password *</label>
              <input
                type="password"
                placeholder="Re-type new password"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
