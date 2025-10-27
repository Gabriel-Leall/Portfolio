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
        headline: "Junior Front-End Developer",
        description:
          "Crafting exceptional digital experiences through clean code, thoughtful design, and innovative solutions",
        cta: {
          viewProjects: "View My Projects",
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
        bio1: "Ever since I started my journey in tech, I'd always look at digital products and wonder, How is that built? and Could I build that? This curiosity for turning an abstract idea into a functional, interactive product guided me to front-end development.",
        bio2: "To do this, I use modern tools from the JavaScript ecosystem, including React, Next.js, and TypeScript, always focusing on performance and scalability. I believe that attention to UI/UX principles and accessibility isn't just an extra —it's a fundamental part of building high-quality products.",
        bio3: "Outside of code, I enjoy playing volleyball and tabletop RPGs. If you're looking for a detail-oriented and collaborative developer for your team or project, let's talk!",
        stats: {
          years: "Years Exp.",
          projects: "Projects",
        },
        resume: { download: "Download Resume" },
      },
      skills: {
        title: "Skills Playground",
        subtitle: "Interactive component demonstrations",
        slider: "Custom Slider",
        toggle: "Animated Toggle",
        colorGen: "Color Generator",
        generatedColor: "Generated Color",
        status: { active: "Active", inactive: "Inactive" },
        generate: "Generate",
      },
      projects: {
        title: "Featured Projects",
        subtitle: "A selection of my recent work",
        viewCaseStudy: "View Case Study",
      },
      contact: {
        title: "Get In Touch",
        subtitle: "Let's create something amazing together",
        quick: {
          title: "Available for Projects",
          responseTime: "Response time: 24-48h",
          description:
            "I'm currently available for freelance work and exciting project collaborations.",
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
        headline: "Desenvolvedor Front-End Júnior",
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
        bio1: "Sou um desenvolvedor front-end apaixonado, com mais de 8 anos de experiência criando aplicações web bonitas, acessíveis e performáticas. Especialista em React, TypeScript e tecnologias modernas.",
        bio2: "Minha abordagem combina excelência técnica com design centrado no usuário, garantindo que todo projeto não só fique bonito como também ofereça uma experiência excepcional.",
        bio3: "Quando não estou codando, estou contribuindo com open-source, escrevendo artigos técnicos ou explorando as últimas tendências do desenvolvimento web.",
        stats: {
          years: "Anos de Exp.",
          projects: "Projetos",
          clients: "Clientes",
        },
        resume: { download: "Baixar Currículo" },
      },
      skills: {
        title: "Skills Playground",
        subtitle: "Demonstrações interativas de componentes",
        slider: "Slider Personalizado",
        toggle: "Toggle Animado",
        colorGen: "Gerador de Cores",
        generatedColor: "Cor Gerada",
        status: { active: "Ativo", inactive: "Inativo" },
        generate: "Gerar",
      },
      projects: {
        title: "Projetos em Destaque",
        subtitle: "Uma seleção dos meus trabalhos recentes",
        viewCaseStudy: "Ver Case Study",
      },
      contact: {
        title: "Entre em Contato",
        subtitle: "Vamos criar algo incrível juntos",
        quick: {
          title: "Disponível para Projetos",
          responseTime: "Tempo de resposta: 24-48h",
          description:
            "Atualmente disponível para trabalhos freelance e colaborações em projetos empolgantes.",
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
