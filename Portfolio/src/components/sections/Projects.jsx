import React from "react";
import styles from "./Projects.module.css";

export const Projects = () => {
  const projectList = [
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
    <section className={styles.projectsSection} id="projects">
      <p className={styles.eyebrow}>Portfolio</p>
      <h2 className={styles.heading}>Selected Projects</h2>
      <div className={styles.projectsGrid}>
        {projectList.map((project, index) => (
          <div
            key={project.title}
            className={`${styles.projectCard} ${styles[`project${index + 1}`]}`}
          >
            <span className={styles.projectNumber}>0{index + 1}</span>
            <div
              className={`${styles.projectVisual} ${styles[`tone${index + 1}`]}`}
            >
              <span>{project.format}</span>
              <strong>{project.visual}</strong>
            </div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className={styles.tags}>
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              {project.link.startsWith("#")
                ? "Ask About It ->"
                : "View Project ->"}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};
