import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { brandPaths } from "./BrandGlyph";

gsap.registerPlugin(useGSAP, MorphSVGPlugin);

const forms = [
  brandPaths,
  ["M126 24L32 120L126 216V174L72 120L126 66Z", "M142 24V66L196 120L142 174V216L236 120Z"],
  ["M110 24L88 64L108 82L74 112L96 132L78 166L110 216L106 160L120 130L102 112L128 82L104 68Z", "M154 24L174 70L150 88L180 120L158 146L174 174L144 216L148 160L132 136L150 118L128 90L154 66Z"],
] as const;

export default function MorphingMark() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const surface = root.current;
    if (!surface) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const paths = surface.querySelectorAll<SVGPathElement>(".mark-contour");
      const group = surface.querySelector(".mark-shapes");
      const timeline = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.8, defaults: { ease: "expo.inOut" } });
      forms.slice(1).concat([forms[0]]).forEach((form, index) => {
        const start = index === 0 ? 1.8 : "+=1.2";
        timeline.addLabel(`form-${index}`, start);
        paths.forEach((path, part) => timeline.to(path, { morphSVG: { shape: form[part], shapeIndex: "auto" }, duration: .9 }, `form-${index}`));
        timeline.fromTo(group, { x: index % 2 ? -4 : 4 }, { x: 0, duration: .35 }, `form-${index}+=.55`);
      });
      let visible = false;
      const synchronize = () => { if (visible && !document.hidden) timeline.play(); else timeline.pause(); };
      const observer = new IntersectionObserver(entries => {
        visible = entries.some(entry => entry.isIntersecting);
        synchronize();
      }, { threshold: .15 });
      observer.observe(surface);
      document.addEventListener("visibilitychange", synchronize);
      return () => { observer.disconnect(); document.removeEventListener("visibilitychange", synchronize); };
    }, surface);
    return () => media.revert();
  }, { scope: root });

  return <div className="contact-mark" ref={root} aria-hidden="true">
    <svg viewBox="0 0 256 240" fill="currentColor" focusable="false">
      <g className="mark-shapes">{brandPaths.map((path, index) => <path className="mark-contour" d={path} key={index}/>)}</g>
    </svg>
  </div>;
}
