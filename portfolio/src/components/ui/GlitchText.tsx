import { useRef, useEffect } from "react";
import gsap from "gsap";

interface GlitchTextProps {
  children: string;
  className?: string;
  intensity?: "low" | "medium" | "high";
  continuous?: boolean;
}

export function GlitchText({
  children,
  className = "",
  intensity = "medium",
  continuous = false,
}: GlitchTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const glitchLayer1Ref = useRef<HTMLSpanElement>(null);
  const glitchLayer2Ref = useRef<HTMLSpanElement>(null);

  const intensityValues = {
    low: { offset: 2, duration: 0.1 },
    medium: { offset: 4, duration: 0.15 },
    high: { offset: 8, duration: 0.2 },
  };

  const { offset, duration } = intensityValues[intensity];

  useEffect(() => {
    if (
      !textRef.current ||
      !glitchLayer1Ref.current ||
      !glitchLayer2Ref.current
    )
      return;

    const tl = gsap.timeline({
      repeat: continuous ? -1 : 0,
      repeatDelay: continuous ? 2 : 0,
    });

    const glitchAnimation = () => {
      tl.clear();

      // Cyan layer glitch
      tl.to(glitchLayer1Ref.current, {
        x: gsap.utils.random(-offset, offset),
        y: gsap.utils.random(-offset / 2, offset / 2),
        duration: duration,
        ease: "power2.inOut",
      })
        .to(glitchLayer1Ref.current, {
          x: 0,
          y: 0,
          duration: duration,
        })
        // Magenta layer glitch
        .to(
          glitchLayer2Ref.current,
          {
            x: gsap.utils.random(-offset, offset),
            y: gsap.utils.random(-offset / 2, offset / 2),
            duration: duration,
            ease: "power2.inOut",
          },
          "<",
        )
        .to(glitchLayer2Ref.current, {
          x: 0,
          y: 0,
          duration: duration,
        });
    };

    // Initial glitch on mount
    glitchAnimation();

    // Glitch on hover
    const element = textRef.current;
    const handleMouseEnter = () => glitchAnimation();

    element.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      tl.kill();
    };
  }, [continuous, duration, offset]);

  return (
    <span
      ref={textRef}
      className={`glitch-text relative inline-block ${className}`}
    >
      {/* Cyan layer */}
      <span
        ref={glitchLayer1Ref}
        className="absolute inset-0 text-[#00ffff] mix-blend-screen opacity-70"
        style={{ clipPath: "inset(0 0 50% 0)" }}
        aria-hidden="true"
      >
        {children}
      </span>

      {/* Magenta layer */}
      <span
        ref={glitchLayer2Ref}
        className="absolute inset-0 text-[#ff00ff] mix-blend-screen opacity-70"
        style={{ clipPath: "inset(50% 0 0 0)" }}
        aria-hidden="true"
      >
        {children}
      </span>

      {/* Main text */}
      <span className="relative">{children}</span>
    </span>
  );
}
