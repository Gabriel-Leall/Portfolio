import { lazy, Suspense, useRef, useEffect, useState } from "react";
import { SectionTitle } from "./ui/SectionTitle";
import { ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { LaptopMockup } from "./ui/LaptopMockup";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProjectModal = lazy(() =>
  import("./ProjectModal").then((module) => ({
    default: module.ProjectModal,
  })),
);

const projectsData = [
  {
    "id": "syndesis",
    "title": "Syndesis",
    "category": "KNOWLEDGE WORKSPACE",
    "image": "/images/syndesis.webp",
    "thumbnail": "/images/syndesis.webp",
    "banner": "/images/syndesis.webp",
    "tags": [
      "React",
      "TypeScript",
      "Astro",
      "Tailwind CSS",
      "IndexedDB"
    ],
    "en": {
      "subtitle": "Connect your notes in a visual workspace",
      "description": "A visual workspace for exploring connections between Markdown notes, concepts, and references on a canvas. Files stay on your computer and the organization is saved in the browser, with a focus on privacy and control over your knowledge.",
      "summary": "Visual organization of notes and references with local storage, preserving the files in the connected folder.",
      "challenge": {
        "context": "A visual workspace for exploring connections between Markdown notes, concepts, and references on a canvas. Files stay on your computer and the organization is saved in the browser, with a focus on privacy and control over your knowledge.",
        "problem": "",
        "goals": []
      },
      "role": {
        "position": "",
        "responsibilities": [],
        "process": []
      },
      "frontendSolution": {
        "description": "Visual organization of notes and references with local storage, preserving the files in the connected folder.",
        "liveDemo": "https://syndesis.vercel.app/",
        "githubRepo": "https://github.com/Gabriel-Leall/Syndesis",
        "technologies": [
          {
            "name": "React",
            "icon": ""
          },
          {
            "name": "TypeScript",
            "icon": ""
          },
          {
            "name": "Astro",
            "icon": ""
          },
          {
            "name": "Tailwind CSS",
            "icon": ""
          },
          {
            "name": "IndexedDB",
            "icon": ""
          }
        ],
        "concepts": [],
        "metrics": []
      },
      "results": []
    },
    "pt": {
      "subtitle": "Conecte suas notas em um workspace visual",
      "description": "Workspace visual para explorar conexões entre notas Markdown, conceitos e referências em um canvas. Mantém os arquivos no computador e salva a organização no navegador, com foco em privacidade e controle sobre o próprio conhecimento.",
      "summary": "Organização visual de notas e referências com armazenamento local, preservando os arquivos da pasta conectada.",
      "challenge": {
        "context": "Workspace visual para explorar conexões entre notas Markdown, conceitos e referências em um canvas. Mantém os arquivos no computador e salva a organização no navegador, com foco em privacidade e controle sobre o próprio conhecimento.",
        "problem": "",
        "goals": []
      },
      "role": {
        "position": "",
        "responsibilities": [],
        "process": []
      },
      "frontendSolution": {
        "description": "Organização visual de notas e referências com armazenamento local, preservando os arquivos da pasta conectada.",
        "liveDemo": "https://syndesis.vercel.app/",
        "githubRepo": "https://github.com/Gabriel-Leall/Syndesis",
        "technologies": [
          {
            "name": "React",
            "icon": ""
          },
          {
            "name": "TypeScript",
            "icon": ""
          },
          {
            "name": "Astro",
            "icon": ""
          },
          {
            "name": "Tailwind CSS",
            "icon": ""
          },
          {
            "name": "IndexedDB",
            "icon": ""
          }
        ],
        "concepts": [],
        "metrics": []
      },
      "results": []
    }
  },
  {
    "id": "kodan",
    "title": "Kodan",
    "category": "DEVELOPER TRAINING",
    "image": "/images/kodan.webp",
    "thumbnail": "/images/kodan.webp",
    "banner": "/images/kodan.webp",
    "tags": [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "Better Auth"
    ],
    "en": {
      "subtitle": "Practice code reading, diagnosis, and explanation",
      "description": "A technical interview preparation platform built around code-reading challenges. Learners analyze snippets, identify problems, and explain their reasoning, with answer feedback and progress tracked through ELO.",
      "summary": "A practice flow that connects code analysis, technical diagnosis, and feedback to develop programming reasoning.",
      "challenge": {
        "context": "A technical interview preparation platform built around code-reading challenges. Learners analyze snippets, identify problems, and explain their reasoning, with answer feedback and progress tracked through ELO.",
        "problem": "",
        "goals": []
      },
      "role": {
        "position": "",
        "responsibilities": [],
        "process": []
      },
      "frontendSolution": {
        "description": "A practice flow that connects code analysis, technical diagnosis, and feedback to develop programming reasoning.",
        "liveDemo": "https://kodan.vercel.app/inicio",
        "githubRepo": "https://github.com/juninhos-comunidade/kodan",
        "technologies": [
          {
            "name": "Next.js",
            "icon": ""
          },
          {
            "name": "React",
            "icon": ""
          },
          {
            "name": "TypeScript",
            "icon": ""
          },
          {
            "name": "Tailwind CSS",
            "icon": ""
          },
          {
            "name": "Prisma",
            "icon": ""
          },
          {
            "name": "PostgreSQL",
            "icon": ""
          },
          {
            "name": "Better Auth",
            "icon": ""
          }
        ],
        "concepts": [],
        "metrics": []
      },
      "results": []
    },
    "pt": {
      "subtitle": "Treine leitura, diagnóstico e explicação de código",
      "description": "Plataforma de preparação para entrevistas técnicas por meio de desafios de leitura de código. O praticante analisa trechos, identifica problemas e explica seu raciocínio, com feedback sobre as respostas e acompanhamento da evolução por ELO.",
      "summary": "Um fluxo de prática que conecta análise de código, diagnóstico técnico e feedback para desenvolver o raciocínio de programação.",
      "challenge": {
        "context": "Plataforma de preparação para entrevistas técnicas por meio de desafios de leitura de código. O praticante analisa trechos, identifica problemas e explica seu raciocínio, com feedback sobre as respostas e acompanhamento da evolução por ELO.",
        "problem": "",
        "goals": []
      },
      "role": {
        "position": "",
        "responsibilities": [],
        "process": []
      },
      "frontendSolution": {
        "description": "Um fluxo de prática que conecta análise de código, diagnóstico técnico e feedback para desenvolver o raciocínio de programação.",
        "liveDemo": "https://kodan.vercel.app/inicio",
        "githubRepo": "https://github.com/juninhos-comunidade/kodan",
        "technologies": [
          {
            "name": "Next.js",
            "icon": ""
          },
          {
            "name": "React",
            "icon": ""
          },
          {
            "name": "TypeScript",
            "icon": ""
          },
          {
            "name": "Tailwind CSS",
            "icon": ""
          },
          {
            "name": "Prisma",
            "icon": ""
          },
          {
            "name": "PostgreSQL",
            "icon": ""
          },
          {
            "name": "Better Auth",
            "icon": ""
          }
        ],
        "concepts": [],
        "metrics": []
      },
      "results": []
    }
  },
  {
    "id": "bon",
    "title": "Bon",
    "category": "DESKTOP PRODUCTIVITY",
    "image": "/images/bon.webp",
    "thumbnail": "/images/bon.webp",
    "banner": "/images/bon.webp",
    "tags": [
      "React",
      "TypeScript",
      "Tauri",
      "Rust",
      "SQLite",
      "Tailwind CSS"
    ],
    "en": {
      "subtitle": "Your productivity workspace on desktop",
      "description": "A desktop app that brings tasks, habits, Pomodoro, notes, and calendar into a customizable workspace. It combines a React interface with Tauri and Rust, local SQLite persistence, and a quick panel accessible through a global shortcut.",
      "summary": "Planning and focus tools brought together in a desktop app with customizable widgets and locally stored data.",
      "challenge": {
        "context": "A desktop app that brings tasks, habits, Pomodoro, notes, and calendar into a customizable workspace. It combines a React interface with Tauri and Rust, local SQLite persistence, and a quick panel accessible through a global shortcut.",
        "problem": "",
        "goals": []
      },
      "role": {
        "position": "",
        "responsibilities": [],
        "process": []
      },
      "frontendSolution": {
        "description": "Planning and focus tools brought together in a desktop app with customizable widgets and locally stored data.",
        "githubRepo": "https://github.com/Gabriel-Leall/Bon",
        "technologies": [
          {
            "name": "React",
            "icon": ""
          },
          {
            "name": "TypeScript",
            "icon": ""
          },
          {
            "name": "Tauri",
            "icon": ""
          },
          {
            "name": "Rust",
            "icon": ""
          },
          {
            "name": "SQLite",
            "icon": ""
          },
          {
            "name": "Tailwind CSS",
            "icon": ""
          }
        ],
        "concepts": [],
        "metrics": []
      },
      "results": []
    },
    "pt": {
      "subtitle": "Seu espaço de produtividade no desktop",
      "description": "Aplicativo desktop que reúne tarefas, hábitos, Pomodoro, notas e calendário em um workspace personalizável. Combina uma interface em React com Tauri e Rust, persistência local em SQLite e um painel rápido acessível por atalho global.",
      "summary": "Ferramentas de planejamento e foco reunidas em um aplicativo desktop com widgets personalizáveis e dados armazenados localmente.",
      "challenge": {
        "context": "Aplicativo desktop que reúne tarefas, hábitos, Pomodoro, notas e calendário em um workspace personalizável. Combina uma interface em React com Tauri e Rust, persistência local em SQLite e um painel rápido acessível por atalho global.",
        "problem": "",
        "goals": []
      },
      "role": {
        "position": "",
        "responsibilities": [],
        "process": []
      },
      "frontendSolution": {
        "description": "Ferramentas de planejamento e foco reunidas em um aplicativo desktop com widgets personalizáveis e dados armazenados localmente.",
        "githubRepo": "https://github.com/Gabriel-Leall/Bon",
        "technologies": [
          {
            "name": "React",
            "icon": ""
          },
          {
            "name": "TypeScript",
            "icon": ""
          },
          {
            "name": "Tauri",
            "icon": ""
          },
          {
            "name": "Rust",
            "icon": ""
          },
          {
            "name": "SQLite",
            "icon": ""
          },
          {
            "name": "Tailwind CSS",
            "icon": ""
          }
        ],
        "concepts": [],
        "metrics": []
      },
      "results": []
    }
  },
  {
    id: "Naurial",
    title: "Naurial",
    category: "EDUCATIONAL PLATFORM",
    image: "/images/Naurial.webp",
    thumbnail: "/images/Naurial.webp",
    banner: "/images/Naurial.webp",
    tags: [
      "React",
      "TypeScript",
      "Tailwind",
      "Next.js",
      "Figma",
      "Supabase",
      "AI",
    ],
    en: {
      subtitle: "Study Intelligently with Naurial",
      description:
        "Tired of studying alone? Have your AI as a personalized study companion being your teacher, study partner and career mentor.",
      summary:
        "Improving site performance and enhancing UI to retain and attract more students.",
      challenge: {
        context:
          "Naurial is a gamified study assistant platform with personalized AI.",
        problem:
          "Even with several existing AIs, personalization and adaptation to the user's learning style were limited.",
        goals: [
          "Allow users to create and customize their own AI assistants",
          "Create simple and intuitive interfaces",
          "Reduce screen loading time by 70%",
          "Optimize for mobile and tablet devices",
          "Ensure WCAG 2.1 AA accessibility",
        ],
      },
      role: {
        position: "Front-End Lead Developer & UX Designer",
        responsibilities: [
          "Technical leadership of a team of 3 front-end developers",
          "React application architecture with TypeScript",
          "System design improvement",
          "Performance and accessibility optimization",
        ],
        process: [
          {
            phase: "Wireframes & Prototypes",
            description: "Iterative design in Figma",
            icon: null,
          },
          {
            phase: "Development",
            description: "React implementation with modular architecture",
            icon: null,
          },
          {
            phase: "Testing & QA",
            description: "Manual testing on multiple devices",
            icon: null,
          },
        ],
      },
      frontendSolution: {
        description:
          "I developed a highly performant React application using modern best practices.",
        liveDemo: "https://naurial.vercel.app/en",
        githubRepo: "https://github.com/Gabriel-Leall/naurial.git",
        technologies: [
          { name: "React 18", icon: "⚛️" },
          { name: "TypeScript", icon: "📘" },
          { name: "Tailwind CSS", icon: "🎨" },
        ],
        concepts: [
          "Advanced componentization",
          "Global state with Context API",
        ],
        metrics: [
          { label: "Lighthouse Score", value: "98" },
          { label: "First Contentful Paint", value: "0.8s" },
        ],
      },
      results: [
        {
          metric: "Performance",
          value: "+75%",
          description: "Loading time improvement",
        },
        {
          metric: "Productivity",
          value: "+60%",
          description: "Reduction in quiz generation time",
        },
      ],
    },
    pt: {
      subtitle: "Estude Inteligentemente com Naurial",
      description:
        "Cansado de estudar só? Tenha sua IA como companheira de estudos personalizada.",
      summary:
        "Melhorando a performance do site e aprimorando a UI para reter e atrair mais estudantes.",
      challenge: {
        context:
          "A Naurial é uma plataforma de assistente de estudos gamificada com IA personalizada.",
        problem:
          "Mesmo contendo várias IA existentes, a personalização era limitada.",
        goals: [
          "Permitir criação de assistentes de IA",
          "Criar interfaces simples e intuitivas",
          "Reduzir o tempo de carregamento em 70%",
        ],
      },
      role: {
        position: "Desenvolvedor Front-End Líder & Designer UX",
        responsibilities: [
          "Liderança técnica",
          "Arquitetura React com TypeScript",
        ],
        process: [
          {
            phase: "Wireframes",
            description: "Design iterativo no Figma",
            icon: null,
          },
          {
            phase: "Desenvolvimento",
            description: "Implementação em React",
            icon: null,
          },
        ],
      },
      frontendSolution: {
        description: "Desenvolvi uma aplicação React altamente performática.",
        liveDemo: "https://naurial.vercel.app/pt",
        githubRepo: "https://github.com/Gabriel-Leall/naurial.git",
        technologies: [{ name: "React 18", icon: "⚛️" }],
        concepts: ["Componentização avançada"],
        metrics: [{ label: "Lighthouse Score", value: "98" }],
      },
      results: [
        {
          metric: "Performance",
          value: "+75%",
          description: "Melhoria no carregamento",
        },
        {
          metric: "Produtividade",
          value: "+60%",
          description: "Redução no tempo de geração de quizzes",
        },
      ],
    },
  },
  {
    id: "barber-schedule",
    title: "BarberSchedule",
    category: "SAAS APPLICATION",
    image: "/images/barberschedule_thumb_large.webp",
    thumbnail: "/images/barberschedule_thumb_large.webp",
    banner: "/images/barberschedule_thumb_large.webp",
    tags: ["React", "Node.js", "TypeScript", "MongoDB", "Stripe", "Socket.io"],
    en: {
      subtitle: "Multi-Barbershop SaaS Booking Platform",
      description:
        "Complete SaaS solution for barbershops with booking system and customer portal.",
      summary:
        "Making it easier to find barbershops and promote establishments, reducing search time and increasing engagement.",
      challenge: {
        context:
          "Barbershops needed a unified platform for managing appointments.",
        problem:
          "Traditional booking systems were too expensive or lacked multi-tenant architecture.",
        goals: [
          "Create a multi-tenant SaaS platform",
          "Build intuitive booking system",
        ],
      },
      role: {
        position: "Front-End Developer & Product Designer",
        responsibilities: [
          "Full-stack architecture design",
          "Development of customer booking interface",
        ],
        process: [
          {
            phase: "Research",
            description: "User interviews with barbershop owners",
            icon: null,
          },
          {
            phase: "UI/UX Design",
            description: "Dual interface design",
            icon: null,
          },
        ],
      },
      frontendSolution: {
        description:
          "I built a modern, responsive SaaS platform with React and TypeScript.",
        liveDemo: "https://barber-schedule-saas.vercel.app/",
        githubRepo: "https://github.com/Gabriel-Leall/Barber-Schedule.git",
        technologies: [
          { name: "React 18", icon: "⚛️" },
          { name: "Node.js", icon: "🟢" },
        ],
        concepts: [
          "Multi-tenant SaaS architecture",
          "Real-time updates with WebSockets",
        ],
        metrics: [{ label: "Response Time", value: "<200ms" }],
      },
      results: [
        {
          metric: "Barbershops",
          value: "50+",
          description: "Active establishments",
        },
        {
          metric: "Search Time",
          value: "-15%",
          description: "Reduction in search time",
        },
        {
          metric: "Active Users",
          value: "+10%",
          description: "Increase in engagement",
        },
      ],
    },
    pt: {
      subtitle: "Plataforma SaaS Multi-Barbearias",
      description:
        "Solução SaaS completa para barbearias com sistema de agendamento.",
      summary:
        "Facilitar a busca por barbearias e divulgar estabelecimentos, reduzindo o tempo de procura e aumentando o engajamento.",
      challenge: {
        context: "Barbearias precisavam de uma plataforma unificada.",
        problem: "Sistemas tradicionais eram muito caros ou complexos.",
        goals: ["Criar plataforma SaaS multi-tenant"],
      },
      role: {
        position: "Desenvolvedor Front-End & Designer de Produto",
        responsibilities: ["Arquitetura full-stack"],
        process: [
          {
            phase: "Pesquisa",
            description: "Entrevistas com donos",
            icon: null,
          },
        ],
      },
      frontendSolution: {
        description: "Construí uma plataforma SaaS moderna e responsiva.",
        liveDemo: "https://barberschedule-demo.vercel.app",
        githubRepo: "https://github.com/username/barber-schedule",
        technologies: [{ name: "React 18", icon: "⚛️" }],
        concepts: ["Arquitetura SaaS multi-tenant"],
        metrics: [{ label: "Tempo de Resposta", value: "<200ms" }],
      },
      results: [
        {
          metric: "Barbearias",
          value: "50+",
          description: "Estabelecimentos ativos",
        },
        {
          metric: "Tempo de Busca",
          value: "-15%",
          description: "Redução no tempo de procura",
        },
        {
          metric: "Usuários Ativos",
          value: "+10%",
          description: "Aumento de engajamento",
        },
      ],
    },
  },
];

export function FeaturedProjects() {
  const { t, i18n } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<
    (typeof projectsData)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [focusedProjectIndex, setFocusedProjectIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (isMobile) {
      return;
    }

    if (
      !sectionRef.current ||
      !containerRef.current ||
      !scrollContainerRef.current
    )
      return;

    const scrollContainer = scrollContainerRef.current;
    const totalWidth = scrollContainer.scrollWidth - window.innerWidth;

    // Horizontal scroll with pinning - Otimizado com scrub: 2
    const scrollTween = gsap.to(scrollContainer, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${totalWidth}`,
        scrub: 2, // Otimizado: aumentado de 1 para 2 para reduzir recalculações
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const index = Math.round(progress * (projectsData.length - 1));
          setFocusedProjectIndex(index);
        },
      },
    });

    return () => {
      scrollTween.scrollTrigger?.kill();
      scrollTween.kill();
    };
  }, [isMobile]);

  const handleProjectClick = (
    e: React.MouseEvent,
    project: (typeof projectsData)[0],
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const getCurrentLangData = (project: (typeof projectsData)[0]) => {
    const currentLang = i18n.language as "en" | "pt";
    return project[currentLang];
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="projects"
        className={
          isMobile
            ? "relative min-h-screen py-24 px-4"
            : "relative h-screen overflow-hidden"
        }
      >
        {/* Section Title */}
        <div className={isMobile ? "mb-8" : "absolute top-8 left-8 z-20"}>
          <SectionTitle number="01" title={t("projects.title")} />
        </div>

        {/* Focused Project Name */}
        <div className="absolute top-8 right-8 z-20 hidden lg:block">
          <p className="text-sm font-mono text-white/60">
            {projectsData[focusedProjectIndex]?.title}
          </p>
        </div>

        {/* Project Counter */}
        <div className="absolute bottom-8 left-8 z-20 font-mono text-foreground/80 dark:text-white/70 hidden lg:block">
          <span className="text-accent">{focusedProjectIndex + 1}</span>
          <span className="mx-2 text-foreground/80 dark:text-white/70">/</span>
          <span className="text-foreground/80 dark:text-white/70">
            {projectsData.length}
          </span>
        </div>

        {/* Horizontal Scroll Container */}
        <div ref={containerRef} className={isMobile ? "w-full" : "h-full w-full"}>
          <div
            ref={scrollContainerRef}
            className={
              isMobile
                ? "flex flex-col gap-6"
                : "flex h-full items-center gap-8 px-[10vw]"
            }
            style={isMobile ? undefined : { width: `${projectsData.length * 70 + 20}vw` }}
          >
            {projectsData.map((project, index) => {
              const langData = getCurrentLangData(project);
              const isFocused = isMobile || focusedProjectIndex === index;

              return (
                <div
                  key={project.id}
                  className={`
                    relative transition-all duration-500
                    ${
                      isMobile
                        ? "w-full h-auto"
                        : `shrink-0 h-[80vh] ${
                            isFocused
                              ? "w-[80vw] opacity-100 scale-100"
                              : "w-[70vw] opacity-30 scale-90 pointer-events-none"
                          }`
                    }
                  `}
                  style={{ pointerEvents: isFocused ? "auto" : "none" }}
                >
                  {/* Card Container - Dark background split layout */}
                  <div
                    className={`relative w-full overflow-hidden rounded-2xl bg-background border border-white/10 shadow-2xl ${
                      isMobile ? "flex flex-col" : "h-full flex"
                    }`}
                  >
                    {/* Left Side - Project Information */}
                    <div
                      className={
                        isMobile
                          ? "w-full flex flex-col justify-center px-5 py-6"
                          : "w-1/2 flex flex-col justify-center px-12 lg:px-16 py-8"
                      }
                    >
                      {/* Category */}
                      <span className="text-xs uppercase tracking-[0.3em] text-accent/90 mb-4 font-mono">
                        {project.category}
                      </span>

                      {/* Title */}
                      <h3
                        className={
                          isMobile
                            ? "text-2xl font-bold text-foreground mb-4 leading-tight"
                            : "text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight"
                        }
                      >
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p
                        className={
                          isMobile
                            ? "text-muted-foreground text-base mb-6 leading-relaxed"
                            : "text-muted-foreground text-base lg:text-lg mb-8 max-w-md leading-relaxed"
                        }
                      >
                        {langData?.description}
                      </p>

                      {/* Built with */}
                      <div className={isMobile ? "mb-6" : "mb-10"}>
                        <span className="text-foreground font-semibold">
                          Built with:{" "}
                        </span>
                        <span className="text-muted-foreground">
                          {project.tags.slice(0, 4).join(", ")}
                          {project.tags.length > 4 && "..."}
                        </span>
                      </div>

                      {/* Links */}
                      <div className="flex flex-col gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProjectClick(e, project);
                          }}
                          className="text-foreground hover:text-accent transition-colors flex items-center gap-2 group w-fit"
                        >
                          <span className="text-sm font-medium">
                            {t("projects.learnMore") || "Saiba mais"}
                          </span>
                          <ChevronRight
                            size={16}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </button>
                        {langData?.frontendSolution?.liveDemo && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(
                                langData.frontendSolution.liveDemo,
                                "_blank",
                              );
                            }}
                            className="text-accent hover:text-accent/80 transition-colors flex items-center gap-2 group w-fit"
                          >
                            <span className="text-sm font-medium">
                              {t("projects.openProject") || "Abrir projeto"}
                            </span>
                            <ChevronRight
                              size={16}
                              className="group-hover:translate-x-1 transition-transform"
                            />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Right Side - Laptop Mockup */}
                    <div
                      className={
                        isMobile
                          ? "w-full flex items-center justify-center p-4 bg-linear-to-br from-background to-secondary/5"
                          : "w-1/2 flex items-center justify-center p-8 bg-linear-to-br from-background to-secondary/5"
                      }
                    >
                      <LaptopMockup
                        className={isMobile ? "w-full max-w-md" : "w-full max-w-2xl"}
                      >
                        <ImageWithFallback
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover object-top"
                        />
                      </LaptopMockup>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Project Detail Modal with backdrop blur */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-100 backdrop-blur-sm bg-black/50"
          onClick={handleCloseModal}
        >
          <Suspense fallback={null}>
            <ProjectModal
              project={selectedProject}
              isOpen={isModalOpen}
              onClose={handleCloseModal}
            />
          </Suspense>
        </div>
      )}
    </>
  );
}
