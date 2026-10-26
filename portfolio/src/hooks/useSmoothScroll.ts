import { useCallback, useEffect, useRef } from "react";
import type Lenis from "lenis";

/** One scroll clock, shared with ScrollTrigger; native input remains the fallback. */
export default function useSmoothScroll(enabled: boolean, paused: boolean) {
  const engine = useRef<Lenis | null>(null);
  const pause = useRef(paused);
  pause.current = paused;

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    let dispose = () => {};
    void Promise.all([import("lenis"), import("gsap"), import("gsap/ScrollTrigger")])
      .then(([module, core, plugin]) => {
        if (cancelled) return;
        const gsap = core.gsap;
        gsap.registerPlugin(plugin.ScrollTrigger);
        const lenis = new module.default({
          autoRaf: false,
          lerp: .1,
          smoothWheel: true,
          syncTouch: false,
          anchors: { offset: -32 },
        });
        engine.current = lenis;
        const update = (time: number) => lenis.raf(time * 1000);
        const scroll = () => plugin.ScrollTrigger.update();
        const visibility = () => {
          if (document.hidden || pause.current) lenis.stop();
          else { lenis.resize(); lenis.start(); }
        };
        lenis.on("scroll", scroll);
        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);
        document.addEventListener("visibilitychange", visibility);
        visibility();
        dispose = () => {
          document.removeEventListener("visibilitychange", visibility);
          gsap.ticker.remove(update);
          lenis.off("scroll", scroll);
          lenis.destroy();
          if (engine.current === lenis) engine.current = null;
        };
      }).catch(() => { /* An optional scroll runtime must never block the page. */ });
    return () => { cancelled = true; dispose(); };
  }, [enabled]);

  useEffect(() => {
    if (paused || document.hidden) engine.current?.stop();
    else engine.current?.start();
  }, [paused]);

  const jumpTo = useCallback((target: number | HTMLElement) => {
    if (engine.current) {
      engine.current.resize();
      engine.current.scrollTo(target, { immediate: true, force: true });
    } else if (typeof target === "number") window.scrollTo({ top: target, behavior: "instant" });
    else target.scrollIntoView({ behavior: "instant" });
  }, []);

  return jumpTo;
}
