export const siteConfig = {
  name: "Harsh Virani",
  role: "Software Developer",
  email: "harshvirani1212@gmail.com",
  phone: "+91 76220 45658",
  // TODO: Replace with real LinkedIn profile URL
  linkedin: "#linkedin",
  // TODO: Replace with real GitHub profile URL
  github: "https://github.com/Harsh121002",
  summary:
    "Software Developer with hands-on experience building responsive, production web applications using React, Next.js, and Redux Toolkit. Comfortable owning features end-to-end — from UI architecture and state management to Firebase authentication and REST API integration. Led frontend delivery on a multi-module admin panel as team lead, coordinating with backend teams and mentoring junior developers.",
  languages: ["English", "Hindi", "Gujarati"],
};

export const skillCategories = [
  {
    title: "Languages & Core",
    skills: [
      { name: "JavaScript", icon: "javascript" },
      { name: "HTML5", icon: "html5" },
      { name: "CSS3", icon: "css" },
    ],
  },
  {
    title: "Frameworks",
    skills: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextdotjs" },
      { name: "Redux Toolkit", icon: "redux" },
      { name: "Framer Motion", icon: "framer" },
    ],
  },
  {
    title: "Styling",
    skills: [
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "Bootstrap", icon: "bootstrap" },
    ],
  },
  {
    title: "Integration & AI",
    skills: [
      { name: "REST APIs (Axios)", icon: "axios" },
      { name: "Firebase Auth", icon: "firebase" },
      { name: "Socket.IO", icon: "socketdotio" },
      { name: "RAG / Vector Search", icon: "huggingface" },
      { name: "LLM Integration", icon: "anthropic" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git / GitHub", icon: "github" },
      { name: "Component Architecture", icon: "react" },
      { name: "Responsive & Accessible UI", icon: "css" },
    ],
  },
] as const;

export const experience = [
  {
    role: "Software Developer",
    company: "Xitij Infotech Pvt. Ltd.",
    period: "Feb 2025 – Present",
    bullets: [
      "Built accessible, mobile-friendly interfaces with React and Tailwind CSS",
      "Owned website UI design and data-display components",
      "Maintained clean, accessible code",
      "Enhanced UI with Framer Motion and CSS animations",
    ],
  },
];

export const projects = [
  {
    title: "Hugei",
    liveUrl: "https://hugei.codderlab.com/",
    image: "/projects/hugei.png",
    subtitle: "Social & Live Streaming Platform",
    role: "Team Lead",
    stack: ["React", "Firebase", "Axios", "ApexCharts", "Recharts"],
    highlights: [
      "Led frontend/mobile team delivering a multi-module admin panel",
      "User management: KYC, sessions, and reports",
      "Live streams, communities, and gifts features",
      "Firebase authentication and multi-language support",
    ],
    accent: "cyan",
  },
  {
    title: "UpDesk",
    liveUrl: "https://updesk.codderlab.com/",
    image: "/projects/updesk.png",
    subtitle: "Multi-role Support Desk",
    role: "Software Developer",
    stack: ["Next.js", "MongoDB", "Socket.IO", "Redux", "AI/RAG"],
    highlights: [
      "Role-based portals: Admin, Manager, Developer, Client",
      "Real-time chat powered by Socket.IO",
      "Envato OAuth integration",
      "RAG knowledge assistant for support workflows",
    ],
    accent: "violet",
  },
  {
    title: "Mova",
    liveUrl: "https://movaweb.codderlab.com/",
    image: "/projects/mova.png",
    subtitle: "Video Streaming Platform",
    role: "Software Developer",
    stack: ["Next.js", "Redux Toolkit", "Firebase", "Stripe"],
    highlights: [
      "Video.js HLS and YouTube playback",
      "Stripe and Incodespay payment flows",
      "UI with MUI, Ant Design, and Tailwind CSS",
      "Motion polish with Framer Motion",
    ],
    accent: "cyan",
  },
  {
    title: "Listify Web",
    liveUrl: "https://listifyweb.codderlab.com/",
    image: "/projects/listify.png",
    subtitle: "Legal Document Generator",
    role: "Software Developer",
    stack: ["React", "Responsive UI"],
    highlights: [
      "Privacy Policy and Terms generator",
      "Guided multi-step flow for document creation",
      "Fully responsive interface",
    ],
    accent: "violet",
  },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];
