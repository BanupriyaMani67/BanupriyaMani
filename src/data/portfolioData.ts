export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Mobile & AI' | 'Full-Stack Web & AI';
  tagline: string;
  githubUrl: string;
  techStack: string[];
  keyHighlights: string[];
  architecturePoints: {
    title: string;
    description: string;
  }[];
  image: string;
  badge: string;
}

export interface SkillGroup {
  id: string;
  category: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    highlight?: boolean;
    level?: string;
  }[];
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  category: string;
  description: string;
}

export interface Education {
  degree: string;
  specialization: string;
  institution: string;
  location: string;
  status: string;
  timeline: string;
  cgpa: string;
  scale: string;
  highlights: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Banupriya Mani",
    role: "Full Stack Developer & AI/ML Enthusiast",
    degree: "BCA in Data Science",
    institution: "MVJ Degree College, Bangalore",
    graduationYear: "Expected: May 2027",
    cgpa: "8.78 / 10.0",
    location: "Bangalore, India",
    email: "banupriyamani67@gmail.com",
    linkedin: "https://linkedin.com/in/banupriyamani",
    linkedinDisplay: "linkedin.com/in/banupriyamani",
    github: "https://github.com/BanupriyaMani67",
    githubDisplay: "github.com/BanupriyaMani67",
    profileImage: "/Banupriyamani.p.jpeg",
    summary:
      "Motivated and detail-oriented BCA (Data Science) student with a strong interest in Full Stack Development using Java and Python, along with AI fundamentals. Passionate about building efficient, scalable, and user-friendly applications while continuously learning modern technologies and solving real-world problems. Seeking an internship opportunity to apply technical skills, gain hands-on industry experience, and contribute to innovative projects.",
    stats: [
      { label: "Academic CGPA", value: "8.78", note: "Out of 10.0 scale" },
      { label: "Core Projects", value: "02", note: "End-to-End Production & Containerized" },
      { label: "Industry Certifications", value: "03", note: "Tata, Forage & Skill India" },
      { label: "Target Graduation", value: "2027", note: "MVJ Degree College, Bangalore" },
    ],
    areasOfInterest: [
      "Full Stack Development",
      "Java Development",
      "Python Development",
      "Software Engineering",
      "Web Development"
    ]
  },

  skills: [
    {
      id: "programming-languages",
      category: "Programming Languages",
      iconName: "Code2",
      description: "Core algorithmic thinking and application building",
      skills: [
        { name: "Java", highlight: true, level: "Advanced Core & OOP" },
        { name: "Python", highlight: true, level: "Advanced Scripting & APIs" },
        { name: "SQL", highlight: false, level: "Relational Queries & Optimization" },
        { name: "JavaScript", highlight: false, level: "ES6+ Modern Syntax" },
      ],
    },
    {
      id: "frontend",
      category: "Frontend Development",
      iconName: "Layout",
      description: "Modern client-side engineering with typed component systems",
      skills: [
        { name: "React.js", highlight: true, level: "Components & Hooks" },
        { name: "Next.js", highlight: true, level: "Server-side & App Router" },
        { name: "TypeScript", highlight: true, level: "Strict Static Typing" },
        { name: "HTML5", highlight: false, level: "Semantic Markup" },
        { name: "CSS3", highlight: false, level: "Responsive Layouts & Flex/Grid" },
      ],
    },
    {
      id: "backend",
      category: "Backend Development",
      iconName: "Server",
      description: "Scalable server architectures, microservices & REST APIs",
      skills: [
        { name: "Spring Boot", highlight: true, level: "Enterprise Java Services" },
        { name: "FastAPI", highlight: true, level: "Async Python Endpoints" },
        { name: "Flask", highlight: false, level: "Lightweight Micro-framework" },
        { name: "REST APIs", highlight: true, level: "Contract Design & Serialization" },
      ],
    },
    {
      id: "databases",
      category: "Databases & Caching",
      iconName: "Database",
      description: "Multi-model data persistence, indexing, and in-memory caches",
      skills: [
        { name: "PostgreSQL", highlight: true, level: "ACID Relational Storage" },
        { name: "MySQL", highlight: false, level: "Relational Modeling" },
        { name: "MongoDB", highlight: true, level: "NoSQL Document Engine" },
        { name: "Redis", highlight: true, level: "In-Memory Caching & Session" },
        { name: "Firebase (NoSQL)", highlight: false, level: "Real-time Cloud Sync" },
        { name: "SQLite", highlight: false, level: "Embedded & Offline-first" },
      ],
    },
    {
      id: "cloud-tools",
      category: "Cloud & Developer Tools",
      iconName: "Cloud",
      description: "Containerization, version control, and deployment pipelines",
      skills: [
        { name: "Docker", highlight: true, level: "Containerization & Multi-container" },
        { name: "AWS", highlight: true, level: "Cloud Infrastructure Fundamentals" },
        { name: "Git", highlight: false, level: "Branching & Version Control" },
        { name: "GitHub", highlight: false, level: "Collaboration & Repositories" },
        { name: "Postman", highlight: false, level: "API Testing & Mocking" },
        { name: "VS Code", highlight: false, level: "Primary Development IDE" },
        { name: "Buildozer", highlight: false, level: "Python-to-Android Packaging" },
      ],
    },
    {
      id: "ai-data",
      category: "AI & Data Science",
      iconName: "BrainCircuit",
      description: "Machine learning, prompt pipelines, and statistical analysis",
      skills: [
        { name: "Generative AI", highlight: true, level: "LLM Workflows & Reasoning" },
        { name: "Prompt Engineering", highlight: false, level: "Context & System Prompting" },
        { name: "Machine Learning", highlight: true, level: "Supervised & Unsupervised" },
        { name: "TensorFlow", highlight: true, level: "Deep Neural Network Modeling" },
        { name: "Scikit-learn", highlight: true, level: "Predictive Models & Pipeline" },
        { name: "NLP", highlight: true, level: "Natural Language Understanding" },
        { name: "Data Analytics", highlight: false, level: "Exploratory Data Analysis" },
        { name: "Pandas", highlight: false, level: "Data Wrangling & Transformation" },
        { name: "NumPy", highlight: false, level: "Vectorized Scientific Arrays" },
      ],
    },
  ] as SkillGroup[],

  projects: [
    {
      id: "signal-women-safety",
      title: "Signal – AI-Powered Women Safety Application",
      subtitle: "Production-ready Android safety app with multi-trigger SOS and live GPS telemetry",
      category: "Mobile & AI",
      tagline: "Offline-first intelligent safety system with emergency WhatsApp automation and route anomaly detection.",
      githubUrl: "https://github.com/BanupriyaMani67/Signal",
      techStack: [
        "Python",
        "Flask",
        "Kivy",
        "Firebase",
        "PostgreSQL",
        "SQLite",
        "Scikit-learn",
        "TensorFlow",
        "NLP",
        "Twilio",
        "Buildozer"
      ],
      keyHighlights: [
        "Engineered and deployed a production-ready AI-powered Android safety application that sends emergency WhatsApp alerts with live GPS coordinates to 3 family contacts, functioning both online and offline.",
        "Built 3 SOS trigger mechanisms — NLP voice commands, volume-button press, and manual button — leveraging Scikit-learn and TensorFlow for AI-driven route safety prediction and anomaly detection.",
        "Deployed the Android APK end-to-end via Buildozer; integrated a Google Maps live-tracking dashboard and offline-first SQLite storage with automatic Firebase cloud sync to prevent data loss."
      ],
      architecturePoints: [
        {
          title: "Multi-Modal SOS Triggers",
          description: "Engineered 3 fail-safe triggers: real-time acoustic NLP keyword detection, hardware volume-key sequence interception, and one-tap UI trigger for instant dispatch."
        },
        {
          title: "Offline-First Synchronization",
          description: "Utilized local SQLite embedded database when network signal drops, automatically reconciling and syncing telemetry batches to Firebase cloud upon reconnection."
        },
        {
          title: "AI Safety Scoring & Anomaly Detection",
          description: "Integrated TensorFlow and Scikit-learn models evaluating historic path safety metrics and alerting emergency contacts via automated Twilio WhatsApp dispatch."
        }
      ],
      image: "/src/assets/images/project_signal_preview_1790782045047.jpg",
      badge: "Production Android APK"
    },
    {
      id: "shinchan-ai-assistant",
      title: "Shinchan AI Assistant – Full-Stack Web Application",
      subtitle: "High-performance full-stack AI platform built with Next.js, FastAPI, and multi-tier databases",
      category: "Full-Stack Web & AI",
      tagline: "Scalable full-stack conversational AI assistant containerized with Docker and powered by tri-database storage.",
      githubUrl: "https://github.com/BanupriyaMani67",
      techStack: [
        "Next.js",
        "TypeScript",
        "Python",
        "FastAPI",
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "Docker",
        "React"
      ],
      keyHighlights: [
        "Developed a full-stack AI assistant using a responsive Next.js/TypeScript frontend and a high-performance FastAPI REST API backend, implementing reusable React components.",
        "Integrated PostgreSQL, MongoDB, and Redis to manage structured data, NoSQL storage, and caching; containerized and deployed all services using Docker."
      ],
      architecturePoints: [
        {
          title: "Typed Full-Stack Synergy",
          description: "Modular Next.js App Router frontend with TypeScript safety coupled with asynchronous Python FastAPI REST services delivering low-latency endpoints."
        },
        {
          title: "Tri-Database Persistence Architecture",
          description: "PostgreSQL for ACID user accounts and relationship data, MongoDB for flexible unstructured chat logs, and Redis as an in-memory cache to accelerate response times."
        },
        {
          title: "Docker Container Orchestration",
          description: "Configured multi-container Docker deployment ensuring reproducible environments across development, testing, and production hosting."
        }
      ],
      image: "/src/assets/images/project_shinchan_preview_1790782059070.jpg",
      badge: "Dockerized Full-Stack"
    }
  ] as Project[],

  education: {
    degree: "Bachelor of Computer Applications (BCA)",
    specialization: "Data Science",
    institution: "MVJ Degree College",
    location: "Bangalore, India",
    status: "Currently Enrolled",
    timeline: "Expected: May 2027",
    cgpa: "8.78",
    scale: "10.0",
    highlights: [
      "Rigorous specialization in Data Science, Artificial Intelligence fundamentals, and full stack software engineering.",
      "High academic performance: maintaining a strong 8.78 / 10.0 cumulative grade point average.",
      "Active practical implementation: building real-world production mobile and web systems alongside academic coursework."
    ]
  } as Education,

  certifications: [
    {
      title: "Generative AI Powered Data Analytics Job Simulation",
      issuer: "Tata Forage",
      year: "2026",
      category: "Data Science & AI",
      description: "Applied generative AI methodologies, exploratory data analytics, and prompt-driven statistical insights for enterprise decision making."
    },
    {
      title: "Front-End Software Engineering Job Simulation",
      issuer: "Forage",
      year: "2026",
      category: "Frontend Development",
      description: "Engineered responsive web components, interface architecture, state management patterns, and production-ready frontend practices."
    },
    {
      title: "Cyber Security Certification",
      issuer: "Skill India",
      year: "2026",
      category: "Security & Systems",
      description: "Mastered fundamental network security, system protection, vulnerability awareness, and secure software development hygiene."
    }
  ] as Certification[],
};
