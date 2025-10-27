import { motion } from "motion/react";
import { useState } from "react";
import {
  Eye,
  Search,
  Palette,
  Code,
  CheckCircle,
  Lightbulb,
  Zap,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ProjectDetailModal } from "./ProjectDetailModal";
import { useTranslation } from "react-i18next";

const projectsData = [
  {
    id: "Naurial",
    title: "Naurial",
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
    gridClass: "md:col-span-2 md:row-span-2",

    en: {
      subtitle: "Study Intelligently with Naurial",
      description:
        "Tired of studying alone? Have your AI as a personalized study companion being your teacher, study partner and career mentor.",
      challenge: {
        context:
          "Naurial is a gamified study assistant platform with personalized AI. Making users have an experience of evolving in their studies without feeling alone. And being able to share their assistants with other users.",
        problem:
          "Even with several existing AIs, personalization and adaptation to the user's learning style were limited. With this in mind, Naurial was created where users can have their own personalized study assistant and even share them with other users.",
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
            description: "Iterative design in Figma with 3 feedback rounds",
            icon: Palette,
          },
          {
            phase: "Development",
            description: "React implementation with modular architecture",
            icon: Code,
          },
          {
            phase: "Testing & QA",
            description: "Manual testing on multiple devices",
            icon: CheckCircle,
          },
        ],
      },
      frontendSolution: {
        description:
          "I developed a highly performant React application using modern best practices. I implemented code-splitting, lazy loading and strategic memoization to ensure fast loading times even with large volumes of data.",
        liveDemo: "https://naurial.vercel.app/en",
        githubRepo: "https://github.com/Gabriel-Leall/naurial.git",
        technologies: [
          { name: "React 18", icon: "⚛️" },
          { name: "TypeScript", icon: "📘" },
          { name: "Tailwind CSS", icon: "🎨" },
          { name: "Shadcn UI", icon: "📊" },
          { name: "Framer Motion", icon: "🔄" },
        ],
        concepts: [
          "Advanced componentization",
          "Global state managed with Context API + Hooks",
          "Re-render optimization with React.memo and useMemo",
          "Route-based code-splitting with React.lazy",
          "CI/CD with GitHub Actions",
          "Scrum methodology",
        ],
        metrics: [
          { label: "Lighthouse Score", value: "98" },
          { label: "First Contentful Paint", value: "0.8s" },
          { label: "Time to Interactive", value: "1.2s" },
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
        "Cansado de estudar só? Tenha sua IA como companheira de estudos personalizada sendo seu professor, colega de estudos e mentor de carreira.",
      challenge: {
        context:
          "A Naurial é uma plataforma de assistente de estudos gamificada com IA personalizada. Fazendo com que o usuário tenha uma experiência de estar evoluindo nos estudos sem se sentir sozinho. E podendo compartilhar seus assistentes com outros usuários.",
        problem:
          "Mesmo contendo várias IA existentes, a personalização e adaptação ao estilo de aprendizagem do usuário eram limitadas. E pensando nisso a Naurial foi criada onde o usuario pode ter seu próprio assistente de estudos personalizado e ainda compartilhar eles com outros usuários.",
        goals: [
          "Permitir que os usuários criem e personalizem seus próprios assistentes de IA",
          "Criar interfaces simples e intuitivas",
          "Reduzir o tempo de carregamento das telas em 70%",
          "Otimizar para dispositivos móveis e tablets",
          "Garantir acessibilidade WCAG 2.1 AA",
        ],
      },
      role: {
        position: "Desenvolvedor Front-End Líder & Designer UX",
        responsibilities: [
          "Liderança técnica da equipe de 3 desenvolvedores front-end",
          "Arquitetura da aplicação React com TypeScript",
          "Melhoria no Design do sistema",
          "Otimização de performance e acessibilidade",
        ],
        process: [
          {
            phase: "Wireframes & Protótipos",
            description: "Design iterativo no Figma com 3 rodadas de feedback",
            icon: Palette,
          },
          {
            phase: "Desenvolvimento",
            description: "Implementação em React com arquitetura modular",
            icon: Code,
          },
          {
            phase: "Testes & QA",
            description: "Testes manuais em múltiplos dispositivos",
            icon: CheckCircle,
          },
        ],
      },
      frontendSolution: {
        description:
          "Desenvolvi uma aplicação React altamente performática utilizando as melhores práticas modernas. Implementei code-splitting, lazy loading e memoization estratégica para garantir tempos de carregamento rápidos mesmo com grandes volumes de dados.",
        liveDemo: "https://naurial.vercel.app/pt",
        githubRepo: "https://github.com/Gabriel-Leall/naurial.git",
        technologies: [
          { name: "React 18", icon: "⚛️" },
          { name: "TypeScript", icon: "📘" },
          { name: "Tailwind CSS", icon: "🎨" },
          { name: "Shadcn UI", icon: "📊" },
          { name: "Framer Motion", icon: "🔄" },
        ],
        concepts: [
          "Componentização avançada",
          "Estado global gerenciado com Context API + Hooks",
          "Otimização de re-renders com React.memo e useMemo",
          "Code-splitting por rota com React.lazy",
          "CI/CD com GitHub Actions",
          "Metodologia Scrum",
        ],
        metrics: [
          { label: "Lighthouse Score", value: "98" },
          { label: "First Contentful Paint", value: "0.8s" },
          { label: "Time to Interactive", value: "1.2s" },
        ],
      },
      results: [
        {
          metric: "Performance",
          value: "+75%",
          description: "Melhoria no tempo de carregamento",
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
    id: "mobile-banking",
    title: "Mobile Banking App",
    subtitle: "Experiência Bancária Segura e Intuitiva",
    description:
      "Secure and intuitive mobile banking experience with biometric authentication",
    image: "/images/barberschedule_thumb_large.webp",
    thumbnail: "/images/barberschedule_thumb_large.webp",
    tags: ["React Native", "Node.js", "MongoDB"],
    device: "mobile",
    gridClass: "md:col-span-1",

    challenge: {
      context:
        "Um banco digital startup precisava de um aplicativo móvel que competisse com instituições estabelecidas, oferecendo uma experiência superior enquanto mantinha os mais altos padrões de segurança.",
      problem:
        "Aplicativos bancários tradicionais são conhecidos por interfaces complexas e processos confusos. Era necessário simplificar operações bancárias mantendo conformidade regulatória.",
      goals: [
        "Criar onboarding em menos de 3 minutos",
        "Implementar autenticação biométrica segura",
        "Simplificar transferências e pagamentos",
        "Garantir segurança de nível bancário",
        "Suportar iOS e Android com base de código única",
      ],
    },

    role: {
      position: "Mobile Developer & UX Designer",
      responsibilities: [
        "Design completo da experiência do usuário",
        "Desenvolvimento do aplicativo React Native",
        "Implementação de features de segurança",
        "Integração com APIs bancárias",
        "Testes de usabilidade e iteração",
      ],
      process: [
        {
          phase: "Pesquisa Competitiva",
          description: "Análise de 10 apps bancários líderes de mercado",
          icon: Search,
        },
        {
          phase: "Design de Interface",
          description: "Protótipos de alta fidelidade e testes com usuários",
          icon: Palette,
        },
        {
          phase: "Desenvolvimento Mobile",
          description: "React Native com arquitetura escalável",
          icon: Code,
        },
        {
          phase: "Segurança & Testes",
          description: "Penetration testing e auditoria de segurança",
          icon: CheckCircle,
        },
      ],
    },

    uxSolution: {
      description:
        "Desenvolvi uma interface minimalista que prioriza as ações mais comuns dos usuários. Utilizei micro-interações e feedback visual para criar confiança durante transações financeiras.",
      images: [
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
      ],
      keyFeatures: [
        "Onboarding guiado com verificação de identidade",
        "Dashboard com resumo financeiro personalizado",
        "Transferências via QR code e contatos",
        "Gestão de cartões virtuais instantâneos",
        "Notificações inteligentes de gastos",
        "Modo offline para consultas",
      ],
    },

    frontendSolution: {
      description:
        "Construí o aplicativo com React Native, garantindo performance nativa em ambas as plataformas. Implementei criptografia end-to-end e seguindo as melhores práticas de segurança mobile.",
      liveDemo: "https://apps.apple.com/app/banking-demo",
      githubRepo: "https://github.com/username/mobile-banking",
      technologies: [
        { name: "React Native", icon: "📱" },
        { name: "TypeScript", icon: "📘" },
        { name: "Node.js", icon: "🟢" },
        { name: "MongoDB", icon: "🍃" },
        { name: "Redux", icon: "🔮" },
        { name: "Jest", icon: "🃏" },
      ],
      concepts: [
        "Arquitetura Clean com separação de camadas",
        "State management com Redux Toolkit",
        "Navegação otimizada com React Navigation",
        "Armazenamento seguro com Keychain/Keystore",
        "Autenticação biométrica nativa",
        "Offline-first com sincronização",
        "Animações fluidas com Reanimated",
        "Testes E2E com Detox",
      ],
      metrics: [
        { label: "App Store Rating", value: "4.9⭐" },
        { label: "Performance Score", value: "95" },
        { label: "Crash-free Rate", value: "99.8%" },
      ],
    },

    results: [
      {
        metric: "Adoção",
        value: "50K+",
        description: "Usuários ativos em 3 meses",
      },
      {
        metric: "Tempo de Onboarding",
        value: "2.5min",
        description: "Média de conclusão",
      },
      { metric: "NPS Score", value: "72", description: "Net Promoter Score" },
    ],
  },
  {
    id: "cms-platform",
    title: "Content Management System",
    subtitle: "CMS Moderno com Drag-and-Drop",
    description:
      "Powerful CMS with drag-and-drop interface and multi-language support",
    image: "/images/image.webp",
    thumbnail: "/images/image.webp",
    tags: ["Vue.js", "Firebase", "Sass"],
    device: "tablet",
    gridClass: "md:col-span-1",

    challenge: {
      context:
        "Uma agência de marketing digital gerenciava mais de 50 websites de clientes e precisava de uma solução unificada que permitisse edição de conteúdo sem conhecimento técnico.",
      problem:
        "CMSs tradicionais como WordPress eram lentos e difíceis de customizar. A equipe precisava de flexibilidade total sem comprometer a facilidade de uso.",
      goals: [
        "Interface visual drag-and-drop intuitiva",
        "Suporte para múltiplos idiomas e localização",
        "Sistema de componentes reutilizáveis",
        "Colaboração em tempo real",
        "Publicação instantânea com preview",
      ],
    },

    role: {
      position: "Full-Stack Developer & Product Designer",
      responsibilities: [
        "Design da arquitetura do sistema",
        "Desenvolvimento front-end em Vue.js",
        "Implementação do editor drag-and-drop",
        "Integração com Firebase e cloud storage",
        "Design do sistema de componentes",
      ],
      process: [
        {
          phase: "Discovery & Research",
          description: "Workshops com editores e análise de pain points",
          icon: Search,
        },
        {
          phase: "Prototipagem",
          description: "Iteração rápida com protótipos interativos",
          icon: Lightbulb,
        },
        {
          phase: "Desenvolvimento Core",
          description: "Vue.js 3 com Composition API",
          icon: Code,
        },
        {
          phase: "Beta Testing",
          description: "Testes com 10 clientes beta durante 2 meses",
          icon: CheckCircle,
        },
      ],
    },

    uxSolution: {
      description:
        "Criei um editor visual que abstrai completamente a complexidade técnica. Usuários podem arrastar componentes, editar conteúdo inline e ver mudanças em tempo real, similar ao Figma mas para websites.",
      images: [
        "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
        "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&q=80",
      ],
      keyFeatures: [
        "Editor visual drag-and-drop de componentes",
        "Biblioteca de templates prontos",
        "Edição de conteúdo inline",
        "Preview em múltiplos dispositivos",
        "Gestão de mídia com crop e filtros",
        "Controle de versões e rollback",
      ],
    },

    frontendSolution: {
      description:
        "Desenvolvi a aplicação com Vue.js 3 e Composition API, aproveitando reatividade profunda para sincronização em tempo real. Firebase Firestore garante persistência instantânea e colaboração.",
      liveDemo: "https://cms-demo.example.com",
      githubRepo: "https://github.com/username/vue-cms",
      technologies: [
        { name: "Vue.js 3", icon: "💚" },
        { name: "TypeScript", icon: "📘" },
        { name: "Firebase", icon: "🔥" },
        { name: "Sass", icon: "🎨" },
        { name: "Vite", icon: "⚡" },
        { name: "Pinia", icon: "🍍" },
      ],
      concepts: [
        "Composition API para lógica reutilizável",
        "State management com Pinia",
        "Drag-and-drop com Vue Draggable",
        "Real-time sync com Firestore",
        "Autenticação com Firebase Auth",
        "Storage otimizado com CDN",
        "Build otimizado com Vite",
        "Testes de componentes com Vitest",
      ],
      metrics: [
        { label: "Build Time", value: "3.2s" },
        { label: "Bundle Size", value: "180KB" },
        { label: "Lighthouse Score", value: "96" },
      ],
    },

    results: [
      {
        metric: "Eficiência",
        value: "+80%",
        description: "Redução no tempo de edição",
      },
      {
        metric: "Websites",
        value: "150+",
        description: "Gerenciados na plataforma",
      },
      {
        metric: "Uptime",
        value: "99.9%",
        description: "Disponibilidade do sistema",
      },
    ],
  },
];

export function FeaturedProjects() {
  const { t, i18n } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<
    (typeof projectsData)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: (typeof projectsData)[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  // Get current language data for display
  const getCurrentLangData = (project: (typeof projectsData)[0]) => {
    const currentLang = i18n.language as "en" | "pt";
    return project[currentLang];
  };

  return (
    <>
      <section id="projects" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4 text-white">
              {t("projects.title")}
            </h2>
            <p className="text-xl text-gray-400">{t("projects.subtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projectsData.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`${project.gridClass} group relative cursor-pointer`}
                onClick={() => handleProjectClick(project)}
              >
                <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden backdrop-blur-md bg-linear-to-br from-secondary/50 to-background/50 border border-white/5 p-6 hover:border-accent/30 transition-all duration-500 hover:shadow-[0_0_40px_var(--accent)]">
                  {/* Image Container */}
                  <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                      className="h-full"
                    >
                      <ImageWithFallback
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />

                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-linear-to-t from-accent/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-16 h-16 rounded-full bg-white flex items-center justify-center"
                        >
                          <Eye size={28} className="text-black" />
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl text-white group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-400">
                      {getCurrentLangData(project)?.description}
                    </p>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="border-accent/30 text-accent bg-accent/5 hover:bg-accent/10"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* View Case Study Button */}
                    <div className="pt-2">
                      <div className="inline-flex items-center gap-2 text-accent group-hover:gap-3 transition-all">
                        <span className="text-sm">
                          {t("projects.viewCaseStudy")}
                        </span>
                        <Eye size={16} />
                      </div>
                    </div>
                  </div>

                  {/* Device indicator */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs uppercase tracking-wider">
                    {project.device}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
