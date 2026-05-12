import React from "react";
import Stylesheet from "./Hero.module.css";
import aaditya from "../../src/assets/hero/Aaditya.png";

export const Hero = () => {
  return (
    <section className={Stylesheet.hero} id="home">
      <div className={Stylesheet.heroText}>
        <p className={Stylesheet.eyebrow}>Computer Science Student</p>
        <h1 className={Stylesheet.Name}>Hi, I am Aaditya Acharya.</h1>
        <p className={Stylesheet.description}>
          I build clean web apps, explore data science, and keep turning ideas
          into useful projects with React, Python, Java, and C#.
        </p>
        <div className={Stylesheet.actions}>
          <a href="#projects" className={Stylesheet.primaryBtn}>
            View Projects
          </a>
          <a href="#contact" className={Stylesheet.secondaryBtn}>
            Contact Me
          </a>
        </div>
        <div className={Stylesheet.stats} aria-label="Portfolio highlights">
          <span>
            <strong>8+</strong>
            Projects
          </span>
          <span>
            <strong>4</strong>
            Tech Areas
          </span>
          <span>
            <strong>BSc</strong>
            CS Student
          </span>
        </div>
      </div>
      <div className={Stylesheet.imageWrap}>
        <img
          src={aaditya}
          alt="Aaditya Acharya"
          className={Stylesheet.aaditya}
        />
      </div>
    </section>
  );
};
