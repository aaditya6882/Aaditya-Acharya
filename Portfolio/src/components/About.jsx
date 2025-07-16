import react from "react";
import aaditya from "../../src/assets/hero/Aaditya.png";
import Stylesheet from "./About.module.css";
export const About = () => {
  return (
    <section className={Stylesheet.section} id="about">
      <div className={Stylesheet.about}>
        <h2 className={Stylesheet.head}>About</h2>
        <div className={Stylesheet.aboutText}>
          <img src={aaditya} alt="Aaditya" className={Stylesheet.image} />

          <div className={Stylesheet.text}>
            <div>
              <h3>Student</h3>
              <p>
                I am a student in herald colloge studying Bsc in Computer
                Science.
              </p>
            </div>
            <div>
              <h3>Passion</h3>
              <p>Me a student passionate about data scientist.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
