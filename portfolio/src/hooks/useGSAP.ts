import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseGSAPOptions {
  scope?: React.RefObject<HTMLElement>;
  dependencies?: unknown[];
}

export function useGSAP(
  callback: (context: gsap.Context) => void,
  options: UseGSAPOptions = {},
) {
  const { scope, dependencies = [] } = options;
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      callback(ctx);
    }, scope?.current || undefined);

    contextRef.current = ctx;

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return contextRef;
}

// Helper to create scroll-triggered animations with scrub
export function createScrollAnimation(
  element: gsap.TweenTarget,
  animationProps: gsap.TweenVars,
  triggerOptions: ScrollTrigger.Vars,
) {
  return gsap.to(element, {
    ...animationProps,
    scrollTrigger: {
      scrub: true,
      ...triggerOptions,
    },
  });
}
