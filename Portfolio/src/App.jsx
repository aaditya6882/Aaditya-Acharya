import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { About } from "./components/sections/About";
import { Contact } from "./components/sections/Contact";
import { Hero } from "./components/sections/Hero";
import { Projects } from "./components/sections/Projects";
import { Skills } from "./components/sections/Skills";
import { Experience } from "./components/sections/Experience";
import { Admin } from "./components/admin/Admin";
import "./styles/App.css";

function App() {
  if (window.location.pathname === "/admin") return <Admin />;

  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <a
        className="whatsapp-float"
        href={`https://wa.me/${(import.meta.env.VITE_WHATSAPP_NUMBER || "9741688299").replace(/\D/g, "")}?text=${encodeURIComponent("Hi Aaditya, I visited your portfolio and would like to discuss a project with you.")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Aaditya on WhatsApp"
      >
        WhatsApp
      </a>
      <Footer />
    </div>
  );
}

export default App;
