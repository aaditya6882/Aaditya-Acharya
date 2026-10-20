import React from "react";
import styles from "./Projects.module.css";
import { Icon } from "../ui/Icon";

export const Projects = ({ projects }) => {
  const projectList = projects || [
    {
      title: "Vehicle Rental System",
      format: "Web system / 01",
      visual: "Rental flow",
      description:
        "A full-stack vehicle rental system for browsing vehicles, managing rentals, and handling backend data with Express and PostgreSQL.",
      tags: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "PostgreSQL"],
      link: "https://github.com/Ishuvgiri/Collab-development-main-project-",
    },
    {
      title: "Clinical Appointment System",
      format: "PHP application / 02",
      visual: "Appointment flow",
      description:
        "A clinical appointment system built with Core PHP, HTML, and CSS to manage patient appointment requests and clinic scheduling workflows.",
      tags: ["Core PHP", "HTML", "CSS", "Web App"],
      link: "https://github.com/aaditya6882/fullStack",
    },
    {
      title: "To-Do Application",
      format: "Productivity tool / 03",
      visual: "Task board",
      description:
        "A full-stack to-do application using Node.js, HTML, CSS, JavaScript, and MongoDB for creating, updating, and organizing tasks.",
      tags: ["Node.js", "JavaScript", "MongoDB", "HTML", "CSS"],
      link: "https://todo.acharyaaaditya.com.np",
    },
    {
      title: "Banking System",
      format: "Java backend / 04",
      visual: "Account service",
      description:
        "A banking system built with Spring Boot, focusing on backend structure, account operations, and reliable transaction logic.",
      tags: ["Java", "Spring Boot", "Backend", "REST APIs"],
      link: "https://github.com/aaditya6882/SpringBootBankingApplication",
    },
    {
      title: "HelpDesk",
      format: "Support platform / 05",
      visual: "Ticket workspace",
      description:
        "A helpdesk system for managing and tracking support tickets with a user-friendly interface and efficient workflow management.",
      tags: ["MongoDB", "React", "Node.js", "Express"],
      link: "https://helpdesk.acharyaaaditya.com.np",
    },
  ];

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
                <img
                  src={project.image || "/placeholder.svg?height=240&width=400"}
                  alt={project.title}
                />
                <div className={styles.visualOverlay} />
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
