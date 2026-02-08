import { useRef, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "./ui/magnetic-button";
import { useTranslation } from "react-i18next";
import LightRays from "./ui/LightRays";
import { GlitchText } from "./ui/GlitchText";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLSpanElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [showRays, setShowRays] = useState(false);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Initial entrance animation
      const tl = gsap.timeline({ delay: 1.8 }); // After page loader

      tl.fromTo(
        nameRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 40, skewY: 3 },
          { opacity: 1, y: 0, skewY: 0, duration: 1, ease: "power3.out" },
          "-=0.4",
        )
        .fromTo(
          descriptionRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.5",
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.3",
        );

      // Retornando para scrub para garantir que a animação reverta corretamente ao voltar
      gsap.to(backgroundRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Content fade com scrub para reaparecer ao subir
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let idleId: number | null = null;
    const schedule = () => setShowRays(true);

    const win = window as Window & {
      requestIdleCallback?: (cb: IdleRequestCallback) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (win.requestIdleCallback) {
      idleId = win.requestIdleCallback(schedule);
    } else {
      idleId = window.setTimeout(schedule, 600);
    }

    return () => {
      if (idleId !== null) {
        if (win.cancelIdleCallback) {
          win.cancelIdleCallback(idleId);
        } else {
          clearTimeout(idleId);
        }
      }
    };
  }, []);

  const handleScrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    projectsSection?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleLanguage = () => {
    const next = i18n.language === "pt" ? "en" : "pt";
    i18n.changeLanguage(next);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Light Rays Background with Parallax */}
      <div ref={backgroundRef} className="absolute inset-0 z-0">
        {showRays && (
          <LightRays
            raysOrigin="top-center"
            raysColor="#00d4ff"
            raysSpeed={0.8}
            lightSpread={0.5}
            rayLength={1.8}
            pulsating={true}
            fadeDistance={1.2}
            saturation={0.8}
            followMouse={true}
            mouseInfluence={0.15}
            noiseAmount={0.1}
            distortion={0.1}
          />
        )}
      </div>

      {/* Section Number */}
      <div className="absolute top-8 left-8 z-20 font-mono text-foreground/70 dark:text-white/40 text-sm">
        <span className="text-accent">00.</span> Home
      </div>

      {/* Theme & Language Toggles */}
      <div className="absolute top-8 right-8 z-20 flex items-center gap-3">
        <button
          onClick={toggleLanguage}
          className="px-3 py-1 rounded-full border border-accent/30 text-accent hover:bg-accent/10 transition-colors text-sm"
          aria-label={t("navigation.language")}
          title={t("navigation.language")}
        >
          {i18n.language === "pt" ? t("navigation.en") : t("navigation.pt")}
        </button>

        <AnimatedThemeToggler />
      </div>

      <div
        ref={contentRef}
        className="max-w-6xl mx-auto px-6 text-center relative z-10"
      >
        {/* Name */}
        <span
          ref={nameRef}
          className="block text-4xl md:text-4xl lg:text-4xl mb-6 text-muted-foreground opacity-0"
        >
          {t("hero.name")}
        </span>

        {/* Headline with Glitch Effect */}
        <h1 className="mb-6">
          <span ref={headlineRef} className="block opacity-0">
            <GlitchText
              className="text-6xl md:text-7xl lg:text-8xl text-foreground font-bold"
              intensity="high"
              continuous={false}
            >
              {t("hero.headline")}
            </GlitchText>
          </span>
        </h1>

        {/* Description */}
        <p
          ref={descriptionRef}
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto opacity-0"
        >
          {t("hero.description")}
        </p>

        {/* CTA */}
        <div ref={ctaRef} className="opacity-0 flex justify-center">
          <MagneticButton>
            <button
              className="bg-accent/80 hover:bg-accent transition-colors px-10 text-lg text-secondary py-4 rounded-full flex items-center gap-2"
              onClick={handleScrollToProjects}
            >
              {t("hero.cta.viewProjects")}
              <ArrowRight size={20} />
            </button>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
