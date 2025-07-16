import React from "react";
import Stylesheet from "./Hero.module.css";
import aaditya from "../../src/assets/hero/Aaditya.png";
export const Hero = () => {
  return (
    <section className={Stylesheet.hero}>
      <div className={Stylesheet.heroText}>
        <h1 className={Stylesheet.Name}> Hi, I am Aaditya</h1>
        <p className={Stylesheet.description}>
          I am a student currently studying at Herald College, passionate about
          data science. Reach out to me if you would like to learn more.
        </p>
        <a href="/contact" class={Stylesheet.btn}>
          Contact Me
        </a>
      </div>
      <img src={aaditya} alt="Aaditya Acharya" className={Stylesheet.aaditya} />
    </section>
  );
};
