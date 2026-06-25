export type ProjectCategory = "web" | "automation" | "data";
export type StackTechnology =
  | "React"
  | "TypeScript"
  | "TanStack Query"
  | "Vite"
  | "Zustand"
  | "Analytics"
  | "Node.js"
  | "Zod"
  | "UX";

export type Project = {
  id: "studio" | "pulse" | "orbit";
  category: ProjectCategory;
  stack: StackTechnology[];
  metricKey: "studio" | "pulse" | "orbit";
  accentClass: string;
  repositoryUrl: string;
  liveUrl: string;
};

export const projects: Project[] = [
  {
    id: "studio",
    category: "web",
    stack: ["React", "TypeScript", "TanStack Query"],
    metricKey: "studio",
    accentClass: "from-white/[0.14] via-white/[0.05] to-transparent",
    repositoryUrl: "https://github.com/lucasoliveira/studio-ops",
    liveUrl: "https://studio-ops.vercel.app",
  },
  {
    id: "pulse",
    category: "data",
    stack: ["Vite", "Zustand", "Analytics"],
    metricKey: "pulse",
    accentClass: "from-white/[0.10] via-white/[0.04] to-transparent",
    repositoryUrl: "https://github.com/lucasoliveira/pulse-metrics",
    liveUrl: "https://pulse-metrics.vercel.app",
  },
  {
    id: "orbit",
    category: "automation",
    stack: ["Node.js", "Zod", "UX"],
    metricKey: "orbit",
    accentClass: "from-white/[0.12] via-white/[0.05] to-transparent",
    repositoryUrl: "https://github.com/lucasoliveira/orbit-checkout",
    liveUrl: "https://orbit-checkout.vercel.app",
  },
];
