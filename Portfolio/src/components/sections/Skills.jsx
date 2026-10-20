import React from "react";
import styles from "./Skills.module.css";

export const Skills = ({ content }) => {
  return (
    <section className={`${styles.skillsSection} motion-reveal`} id="skills">
      <div className={styles.sectionHeader}>
        <h2>Technical Skills</h2>
      </div>
      <div className={styles.content}>
        {(content.groups || []).map((group, index) => <div className={`${styles.skillGroup} motion-reveal`} style={{ "--motion-delay": `${index * 80}ms` }} key={group.name}>
          <h3><span className={styles.groupMark}>{group.name}</span>{{
            AI: "AI & Machine Learning",
            DEV: "Programming & Frameworks",
            DATA: "Data Science & Analytics",
            OPS: "MLOps & Integration",
          }[group.name] || group.name}</h3>
          <div>{group.items.map((item) => <span key={item}>{item}</span>)}</div>
        </div>)}
      </div>
      <div className={styles.additional}>
        <h3>Additional Technologies</h3>
        <div className={styles.skillCloud}>{(content.additional || []).map((skill) => <span key={skill}>{skill}</span>)}</div>
      </div>
    </section>
  );
};
