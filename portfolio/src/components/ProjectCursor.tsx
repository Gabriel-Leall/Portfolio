import { useRef, type RefObject } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { MousePointer2 } from "lucide-react";
import "./project-cursor.css";

gsap.registerPlugin(useGSAP);

export interface ProjectCursorProps {
  target?: RefObject<HTMLAnchorElement>;
  root?: RefObject<HTMLElement>;
  routeKey?: string;
  label: string;
  enabled: boolean;
}

const magneticTargets = ".text-link, .contact-links a, .email-link, .language-switch button, .theme-toggle, .menu-toggle, .case-actions a, .case-back, .footer-contact-button, .footer-links a, .footer-nav a, [data-magnetic]";

export default function ProjectCursor({ target, root, routeKey, label, enabled }: ProjectCursorProps) {
  const cursor = useRef<HTMLSpanElement>(null);
  const ring = useRef<HTMLSpanElement>(null);
  const dot = useRef<HTMLSpanElement>(null);
  useGSAP((_context, contextSafe) => {
    const link = target?.current;
    const container = root?.current ?? link?.closest<HTMLElement>("main") ?? link;
    const pointer = cursor.current;
    const outline = ring.current;
    const point = dot.current;
    if (!enabled || !container || !pointer || !outline || !point || !contextSafe) return;
    const media = gsap.matchMedia();
    media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      let visible = false;
      let activeControl: HTMLElement | null = null;
      let bounds: DOMRect | undefined;
      let preview = false;
      gsap.set(outline, { xPercent: -50, yPercent: -50 });
      const xTo = gsap.quickTo(outline, "x", { duration: .22, ease: "power3.out" });
      const yTo = gsap.quickTo(outline, "y", { duration: .22, ease: "power3.out" });
      const dotX = gsap.quickSetter(point, "x", "px");
      const dotY = gsap.quickSetter(point, "y", "px");
      const shape = contextSafe((control: HTMLElement | null, isPreview: boolean) => {
        activeControl = control;
        bounds = control?.getBoundingClientRect();
        preview = isPreview;
        pointer.dataset.state = isPreview ? "preview" : control ? "magnetic" : "idle";
        if (link) {
          if (isPreview) link.dataset.projectCursor = "active";
          else delete link.dataset.projectCursor;
        }
        gsap.to(outline, {
          width: bounds ? Math.min(260, bounds.width + 12) : 24,
          height: bounds ? Math.min(80, bounds.height + 10) : 24,
          borderRadius: bounds ? 4 : 50,
          duration: .28, ease: "power3.out", overwrite: "auto",
        });
      });
      const over = contextSafe((event: PointerEvent) => {
        if (event.pointerType !== "mouse" || !(event.target instanceof Element)) return;
        pointer.dataset.surface = event.target.closest(".footer-eye") ? "light" : event.target.closest(".footer-portal") ? "dark" : "auto";
        const control = event.target.closest<HTMLElement>(magneticTargets);
        const usableControl = control && container.contains(control) && !control.matches(":disabled, [aria-disabled=true], :focus-visible") ? control : null;
        const isPreview = !!link?.contains(event.target);
        if (usableControl !== activeControl || isPreview !== preview) shape(usableControl, isPreview);
      });
      const move = contextSafe((event: PointerEvent) => {
        if (event.pointerType !== "mouse" || document.hidden) return;
        if (!visible) {
          over(event);
          visible = true;
          container.dataset.magneticCursor = "active";
          gsap.set(pointer, { opacity: 1 });
          gsap.set(outline, { x: event.clientX, y: event.clientY });
        }
        dotX(event.clientX); dotY(event.clientY);
        if (activeControl && bounds) {
          const centerX = bounds.left + bounds.width / 2;
          const centerY = bounds.top + bounds.height / 2;
          // Cache the resting rect rather than letting the ring chase the button's translation.
          xTo(centerX + (event.clientX - centerX) * .16);
          yTo(centerY + (event.clientY - centerY) * .16);
        } else {
          xTo(event.clientX); yTo(event.clientY);
        }
      });
      const hide = contextSafe(() => {
        visible = false;
        activeControl = null;
        bounds = undefined;
        preview = false;
        if (link) delete link.dataset.projectCursor;
        delete container.dataset.magneticCursor;
        pointer.dataset.state = "idle";
        gsap.set(pointer, { opacity: 0 });
        xTo.tween.pause(); yTo.tween.pause();
        gsap.killTweensOf(outline, "width,height,borderRadius");
        gsap.set(outline, { width: 24, height: 24, borderRadius: 50 });
      });
      const visibility = () => { if (document.hidden) hide(); };
      container.addEventListener("pointerover", over);
      container.addEventListener("pointermove", move, { passive: true });
      container.addEventListener("pointerleave", hide);
      container.addEventListener("pointercancel", hide);
      container.addEventListener("focusin", hide);
      window.addEventListener("scroll", hide, { passive: true });
      window.addEventListener("resize", hide, { passive: true });
      window.addEventListener("blur", hide);
      document.addEventListener("visibilitychange", visibility);
      return () => {
        hide();
        container.removeEventListener("pointerover", over);
        container.removeEventListener("pointermove", move);
        container.removeEventListener("pointerleave", hide);
        container.removeEventListener("pointercancel", hide);
        container.removeEventListener("focusin", hide);
        window.removeEventListener("scroll", hide);
        window.removeEventListener("resize", hide);
        window.removeEventListener("blur", hide);
        document.removeEventListener("visibilitychange", visibility);
      };
    });
    return () => media.revert();
  }, { scope: cursor, dependencies: [enabled, label, target, root, routeKey], revertOnUpdate: true });

  return enabled ? createPortal(<span className="project-cursor" data-state="idle" ref={cursor} aria-hidden="true">
    <span className="cursor-ring" ref={ring}/>
    <span className="cursor-point" ref={dot}><span className="cursor-dot"/><span className="cursor-project-label"><MousePointer2 size={28}/><span>{label}</span></span></span>
  </span>, document.body) : null;
}
