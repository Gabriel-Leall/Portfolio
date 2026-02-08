import { useEffect, useState } from "react";

/**
 * Hook para detectar preferência de movimento reduzido do usuário
 * Retorna true se o usuário prefere movimento reduzido (prefers-reduced-motion: reduce)
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Define o estado inicial
    setPrefersReducedMotion(mediaQuery.matches);

    // Listener para mudanças
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return prefersReducedMotion;
}
