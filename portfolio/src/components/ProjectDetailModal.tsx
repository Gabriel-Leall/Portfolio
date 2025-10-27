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
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTranslation } from "react-i18next";

interface ProjectDetail {
  id: string;
  title: string;
  banner?: string;
  en: {
    subtitle: string;
    description: string;
    challenge: {
      context: string;
      problem: string;
      goals: string[];
    };
    role: {
      position: string;
      responsibilities: string[];
      process: {
        phase: string;
        description: string;
        icon: any;
      }[];
    };
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
  };
  pt: {
    subtitle: string;
    description: string;
    challenge: {
      context: string;
      problem: string;
      goals: string[];
    };
    role: {
      position: string;
      responsibilities: string[];
      process: {
        phase: string;
        description: string;
        icon: any;
      }[];
    };
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
  };
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
  const { t, i18n } = useTranslation();
  if (!project) return null;

  // Get current language data
  const currentLang = i18n.language as "en" | "pt";
  const langData = project[currentLang];

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
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-100"
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-101 overflow-y-auto">
            <div className="flex min-h-full items-start justify-center p-4 pt-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-6xl backdrop-blur-md bg-background/95 rounded-2xl border border-white/10 shadow-2xl"
              >
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors group"
                >
                  <X size={20} className="text-white group-hover:text-accent" />
                </button>

                {/* Modal Body */}
                <div className="overflow-hidden">
                  {/* Banner Image */}
                  {project.banner && (
                    <div className="relative h-64 w-full overflow-hidden">
                      <ImageWithFallback
                        src={project.banner}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-b from-transparent to-background/95" />
                    </div>
                  )}

                  <div className="p-8 space-y-12">
                    {/* Header */}
                    <div className="text-center space-y-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <h1 className="text-4xl md:text-5xl text-white mb-2">
                          {project.title}
                        </h1>
                        <p className="text-xl text-accent">
                          {langData.subtitle}
                        </p>
                      </motion.div>
                    </div>

                    {/* The Challenge */}
                    <section>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center">
                          <Target size={24} className="text-accent" />
                        </div>
                        <h3 className="text-3xl text-white">
                          {t("projectModal.challenge.title")}
                        </h3>
                      </div>

                      <div className="ml-15 space-y-6">
                        <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/5">
                          <h4 className="text-accent mb-3">
                            {t("projectModal.challenge.context")}
                          </h4>
                          <p className="text-gray-300">
                            {langData.challenge.context}
                          </p>
                        </div>

                        <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/5">
                          <h4 className="text-accent mb-3">
                            {t("projectModal.challenge.problem")}
                          </h4>
                          <p className="text-gray-300">
                            {langData.challenge.problem}
                          </p>
                        </div>

                        <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/5">
                          <h4 className="text-accent mb-3">
                            {t("projectModal.challenge.goals")}
                          </h4>
                          <div className="space-y-2">
                            {langData.challenge.goals.map(
                              (goal: string, index: number) => (
                                <div
                                  key={index}
                                  className="flex items-start gap-3"
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                                  <span className="text-gray-300">{goal}</span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </section>

                    <Separator className="bg-white/5" />

                    {/* My Role & Process */}
                    <section>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center">
                          <Users size={24} className="text-accent" />
                        </div>
                        <h3 className="text-3xl text-white">
                          {t("projectModal.role.title")}
                        </h3>
                      </div>

                      <div className="ml-15 space-y-6">
                        <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/5">
                          <h4 className="text-accent mb-3">
                            {t("projectModal.role.position")}:{" "}
                            {langData.role.position}
                          </h4>
                          <div className="space-y-2">
                            {langData.role.responsibilities.map(
                              (resp: string, index: number) => (
                                <div
                                  key={index}
                                  className="flex items-start gap-3"
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                                  <span className="text-gray-300">{resp}</span>
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          {langData.role.process.map(
                            (step: any, index: number) => {
                              const Icon = step.icon;
                              return (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/5 hover:border-accent/30 transition-all"
                                >
                                  <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                                      <Icon size={20} className="text-accent" />
                                    </div>
                                    <h5 className="text-white">{step.phase}</h5>
                                  </div>
                                  <p className="text-sm text-gray-400">
                                    {step.description}
                                  </p>
                                </motion.div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </section>

                    <Separator className="bg-white/5" />

                    {/* Front-End Solution */}
                    <section>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center">
                          <Code size={24} className="text-accent" />
                        </div>
                        <h3 className="text-3xl text-white">
                          {t("projectModal.frontend.title")}
                        </h3>
                      </div>

                      <div className="ml-15 space-y-6">
                        <p className="text-gray-300 text-lg">
                          {langData.frontendSolution.description}
                        </p>

                        {/* Demo & Code Links */}
                        <div className="flex flex-wrap gap-4">
                          {langData.frontendSolution.liveDemo && (
                            <Button
                              className="bg-accent hover:bg-accent/90 text-black group"
                              onClick={() =>
                                window.open(
                                  langData.frontendSolution.liveDemo,
                                  "_blank"
                                )
                              }
                            >
                              <Play
                                className="mr-2 group-hover:scale-110 transition-transform"
                                size={18}
                              />
                              {t("projectModal.frontend.liveDemo")}
                            </Button>
                          )}
                          {langData.frontendSolution.githubRepo && (
                            <Button
                              variant="outline"
                              className="border-accent/30 text-accent hover:bg-accent/10"
                              onClick={() =>
                                window.open(
                                  langData.frontendSolution.githubRepo,
                                  "_blank"
                                )
                              }
                            >
                              <Github className="mr-2" size={18} />
                              {t("projectModal.frontend.viewCode")}
                            </Button>
                          )}
                        </div>

                        {/* Concepts & Best Practices */}
                        <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/5">
                          <h4 className="text-accent mb-4">
                            {t("projectModal.frontend.concepts")}
                          </h4>
                          <div className="grid md:grid-cols-2 gap-3">
                            {langData.frontendSolution.concepts.map(
                              (concept: string, index: number) => (
                                <div
                                  key={index}
                                  className="flex items-start gap-2"
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                                  <span className="text-gray-300">
                                    {concept}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        {/* Performance Metrics */}
                        <div className="grid md:grid-cols-3 gap-4">
                          {langData.frontendSolution.metrics.map(
                            (metric: any, index: number) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="backdrop-blur-md bg-linear-to-br from-accent/10 to-primary/10 rounded-xl p-6 border border-accent/30 text-center"
                              >
                                <div className="text-3xl text-accent mb-2">
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
                    {langData.results.length > 0 && (
                      <>
                        <Separator className="bg-white/5" />
                        <section>
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center">
                              <Target size={24} className="text-accent" />
                            </div>
                            <h3 className="text-3xl text-white">
                              {t("projectModal.results.title")}
                            </h3>
                          </div>
                          <div className="ml-15 grid md:grid-cols-3 gap-6">
                            {langData.results.map(
                              (result: any, index: number) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: index * 0.1 }}
                                  className="backdrop-blur-md bg-white/5 rounded-xl p-6 border border-white/5 text-center"
                                >
                                  <div className="text-4xl text-accent mb-2">
                                    {result.value}
                                  </div>
                                  <div className="text-white mb-2">
                                    {result.metric}
                                  </div>
                                  <div className="text-sm text-gray-400">
                                    {result.description}
                                  </div>
                                </motion.div>
                              )
                            )}
                          </div>
                        </section>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
