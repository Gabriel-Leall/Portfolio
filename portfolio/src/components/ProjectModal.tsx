import { motion, AnimatePresence } from "motion/react";
import {
  X,
  ExternalLink,
  Github,
  Play,
  Code,
  Zap,
  Target,
  Users,
  Lightbulb,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";

interface ProjectDetail {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: string;

  // The Challenge
  challenge: {
    context: string;
    problem: string;
    goals: string[];
  };

  // My Role & Process
  role: {
    position: string;
    responsibilities: string[];
    process: {
      phase: string;
      description: string;
      icon: any;
    }[];
  };

  // UI/UX Solution
  uxSolution: {
    description: string;
    figmaEmbed?: string;
    images: string[];
    keyFeatures: string[];
  };

  // Front-End Solution
  frontendSolution: {
    description: string;
    liveDemo?: string;
    githubRepo?: string;
    technologies: {
      name: string;
      icon: string;
    }[];
    concepts: string[];
    metrics: {
      label: string;
      value: string;
    }[];
  };

  results: {
    metric: string;
    value: string;
    description: string;
  }[];
}

interface ProjectDetailModalProps {
  project: ProjectDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetailModal({
  project,
  isOpen,
  onClose,
}: ProjectDetailModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-[101] overflow-y-auto">
            <div className="min-h-full flex items-start justify-center p-4 md:p-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-6xl bg-gradient-to-br from-background-light to-background rounded-2xl border border-white/10 shadow-2xl my-8"
              >
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all z-10 group"
                >
                  <X
                    size={20}
                    className="text-gray-400 group-hover:text-white"
                  />
                </button>

                {/* Header */}
                <div className="relative h-80 rounded-t-2xl overflow-hidden">
                  <ImageWithFallback
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-4xl md:text-5xl text-white mb-2"
                    >
                      {project.title}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-xl text-gray-400"
                    >
                      {project.subtitle}
                    </motion.p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-12">
                  {/* The Challenge */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                        <Target size={24} className="text-primary" />
                      </div>
                      <h3 className="text-3xl text-white">O Desafio</h3>
                    </div>

                    <div className="space-y-4 ml-15">
                      <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/5">
                        <h4 className="text-primary mb-2">Contexto</h4>
                        <p className="text-gray-300">
                          {project.challenge.context}
                        </p>
                      </div>

                      <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/5">
                        <h4 className="text-primary mb-2">
                          Problema de Negócio
                        </h4>
                        <p className="text-gray-300">
                          {project.challenge.problem}
                        </p>
                      </div>

                      <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/5">
                        <h4 className="text-primary mb-3">Objetivos</h4>
                        <ul className="space-y-2">
                          {project.challenge.goals.map((goal, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                              <span className="text-gray-300">{goal}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>

                  <Separator className="bg-white/5" />

                  {/* My Role & Process */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                        <Users size={24} className="text-primary" />
                      </div>
                      <h3 className="text-3xl text-white">
                        Minha Função & Processo
                      </h3>
                    </div>

                    <div className="ml-15 space-y-6">
                      <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/5">
                        <h4 className="text-primary mb-3">
                          Posição: {project.role.position}
                        </h4>
                        <div className="space-y-2">
                          {project.role.responsibilities.map((resp, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                              <span className="text-gray-300">{resp}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        {project.role.process.map((step, index) => {
                          const Icon = step.icon;
                          return (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/5 hover:border-primary/30 transition-all"
                            >
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                  <Icon size={20} className="text-primary" />
                                </div>
                                <h5 className="text-white">{step.phase}</h5>
                              </div>
                              <p className="text-sm text-gray-400">
                                {step.description}
                              </p>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </section>

                  <Separator className="bg-white/5" />

                  {/* UI/UX Solution */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                        <Lightbulb size={24} className="text-primary" />
                      </div>
                      <h3 className="text-3xl text-white">Solução de UI/UX</h3>
                    </div>

                    <div className="ml-15 space-y-6">
                      <p className="text-gray-300 text-lg">
                        {project.uxSolution.description}
                      </p>

                      {/* Figma Embed */}
                      {project.uxSolution.figmaEmbed && (
                        <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/5">
                          <h4 className="text-primary mb-4">
                            Protótipo Interativo do Figma
                          </h4>
                          <div className="aspect-video rounded-lg overflow-hidden bg-black/20">
                            <iframe
                              src={project.uxSolution.figmaEmbed}
                              className="w-full h-full"
                              allowFullScreen
                            />
                          </div>
                        </div>
                      )}

                      {/* Screenshots */}
                      <div className="grid md:grid-cols-2 gap-4">
                        {project.uxSolution.images.map((img, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="rounded-xl overflow-hidden border border-white/5"
                          >
                            <ImageWithFallback
                              src={img}
                              alt={`Design ${index + 1}`}
                              className="w-full h-auto"
                            />
                          </motion.div>
                        ))}
                      </div>

                      {/* Key Features */}
                      <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/5">
                        <h4 className="text-primary mb-4">
                          Funcionalidades Principais
                        </h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          {project.uxSolution.keyFeatures.map(
                            (feature, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                <span className="text-gray-300">{feature}</span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </section>

                  <Separator className="bg-white/5" />

                  {/* Front-End Solution */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                        <Code size={24} className="text-primary" />
                      </div>
                      <h3 className="text-3xl text-white">
                        Solução de Front-End
                      </h3>
                    </div>

                    <div className="ml-15 space-y-6">
                      <p className="text-gray-300 text-lg">
                        {project.frontendSolution.description}
                      </p>

                      {/* Demo & Code Links */}
                      <div className="flex flex-wrap gap-4">
                        {project.frontendSolution.liveDemo && (
                          <Button
                            className="bg-primary hover:bg-primary-hover text-black group"
                            onClick={() =>
                              window.open(
                                project.frontendSolution.liveDemo,
                                "_blank"
                              )
                            }
                          >
                            <Play
                              className="mr-2 group-hover:scale-110 transition-transform"
                              size={18}
                            />
                            Demo ao Vivo
                          </Button>
                        )}
                        {project.frontendSolution.githubRepo && (
                          <Button
                            variant="outline"
                            className="border-primary/30 text-primary hover:bg-primary/10"
                            onClick={() =>
                              window.open(
                                project.frontendSolution.githubRepo,
                                "_blank"
                              )
                            }
                          >
                            <Github className="mr-2" size={18} />
                            Ver Código no GitHub
                          </Button>
                        )}
                      </div>

                      {/* Technologies */}
                      <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/5">
                        <h4 className="text-primary mb-4 flex items-center gap-2">
                          <Zap size={18} />
                          Tecnologias Utilizadas
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {project.frontendSolution.technologies.map(
                            (tech, index) => (
                              <Badge
                                key={index}
                                className="bg-primary/10 border border-primary/30 text-primary px-4 py-2 hover:bg-primary/20"
                              >
                                <span className="mr-2">{tech.icon}</span>
                                {tech.name}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>

                      {/* Concepts & Best Practices */}
                      <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/5">
                        <h4 className="text-primary mb-4">
                          Conceitos & Boas Práticas
                        </h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          {project.frontendSolution.concepts.map(
                            (concept, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                <span className="text-gray-300">{concept}</span>
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      {/* Performance Metrics */}
                      <div className="grid md:grid-cols-3 gap-4">
                        {project.frontendSolution.metrics.map(
                          (metric, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 }}
                              className="backdrop-blur-md bg-gradient-to-br from-primary/10 to-primary-hover/10 rounded-xl p-6 border border-primary/30 text-center"
                            >
                              <div className="text-3xl text-primary mb-2">
                                {metric.value}
                              </div>
                              <div className="text-sm text-gray-400">
                                {metric.label}
                              </div>
                            </motion.div>
                          )
                        )}
                      </div>
                    </div>
                  </section>

                  {/* Results */}
                  {project.results.length > 0 && (
                    <>
                      <Separator className="bg-white/5" />
                      <section>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                            <Target size={24} className="text-primary" />
                          </div>
                          <h3 className="text-3xl text-white">Resultados</h3>
                        </div>
                        <div className="ml-15 grid md:grid-cols-3 gap-6">
                          {project.results.map((result, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.9 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 }}
                              className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/5 text-center"
                            >
                              <div className="text-4xl text-primary mb-2">
                                {result.value}
                              </div>
                              <div className="text-white mb-2">
                                {result.metric}
                              </div>
                              <div className="text-sm text-gray-400">
                                {result.description}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </section>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
