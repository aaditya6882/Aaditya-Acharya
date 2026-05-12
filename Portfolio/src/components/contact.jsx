import React from "react";
import style from "./contact.module.css";

export const Contact = () => {
  const handleSubmit = (event) => {
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const message = formData.get("message");
    const subjectInput = event.currentTarget.elements._subject;

    subjectInput.value = `${name} - ${message}`;
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
      <form
        action="https://formsubmit.co/aadiyaacharya6882@gmail.com"
        method="POST"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="_subject" value="Portfolio message" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_captcha" value="false" />
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
        <button type="submit">Send Message</button>
      </form>
    </section>
  );
};
