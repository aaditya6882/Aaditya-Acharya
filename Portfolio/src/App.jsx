import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { About } from "./components/sections/About";
import { Contact } from "./components/sections/Contact";
import { Hero } from "./components/sections/Hero";
import { Projects } from "./components/sections/Projects";
import { Skills } from "./components/sections/Skills";
import { Experience } from "./components/sections/Experience";
import { Education } from "./components/sections/Education";
import { Admin } from "./components/admin/Admin";
import "./styles/App.css";
import { useEffect, useState } from "react";
import { defaultContent, mergeContent } from "./data/content";

function App() {
  const [content, setContent] = useState(defaultContent);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (window.location.pathname === "/admin") return;
    document.documentElement.classList.add("motion-ready");
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -48px" },
    );
    document.querySelectorAll(".motion-reveal").forEach((element) => revealObserver.observe(element));
    fetch(`${import.meta.env.VITE_API_URL || "http://localhost:4000/api"}/content`)
      .then((response) => (response.ok ? response.json() : null))
      .then((remoteContent) => remoteContent && setContent(mergeContent(remoteContent)))
      .catch(() => {});
    return () => {
      revealObserver.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  if (window.location.pathname === "/admin") return <Admin />;

  return (
    <div className={`App ${darkMode ? "dark-mode" : ""}`}>
      <Navbar site={content.site} darkMode={darkMode} onToggleTheme={() => setDarkMode((value) => !value)} />
      <main>
        <Hero content={content.hero} site={content.site} />
        {content.visibility.about && <About content={content.about} />}
        {content.visibility.experience && <Experience content={content.experience} />}
        {content.visibility.projects && <Projects projects={content.projects.filter((project) => project.published !== false)} />}
        {content.visibility.skills && <Skills content={content.skills} />}
        {content.visibility.education && <Education content={content.skills} />}
        {content.visibility.contact && <Contact content={content.contact} site={content.site} />}
      </main>
      <Footer site={content.site} />
    </div>
  );
}

export default App;
