import React, { useState } from "react";
import StyleSheet from "./navbar.module.css";
import menuIcon from "../../src/assets/Nav/menu.png";
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className={StyleSheet.navbar}>
      <a className={StyleSheet.title} href="/">
        Portfolio
      </a>
      <div className={StyleSheet.menu}>
        <img
          src={menuIcon}
          className={StyleSheet.menuBtn}
          onClick={() => setIsOpen(!isOpen)}
        />
        <ul
          className={`${StyleSheet.menuitem} ${isOpen && StyleSheet.isOpen}`}
          onClick={() => setIsOpen(false)}
        >
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="#experience">Experience</a>
          </li>
          <li>
            <a href="/projects">Projects</a>
          </li>
          <li>
            <a href="/contact">Contacts</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
