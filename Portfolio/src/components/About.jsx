import React from "react";
import aaditya from "../../src/assets/hero/Aaditya.png";
import Stylesheet from "./About.module.css";

export const About = () => {
  return (
    <section className={Stylesheet.section} id="about">
      <div className={Stylesheet.about}>
        <div className={Stylesheet.sectionHeader}>
          <p className={Stylesheet.eyebrow}>About Me</p>
          <h2 className={Stylesheet.head}>
            Curious, practical, and always building.
          </h2>
        </div>
        <div className={Stylesheet.aboutText}>
          <img src={aaditya} alt="Aaditya" className={Stylesheet.image} />
          <div className={Stylesheet.text}>
            <div className={Stylesheet.aboutCard}>
              <h3>Student</h3>
              <p>
                I am studying BSc Computer Science at Herald College and
                developing a strong foundation in programming, systems, and
                problem solving.
              </p>
            </div>
            <div className={Stylesheet.aboutCard}>
              <h3>Data Science Focus</h3>
              <p>
                I enjoy working with data, finding patterns, and learning how
                models and visualizations can support better decisions.
              </p>
            </div>
            <div className={Stylesheet.aboutCard}>
              <h3>Builder Mindset</h3>
              <p>
                From websites to games and Python tools, I like creating
                projects that are simple to use and improve with every version.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
