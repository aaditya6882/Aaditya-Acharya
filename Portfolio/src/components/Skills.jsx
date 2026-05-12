import React from "react";
import styles from "./Skills.module.css";

const skills = [
  "React",
  "Node.js",
  "REST APIs",
  "Express.js",
  "MongoDB",
  "PostgreSQL",
  "JavaScript",
  "HTML",
  "CSS",
  "Python",
  "Java",
  "C",
  "Unity",
  "Data Science",
  "Problem Solving",
];

const timeline = [
  {
    title: "BSc Computer Science",
    detail:
      "Herald College student building a foundation in software, data, and systems.",
  },
  {
    title: "Project-Based Learning",
    detail:
      "Created web apps, Python utilities, Java programs, and Unity experiments.",
  },
  {
    title: "Next Focus",
    detail:
      "Growing deeper in data science, APIs, polished UI, and real-world teamwork.",
  },
];

export const Skills = () => {
  return (
    <section className={styles.skillsSection} id="skills">
      <div className={styles.sectionHeader}>
        <p className={styles.eyebrow}>Skills & Journey</p>
        <h2>Technologies I use to turn ideas into working projects.</h2>
      </div>
      <div className={styles.content}>
        <div className={styles.skillCloud}>
          {skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
        <div className={styles.timeline}>
          {timeline.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
