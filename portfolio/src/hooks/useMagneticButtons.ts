import { useEffect, type RefObject } from "react";

const targets = ".text-link, .contact-links a, .email-link, .language-switch button, .theme-toggle, .menu-toggle, .case-actions a, .case-back, .footer-contact-button, .footer-nav a";
const clamp = (value: number, limit: number) => Math.max(-limit, Math.min(limit, value));

/** Independent CSS translation leaves entrance/parallax transforms untouched. */
export default function useMagneticButtons(root: RefObject<HTMLElement>, enabled: boolean, routeKey: string) {
  useEffect(() => {
    const container = root.current;
    if (!enabled || !container) return;
    let cancelled = false;
    let dispose = () => {};
    void import("gsap").then(({ gsap }) => {
      if (cancelled) return;
      const media = gsap.matchMedia();
    media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const cleanups: Array<() => void> = [];

      container.querySelectorAll<HTMLElement>(targets).forEach((element) => {
        // Preserve an independently translated control supplied by another feature.
        if (getComputedStyle(element).translate !== "none") return;
        const previousTranslate = element.style.translate;
        const position = { x: 0, y: 0 };
        let restingBounds: DOMRect | undefined;
        let active = false;
        const render = () => { element.style.translate = `${position.x}px ${position.y}px`; };
        const xTo = gsap.quickTo(position, "x", { duration: .3, ease: "power3.out", onUpdate: render });
        const yTo = gsap.quickTo(position, "y", { duration: .3, ease: "power3.out", onUpdate: render });
        const returnX = gsap.quickTo(position, "x", { duration: .7, ease: "elastic.out(1, .45)", onUpdate: render });
        const returnY = gsap.quickTo(position, "y", { duration: .7, ease: "elastic.out(1, .45)", onUpdate: render });
        const stop = () => {
          active = false;
          xTo.tween.pause(); yTo.tween.pause();
          returnX(0); returnY(0);
        };
        const move = (event: PointerEvent) => {
          if (!active || event.pointerType !== "mouse" || document.hidden || !restingBounds || element.matches(":disabled, :focus-visible")) return;
          // Measure once on entry so the moving button cannot pull its own center away.
          const dx = event.clientX - restingBounds.left - restingBounds.width / 2;
          const dy = event.clientY - restingBounds.top - restingBounds.height / 2;
          returnX.tween.pause(); returnY.tween.pause();
          xTo(clamp(dx * .19, 12));
          yTo(clamp(dy * .24, 8));
        };
        const enter = (event: PointerEvent) => {
          if (event.pointerType !== "mouse" || document.hidden || element.matches(":disabled, :focus-visible")) return;
          const bounds = element.getBoundingClientRect();
          restingBounds = new DOMRect(bounds.x - position.x, bounds.y - position.y, bounds.width, bounds.height);
          active = true;
          move(event);
        };
        const reset = () => {
          active = false;
          [xTo, yTo, returnX, returnY].forEach(to => to.tween.pause());
          position.x = 0; position.y = 0;
          element.style.translate = previousTranslate;
        };
        const visibility = () => { if (document.hidden) reset(); };

        element.addEventListener("pointerenter", enter);
        element.addEventListener("pointermove", move, { passive: true });
        element.addEventListener("pointerleave", stop);
        element.addEventListener("pointercancel", reset);
        element.addEventListener("focus", reset);
        element.addEventListener("pointerdown", reset);
        window.addEventListener("scroll", reset, { passive: true });
        window.addEventListener("resize", reset, { passive: true });
        window.addEventListener("blur", reset);
        document.addEventListener("visibilitychange", visibility);
        cleanups.push(() => {
          element.removeEventListener("pointerenter", enter);
          element.removeEventListener("pointermove", move);
          element.removeEventListener("pointerleave", stop);
          element.removeEventListener("pointercancel", reset);
          element.removeEventListener("focus", reset);
          element.removeEventListener("pointerdown", reset);
          window.removeEventListener("scroll", reset);
          window.removeEventListener("resize", reset);
          window.removeEventListener("blur", reset);
          document.removeEventListener("visibilitychange", visibility);
          reset();
          [xTo, yTo, returnX, returnY].forEach(to => to.tween.kill());
        });
      });

      return () => cleanups.forEach(cleanup => cleanup());
      }, container);
      dispose = () => media.revert();
    }).catch(() => {
      // Controls remain usable if the optional motion chunk cannot be loaded.
    });
    return () => { cancelled = true; dispose(); };
  }, [enabled, routeKey, root]);
}
