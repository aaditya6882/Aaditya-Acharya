import React from "react";
import styles from "./Projects.module.css";
import { Icon } from "../ui/Icon";

export const Projects = ({ projects }) => {
  const projectList = projects || [];

  return (
    <section className={`${styles.projectsSection} motion-reveal`} id="projects">
      <h2 className={styles.heading}>Featured Projects</h2>
      <div className={styles.projectsGrid}>
        {projectList.map((project, index) => (
          <div
            key={project.title}
            style={{ "--motion-delay": `${index * 90}ms` }}
            className={`${styles.projectCard} motion-reveal ${styles[`project${index + 1}`]}`}
          >
            <div className={styles.cardHeader}>
              <h3>{project.title}</h3>
              <p className={styles.subtitle}>{project.visual || project.format}</p>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.projectVisual}>
                {project.image ? (
                  <>
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                    />
                    <div className={styles.visualOverlay} />
                  </>
                ) : (
                  <div className={styles.fallbackBanner}>
                    <div className={styles.fallbackPattern} />
                    <div className={styles.fallbackIconBadge}>
                      <Icon name="code" size={26} />
                    </div>
                    <span className={styles.fallbackVisualTag}>
                      {project.visual || project.format || "Software Project"}
                    </span>
                    <span className={styles.fallbackTitle}>{project.title}</span>
                  </div>
                )}
              </div>
              <p>{project.description}</p>
              <div className={styles.tags}>
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <div className={styles.cardFooter}>
              <a href={project.link || "#contact"} target={project.link && project.link !== "#" ? "_blank" : undefined} rel="noopener noreferrer">
                <Icon name="external" size={16} />
                <span>View Project</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
