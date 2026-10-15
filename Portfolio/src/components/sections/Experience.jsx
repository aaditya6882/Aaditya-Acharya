import styles from "./Experience.module.css";

const experience = [
  {
    period: "01",
    title: "Project-based development",
    detail:
      "Building web applications, APIs, Python utilities, Java programs, and Unity experiments to turn coursework into working software.",
  },
  {
    period: "02",
    title: "Full-stack systems",
    detail:
      "Working across interfaces, server routes, databases, and deployment concerns through projects such as vehicle rental, helpdesk, and task management systems.",
  },
  {
    period: "03",
    title: "Data and AI direction",
    detail:
      "Developing a deeper practice in Data Science, Artificial Intelligence, and Machine Learning through continuous study and practical exploration.",
  },
];

export function Experience() {
  return (
    <section className={styles.experienceSection} id="experience">
      <div className={styles.headingRow}>
        <p className={styles.eyebrow}>Experience</p>
        <h2>Learning by making the systems real.</h2>
      </div>
      <div className={styles.list}>
        {experience.map((item) => (
          <article className={styles.item} key={item.period}>
            <span>{item.period}</span>
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
