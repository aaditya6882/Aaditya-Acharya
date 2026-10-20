import React, { useState } from "react";
import StyleSheet from "./Navbar.module.css";
import { Icon } from "../ui/Icon";

export const Navbar = ({ site, darkMode, onToggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={StyleSheet.navbar}>
      <a className={StyleSheet.title} href="#home">
        {site.name}
      </a>
      <div className={StyleSheet.controls}>
        <div className={StyleSheet.menu}>
          <button
            className={StyleSheet.menuBtn}
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Icon name="menu" size={24} />
          </button>
          <ul
            className={`${StyleSheet.menuitem} ${isOpen ? StyleSheet.isOpen : ""}`}
            onClick={() => setIsOpen(false)}
          >
            {["about", "experience", "projects", "skills", "contact"].map((item) => (
              <li key={item}>
                <a href={`#${item}`}>{item[0].toUpperCase() + item.slice(1)}</a>
              </li>
            ))}
          </ul>
        </div>
        <a className={StyleSheet.resumeLink} href={site.resume || "#contact"} download>
          Download Resume
        </a>
        <button className={StyleSheet.themeBtn} onClick={onToggleTheme} aria-label="Toggle theme">
          <Icon name={darkMode ? "sun" : "moon"} size={20} />
        </button>
      </div>
    </nav>
  );
};
