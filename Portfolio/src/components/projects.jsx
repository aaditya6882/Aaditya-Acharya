import React from "react";
import styles from "./project.module.css";

export const Projects = () => {
  const projectList = [
    {
      title: "Vehicle Rental System",
      description:
        "A full-stack vehicle rental system for browsing vehicles, managing rentals, and handling backend data with Express and PostgreSQL.",
      tags: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "PostgreSQL"],
      link: "#contact",
    },
    {
      title: "Classification and Regression",
      description:
        "A machine learning project focused on classification and regression techniques for prediction, evaluation, and data-driven analysis.",
      tags: ["Python", "Machine Learning", "Classification", "Regression"],
      link: "#contact",
    },
    {
      title: "Clinical Appointment System",
      description:
        "A clinical appointment system built with Core PHP, HTML, and CSS to manage patient appointment requests and clinic scheduling workflows.",
      tags: ["Core PHP", "HTML", "CSS", "Web App"],
      link: "#contact",
    },
    {
      title: "To-Do Application",
      description:
        "A full-stack to-do application using Node.js, HTML, CSS, JavaScript, and MongoDB for creating, updating, and organizing tasks.",
      tags: ["Node.js", "JavaScript", "MongoDB", "HTML", "CSS"],
      link: "#contact",
    },
    {
      title: "Weather App",
      description:
        "A real-time weather app that uses the OpenWeatherMap API to show live temperature and weather conditions.",
      tags: ["API", "JavaScript", "UI"],
      link: "#contact",
    },
    {
      title: "Banking System",
      description:
        "A banking system built with Spring Boot, focusing on backend structure, account operations, and reliable transaction logic.",
      tags: ["Java", "Spring Boot", "Backend", "REST APIs"],
      link: "#contact",
    },
    {
      title: "Car Driving",
      description:
        "A Unity 3D driving project built with C# to practice gameplay controls, physics, and scene design.",
      tags: ["Unity", "C#", "3D"],
      link: "#contact",
    },
    {
      title: "Noughts and Crosses",
      description:
        "A Python game where the player competes against the computer, built to practice logic and control flow.",
      tags: ["Python", "Game Logic", "CLI"],
      link: "#contact",
    },
    {
      title: "Caesar Cipher",
      description:
        "A Python encryption and decryption tool that demonstrates string handling and classic cipher logic.",
      tags: ["Python", "Encryption", "Utility"],
      link: "#contact",
    },
  ];

  return (
    <section className={styles.projectsSection} id="projects">
      <p className={styles.eyebrow}>Selected Work</p>
      <h2 className={styles.heading}>
        Projects that show how I learn by building.
      </h2>
      <div className={styles.projectsGrid}>
        {projectList.map((project) => (
          <div key={project.title} className={styles.projectCard}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className={styles.tags}>
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              {project.link.startsWith("#") ? "Ask About It" : "View Project"}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};
