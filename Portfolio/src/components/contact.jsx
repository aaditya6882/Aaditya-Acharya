import React, { useState } from "react";
import style from "./contact.module.css";

export const Contact = () => {
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSending(true);
    setStatus("Sending your message...");

    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    const payload = {
      access_key: "44c15173-094d-4842-8666-1ccd67e113e2",
      name,
      email,
      message,
      subject: `${name} - ${message}`,
      from_name: name,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (result.success) {
        setStatus("Message sent successfully. Thank you!");
        form.reset();
      } else {
        setStatus("Message could not be sent. Please try again.");
      }
    } catch {
      setStatus("Message could not be sent. Please check your connection.");
    } finally {
      setIsSending(false);
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
          <a href="mailto:aadiyaacharya6882@gmail.com">aadiyaacharya6882@gmail.com</a>
          <a href="https://github.com/aaditya6882" target="_blank" rel="noopener noreferrer">
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
        <button type="submit" disabled={isSending}>
          {isSending ? "Sending..." : "Send Message"}
        </button>
        {status && <p className={style.formStatus}>{status}</p>}
      </form>
    </section>
  );
};
