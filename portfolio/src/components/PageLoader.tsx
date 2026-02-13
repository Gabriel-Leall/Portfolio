import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window === "undefined") return true;
    return !window.sessionStorage.getItem("portfolio_loader_seen");
  });
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isLoading) return;

    if (prefersReducedMotion) {
      window.sessionStorage.setItem("portfolio_loader_seen", "1");
      setIsLoading(false);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        window.sessionStorage.setItem("portfolio_loader_seen", "1");
        setIsLoading(false);
      },
    });

    // Glitch effect on loader text
    const glitchText = () => {
      if (!textRef.current) return;
      gsap.to(textRef.current, {
        x: gsap.utils.random(-5, 5),
        duration: 0.05,
        repeat: 5,
        yoyo: true,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(textRef.current, { x: 0 });
        },
      });
    };

    // Progress animation
    tl.to(progressRef.current, {
      width: "100%",
      duration: 0.9,
      ease: "power2.inOut",
      onUpdate: function () {
        if (this.progress() > 0.3 && this.progress() < 0.35) glitchText();
        if (this.progress() > 0.6 && this.progress() < 0.65) glitchText();
        if (this.progress() > 0.9 && this.progress() < 0.95) glitchText();
      },
    });

    // Fade out loader
    tl.to(loaderRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut",
    });

    return () => {
      tl.kill();
    };
  }, [isLoading, prefersReducedMotion]);

  if (!isLoading) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-9999 bg-background flex flex-col items-center justify-center"
    >
      {/* Glitch Text */}
      <div ref={textRef} className="relative mb-8">
        <span className="text-4xl md:text-6xl font-bold text-foreground tracking-wider">
          GABRIEL LEAL
        </span>
        {/* Glitch layers */}
        <span
          className="absolute inset-0 text-4xl md:text-6xl font-bold text-[#00ffff] opacity-50"
          style={{
            clipPath: "inset(0 0 50% 0)",
            transform: "translateX(-2px)",
          }}
        >
          GABRIEL LEAL
        </span>
        <span
          className="absolute inset-0 text-4xl md:text-6xl font-bold text-[#ff00ff] opacity-50"
          style={{ clipPath: "inset(50% 0 0 0)", transform: "translateX(2px)" }}
        >
          GABRIEL LEAL
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-48 h-0.5 bg-white/10 overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-accent"
          style={{ width: "0%" }}
        />
      </div>

      {/* Loading text */}
      <p className="mt-4 text-sm text-muted-foreground font-mono">
        Loading<span className="animate-pulse">...</span>
      </p>
    </div>
  );
}
