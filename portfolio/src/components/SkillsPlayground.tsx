import { useRef, useState, useCallback } from "react";
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

// Characters for glitch effect - binary and Japanese
const BINARY_CHARS = "01";
const JAPANESE_CHARS = "アイウエオカキクケコサシスセソタチツテト";
const GLITCH_CHARS = BINARY_CHARS + JAPANESE_CHARS;

// Skill card with glitch hover effect
function GlitchSkillCard({
  name,
  icon: Icon,
}: {
  name: string;
  icon: React.ComponentType<{ size: number; className: string }>;
}) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const originalText = useRef(name);

  // Generate glitched text with binary/Japanese characters
  const generateGlitchedText = useCallback((text: string) => {
    return text
      .split("")
      .map((char) => {
        if (char === " " || char === ".") return char;
        // High chance to replace with Japanese/binary for the "translated" feel
        return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      })
      .join("");
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!textRef.current) return;
    setIsHovering(true);

    // Change to Japanese/glitched text instantly and stay (Stable, no tremor)
    const glitched = generateGlitchedText(originalText.current);
    textRef.current.textContent = glitched;
  }, [generateGlitchedText]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);

    // Restore original text
    if (textRef.current) {
      textRef.current.textContent = originalText.current;
    }
  }, []);

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex flex-col items-center gap-3 group cursor-pointer"
    >
      <div className="relative p-4 rounded-xl transition-all duration-300">
        <Icon
          size={48}
          className={`transition-all duration-300 ${
            isHovering
              ? "text-accent drop-shadow-[0_0_15px_var(--accent)]"
              : "text-white group-hover:text-accent"
          }`}
        />
        {/* Enhanced Glow Effect on Hover */}
        <div
          className={`absolute inset-0 bg-accent/30 blur-xl rounded-full transition-opacity duration-300 scale-75 ${
            isHovering ? "opacity-100" : "opacity-0 group-hover:opacity-70"
          }`}
        />
        {/* Glitch scan line effect */}
        {isHovering && (
          <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-accent/10 to-transparent animate-scan-line" />
          </div>
        )}
      </div>
      <span
        ref={textRef}
        className={`text-sm font-medium transition-all duration-200 ${
          isHovering
            ? "text-accent drop-shadow-[0_0_8px_var(--accent)]"
            : "text-muted-foreground group-hover:text-white"
        }`}
      >
        {name}
      </span>
    </motion.div>
  );
}

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
    hidden: { opacity: 0, y: 30, scale: 0.5, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        type: "spring" as const,
        bounce: 0.3,
      },
    },
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="py-20 relative flex flex-col justify-center items-center overflow-hidden"
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

        {/* Skills Grid with Glitch Hover (NO TREMOR) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-12"
        >
          {skills.map((skill) => (
            <motion.div key={skill.name} variants={itemVariants}>
              <GlitchSkillCard name={skill.name} icon={skill.icon} />
            </motion.div>
          ))}
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
