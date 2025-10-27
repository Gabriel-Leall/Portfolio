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
  Github,
  ExternalLink,
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
    id: "barber-schedule",
    title: "BarberSchedule",
    image: "/images/barberschedule_thumb_large.webp",
    thumbnail: "/images/barberschedule_thumb_large.webp",
    banner: "/images/barberschedule_thumb_large.webp",
    tags: ["React", "Node.js", "TypeScript", "MongoDB", "Stripe", "Socket.io"],
    gridClass: "md:col-span-1",

    en: {
      subtitle: "Multi-Barbershop SaaS Booking Platform",
      description:
        "Complete SaaS solution for barbershops with booking system, customer portal, and barbershop dashboard for management.",
      challenge: {
        context:
          "Barbershops needed a unified platform where multiple establishments could manage their appointments, while customers could easily browse and book services across different locations.",
        problem:
          "Traditional booking systems were either too expensive, too complex, or lacked the multi-tenant architecture needed for a SaaS solution. Barbershops struggled with no-shows and customers had difficulty finding available slots.",
        goals: [
          "Create a multi-tenant SaaS platform for barbershops",
          "Build intuitive booking system for customers",
          "Develop comprehensive dashboard for barbershop management",
          "Implement real-time availability updates",
          "Integrate payment processing and notifications",
          "Ensure mobile-first responsive design",
        ],
      },
      role: {
        position: "Front-End Developer & Product Designer",
        responsibilities: [
          "Full-stack architecture design and implementation",
          "Development of customer booking interface",
          "Creation of barbershop admin dashboard",
          "Real-time notification system implementation",
          "Payment integration with Stripe",
          "Database design and optimization",
        ],
        process: [
          {
            phase: "Research & Planning",
            description: "User interviews with barbershop owners and customers",
            icon: Search,
          },
          {
            phase: "UI/UX Design",
            description: "Dual interface design for customers and barbershops",
            icon: Palette,
          },
          {
            phase: "Full-Stack Development",
            description: "React frontend with Node.js backend",
            icon: Code,
          },
          {
            phase: "Testing & Launch",
            description: "Beta testing with 5 barbershops",
            icon: CheckCircle,
          },
        ],
      },
      frontendSolution: {
        description:
          "I built a modern, responsive SaaS platform with React and TypeScript. The customer portal allows users to browse barbershops, view available time slots in real-time, and book appointments. The barbershop dashboard provides complete management tools including appointment calendar, customer management, service configuration, and analytics.",
        liveDemo: "https://barberschedule-demo.vercel.app",
        githubRepo: "https://github.com/username/barber-schedule",
        technologies: [
          { name: "React 18", icon: "⚛️" },
          { name: "TypeScript", icon: "📘" },
          { name: "Node.js", icon: "🟢" },
          { name: "MongoDB", icon: "🍃" },
          { name: "Stripe", icon: "💳" },
          { name: "Socket.io", icon: "🔌" },
        ],
        concepts: [
          "Multi-tenant SaaS architecture",
          "Real-time updates with WebSockets",
          "Role-based access control (RBAC)",
          "Payment processing with Stripe",
          "RESTful API design",
          "JWT authentication",
          "Email and SMS notifications",
          "Calendar integration",
        ],
        metrics: [
          { label: "Response Time", value: "<200ms" },
          { label: "Uptime", value: "99.8%" },
          { label: "User Satisfaction", value: "4.8/5" },
        ],
      },
      results: [
        {
          metric: "Barbershops",
          value: "50+",
          description: "Active establishments on platform",
        },
        {
          metric: "Bookings",
          value: "10K+",
          description: "Monthly appointments scheduled",
        },
        {
          metric: "No-shows",
          value: "-65%",
          description: "Reduction with SMS reminders",
        },
      ],
    },

    pt: {
      subtitle: "Plataforma SaaS Multi-Barbearias",
      description:
        "Solução SaaS completa para barbearias com sistema de agendamento, portal do cliente e dashboard de gestão.",
      challenge: {
        context:
          "Barbearias precisavam de uma plataforma unificada onde múltiplos estabelecimentos pudessem gerenciar seus agendamentos, enquanto clientes pudessem facilmente navegar e agendar serviços em diferentes localizações.",
        problem:
          "Sistemas de agendamento tradicionais eram muito caros, muito complexos ou não tinham a arquitetura multi-tenant necessária para uma solução SaaS. Barbearias enfrentavam problemas com faltas e clientes tinham dificuldade em encontrar horários disponíveis.",
        goals: [
          "Criar uma plataforma SaaS multi-tenant para barbearias",
          "Construir sistema de agendamento intuitivo para clientes",
          "Desenvolver dashboard completo para gestão de barbearias",
          "Implementar atualizações de disponibilidade em tempo real",
          "Integrar processamento de pagamentos e notificações",
          "Garantir design responsivo mobile-first",
        ],
      },
      role: {
        position: "Desenvolvedor Front-End & Designer de Produto",
        responsibilities: [
          "Arquitetura e implementação full-stack",
          "Desenvolvimento da interface de agendamento do cliente",
          "Criação do dashboard administrativo das barbearias",
          "Implementação de sistema de notificações em tempo real",
          "Integração de pagamentos com Stripe",
          "Design e otimização de banco de dados",
        ],
        process: [
          {
            phase: "Pesquisa & Planejamento",
            description: "Entrevistas com donos de barbearias e clientes",
            icon: Search,
          },
          {
            phase: "Design UI/UX",
            description: "Design de interface dupla para clientes e barbearias",
            icon: Palette,
          },
          {
            phase: "Desenvolvimento Full-Stack",
            description: "Frontend React com backend Node.js",
            icon: Code,
          },
          {
            phase: "Testes & Lançamento",
            description: "Testes beta com 5 barbearias",
            icon: CheckCircle,
          },
        ],
      },
      frontendSolution: {
        description:
          "Construí uma plataforma SaaS moderna e responsiva com React e TypeScript. O portal do cliente permite aos usuários navegar pelas barbearias, visualizar horários disponíveis em tempo real e agendar compromissos. O dashboard da barbearia fornece ferramentas completas de gestão incluindo calendário de agendamentos, gerenciamento de clientes, configuração de serviços e analytics.",
        liveDemo: "https://barberschedule-demo.vercel.app",
        githubRepo: "https://github.com/username/barber-schedule",
        technologies: [
          { name: "React 18", icon: "⚛️" },
          { name: "TypeScript", icon: "📘" },
          { name: "Node.js", icon: "🟢" },
          { name: "MongoDB", icon: "🍃" },
          { name: "Stripe", icon: "💳" },
          { name: "Socket.io", icon: "🔌" },
        ],
        concepts: [
          "Arquitetura SaaS multi-tenant",
          "Atualizações em tempo real com WebSockets",
          "Controle de acesso baseado em funções (RBAC)",
          "Processamento de pagamentos com Stripe",
          "Design de API RESTful",
          "Autenticação JWT",
          "Notificações por email e SMS",
          "Integração de calendário",
        ],
        metrics: [
          { label: "Tempo de Resposta", value: "<200ms" },
          { label: "Uptime", value: "99.8%" },
          { label: "Satisfação", value: "4.8/5" },
        ],
      },
      results: [
        {
          metric: "Barbearias",
          value: "50+",
          description: "Estabelecimentos ativos na plataforma",
        },
        {
          metric: "Agendamentos",
          value: "10K+",
          description: "Consultas mensais agendadas",
        },
        {
          metric: "Faltas",
          value: "-65%",
          description: "Redução com lembretes SMS",
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

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      {getCurrentLangData(project)?.frontendSolution?.liveDemo && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(getCurrentLangData(project)?.frontendSolution?.liveDemo, "_blank");
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-black rounded-lg transition-all text-sm font-medium"
                        >
                          <ExternalLink size={16} />
                          Demo
                        </button>
                      )}
                      {getCurrentLangData(project)?.frontendSolution?.githubRepo && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(getCurrentLangData(project)?.frontendSolution?.githubRepo, "_blank");
                          }}
                          className="flex items-center gap-2 px-4 py-2 border border-accent/30 text-accent hover:bg-accent/10 rounded-lg transition-all text-sm font-medium"
                        >
                          <Github size={16} />
                          GitHub
                        </button>
                      )}
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
