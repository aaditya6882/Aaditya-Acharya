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
    email: "hello@aaditya.dev",
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
    certifications: [
      { title: "Large Language Models Concept", issuer: "DataCamp", text: "Foundations of prompting, model behavior, and practical LLM workflows." },
      { title: "Supervised Machine Learning", issuer: "DataCamp", text: "Classification, regression, evaluation metrics, and model selection." },
      { title: "Data Science", issuer: "DataCamp", text: "Pandas, NumPy, visualization, and applied Python analysis." },
    ],
  },
  experience: {
    eyebrow: "Experience",
    title: "Learning by making the systems real.",
    items: [
      { period: "01", title: "AI Engineer", company: "Independent AI Lab", date: "Dec 2024 - Present", detail: "Designed and implemented machine learning and deep learning systems for NLP and computer vision projects." },
      { period: "02", title: "Notebook Expert", company: "Kaggle", date: "Dec 2023 - Present", detail: "Published practical data science notebooks covering modeling, visualization, and reproducible analysis." },
      { period: "03", title: "Automation Lead", company: "Procom '24", date: "Oct 2023 - Mar 2024", detail: "Led team collaboration and designed an intelligent chatbot for event automation." },
      { period: "04", title: "Data Science Coordinator", company: "Developer Student Club", date: "Nov 2022 - Nov 2023", detail: "Mentored learners in machine learning fundamentals and practical data science." },
    ],
  },
  projects: [
    { title: "EarthRenewal AI Assistant", format: "AI product / 01", visual: "Farmer chatbot", description: "An AI assistant that gives farmers practical agricultural recommendations with multilingual support and real-time answers.", tags: ["NLP", "LLM", "Python", "Multilingual"], link: "#", featured: true, published: true },
    { title: "Authentrix Profile Verification", format: "Trust system / 02", visual: "Trust scoring", description: "An AI-based trust scoring system for profile verification with deployment automation and model monitoring.", tags: ["Machine Learning", "CI/CD", "Monitoring"], link: "#", featured: true, published: true },
    { title: "Customer Churn Prediction", format: "Classification / 03", visual: "Retention model", description: "A classification system that predicts customer churn using ensemble models, SVM, and explainable evaluation.", tags: ["Random Forest", "SVM", "LightGBM"], link: "#", featured: false, published: true },
    { title: "Fastly Admission Chatbot", format: "Conversational AI / 04", visual: "Student assistant", description: "An NLP chatbot that answers university admission questions and helps students find the right next step.", tags: ["NLP", "LSTM", "Chatbot"], link: "#", featured: false, published: true },
  ],
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
