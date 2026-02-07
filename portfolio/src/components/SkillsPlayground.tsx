import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionTitle } from "./ui/SectionTitle";
import {
  SiJavascript,
  SiReact,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiNextdotjs,
  SiTailwindcss,
  SiGit,
  SiFigma,
  SiPostgresql,
  SiGreensock,
} from "react-icons/si";

export function SkillsPlayground() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    { name: "JavaScript", icon: SiJavascript },
    { name: "React", icon: SiReact },
    { name: "TypeScript", icon: SiTypescript },
    { name: "Node.js", icon: SiNodedotjs },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "Tailwind", icon: SiTailwindcss },
    { name: "HTML5", icon: SiHtml5 },
    { name: "CSS3", icon: SiCss3 },
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "Git", icon: SiGit },
    { name: "Figma", icon: SiFigma },
    { name: "GSAP", icon: SiGreensock },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="py-32 relative min-h-screen flex flex-col justify-center items-center overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 text-center z-10">
        {/* Title */}
        <div className="mb-4 text-center">
          <SectionTitle
            number="04"
            title={t("skills.title")}
            centered
            className="mb-4"
          />
          <p className="text-xl text-muted-foreground">
            {t("skills.subtitle")}
          </p>
        </div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-12"
        >
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                className="flex flex-col items-center gap-3 group"
              >
                <div className="relative p-4 rounded-xl transition-all duration-300 group-hover:-translate-y-2">
                  <Icon
                    size={48}
                    className="text-white group-hover:text-accent transition-colors duration-300"
                  />
                  {/* Subtle Glow on Hover */}
                  <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75" />
                </div>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-white transition-colors">
                  {skill.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-accent/5 rounded-full blur-3xl opacity-50 animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-50" />
      </div>
    </section>
  );
}
