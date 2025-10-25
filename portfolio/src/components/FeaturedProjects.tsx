import { motion } from "motion/react";
import { useState } from "react";
import {
  Eye,
  Github,
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

const projectsData = [
  {
    id: "ecommerce-dashboard",
    title: "E-Commerce Dashboard",
    subtitle: "Plataforma Completa de Análise e Gestão",
    description:
      "Modern admin dashboard with real-time analytics and inventory management",
    image:
      "https://images.unsplash.com/photo-1660833638050-41f95d8b94e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBtb2NrdXAlMjBkZXNpZ258ZW58MXx8fHwxNzYxMzMxNTgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["React", "TypeScript", "Tailwind", "Chart.js"],
    device: "laptop",
    gridClass: "md:col-span-2 md:row-span-2",

    challenge: {
      context:
        "Uma empresa de e-commerce em rápido crescimento precisava de uma solução robusta para gerenciar mais de 10.000 produtos, rastrear vendas em tempo real e obter insights acionáveis sobre o comportamento do cliente.",
      problem:
        "O sistema legado era lento, não escalável e não fornecia visualizações de dados em tempo real. Os gerentes perdiam horas compilando relatórios manualmente, resultando em decisões de negócio atrasadas.",
      goals: [
        "Reduzir o tempo de carregamento do dashboard em 70%",
        "Implementar análises em tempo real com WebSockets",
        "Criar visualizações de dados interativas e intuitivas",
        "Otimizar para dispositivos móveis e tablets",
        "Garantir acessibilidade WCAG 2.1 AA",
      ],
    },

    role: {
      position: "Front-End Lead Developer & UX Designer",
      responsibilities: [
        "Liderança técnica da equipe de 4 desenvolvedores front-end",
        "Arquitetura da aplicação React com TypeScript",
        "Design e implementação do sistema de design",
        "Pesquisa de usuários e testes de usabilidade",
        "Otimização de performance e acessibilidade",
      ],
      process: [
        {
          phase: "Pesquisa de Usuários",
          description: "Entrevistas com 15 gerentes e análise de comportamento",
          icon: Search,
        },
        {
          phase: "Wireframes & Protótipos",
          description: "Design iterativo no Figma com 5 rodadas de feedback",
          icon: Palette,
        },
        {
          phase: "Desenvolvimento",
          description: "Implementação em React com arquitetura modular",
          icon: Code,
        },
        {
          phase: "Testes & QA",
          description:
            "Testes automatizados e manuais em múltiplos dispositivos",
          icon: CheckCircle,
        },
      ],
    },

    uxSolution: {
      description:
        "Criei um sistema de design completo baseado em componentes reutilizáveis, com foco em hierarquia visual clara e navegação intuitiva. A interface foi otimizada para reduzir a carga cognitiva através de agrupamento lógico de informações e uso estratégico de cor.",
      figmaEmbed:
        "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/sample",
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      ],
      keyFeatures: [
        "Dashboard customizável com widgets drag-and-drop",
        "Filtros avançados com busca instantânea",
        "Gráficos interativos com drill-down",
        "Modo escuro com transição suave",
        "Notificações em tempo real não-intrusivas",
        "Exportação de relatórios em múltiplos formatos",
      ],
    },

    frontendSolution: {
      description:
        "Desenvolvi uma aplicação React altamente performática utilizando as melhores práticas modernas. Implementei code-splitting, lazy loading e memoization estratégica para garantir tempos de carregamento rápidos mesmo com grandes volumes de dados.",
      liveDemo: "https://demo-ecommerce-dashboard.example.com",
      githubRepo: "https://github.com/username/ecommerce-dashboard",
      technologies: [
        { name: "React 18", icon: "⚛️" },
        { name: "TypeScript", icon: "📘" },
        { name: "Tailwind CSS", icon: "🎨" },
        { name: "Chart.js", icon: "📊" },
        { name: "React Query", icon: "🔄" },
        { name: "Socket.io", icon: "🔌" },
      ],
      concepts: [
        "Componentização avançada com Atomic Design",
        "Estado global gerenciado com Context API + Hooks",
        "Otimização de re-renders com React.memo e useMemo",
        "Code-splitting por rota com React.lazy",
        "Cache inteligente com React Query",
        "WebSockets para atualizações em tempo real",
        "Testes unitários com Jest e React Testing Library",
        "CI/CD com GitHub Actions",
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
        description: "Redução no tempo de geração de relatórios",
      },
      {
        metric: "Satisfação",
        value: "4.8/5",
        description: "Avaliação dos usuários",
      },
    ],
  },
  {
    id: "mobile-banking",
    title: "Mobile Banking App",
    subtitle: "Experiência Bancária Segura e Intuitiva",
    description:
      "Secure and intuitive mobile banking experience with biometric authentication",
    image:
      "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYxMjUyNDQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
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
    image:
      "https://images.unsplash.com/photo-1649150849645-92fba77775a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJsZXQlMjBkZXZpY2UlMjBzY3JlZW58ZW58MXx8fHwxNzYxMjk2ODY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
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
              Featured Projects
            </h2>
            <p className="text-xl text-gray-400">
              A selection of my recent work
            </p>
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
                <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden backdrop-blur-md bg-gradient-to-br from-background-secondary/50 to-background-primary/50 border border-white/5 p-6 hover:border-accent-cyan/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,212,255,0.2)]">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-accent-cyan/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
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
                    <h3 className="text-2xl text-white group-hover:text-accent-cyan transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-400">{project.description}</p>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="border-accent-cyan/30 text-accent-cyan bg-accent-cyan/5 hover:bg-accent-cyan/10"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* View Case Study Button */}
                    <div className="pt-2">
                      <div className="inline-flex items-center gap-2 text-accent-cyan group-hover:gap-3 transition-all">
                        <span className="text-sm">Ver Case Study</span>
                        <Eye size={16} />
                      </div>
                    </div>
                  </div>

                  {/* Device indicator */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan text-xs uppercase tracking-wider">
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
