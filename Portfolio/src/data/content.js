export const defaultContent = {
  contentVersion: 3,
  visibility: {
    about: true,
    experience: true,
    projects: true,
    skills: true,
    education: true,
    contact: true,
  },
  site: {
    name: "Aaditya Acharya",
    role: "AI Engineer",
    email: "aadityaacharya6882@gmail.com",
    whatsapp: "9741688299",
    github: "https://github.com/aaditya6882",
    linkedin: "https://www.linkedin.com/",
    footer: "AI Engineer",
    resume: "#contact",
    kaggle: "https://www.kaggle.com/",
  },
  hero: {
    eyebrow: "AadityaAcharya",
    title: "AI Engineer",
    description: "Specializing in machine learning, deep learning, and data science with expertise in deploying AI solutions and integrating LLM APIs.",
    image: "",
    stats: [],
  },
  about: {
    eyebrow: "About Me",
    title: "Curious, practical, and always building.",
    paragraphs: [
      "I am studying BSc Computer Science at Herald College and developing a strong foundation in programming, systems, and problem solving.",
      "I enjoy working with data, finding patterns, and learning how models and visualizations can support better decisions.",
      "From websites to games and Python tools, I like creating projects that are simple to use and improve with every version.",
    ],
    cards: [
      { title: "Student", text: "BSc Computer Science at Herald College Kathmandu." },
      { title: "Data Science Focus", text: "Working with data, patterns, models, and visualizations." },
      { title: "Builder Mindset", text: "Creating useful websites, games, Python tools, and full-stack systems." },
    ],
  },
  expertise: {
    eyebrow: "Key Expertise",
    title: "Turning complex ideas into useful products.",
    items: [
      { title: "AI Engineer", text: "Designing intelligent systems with machine learning, deep learning, and modern generative AI." },
      { title: "Data Scientist", text: "Finding meaningful patterns in data and translating analysis into confident decisions." },
      { title: "Full-stack Developer", text: "Building reliable interfaces, APIs, databases, and production-ready applications." },
    ],
  },
  skills: {
    eyebrow: "Technical Skills",
    title: "Tools and technologies I work with.",
    groups: [
      { name: "AI", items: ["AI & Machine Learning", "Machine Learning", "Deep Learning", "Neural Networks", "Computer Vision", "NLP", "Model Fine-Tuning", "Feature Engineering", "Pretrained Models"] },
      { name: "DEV", items: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "Flask/FastAPI", "Java", "C++/C"] },
      { name: "DATA", items: ["Data Analysis", "Pandas & NumPy", "Data Visualization", "Statistical Analysis", "SQL", "Jupyter Notebooks", "Matplotlib/Seaborn", "Data Preprocessing"] },
      { name: "OPS", items: ["Model Deployment", "API Integration", "LLM APIs", "CI/CD Pipelines", "Model Monitoring", "Docker", "Git/GitHub", "Cloud Platforms"] },
    ],
    items: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "React", "Node.js", "MongoDB", "PostgreSQL", "Docker", "Git"],
    additional: ["Hugging Face", "Transformers", "NLTK", "spaCy", "Streamlit", "Gradio", "Whisper", "LangChain", "REST APIs", "Postman"],
    education: {
      eyebrow: "Education",
      title: "BSc, Computer Science",
      text: "Herald College Kathmandu · 2023 — Present",
    },
    certifications: [],
  },
  experience: {
    eyebrow: "Experience",
    title: "Learning by making the systems real.",
    items: [],
  },
  projects: [],
  contact: {
    eyebrow: "Contact",
    title: "Let us build something useful.",
    description: "I'm always open to discussing new projects, opportunities, or partnerships. Feel free to reach out!",
  },
};

export function mergeContent(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return defaultContent;
  if (value.contentVersion !== defaultContent.contentVersion) return defaultContent;
  const merge = (base, override) => Object.fromEntries(
    Object.keys({ ...base, ...override }).map((key) => [
      key,
      base[key] && override[key] && typeof base[key] === "object" && typeof override[key] === "object" && !Array.isArray(base[key]) && !Array.isArray(override[key])
        ? merge(base[key], override[key])
        : override[key] === undefined ? base[key] : override[key],
    ]),
  );
  return merge(defaultContent, value);
}
