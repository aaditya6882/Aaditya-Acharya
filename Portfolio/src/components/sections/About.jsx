import React from "react";
import Stylesheet from "./About.module.css";

export const About = ({ content }) => {
  return (
    <section className={`${Stylesheet.section} motion-reveal`} id="about">
      <div className={Stylesheet.about}>
        <div className={`${Stylesheet.sectionHeader} motion-reveal`}>
          <h2 className={Stylesheet.head}>About Me</h2>
        </div>
        <div className={Stylesheet.content}>
          <div className={Stylesheet.paragraphs}>
            {(content.paragraphs || []).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className={Stylesheet.expertise}>
            <h3 className={Stylesheet.expertiseTitle}>Key Expertise</h3>
            <div className={Stylesheet.expertiseList}>
              {content.cards.map((card, index) => <article className={`${Stylesheet.aboutCard} motion-reveal`} style={{ "--motion-delay": `${index * 70}ms` }} key={card.title}><h3>{card.title}</h3><p>{card.text}</p></article>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
