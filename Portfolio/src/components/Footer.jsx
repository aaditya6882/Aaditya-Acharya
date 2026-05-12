import React from "react";
import styles from "./Footert.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Aaditya Acharya. All rights reserved.</p>
      <div className={styles.socials}>
        <a href="https://github.com/aaditya6882" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/aaditya-acharya-b924a0321/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="mailto:aadiyaacharya6882@gmail.com">Email</a>
      </div>
    </footer>
  );
};
