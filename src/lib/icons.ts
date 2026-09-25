import {
  siJavascript,
  siHtml5,
  siCss,
  siReact,
  siNextdotjs,
  siRedux,
  siFramer,
  siTailwindcss,
  siBootstrap,
  siAxios,
  siFirebase,
  siSocketdotio,
  siHuggingface,
  siAnthropic,
  siGithub,
  siMongodb,
  siStripe,
  siTypescript,
  siNodedotjs,
} from "simple-icons";

export type SimpleIcon = {
  title: string;
  slug: string;
  hex: string;
  path: string;
};

const iconMap: Record<string, SimpleIcon> = {
  javascript: siJavascript,
  html5: siHtml5,
  css: siCss,
  react: siReact,
  nextdotjs: siNextdotjs,
  redux: siRedux,
  framer: siFramer,
  tailwindcss: siTailwindcss,
  bootstrap: siBootstrap,
  axios: siAxios,
  firebase: siFirebase,
  socketdotio: siSocketdotio,
  huggingface: siHuggingface,
  anthropic: siAnthropic,
  github: siGithub,
  mongodb: siMongodb,
  stripe: siStripe,
  typescript: siTypescript,
  nodedotjs: siNodedotjs,
};

export function getIcon(slug: string): SimpleIcon | undefined {
  return iconMap[slug];
}

/** Map project stack labels to simple-icons slugs */
export function stackToIconSlug(label: string): string | undefined {
  const map: Record<string, string> = {
    React: "react",
    "Next.js": "nextdotjs",
    Firebase: "firebase",
    Axios: "axios",
    ApexCharts: "react",
    Recharts: "react",
    MongoDB: "mongodb",
    "Socket.IO": "socketdotio",
    Redux: "redux",
    "Redux Toolkit": "redux",
    "AI/RAG": "huggingface",
    Stripe: "stripe",
    "Responsive UI": "css",
    "Tailwind CSS": "tailwindcss",
    "Framer Motion": "framer",
  };
  return map[label];
}
