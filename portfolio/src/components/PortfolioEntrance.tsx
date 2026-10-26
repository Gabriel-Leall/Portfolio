import { useEffect, useId, useMemo, useRef } from "react";
import { ArrowRight } from "lucide-react";
import type { Locale } from "../content/projects";
import createGargantaGeometry from "./gargantaGeometry";
import "./portfolio-entrance.css";

export default function PortfolioEntrance({ locale, onReveal, onComplete }: {
  locale: Locale;
  onReveal: () => void;
  onComplete: (focusContent?: boolean) => void;
}) {
  const overlay = useRef<HTMLDivElement>(null);
  const finishRef = useRef<(focus?: boolean) => void>(() => {});
  const maskId = useId();
  const viewport = useRef({ width: window.innerWidth, height: window.innerHeight });
  const { width, height } = viewport.current;
  const geometry = useMemo(() => createGargantaGeometry(width, height), [width, height]);
  const initialShape = geometry.frame(0, 0, 0);
  const pt = locale === "pt";

  useEffect(() => {
    const surface = overlay.current;
    if (!surface) return;
    let disposed = false;
    let finished = false;
    let context: { revert: () => void } | undefined;
    const finish = (focus = false) => {
      if (disposed || finished) return;
      finished = true;
      window.clearTimeout(deadline);
      context?.revert();
      surface.style.visibility = "hidden";
      onReveal();
      onComplete(focus || surface.contains(document.activeElement));
    };
    finishRef.current = finish;
    // Fail open if the optional motion runtime never becomes ready.
    const deadline = window.setTimeout(() => finish(), 2500);
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") finish(true); };
    const hide = () => { if (document.hidden) finish(); };
    const resize = () => finish();
    document.addEventListener("keydown", escape);
    document.addEventListener("visibilitychange", hide);
    window.addEventListener("resize", resize);

    async function start() {
      const core = await import("gsap");
      if (disposed || finished) return;
      if (document.hidden || matchMedia("(prefers-reduced-motion: reduce)").matches) { finish(); return; }
      const gsap = core.gsap;
      const aperture = surface!.querySelector<SVGPathElement>(".entrance-aperture")!;
      const voidShape = surface!.querySelector<SVGPathElement>(".entrance-void")!;
      const rim = surface!.querySelector<SVGPathElement>(".entrance-rim")!;
      const facets = surface!.querySelectorAll<SVGPathElement>(".entrance-facet");
      const depth = surface!.querySelector<SVGGElement>(".entrance-depth")!;
      const progress = { formation: 0, opening: 0, approach: 0 };
      const draw = () => {
        const shape = geometry.frame(progress.formation, progress.opening, progress.approach);
        aperture.setAttribute("d", shape.aperture);
        voidShape.setAttribute("d", shape.aperture);
        rim.setAttribute("d", shape.rim);
        facets.forEach((path, i) => path.setAttribute("d", shape.facets[i]));
      };
      surface!.dataset.phase = "forming";
      context = gsap.context(() => {
        const sequence = gsap.timeline({ defaults: { ease: "power2.inOut" }, onComplete: () => finish() });
        // Preserve the fracture/separation shape while completing the overlay in ~1.45s.
        sequence.timeScale(1.8);
        sequence
          .addLabel("fracture", .08)
          .to(progress, { formation: 1, duration: .62, ease: "power2.out", onUpdate: draw }, "fracture")
          .to(depth, { opacity: 1, duration: .38 }, "fracture+=.2")
          .addLabel("separate", .62)
          .call(() => { surface!.dataset.phase = "separating"; }, [], "separate")
          .to(progress, { opening: .38, duration: .48, onUpdate: draw }, "separate")
          .to(progress, { opening: 1, duration: .62, ease: "power2.in", onUpdate: draw }, 1.12)
          .addLabel("enter", 1.57)
          .call(() => { surface!.dataset.phase = "entering"; onReveal(); }, [], "enter")
          .to(progress, { approach: 1, duration: 1.02, ease: "power3.inOut", onUpdate: draw }, "enter")
          .to(voidShape, { opacity: 0, duration: .65, ease: "power2.inOut" }, "enter+=.18")
          .to(depth, { opacity: 0, duration: .25 }, "enter+=.68")
          .to(rim, { opacity: 0, duration: .2 }, "enter+=.8")
          .to(surface!.querySelector(".entrance-skip"), { opacity: 0, duration: .15 }, "enter+=.88");
      }, surface!);
    }
    void start().catch(() => finish());
    return () => {
      disposed = true;
      window.clearTimeout(deadline);
      document.removeEventListener("keydown", escape);
      document.removeEventListener("visibilitychange", hide);
      window.removeEventListener("resize", resize);
      context?.revert();
      finishRef.current = () => {};
    };
  }, [onReveal, onComplete, geometry]);

  return <div className="portfolio-entrance" ref={overlay} style={{ width, height }} data-phase="preparing">
    <svg className="entrance-stage" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={width} height={height} style={{ maskType: "luminance" }}>
          <rect width={width} height={height} fill="white"/>
          <path className="entrance-aperture" d={initialShape.aperture} fill="black"/>
        </mask>
      </defs>
      <rect className="entrance-paper" width={width} height={height} mask={`url(#${maskId})`}/>
      <path className="entrance-void" d={initialShape.aperture}/>
      <g className="entrance-depth">
        {Array.from({ length: geometry.facetCount }, (_, i) => <path className={`entrance-facet entrance-facet-${i % 4}`} key={i} d={initialShape.facets[i]}/>)}
      </g>
      <path className="entrance-rim" d={initialShape.rim} vectorEffect="non-scaling-stroke"/>
    </svg>
    <button type="button" className="entrance-skip" onClick={() => finishRef.current(true)}>
      {pt ? "Pular abertura" : "Skip intro"}<ArrowRight size={18} aria-hidden="true"/>
    </button>
  </div>;
}
