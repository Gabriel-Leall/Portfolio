import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./about-split.css";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

export interface ScrollTitleProps {
  text: string; enabled: boolean; id: string; className: string;
}

export default function ScrollTitle({ text, enabled, id, className }: ScrollTitleProps) {
  const heading = useRef<HTMLHeadingElement>(null);
  const visual = useRef<HTMLSpanElement>(null);
  useGSAP((_context, contextSafe) => {
    const element = visual.current;
    if (!element) return;
    // This subtree is owned by GSAP; React owns only the accessible heading label.
    element.textContent = text;
    if (!enabled || !contextSafe) return;
    let cancelled = false;
    let split: SplitText | undefined;
    const media = gsap.matchMedia();
    const create = contextSafe(() => {
      if (cancelled) return;
      media.add("(prefers-reduced-motion: no-preference)", () => {
        split = SplitText.create(element, {
          type: "lines,words,chars", mask: "words", autoSplit: true, aria: "none",
          linesClass: "about-split-line", wordsClass: "about-split-word", charsClass: "about-split-char",
          onSplit(self) {
            // One timeline owns both phases, so reversing the scroll restores the reveal.
            return gsap.timeline({
              scrollTrigger: {
                trigger: heading.current,
                start: "clamp(top 88%)",
                end: "clamp(bottom 48%)",
                scrub: .55,
                invalidateOnRefresh: true,
              },
            })
              .fromTo(self.chars,
                { yPercent: 105, rotationX: -65, opacity: .15 },
                { yPercent: 0, rotationX: 0, opacity: 1, duration: 1, stagger: { amount: 1.3 }, ease: "power3.out" }, 0)
              .fromTo(self.words,
                { color: "var(--accent)" },
                { color: "var(--ink)", duration: .7, stagger: { amount: 1.3 }, ease: "none" }, .35);
          },
        });
        ScrollTrigger.refresh();
        return () => { split?.revert(); split = undefined; };
      });
    });
    void document.fonts.ready.then(create);
    return () => { cancelled = true; media.revert(); element.textContent = text; };
  }, { scope: heading, dependencies: [text, enabled], revertOnUpdate: true });

  return <h2 className={`${className} about-split-title`} id={id} ref={heading} aria-label={text}>
    <span className="motion-title-text" ref={visual} aria-hidden="true"/>
  </h2>;
}
