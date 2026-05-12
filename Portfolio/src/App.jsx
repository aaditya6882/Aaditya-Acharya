import { Navbar } from "./components/navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Footer } from "./components/Footer";
import { Contact } from "./components/contact";
import { Projects } from "./components/projects";
import { Skills } from "./components/Skills";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
