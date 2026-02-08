import { useState, useEffect, useCallback, useRef } from "react";
import gsap from "gsap";

// Characters for scramble effect
const SCRAMBLE_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/\\`~";

interface UseTextScrambleOptions {
  /** Speed of text reveal per character (in seconds) */
  speed?: number;
  /** Characters to use for scramble effect */
  scrambleChars?: string;
  /** Delay before starting the effect (in seconds) */
  delay?: number;
  /** Whether to start automatically */
  autoStart?: boolean;
}

interface UseTextScrambleReturn {
  /** Current displayed text */
  displayText: string;
  /** Whether the animation is complete */
  isComplete: boolean;
  /** Start the scramble animation */
  start: () => void;
  /** Reset to scrambled state */
  reset: () => void;
}

/**
 * Hook for text scramble/decode effect
 * Text starts as random characters and "decodes" letter by letter
 */
export function useTextScramble(
  targetText: string,
  options: UseTextScrambleOptions = {},
): UseTextScrambleReturn {
  const {
    speed = 0.03,
    scrambleChars = SCRAMBLE_CHARS,
    delay = 0,
    autoStart = false,
  } = options;

  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const resolvedIndexRef = useRef(0);

  // Generate random scrambled text
  const generateScrambledText = useCallback(
    (length: number, resolvedCount: number, originalText: string) => {
      let result = "";
      for (let i = 0; i < length; i++) {
        if (i < resolvedCount) {
          result += originalText[i];
        } else {
          result +=
            scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        }
      }
      return result;
    },
    [scrambleChars],
  );

  // Start the scramble animation
  const start = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    setIsComplete(false);
    resolvedIndexRef.current = 0;

    // Start with fully scrambled text
    setDisplayText(generateScrambledText(targetText.length, 0, targetText));

    const tl = gsap.timeline({
      delay,
      onComplete: () => setIsComplete(true),
    });

    // Animate through each character
    for (let i = 0; i <= targetText.length; i++) {
      tl.call(
        () => {
          resolvedIndexRef.current = i;
          // Quick scramble iterations before resolving each character
          const iterations = 3;
          let count = 0;
          const scrambleInterval = setInterval(() => {
            setDisplayText(
              generateScrambledText(targetText.length, i, targetText),
            );
            count++;
            if (count >= iterations) {
              clearInterval(scrambleInterval);
              setDisplayText(
                generateScrambledText(targetText.length, i, targetText),
              );
            }
          }, speed * 100);
        },
        [],
        i * speed,
      );
    }

    timelineRef.current = tl;
  }, [targetText, speed, delay, generateScrambledText]);

  // Reset to scrambled state
  const reset = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    setIsComplete(false);
    resolvedIndexRef.current = 0;
    setDisplayText(generateScrambledText(targetText.length, 0, targetText));
  }, [targetText, generateScrambledText]);

  // Auto-start if enabled
  useEffect(() => {
    if (autoStart && targetText) {
      start();
    }
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [autoStart, targetText, start]);

  // Initialize with scrambled text
  useEffect(() => {
    if (!autoStart && targetText) {
      setDisplayText(generateScrambledText(targetText.length, 0, targetText));
    }
  }, [targetText, autoStart, generateScrambledText]);

  return {
    displayText,
    isComplete,
    start,
    reset,
  };
}
