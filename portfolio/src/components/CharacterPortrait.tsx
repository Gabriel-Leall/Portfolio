import { useEffect, useRef, useState } from "react";
import type { Locale } from "../content/projects";
import "./character-portrait.css";

const appearances = [
  { id: "base", src: "/images/characters/gabriel-base-800.webp", pt: "Personagem ilustrado de Gabriel Leal, com roupa preta e uma das mãos aberta", en: "Illustrated character of Gabriel Leal in black clothing, with one hand open" },
  { id: "one-piece", src: "/images/characters/gabriel-one-piece-800.webp", pt: "Personagem de Gabriel Leal em uma versão inspirada em One Piece", en: "Gabriel Leal's character in an appearance inspired by One Piece" },
  { id: "bleach", src: "/images/characters/gabriel-bleach-800.webp", pt: "Personagem de Gabriel Leal em uma versão inspirada em Bleach, com a espada Zangetsu", en: "Gabriel Leal's character in an appearance inspired by Bleach, with the Zangetsu sword" },
];
const portraitSizes = "(max-width: 600px) 280px, (max-width: 900px) 340px, 360px";
const portraitSources = (src: string) => `${src.replace("-800.webp", "-480.webp")} 480w, ${src} 800w`;
const decoded = new Set<string>();
const loading = new Map<string, Promise<boolean>>();

function prepareImage(src: string) {
  if (decoded.has(src)) return Promise.resolve(true);
  const pending = loading.get(src);
  if (pending) return pending;
  const image = new Image();
  image.sizes = portraitSizes;
  image.srcset = portraitSources(src);
  image.src = src;
  const ready = image.decode().then(() => {
    decoded.add(src);
    return true;
  }).catch(() => {
    loading.delete(src);
    return false;
  });
  loading.set(src, ready);
  return ready;
}

export default function CharacterPortrait({ locale, animated }: { locale: Locale; animated: boolean }) {
  const [appearance, setAppearance] = useState(0);
  const current = useRef(0);
  const entrances = useRef(0);
  const frame = useRef<HTMLDivElement>(null);
  const character = appearances[appearance];
  const pt = locale === "pt";

  useEffect(() => {
    const surface = frame.current;
    if (!animated || !surface) return;
    let disposed = false;
    let cleanup = () => {};

    async function initialize() {
      const { gsap } = await import("gsap");
      if (disposed || !surface) return;
      const hover = matchMedia("(hover: hover) and (pointer: fine)");
      const image = surface.querySelector<HTMLImageElement>(".character-image")!;
      const slices = surface.querySelectorAll<HTMLElement>(".character-slice");
      let context: ReturnType<typeof gsap.context> | undefined;

      const stop = () => {
        context?.revert();
        context = undefined;
        gsap.set([image, ...slices], { clearProps: "transform,translate,rotate,scale,willChange,opacity,visibility" });
        delete surface.dataset.glitch;
      };
      const preload = () => {
        if (hover.matches) appearances.forEach(item => { void prepareImage(item.src); });
      };
      // Decode below-the-fold variants near the portrait, never on initial hero load.
      const observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) preload();
        else stop();
      }, { rootMargin: "150px" });
      observer.observe(surface);

      const enter = (event: PointerEvent) => {
        if (event.pointerType !== "mouse" || !hover.matches || document.hidden || !image.complete || !image.naturalWidth) return;
        stop();
        preload();
        entrances.current += 1;
        const next = (current.current + 1) % appearances.length;
        // Every second entry changes the outfit. A slow/failed image keeps the current one.
        const change = entrances.current % 2 === 0 && decoded.has(appearances[next].src);
        surface.dataset.glitch = "active";
        context = gsap.context(() => {
          const timeline = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: stop });
          timeline
            .set(image, { x: -2, skewX: -.8, willChange: "transform" }, 0)
            .set(slices, { autoAlpha: .85, willChange: "transform, opacity" }, 0)
            .to(slices, { x: i => i % 2 ? -12 : 10, duration: .055, ease: "steps(1)" }, 0)
            .set(image, { x: 2, skewX: .8 }, .055)
            .set(slices, { x: i => i % 2 ? 8 : -7 }, .085)
            .call(() => {
              if (change) { current.current = next; setAppearance(next); }
            }, [], .1)
            .set(image, { x: -1, skewX: 0 }, .115)
            .set(slices, { x: i => i % 2 ? -4 : 3, autoAlpha: .6 }, .14)
            .to(slices, { x: 0, autoAlpha: 0, duration: .08 }, .2)
            .to(image, { x: 0, skewX: 0, duration: .1 }, .18);
        }, surface);
      };
      const hide = () => { if (document.hidden) stop(); };
      const pointerChange = () => { if (!hover.matches) stop(); };
      surface.addEventListener("pointerenter", enter);
      surface.addEventListener("pointerleave", stop);
      surface.addEventListener("pointercancel", stop);
      document.addEventListener("visibilitychange", hide);
      window.addEventListener("blur", stop);
      hover.addEventListener("change", pointerChange);
      cleanup = () => {
        observer.disconnect();
        surface.removeEventListener("pointerenter", enter);
        surface.removeEventListener("pointerleave", stop);
        surface.removeEventListener("pointercancel", stop);
        document.removeEventListener("visibilitychange", hide);
        window.removeEventListener("blur", stop);
        hover.removeEventListener("change", pointerChange);
        stop();
      };
    }
    void initialize().catch(() => { /* A failed animation import leaves the portrait visible. */ });
    return () => { disposed = true; cleanup(); };
  }, [animated]);

  return <figure className="portrait portrait-character">
    <div ref={frame} className="character-frame" data-appearance={character.id}>
      <img className="character-image" src={character.src} srcSet={portraitSources(character.src)} sizes={portraitSizes} width="1024" height="1536" alt={pt ? character.pt : character.en} loading="lazy" decoding="async"/>
      {[0, 1, 2].map(slice => <span className={"character-slice character-slice-" + slice} aria-hidden="true" key={slice}>
        <img src={character.src} srcSet={portraitSources(character.src)} sizes={portraitSizes} width="1024" height="1536" alt="" loading="lazy" decoding="async"/>
      </span>)}
    </div>
    <figcaption>Gabriel Leal <span>{pt ? "Desenvolvedor front-end" : "Front-end developer"}</span></figcaption>
  </figure>;
}
