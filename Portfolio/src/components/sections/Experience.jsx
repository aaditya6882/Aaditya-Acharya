import styles from "./Experience.module.css";

export function Experience({ content }) {
  return (
    <section className={`${styles.experienceSection} motion-reveal`} id="experience">
      <div className={styles.inner}>
        <div className={`${styles.headingRow} motion-reveal`}>
          <h2>{content?.title || "Professional Experience"}</h2>
        </div>
        <div className={styles.list}>
          {content.items.map((item, index) => (
            <article className={`${styles.item} motion-reveal`} style={{ "--motion-delay": `${index * 80}ms` }} key={item.period}>
              <div className={styles.itemHeader}>
                <div>
                  <h3>{item.title}</h3>
                  <strong>{item.company}</strong>
                </div>
                <p>{item.date}</p>
              </div>
              <ul>
                <li>{item.detail}</li>
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
