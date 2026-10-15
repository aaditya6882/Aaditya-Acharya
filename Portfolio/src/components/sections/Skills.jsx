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
  "Web Development",
  "Problem Solving",
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
      </div>
      <div className={styles.education} id="education">
        <p className={styles.eyebrow}>Education</p>
        <h3>BSc Computer Science</h3>
        <p>
          Herald College Kathmandu. Building a foundation in software
          engineering, data, and systems while learning through practical work.
        </p>
      </div>
    </section>
  );
};
