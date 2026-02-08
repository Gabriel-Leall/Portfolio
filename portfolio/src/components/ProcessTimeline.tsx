import { useRef, useEffect } from "react";
import { Search, Lightbulb, Palette, Code, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionTitle } from "./ui/SectionTitle";

gsap.registerPlugin(ScrollTrigger);

const phases = [
  { key: "discovery", icon: Search },
  { key: "strategy", icon: Lightbulb },
  { key: "design", icon: Palette },
  { key: "development", icon: Code },
  { key: "testing", icon: CheckCircle },
];

export function ProcessTimeline() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );

      // Progressive line draw - Otimizado sem scrub
      gsap.fromTo(
        lineRef.current,
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            once: true,
          },
        },
      );

      // Phase icons stagger animation - Combinado em um único ScrollTrigger
      const phases = phaseRefs.current.filter(Boolean);
      gsap.fromTo(
        phases,
        { opacity: 0, scale: 0, rotation: -45 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: "back.out(2)",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            once: true,
          },
        },
      );

      // Glow effects stagger - Combinado
      const glows = phases
        .map((ref) => ref?.querySelector(".phase-glow"))
        .filter(Boolean);
      gsap.fromTo(
        glows,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 0.5,
          scale: 1.5,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="py-20 relative">
      {/* Section Number - Removed in favor of SectionTitle */}

      <div className="max-w-7xl mx-auto px-6">
        <div ref={titleRef} className="text-center mb-16 opacity-0">
          <SectionTitle
            number="03"
            title={t("process.title")}
            centered
            className="mb-4"
          />
          <p className="text-xl text-muted-foreground">
            {t("process.subtitle")}
          </p>
        </div>

        <div className="relative">
          {/* Animated Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 hidden md:block">
            <svg
              className="w-full h-1"
              viewBox="0 0 100 1"
              preserveAspectRatio="none"
            >
              {/* Background line */}
              <line
                x1="10%"
                y1="0.5"
                x2="90%"
                y2="0.5"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              {/* Animated progress line with GSAP scrub */}
              <line
                ref={lineRef}
                x1="10%"
                y1="0.5"
                x2="90%"
                y2="0.5"
                stroke="var(--accent)"
                strokeWidth="0.5"
                strokeDasharray="1"
                strokeDashoffset="1"
                style={{ filter: "drop-shadow(0 0 4px var(--accent))" }}
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
            {phases.map((phase, index) => {
              const Icon = phase.icon;

              return (
                <div
                  key={phase.key}
                  ref={(el) => {
                    phaseRefs.current[index] = el;
                  }}
                  className="relative opacity-30"
                >
                  <div className="flex flex-col items-center text-center group">
                    {/* Icon Container */}
                    <div className="relative z-10 w-20 h-20 rounded-full bg-secondary/50 border-2 border-accent/30 flex items-center justify-center mb-4 backdrop-blur-md transition-all duration-300 group-hover:border-accent group-hover:shadow-[0_0_30px_var(--accent)]">
                      <Icon
                        size={32}
                        className="text-accent/70 group-hover:text-accent transition-colors duration-300"
                      />

                      {/* Glow effect */}
                      <div className="phase-glow absolute inset-0 rounded-full bg-accent/20 blur-xl opacity-0" />
                    </div>

                    {/* Content */}
                    <h3 className="mb-2 text-white group-hover:text-accent transition-colors duration-300">
                      {t(`process.phases.${phase.key}.title`)}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {t(`process.phases.${phase.key}.desc`)}
                    </p>

                    {/* Number indicator */}
                    <div className="mt-4 w-8 h-8 rounded-full border border-accent/30 bg-accent/10 flex items-center justify-center text-sm text-accent/70">
                      {index + 1}
                    </div>
                  </div>

                  {/* Connecting line for mobile */}
                  {index < phases.length - 1 && (
                    <div className="md:hidden w-0.5 h-8 bg-accent/30 mx-auto my-4" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
