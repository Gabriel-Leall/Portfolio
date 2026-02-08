import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Section Transition Component
 * Creates smooth GSAP transitions between sections
 */
export function SectionTransition({
  id,
  variant = "fade-slide",
}: {
  id: string;
  variant?: "fade-slide" | "glitch" | "wipe";
}) {
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!transitionRef.current) return;

    const ctx = gsap.context(() => {
      if (variant === "fade-slide") {
        // Fade and slide up transition
        gsap.fromTo(
          transitionRef.current,
          {
            opacity: 0,
            y: 100,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: transitionRef.current,
              start: "top 85%",
              end: "top 50%",
              scrub: 1,
            },
          },
        );
      } else if (variant === "glitch") {
        // Glitch-style transition with clip-path
        gsap.fromTo(
          transitionRef.current,
          {
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            opacity: 0,
          },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            opacity: 1,
            duration: 1,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: transitionRef.current,
              start: "top 80%",
              end: "top 40%",
              scrub: 1,
            },
          },
        );

        // Add subtle horizontal shift during glitch
        gsap.fromTo(
          transitionRef.current,
          { x: -20 },
          {
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: transitionRef.current,
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
            },
          },
        );
      } else if (variant === "wipe") {
        // Wipe transition with mask
        gsap.fromTo(
          transitionRef.current,
          {
            clipPath: "inset(0 100% 0 0)",
          },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.5,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: transitionRef.current,
              start: "top 75%",
              end: "top 35%",
              scrub: 1,
            },
          },
        );
      }
    }, transitionRef);

    return () => ctx.revert();
  }, [variant]);

  return (
    <div
      ref={transitionRef}
      id={id}
      className="section-transition"
      style={{ willChange: "transform, opacity, clip-path" }}
    />
  );
}
