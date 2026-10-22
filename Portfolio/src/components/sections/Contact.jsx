import React, { useState } from "react";
import style from "./Contact.module.css";
import { Icon } from "../ui/Icon";

export const Contact = ({ content, site }) => {
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
        `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/contact`,
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
    <section className={`${style.contactSection} motion-reveal`} id="contact">
      <h2 className={style.sectionTitle}>Get In Touch</h2>
      <div className={`${style.contactInfo} motion-reveal`}>
        <h3>Contact Information</h3>
        <p>{content.description}</p>
        <div className={style.links}>
          <a href={`mailto:${site.email}`}><Icon name="mail" size={18} />{site.email}</a>
          <a
            className={style.whatsappLink}
            href={`https://wa.me/${(site.whatsapp || "").replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="whatsapp" size={18} /> WhatsApp
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="github" size={18} /> GitHub
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="linkedin" size={18} /> LinkedIn
          </a>
        </div>
      </div>
      <form className="motion-reveal" onSubmit={handleSubmit}>
        <div className={style.fieldRow}>
          <div className={style.field}>
            <label className={style.name} htmlFor="name">Name</label>
            <input id="name" type="text" name="name" required />
          </div>
          <div className={style.field}>
            <label className={style.name} htmlFor="email">Email</label>
            <input id="email" type="email" name="email" required />
          </div>
        </div>
        <div className={style.field}>
          <label className={style.name} htmlFor="subject">Subject</label>
          <input id="subject" type="text" name="subject" required />
        </div>
        <div className={style.field}>
          <label className={style.name} htmlFor="message">Message</label>
          <textarea id="message" name="message" required></textarea>
        </div>
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
