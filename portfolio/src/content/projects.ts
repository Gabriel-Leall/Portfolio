export type Locale = "pt" | "en";

export interface Project {
  id: string;
  name: string;
  image: string;
  imageSrcSet?: string;
  stack: string[];
  displayStack: string;
  category: Record<Locale, string>;
  tagline: Record<Locale, string>;
  summary: Record<Locale, string>;
  details: Record<Locale, string[]>;
  features: Record<Locale, string[]>;
  code: string;
  demo?: Record<Locale, string>;
}

export const projects: Project[] = [
  {
    id: "syndesis",
    name: "Syndesis",
    image: "/images/syndesis-1280.webp",
    imageSrcSet: "/images/syndesis-640.webp 640w, /images/syndesis-1280.webp 1280w",
    stack: ["React", "TypeScript", "Astro", "Tailwind CSS", "IndexedDB"],
    displayStack: "React / TypeScript / IndexedDB",
    category: { pt: "Espaço de conhecimento", en: "Knowledge workspace" },
    tagline: {
      pt: "Conexões entre notas, conceitos e referências.",
      en: "Connections between notes, concepts, and references.",
    },
    summary: {
      pt: "Um canvas para organizar notas Markdown e explorar conexões entre ideias, com arquivos no computador e organização salva no navegador.",
      en: "A canvas for organizing Markdown notes and exploring connections between ideas, with files kept on your computer and the canvas layout saved in your browser.",
    },
    details: {
      pt: [
        "Syndesis reúne notas Markdown, conceitos e referências em um workspace visual. O canvas permite organizar o conhecimento e explorar relações entre conteúdos.",
        "Os arquivos da pasta conectada permanecem no computador. A organização é armazenada localmente no navegador, preservando os arquivos e o controle sobre o próprio conhecimento.",
      ],
      en: [
        "Syndesis brings Markdown notes, concepts, and references into a visual workspace. The canvas supports organizing knowledge and exploring relationships between content.",
        "Files in the connected folder stay on your computer. The canvas layout is stored locally in your browser, keeping your files intact and your knowledge under your control.",
      ],
    },
    features: {
      pt: [
        "Canvas de notas e referências",
        "Conexões entre conceitos",
        "Organização local no navegador",
        "Preservação dos arquivos da pasta conectada",
      ],
      en: [
        "Canvas for notes and references",
        "Connections between concepts",
        "Canvas layout stored locally in the browser",
        "Files in the connected folder kept intact",
      ],
    },
    code: "https://github.com/Gabriel-Leall/Syndesis",
    demo: {
      pt: "https://syndesis.vercel.app/",
      en: "https://syndesis.vercel.app/",
    },
  },
  {
    id: "kodan",
    name: "Kodan",
    image: "/images/kodan.webp",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "Better Auth",
    ],
    displayStack: "Next.js / TypeScript / PostgreSQL",
    category: { pt: "Prática de programação", en: "Programming practice" },
    tagline: {
      pt: "Leia código. Explique seu raciocínio.",
      en: "Read code. Explain your reasoning.",
    },
    summary: {
      pt: "Preparação para entrevistas técnicas por desafios de leitura de código, com feedback sobre as respostas e acompanhamento da evolução pela pontuação Elo.",
      en: "Technical interview preparation through code-reading challenges, with feedback on answers and progress tracked through an Elo rating.",
    },
    details: {
      pt: [
        "Kodan propõe desafios em que o praticante analisa trechos de código, identifica problemas e explica seu raciocínio. O foco está na leitura e no diagnóstico técnico.",
        "O fluxo conecta respostas, feedback e acompanhamento pela pontuação Elo para apoiar a prática de programação e a preparação para entrevistas técnicas.",
      ],
      en: [
        "Kodan presents challenges where learners analyze code snippets, identify problems, and explain their reasoning. It focuses on code reading and technical diagnosis.",
        "The flow connects answers, feedback, and Elo rating tracking to support programming practice and technical interview preparation.",
      ],
    },
    features: {
      pt: [
        "Desafios de leitura de código",
        "Diagnóstico e explicação técnica",
        "Feedback sobre as respostas",
        "Acompanhamento da evolução pela pontuação Elo",
      ],
      en: [
        "Code-reading challenges",
        "Technical diagnosis and explanation",
        "Feedback on answers",
        "Progress tracking through an Elo rating",
      ],
    },
    code: "https://github.com/juninhos-comunidade/kodan",
    demo: {
      pt: "https://kodan.vercel.app/inicio",
      en: "https://kodan.vercel.app/inicio",
    },
  },
  {
    id: "bon",
    name: "Bon",
    image: "/images/bon.webp",
    stack: ["React", "TypeScript", "Tauri", "Rust", "SQLite", "Tailwind CSS"],
    displayStack: "React / TypeScript / Tauri / Rust",
    category: { pt: "Produtividade no desktop", en: "Desktop productivity" },
    tagline: {
      pt: "Planejamento e foco em um espaço personalizável.",
      en: "Planning and focus in a customizable workspace.",
    },
    summary: {
      pt: "Aplicativo desktop que reúne tarefas, hábitos, Pomodoro, notas e calendário, com widgets personalizáveis e dados armazenados localmente.",
      en: "A desktop app bringing together tasks, habits, a Pomodoro timer, notes, and a calendar, with customizable widgets and locally stored data.",
    },
    details: {
      pt: [
        "Bon reúne ferramentas de planejamento e foco em um workspace personalizável. Tarefas, hábitos, Pomodoro, notas e calendário compartilham a mesma experiência desktop.",
        "A interface em React se conecta ao aplicativo nativo com Tauri e Rust. Os dados ficam em SQLite local, e um painel rápido pode ser acessado por atalho global.",
      ],
      en: [
        "Bon brings planning and focus tools into a customizable workspace. Tasks, habits, a Pomodoro timer, notes, and a calendar share the same desktop experience.",
        "The React interface connects to the native app through Tauri and Rust. Data is stored locally in SQLite, and a quick panel is accessible through a global keyboard shortcut.",
      ],
    },
    features: {
      pt: [
        "Tarefas, hábitos e Pomodoro",
        "Notas e calendário",
        "Widgets personalizáveis",
        "Painel rápido por atalho global",
      ],
      en: [
        "Tasks, habits, and Pomodoro",
        "Notes and calendar",
        "Customizable widgets",
        "Quick panel via a global keyboard shortcut",
      ],
    },
    code: "https://github.com/Gabriel-Leall/Bon",
  },
  {
    id: "naurial",
    name: "Naurial",
    image: "/images/Naurial.webp",
    stack: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Figma", "Supabase", "AI"],
    displayStack: "Next.js / TypeScript / Supabase",
    category: { pt: "Plataforma de estudos", en: "Educational platform" },
    tagline: {
      pt: "Uma companhia para os estudos com IA personalizada.",
      en: "A study companion with personalized AI.",
    },
    summary: {
      pt: "Plataforma de estudos que reúne assistentes de IA personalizados e uma experiência de aprendizagem gamificada.",
      en: "A study platform bringing together personalized AI assistants and a gamified learning experience.",
    },
    details: {
      pt: [
        "Naurial é uma plataforma de estudos com IA personalizada. A proposta permite criar assistentes para acompanhar a aprendizagem em uma experiência gamificada.",
        "A experiência combina interfaces em React e TypeScript, componentização e design iterativo no Figma.",
      ],
      en: [
        "Naurial is a study platform with personalized AI. Users can create assistants to support their learning in a gamified experience.",
        "The experience combines React and TypeScript interfaces, reusable components, and iterative design in Figma.",
      ],
    },
    features: {
      pt: [
        "Assistentes de IA personalizados",
        "Experiência de estudos gamificada",
        "Interfaces em React e TypeScript",
      ],
      en: [
        "Personalized AI assistants",
        "Gamified study experience",
        "React and TypeScript interfaces",
      ],
    },
    code: "https://github.com/Gabriel-Leall/naurial.git",
    demo: {
      pt: "https://naurial.vercel.app/pt",
      en: "https://naurial.vercel.app/en",
    },
  },
  {
    id: "barber-schedule",
    name: "BarberSchedule",
    image: "/images/barberschedule_thumb_large.webp",
    stack: ["React", "Node.js", "TypeScript", "MongoDB", "Stripe", "Socket.io"],
    displayStack: "React / Node.js / TypeScript / MongoDB",
    category: { pt: "Agendamento para barbearias", en: "Barbershop booking" },
    tagline: {
      pt: "Agendamentos e atendimento em uma plataforma.",
      en: "Bookings and appointment management in one platform.",
    },
    summary: {
      pt: "Plataforma de agendamento para barbearias, com seleção de serviços, consulta de horários e gestão dos atendimentos.",
      en: "A barbershop booking platform with service selection, available appointment times, and appointment management.",
    },
    details: {
      pt: [
        "BarberSchedule conecta a marcação de horários à gestão dos atendimentos. O fluxo permite consultar disponibilidade, selecionar serviços e agendar em uma barbearia.",
        "A aplicação reúne uma interface de agendamento para clientes e a gestão dos estabelecimentos, com React e TypeScript na experiência web.",
      ],
      en: [
        "BarberSchedule connects appointment booking with appointment management. The flow supports checking availability, selecting services, and booking with a barbershop.",
        "The app brings together a customer booking interface and barbershop management, with React and TypeScript powering the web experience.",
      ],
    },
    features: {
      pt: [
        "Consulta de horários disponíveis",
        "Seleção de serviços",
        "Agendamento para clientes",
        "Gestão dos atendimentos",
      ],
      en: [
        "Available appointment times",
        "Service selection",
        "Customer bookings",
        "Appointment management",
      ],
    },
    code: "https://github.com/Gabriel-Leall/Barber-Schedule.git",
    demo: {
      pt: "https://barber-schedule-saas.vercel.app/",
      en: "https://barber-schedule-saas.vercel.app/",
    },
  },
];
