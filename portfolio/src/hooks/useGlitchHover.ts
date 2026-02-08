import { useRef, useCallback } from "react";
import gsap from "gsap";

// Characters for glitch effect
const BINARY_CHARS = "01";
const JAPANESE_CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
const GLITCH_CHARS = BINARY_CHARS + JAPANESE_CHARS;

interface UseGlitchHoverOptions {
  /** Duration of tremor effect (in seconds) */
  tremorDuration?: number;
  /** Intensity of tremor (in pixels) */
  tremorIntensity?: number;
  /** Duration of character flash (in ms) */
  charFlashDuration?: number;
  /** Number of character flash iterations */
  charFlashIterations?: number;
}

interface UseGlitchHoverReturn {
  /** Ref to attach to the text element */
  textRef: React.RefObject<HTMLElement | null>;
  /** Handler for mouse enter */
  onMouseEnter: () => void;
  /** Handler for mouse leave */
  onMouseLeave: () => void;
}

/**
 * Hook for glitch hover effect with tremor and character transformation
 * Uses GSAP RoughEase for trembling and flashes binary/japanese characters
 */
export function useGlitchHover(
  originalText: string,
  options: UseGlitchHoverOptions = {},
): UseGlitchHoverReturn {
  const {
    tremorDuration = 0.3,
    tremorIntensity = 2,
    charFlashDuration = 50,
    charFlashIterations = 3,
  } = options;

  const textRef = useRef<HTMLElement | null>(null);
  const originalTextRef = useRef(originalText);
  const isAnimatingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Generate glitched text
  const generateGlitchedText = useCallback((text: string) => {
    return text
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        // 50% chance to replace with glitch character
        if (Math.random() > 0.5) {
          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        }
        return char;
      })
      .join("");
  }, []);

  const onMouseEnter = useCallback(() => {
    if (!textRef.current || isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const element = textRef.current;
    originalTextRef.current = element.textContent || originalText;

    // Tremor effect using GSAP
    gsap.to(element, {
      x: `random(-${tremorIntensity}, ${tremorIntensity})`,
      y: `random(-${tremorIntensity / 2}, ${tremorIntensity / 2})`,
      duration: tremorDuration,
      ease: "rough({ strength: 0.5, points: 20, template: none, taper: none, randomize: true, clamp: false })",
      onComplete: () => {
        gsap.to(element, { x: 0, y: 0, duration: 0.1 });
      },
    });

    // Character flash effect
    let iteration = 0;
    const flashInterval = setInterval(() => {
      if (iteration >= charFlashIterations) {
        clearInterval(flashInterval);
        if (element) {
          element.textContent = originalTextRef.current;
        }
        isAnimatingRef.current = false;
        return;
      }

      // Flash glitched characters
      element.textContent = generateGlitchedText(originalTextRef.current);

      // Brief pause then flash again
      timeoutRef.current = setTimeout(() => {
        if (element) {
          element.textContent = originalTextRef.current;
        }
      }, charFlashDuration / 2);

      iteration++;
    }, charFlashDuration);

    // Cleanup on unmount
    return () => {
      clearInterval(flashInterval);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    originalText,
    tremorDuration,
    tremorIntensity,
    charFlashDuration,
    charFlashIterations,
    generateGlitchedText,
  ]);

  const onMouseLeave = useCallback(() => {
    if (!textRef.current) return;

    // Reset to original text
    textRef.current.textContent = originalTextRef.current;

    // Cancel tremor animation
    gsap.killTweensOf(textRef.current);
    gsap.to(textRef.current, { x: 0, y: 0, duration: 0.1 });

    isAnimatingRef.current = false;
  }, []);

  return {
    textRef,
    onMouseEnter,
    onMouseLeave,
  };
}
