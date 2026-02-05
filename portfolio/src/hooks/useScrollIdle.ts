import { useEffect, useState, useRef } from "react";

interface UseScrollIdleOptions {
  idleDelay?: number; // milliseconds before considered idle
  onIdle?: () => void;
  onScroll?: () => void;
}

export function useScrollIdle(options: UseScrollIdleOptions = {}) {
  const { idleDelay = 500, onIdle, onScroll } = options;
  const [isIdle, setIsIdle] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Mark as scrolling
      if (isIdle) {
        setIsIdle(false);
        onScroll?.();
      }

      // Set timeout for idle detection
      timeoutRef.current = setTimeout(() => {
        setIsIdle(true);
        onIdle?.();
      }, idleDelay);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, [idleDelay, isIdle, onIdle, onScroll]);

  return isIdle;
}
