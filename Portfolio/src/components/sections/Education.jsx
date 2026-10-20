import styles from "./Education.module.css";

export function Education({ content }) {
  return (
    <section className={`${styles.educationSection} motion-reveal`} id="education">
      <div className={styles.inner}>
        <h2 className={styles.sectionTitle}>Education & Certifications</h2>
        <div className={styles.columns}>
          <div>
            <h2>Education</h2>
            <h3>{content.education.title}</h3>
            <p>{content.education.text}</p>
            <p className={styles.detail}>Relevant Courses: Algorithms Design and Analysis, Object-Oriented Programming, Linear Algebra, Probability and Statistics, Machine Learning, Artificial Neural Networks, Database Systems, Information Retrieval, Fundamentals of Software Engineering.</p>
          </div>
          <div>
            <h2>Certifications & Awards</h2>
            <div className={styles.certifications}>
              {(content.certifications || []).map((item) => (
                <article key={item.title}>
                  <h3>{item.title} - {item.issuer}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
