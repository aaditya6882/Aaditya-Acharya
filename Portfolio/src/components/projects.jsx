import React from 'react';
import styles from './Project.module.css';

export const Projects = () => {
  const projectList = [
    {
        title: 'Portfolio Website',
        description: 'A personal portfolio built with React and CSS Modules.',
        link: '#'
    },
    {
        title: 'Weather App',
        description: 'A real-time weather app using OpenWeatherMap API.',
        link: 'https://github.com/aaditya6882/weather-app'
    },
    {
        title: 'Banking System',
        description: 'A simple Banking system using java.',
        link: '#'
    },
    {
        title: 'Car Driving',
        description: 'A simple 3D Application using unity and c#.',
        link: '#'
    },
    {
        title: 'Sikshya Sapana',
        description: 'A simple website using html and css.',
        link: '#'
    },
    {
        title: 'MovieFinder',
        description: 'A simple website using html, css and javaScript to find the movie by searching the name.',
        link: 'https://aaditya6882.github.io/movie-app/'
    },
    {
        title: 'NaughtsAndCrosses',
        description: 'A simple noughts and crosses game using python where player plays with computer',
        link: '#'
    },
    {
        title: 'CeaserCyper',
        description: 'A simple python project where user can encrypt and decrypt message',
        link: '#'
    }
  ];

  return (
    <section className={styles.projectsSection}>
      <h2 className={styles.heading}>Projects</h2>
      <div className={styles.projectsGrid}>
        {projectList.map((project, index) => (
          <div key={index} className={styles.projectCard}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              View Project
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};
