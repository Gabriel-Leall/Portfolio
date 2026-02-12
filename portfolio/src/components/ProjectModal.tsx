import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Github } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

interface ProjectDetail {
  id: string;
  title: string;
  banner?: string;
  tags: string[];
  en: {
    subtitle: string;
    description: string;
    summary: string;
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
    summary: string;
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

interface ProjectModalProps {
  project: ProjectDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const { i18n } = useTranslation();

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!project) return null;

  const currentLang = i18n.language as "en" | "pt";
  const langData = project[currentLang];

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-9998"
          />

          {/* Modal Container */}
          <div
            className="fixed inset-0 z-9999 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-background/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X size={16} className="text-white/70 hover:text-white" />
              </button>

              {/* Content */}
              <div className="p-8 space-y-6">
                {/* Header */}
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">
                    {project.title}
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    {langData.subtitle}
                  </p>
                </div>

                {/* Summary - Objetivo Alcançado */}
                <div className="bg-accent/10 border border-accent/20 rounded-xl p-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-accent mb-2">
                    {currentLang === "pt"
                      ? "Objetivo Alcançado"
                      : "Achievement"}
                  </h3>
                  <p className="text-foreground/90 leading-relaxed">
                    {langData.summary}
                  </p>
                </div>

                {/* Objective */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
                    {currentLang === "pt"
                      ? "Sobre o Projeto"
                      : "About the Project"}
                  </h3>
                  <p className="text-foreground/90 leading-relaxed">
                    {langData.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
                    {currentLang === "pt" ? "Tecnologias" : "Technologies"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-sm bg-white/5 border border-white/10 rounded-full text-foreground/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Results */}
                {langData.results.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
                      {currentLang === "pt" ? "Resultados" : "Results"}
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {langData.results.map((result, index) => (
                        <div
                          key={index}
                          className="bg-white/5 border border-white/5 rounded-xl p-4 text-center"
                        >
                          <div className="text-2xl font-bold text-accent mb-1">
                            {result.value}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {result.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  {langData.frontendSolution.liveDemo && (
                    <Button
                      className="flex-1 bg-accent hover:bg-accent/90 text-background font-medium"
                      onClick={() =>
                        window.open(
                          langData.frontendSolution.liveDemo,
                          "_blank",
                        )
                      }
                    >
                      <ExternalLink size={16} className="mr-2" />
                      {currentLang === "pt" ? "Ver Demo" : "View Demo"}
                    </Button>
                  )}
                  {langData.frontendSolution.githubRepo && (
                    <Button
                      variant="outline"
                      className="flex-1 border-white/20 hover:bg-white/5"
                      onClick={() =>
                        window.open(
                          langData.frontendSolution.githubRepo,
                          "_blank",
                        )
                      }
                    >
                      <Github size={16} className="mr-2" />
                      {currentLang === "pt" ? "Ver Código" : "View Code"}
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
