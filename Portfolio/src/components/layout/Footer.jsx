import React from "react";
import styles from "./Footer.module.css";
import { Icon } from "../ui/Icon";

export const Footer = ({ site }) => {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} {site.name}. {site.footer}</p>
      <div className={styles.socials}>
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
        <a href={`mailto:${site.email}`}><Icon name="mail" size={18} /> Email</a>
      </div>
    </footer>
  );
};
