import i18n from "i18next";
import { initReactI18next } from "react-i18next";

type SupportedLanguage = "pt-BR" | "en-US";

const supportedLanguages: SupportedLanguage[] = ["pt-BR", "en-US"];

function isSupportedLanguage(language: string | null): language is SupportedLanguage {
  return supportedLanguages.includes(language as SupportedLanguage);
}

function getLanguageFromLocale(locale: string | undefined): SupportedLanguage {
  return locale?.toLowerCase().startsWith("pt") ? "pt-BR" : "en-US";
}

function getBrowserLanguage(): SupportedLanguage {
  const preferredLocale = navigator.languages?.[0] || navigator.language;

  return getLanguageFromLocale(preferredLocale);
}

function getInitialLanguage(): SupportedLanguage {
  const storedLanguage = localStorage.getItem("portfolio-language");

  if (isSupportedLanguage(storedLanguage)) {
    return storedLanguage;
  }

  return getBrowserLanguage();
}

function syncDocumentLanguage(language: string) {
  document.documentElement.lang = getLanguageFromLocale(language);
}

export const resources = {
  "pt-BR": {
    translation: {
      nav: {
        home: "Início",
        about: "Sobre",
        projects: "Projetos",
        contact: "Contato",
        homeLogo: "Ir para o início",
        openMenu: "Abrir menu",
        closeMenu: "Fechar menu",
      },
      action: {
        contact: "Conversar",
        projects: "Ver projetos",
        resume: "Baixar CV",
        send: "Enviar mensagem",
        details: "Detalhes",
        repository: "Repositório no GitHub",
        live: "Ver em produção",
        backToProjects: "Voltar aos projetos",
      },
      hero: {
        eyebrow: "Software Developer",
        title: "Matheus Lisboa",
        body: "Produtos digitais com arquitetura clara, interfaces precisas e performance mensurável.",
        status: "Disponível para projetos seletos",
      },
      stats: { years: "anos de experiência", projects: "projetos entregues", score: "meta Lighthouse" },
      sections: {
        intro: "Perfil",
        skills: "Competências",
        differentials: "Diferenciais",
        tech: "Tecnologias",
        featured: "Projetos em destaque",
        cta: "Vamos construir algo útil.",
        ctaEyebrow: "Contato",
        ctaBody:
          "Aberto a projetos freelance, consultoria e oportunidades full-time. Traga o problema; eu ajudo a estruturar o produto.",
      },
      intro: {
        title: "Sou um desenvolvedor focado em transformar requisitos difíceis em sistemas legíveis.",
        body: "Minha prática combina frontend moderno, backend pragmático e uma obsessão saudável por UX, performance e manutenção futura.",
      },
      skills: {
        architecture: "Arquitetura frontend",
        product: "Produto e UX",
        automation: "Automação",
        analytics: "Analytics",
      },
      differentials: {
        readable: "Código preparado para crescer",
        accessible: "Interfaces acessíveis por padrão",
        measurable: "Decisões guiadas por eventos",
      },
      tech: {
        react: "React",
        typescript: "TypeScript",
        tailwind: "TailwindCSS",
        node: "Node.js",
        query: "TanStack Query",
        motion: "Framer Motion",
      },
      projects: {
        title: "Projetos",
        search: "Buscar projeto",
        all: "Todos",
        web: "Web",
        automation: "Automação",
        data: "Dados",
        detailEyebrow: "Estudo de caso",
        detailOverview: "Visão geral",
        detailStack: "Stack",
        detailResult: "Resultado",
        items: {
          studio: {
            title: "Studio Ops",
            description: "Painel operacional para acompanhar entregas, clientes e indicadores em tempo real.",
          },
          pulse: {
            title: "Pulse Metrics",
            description: "Coletor de eventos de navegação com estrutura pronta para heatmaps e funis.",
          },
          orbit: {
            title: "Orbit Checkout",
            description: "Fluxo de compra otimizado para conversão, acessibilidade e baixo tempo de interação.",
          },
        },
        metrics: {
          studio: "37% menos retrabalho",
          pulse: "18 eventos principais",
          orbit: "1.2s TTI",
        },
      },
      about: {
        title: "Sobre",
        body: "Atuo entre engenharia e produto, criando sistemas que continuam compreensíveis depois da primeira entrega.",
        experience: "Experiência em aplicações React, integrações REST, automações e design systems.",
        education: "Formação contínua em engenharia de software, acessibilidade e arquitetura web.",
        goal: "Objetivo: colaborar com times que valorizam clareza, impacto e execução cuidadosa.",
      },
      contact: {
        title: "Contato",
        body: "Conte um pouco sobre o projeto, desafio ou oportunidade.",
        name: "Nome",
        email: "Email",
        message: "Mensagem",
        whatsapp: "WhatsApp",
        linkedin: "LinkedIn",
        github: "GitHub",
      },
      footer: { line: "© 2026 Matheus Lisboa - Todos os direitos reservados" },
    },
  },
  "en-US": {
    translation: {
      nav: {
        home: "Home",
        about: "About",
        projects: "Projects",
        contact: "Contact",
        homeLogo: "Go to home",
        openMenu: "Open menu",
        closeMenu: "Close menu",
      },
      action: {
        contact: "Talk",
        projects: "View projects",
        resume: "Download CV",
        send: "Send message",
        details: "Details",
        repository: "GitHub repository",
        live: "View production",
        backToProjects: "Back to projects",
      },
      hero: {
        eyebrow: "Software Developer",
        title: "Matheus Lisboa",
        body: "Digital products with clear architecture, precise interfaces and measurable performance.",
        status: "Available for selected projects",
      },
      stats: { years: "years of experience", projects: "projects shipped", score: "Lighthouse target" },
      sections: {
        intro: "Profile",
        skills: "Skills",
        differentials: "Differentials",
        tech: "Technologies",
        featured: "Featured projects",
        cta: "Let's build something useful.",
        ctaEyebrow: "Contact",
        ctaBody:
          "Open to freelance projects, consulting and full-time opportunities. Bring the problem; I help structure the product.",
      },
      intro: {
        title: "I turn difficult requirements into systems people can understand.",
        body: "My practice combines modern frontend, pragmatic backend work and a healthy obsession with UX, performance and future maintenance.",
      },
      skills: {
        architecture: "Frontend architecture",
        product: "Product and UX",
        automation: "Automation",
        analytics: "Analytics",
      },
      differentials: {
        readable: "Code ready to grow",
        accessible: "Accessible interfaces by default",
        measurable: "Decisions guided by events",
      },
      tech: {
        react: "React",
        typescript: "TypeScript",
        tailwind: "TailwindCSS",
        node: "Node.js",
        query: "TanStack Query",
        motion: "Framer Motion",
      },
      projects: {
        title: "Projects",
        search: "Search project",
        all: "All",
        web: "Web",
        automation: "Automation",
        data: "Data",
        detailEyebrow: "Case study",
        detailOverview: "Overview",
        detailStack: "Stack",
        detailResult: "Result",
        items: {
          studio: {
            title: "Studio Ops",
            description: "Operations dashboard for tracking delivery, clients and real-time indicators.",
          },
          pulse: {
            title: "Pulse Metrics",
            description: "Navigation event collector ready for heatmap and funnel reconstruction.",
          },
          orbit: {
            title: "Orbit Checkout",
            description: "Checkout flow optimized for conversion, accessibility and low interaction time.",
          },
        },
        metrics: {
          studio: "37% less rework",
          pulse: "18 core events",
          orbit: "1.2s TTI",
        },
      },
      about: {
        title: "About",
        body: "I work between engineering and product, creating systems that stay understandable after the first release.",
        experience: "Experience with React apps, REST integrations, automation and design systems.",
        education: "Continuous study in software engineering, accessibility and web architecture.",
        goal: "Goal: collaborate with teams that value clarity, impact and careful execution.",
      },
      contact: {
        title: "Contact",
        body: "Share a little about the project, challenge or opportunity.",
        name: "Name",
        email: "Email",
        message: "Message",
        whatsapp: "WhatsApp",
        linkedin: "LinkedIn",
        github: "GitHub",
      },
      footer: { line: "© 2026 Matheus Lisboa - All rights reserved" },
    },
  },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: "pt-BR",
  interpolation: { escapeValue: false },
});

syncDocumentLanguage(i18n.language);
i18n.on("languageChanged", syncDocumentLanguage);

export default i18n;
