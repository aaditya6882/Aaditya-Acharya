import React from "react";
import Stylesheet from "./Hero.module.css";
import aaditya from "../../assets/hero/Aaditya.png";

export const Hero = () => {
  return (
    <section className={Stylesheet.hero} id="home">
      <div className={Stylesheet.heroText}>
        <p className={Stylesheet.eyebrow}>Data / AI / Software</p>
        <h1 className={Stylesheet.Name}>
          Building intelligent solutions with data, AI, and code.
        </h1>
        <p className={Stylesheet.description}>
          Exploring Data Science, Artificial Intelligence, Machine Learning, and
          Software Development through practical projects and continuous
          learning.
        </p>
        <div className={Stylesheet.actions}>
          <a href="#projects" className={Stylesheet.primaryBtn}>
            View Projects
          </a>
          <a href="#contact" className={Stylesheet.secondaryBtn}>
            Contact Me
          </a>
          <a
            href={`https://wa.me/${(import.meta.env.VITE_WHATSAPP_NUMBER || "9741688299").replace(/\D/g, "")}?text=${encodeURIComponent("Hi Aaditya, I visited your portfolio and would like to discuss a project with you.")}`}
            className={Stylesheet.whatsappBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
        </div>
        <div className={Stylesheet.stats} aria-label="Portfolio highlights">
          <span>
            <strong>8+</strong>
            Projects
          </span>
          <span>
            <strong>4</strong>
            Tech Areas
          </span>
          <span>
            <strong>BSc</strong>
            CS Student
          </span>
        </div>
      </div>
      <div className={Stylesheet.imageWrap}>
        <img
          src={aaditya}
          alt="Aaditya Acharya"
          className={Stylesheet.aaditya}
        />
      </div>
    </section>
  );
};
