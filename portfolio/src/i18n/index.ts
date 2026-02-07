import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      navigation: {
        home: "Home",
        process: "Process",
        projects: "Projects",
        skills: "Skills",
        about: "About",
        contact: "Contact",
        language: "Language",
        en: "EN",
        pt: "PT",
      },
      hero: {
        name: "Gabriel Leal",
        headline: "Front-End Developer",
        description:
          "Crafting exceptional digital experiences through clean code, thoughtful design, and innovative solutions",
        cta: {
          viewProjects: "View My Projects",
          downloadCV: "Download CV",
        },
      },
      process: {
        title: "My Process",
        subtitle: "From concept to deployment",
        phases: {
          discovery: { title: "Discovery", desc: "Research & user insights" },
          strategy: { title: "Strategy", desc: "Planning & architecture" },
          design: { title: "Design", desc: "UI/UX creation" },
          development: { title: "Development", desc: "Building & coding" },
          testing: { title: "Testing", desc: "QA & deployment" },
        },
      },
      about: {
        title: "About Me",
        subtitle: "Get to know me better",
        hi: "Hi, I'm",
        name: "Gabriel Leal",
        bio1: "Ever since I started my journey in tech, I'd always look at digital products and wonder, **How is that built?** and **Could I build that?** This curiosity for turning an abstract idea into a functional, interactive product guided me to **front-end development**.",
        bio2: "To do this, I use modern tools from the **JavaScript ecosystem**, including **React**, **Next.js**, and **TypeScript**, always focusing on **performance** and **scalability**. I believe that attention to UI/UX principles and accessibility isn't just an extra —it's a fundamental part of building high-quality products.",
        bio3: "Outside of code, I enjoy playing volleyball and tabletop RPGs. If you're looking for a detail-oriented and collaborative developer for your team or project, let's talk!",
        resume: { download: "Download Resume" },
      },
      skills: {
        title: "Skills & Experience",
        subtitle: "Building with modern, scalable technologies",
      },
      projects: {
        title: "Featured Projects",
        subtitle: "A selection of my recent work",
        viewCaseStudy: "View Case Study",
        learnMore: "Learn more",
        openProject: "Open project",
      },
      contact: {
        title: "Get In Touch",
        subtitle: "Let's create something amazing together",
        copyEmail: "Copy Email",
        emailCopied: "Copied!",
        quick: {
          title: "Available for Projects",
          responseTime: "Response time: 24-48h",
          description:
            "I'm currently available for freelance work and exciting project collaborations.",
        },
      },
      projectModal: {
        challenge: {
          title: "The Challenge",
          context: "Context",
          problem: "Problem",
          goals: "Goals",
        },
        role: {
          title: "My Role & Process",
          position: "Position",
        },
        frontend: {
          title: "Front-End Solution",
          liveDemo: "Live Demo",
          viewCode: "View Code on GitHub",
          technologies: "Technologies Used",
          concepts: "Concepts & Best Practices",
        },
        results: {
          title: "Results",
        },
      },
    },
  },
  pt: {
    translation: {
      navigation: {
        home: "Início",
        process: "Processo",
        projects: "Projetos",
        skills: "Habilidades",
        about: "Sobre",
        contact: "Contato",
        language: "Idioma",
        en: "EN",
        pt: "PT",
      },
      hero: {
        badge: "Disponível para Freelance",
        name: "Gabriel Leal",
        headline: "Desenvolvedor Front-End",
        description:
          "Criando experiências digitais excepcionais com código limpo, design cuidadoso e soluções inovadoras",
        cta: {
          viewProjects: "Ver Meus Projetos",
          downloadCV: "Baixar CV",
        },
      },
      process: {
        title: "Meu Processo",
        subtitle: "Do conceito ao deploy",
        phases: {
          discovery: {
            title: "Descoberta",
            desc: "Pesquisa e insights de usuário",
          },
          strategy: { title: "Estratégia", desc: "Planejamento e arquitetura" },
          design: { title: "Design", desc: "Criação de UI/UX" },
          development: {
            title: "Desenvolvimento",
            desc: "Construção e código",
          },
          testing: { title: "Testes", desc: "QA e deploy" },
        },
      },
      about: {
        title: "Sobre Mim",
        subtitle: "Conheça-me melhor",
        hi: "Olá, eu sou",
        name: "Gabriel Leal",
        bio1: "Desde que comecei minha jornada na tecnologia, sempre olhava para produtos digitais e me perguntava: **Como isso foi construído?** e **Eu conseguiria construir isso?** Essa curiosidade de transformar uma ideia abstrata em um produto funcional e interativo me guiou para o **desenvolvimento front-end**.",
        bio2: "Para isso, utilizo ferramentas modernas do **ecossistema JavaScript**, incluindo **React**, **Next.js** e **TypeScript**, sempre com foco em **performance** e **escalabilidade**. Acredito que a atenção aos princípios de UI/UX e acessibilidade não é apenas um extra — é uma parte fundamental da construção de produtos de alta qualidade.",
        bio3: "Fora do código, gosto de jogar vôlei e RPGs de mesa. Se você está procurando um desenvolvedor detalhista e colaborativo para sua equipe ou projeto, vamos conversar!",
        resume: { download: "Baixar Currículo" },
      },
      skills: {
        title: "Habilidades & Experiência",
        subtitle: "Construindo com tecnologias modernas e escaláveis",
      },
      projects: {
        title: "Projetos em Destaque",
        subtitle: "Uma seleção dos meus trabalhos recentes",
        viewCaseStudy: "Ver Case Study",
        learnMore: "Saiba mais",
        openProject: "Abrir projeto",
      },
      contact: {
        title: "Entre em Contato",
        subtitle: "Vamos criar algo incrível juntos",
        copyEmail: "Copiar Email",
        emailCopied: "Copiado!",
        quick: {
          title: "Disponível para Projetos",
          responseTime: "Tempo de resposta: 24-48h",
          description:
            "Atualmente disponível para trabalhos freelance e colaborações em projetos empolgantes.",
        },
      },
      projectModal: {
        challenge: {
          title: "O Desafio",
          context: "Contexto",
          problem: "Problema",
          goals: "Objetivos",
        },
        role: {
          title: "Meu Papel & Processo",
          position: "Posição",
        },
        frontend: {
          title: "Solução Front-End",
          liveDemo: "Demo ao Vivo",
          viewCode: "Ver Código no GitHub",
          technologies: "Tecnologias Utilizadas",
          concepts: "Conceitos & Boas Práticas",
        },
        results: {
          title: "Resultados",
        },
      },
    },
  },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
