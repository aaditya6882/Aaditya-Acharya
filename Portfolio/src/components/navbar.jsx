import React, { useState } from "react";
import StyleSheet from "./navbar.module.css";
import menuIcon from "../../src/assets/Nav/menu.png";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={StyleSheet.navbar}>
      <a className={StyleSheet.title} href="#home">
        Aaditya Acharya
      </a>
      <div className={StyleSheet.menu}>
        <button
          className={StyleSheet.menuBtn}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          <img src={menuIcon} alt="" />
        </button>
        <ul
          className={`${StyleSheet.menuitem} ${isOpen ? StyleSheet.isOpen : ""}`}
          onClick={() => setIsOpen(false)}
        >
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#skills">Skills</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
