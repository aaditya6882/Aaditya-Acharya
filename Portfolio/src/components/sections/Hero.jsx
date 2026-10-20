import React from "react";
import Stylesheet from "./Hero.module.css";
import aaditya from "../../assets/hero/Aaditya.png";
import { Icon } from "../ui/Icon";

export const Hero = ({ content, site }) => {
  return (
    <section className={`${Stylesheet.hero} motion-reveal`} id="home">
      <div className={`${Stylesheet.heroText} ${Stylesheet.heroEntrance}`}>
        <div className={Stylesheet.heading}>
          <span className={Stylesheet.heroName}>{site.name}</span>
          <span className={Stylesheet.heroRole}>{content.title}</span>
        </div>
        <p className={Stylesheet.description}>
          {content.description}
        </p>
        <div className={`${Stylesheet.actions} motion-reveal`}>
          <a href="#contact" className={Stylesheet.primaryBtn}>Get in Touch</a>
          <a href="#projects" className={Stylesheet.primaryBtn}>
            View Projects
          </a>
          <a href={site.resume || "#contact"} className={Stylesheet.secondaryBtn}><Icon name="download" size={21} /> Resume</a>
        </div>
        <div className={`${Stylesheet.socials} motion-reveal`}>
          <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" /></a>
          <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" /></a>
          <a href={`https://wa.me/${(site.whatsapp || "").replace(/\D/g, "")}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><Icon name="whatsapp" /></a>
          <a href={`mailto:${site.email}`} aria-label="Email"><Icon name="mail" /></a>
        </div>
      </div>
      <div className={`${Stylesheet.imageWrap} ${Stylesheet.heroImageEntrance}`}>
        <img
          src={content.image || aaditya}
          alt="Aaditya Acharya"
          className={Stylesheet.aaditya}
        />
      </div>
    </section>
  );
};
