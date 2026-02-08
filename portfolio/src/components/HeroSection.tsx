import { useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "./ui/magnetic-button";
import { useTranslation } from "react-i18next";
import LightRays from "./ui/LightRays";
import { GlitchText } from "./ui/GlitchText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLSpanElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

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

      // Otimizado: Parallax simplificado sem scrub
      gsap.to(backgroundRef.current, {
        yPercent: 20,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          once: true,
        },
      });

      // Otimizado: Content fade sem scrub
      gsap.to(contentRef.current, {
        opacity: 0.3,
        y: -30,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    projectsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Light Rays Background with Parallax */}
      <div ref={backgroundRef} className="absolute inset-0 z-0">
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
      </div>

      {/* Section Number */}
      <div className="absolute top-8 left-8 z-20 font-mono text-white/40 text-sm">
        <span className="text-accent">00.</span> Home
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
