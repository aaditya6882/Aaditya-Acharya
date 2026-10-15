import React, { useState } from "react";
import style from "./Contact.module.css";

export const Contact = () => {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:4000/api"}/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Unable to save your message.");

      setStatus(
        "Thanks. Your message was saved successfully. I will get back to you soon.",
      );
      form.reset();
    } catch (error) {
      setStatus(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={style.contactSection} id="contact">
      <div className={style.contactInfo}>
        <p className={style.eyebrow}>Contact</p>
        <h2>Let us build something useful.</h2>
        <p>
          I am open to project feedback, collaboration, internship
          opportunities, and conversations about web development or data
          science.
        </p>
        <div className={style.links}>
          <a href="mailto:aadiyaacharya6882@gmail.com">
            aadiyaacharya6882@gmail.com
          </a>
          <a
            href={`https://wa.me/${(import.meta.env.VITE_WHATSAPP_NUMBER || "9741688299").replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          <a
            href="https://github.com/aaditya6882"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/aaditya-acharya-b924a0321/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <label className={style.name} htmlFor="name">
          Name
        </label>
        <input id="name" type="text" name="name" required />
        <label className={style.name} htmlFor="email">
          Email
        </label>
        <input id="email" type="email" name="email" required />
        <label className={style.name} htmlFor="message">
          Message
        </label>
        <textarea id="message" name="message" required></textarea>
        <label className={style.name} htmlFor="projectType">
          Project type (optional)
        </label>
        <select id="projectType" name="projectType" defaultValue="">
          <option value="">Select one</option>
          <option value="Web development">Web development</option>
          <option value="Data science or AI">Data science or AI</option>
          <option value="Collaboration">Collaboration</option>
        </select>
        <input
          className={style.honeypot}
          name="website"
          tabIndex="-1"
          autoComplete="off"
          aria-hidden="true"
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Send Message"}
        </button>
        {status && <p className={style.formStatus}>{status}</p>}
      </form>
    </section>
  );
};
