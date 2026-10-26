import { useEffect, useRef, type RefObject } from "react";

const clamp = (min: number, max: number, value: number) => Math.min(max, Math.max(min, value));

/** Motion is an enhancement: disabling it restores the original DOM styles. */
export default function usePortfolioMotion(
  rootRef: RefObject<HTMLElement>,
  enabled: boolean,
  routeKey: string,
  onActive: (index: number) => void,
  introduction: "pending" | "play" | "skip" = "play",
) {
  const activeCallback = useRef(onActive);
  const introductionPlayed = useRef(false);
  activeCallback.current = onActive;

  useEffect(() => {
    const root = rootRef.current;
    if (!enabled || !root) return;
    let cancelled = false;
    let dispose = () => {};

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("gsap/ScrambleTextPlugin"), import("gsap/CustomEase")]).then(([core, plugin, scramble, curve]) => {
      if (cancelled) return;
      const gsap = core.gsap;
      const ScrollTrigger = plugin.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger, scramble.ScrambleTextPlugin, curve.CustomEase);
      curve.CustomEase.create("portfolio-reveal", "0.05,0.7,0.1,1");
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", (context) => {
        const cleanups: Array<() => void> = [];
        const timers = new Set<number>();
        let active = true;
        let callbackId = 0;
        const safe = <T extends (...args: never[]) => unknown>(callback: T): T =>
          context.add(`callback${callbackId++}`, (...args: Parameters<T>) => {
            if (active && !cancelled) return callback(...args);
          }) as T;
        const listen = (
          target: EventTarget,
          name: string,
          callback: EventListener,
          options?: AddEventListenerOptions | boolean,
        ) => {
          target.addEventListener(name, callback, options);
          cleanups.push(() => target.removeEventListener(name, callback, options));
        };
        const later = (callback: () => void, delay: number) => {
          const id = window.setTimeout(() => {
            timers.delete(id);
            if (active && !cancelled) callback();
          }, delay);
          timers.add(id);
          return id;
        };
        const clearTimer = (id: number | undefined) => {
          if (id !== undefined) { window.clearTimeout(id); timers.delete(id); }
        };
        const hero = root.querySelector<HTMLElement>(".hero-name");
        const letters = Array.from(root.querySelectorAll<HTMLElement>(".hero-name .letter"));
        const heroStage = root.querySelector<HTMLElement>(".hero-stage");
        let entrance: gsap.core.Timeline | undefined;
        let entering = false;
        let letterRects: DOMRect[] = [];
        let pointerFrame = 0;
        let pointerPosition = { x: 0, y: 0 };
        const letterMotion = letters.map((letter) => {
          const originalVariation = letter.style.fontVariationSettings;
          const weight = { value: 900 };
          const weightTo = gsap.quickTo(weight, "value", {
            duration: 0.45, ease: "power3.out",
            onUpdate: () => { letter.style.fontVariationSettings = `'wght' ${weight.value}, 'wdth' 75`; },
          });
          const yTo = gsap.quickTo(letter, "y", { duration: 0.45, ease: "power3.out" });
          const rotateTo = gsap.quickTo(letter, "rotation", { duration: 0.45, ease: "power3.out" });
          cleanups.push(() => { letter.style.fontVariationSettings = originalVariation; });
          return { weight, weightTo, yTo, rotateTo };
        });
        const measureLetters = () => { letterRects = letters.map((letter) => letter.getBoundingClientRect()); };
        const resetLetters = () => letterMotion.forEach(({ weightTo, yTo, rotateTo }) => {
          weightTo(900); yTo(0); rotateTo(0);
        });
        const drawLetters = safe(() => {
          pointerFrame = 0;
          const radius = Math.min(300, window.innerWidth * 0.23);
          letterRects.forEach((rect, index) => {
            const dx = pointerPosition.x - (rect.left + rect.width / 2);
            const dy = pointerPosition.y - (rect.top + rect.height / 2);
            const proximity = Math.max(0, 1 - Math.hypot(dx, dy) / radius);
            letterMotion[index].weightTo(900 - proximity * 400);
            letterMotion[index].yTo(-proximity * 22);
            letterMotion[index].rotateTo(clamp(-1, 1, dx / radius) * proximity * 7);
          });
        });
        if (hero && letters.length) {
          measureLetters();
          listen(hero, "pointerenter", measureLetters);
          listen(hero, "pointermove", ((event: PointerEvent) => {
            if (entering || event.pointerType !== "mouse" || document.hidden || window.innerWidth < 760) return;
            pointerPosition = { x: event.clientX, y: event.clientY };
            if (!pointerFrame) pointerFrame = window.requestAnimationFrame(drawLetters);
          }) as EventListener, { passive: true });
          listen(hero, "pointerleave", resetLetters);
        }

        // One authored introduction per visit; changing language or returning from a case doesn't replay it.
        if (introduction !== "pending" && heroStage && hero && letters.length && !introductionPlayed.current) {
          introductionPlayed.current = true;
          if (introduction === "play" && window.scrollY < window.innerHeight * 0.5 && !document.hidden) {
            entering = true;
            entrance = gsap.timeline({
              defaults: { ease: "expo.out" },
              onComplete: () => { entering = false; measureLetters(); },
            });
            entrance
              .from(root.querySelector(".site-header"), { y: -12, opacity: 0, duration: 0.55 }, 0)
              .fromTo(letters, { yPercent: 135, rotation: 6 }, { yPercent: 0, rotation: 0, duration: 1.15, stagger: 0.035 }, 0.08)
              .fromTo(root.querySelectorAll(".intro-copy, .hero-description, .hero-actions"),
                { y: 24, clipPath: "inset(0% 0% 100% 0%)" },
                { y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, stagger: 0.08 }, 0.6);
          }
        }
        if (heroStage && hero) {
          const names = hero.querySelectorAll(".name-word");
          const exit = gsap.timeline({ scrollTrigger: { trigger: heroStage, start: "top top", end: "bottom top", scrub: .5, invalidateOnRefresh: true } });
          exit.to(names[0], { xPercent: () => window.innerWidth < 760 ? -6 : -16, y: () => window.innerWidth < 760 ? -40 : -120, rotation: -1.5, ease: "none" }, 0)
            .to(names[1], { xPercent: () => window.innerWidth < 760 ? 6 : 16, y: () => window.innerWidth < 760 ? -54 : -175, rotation: 2, ease: "none" }, 0);
        }

        const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
        root.querySelectorAll<HTMLElement>(".project-name.glitch-text, .preview-name.glitch-text, .case-title .glitch-text").forEach((text) => {
          const original = text.querySelector<HTMLElement>(".glitch-original");
          const signal = text.querySelector<HTMLElement>(".glitch-scramble");
          const host = text.closest("a, h1") ?? text;
          if (!original || !signal) return;
          let glitch: gsap.core.Timeline | undefined;
          const reset = safe(() => { glitch?.kill(); gsap.set(signal, { opacity: 0 }); signal.textContent = ""; });
          const cut = safe((event: PointerEvent) => {
            if (event.pointerType !== "mouse" || !finePointer.matches || document.hidden) return;
            glitch?.kill();
            glitch = gsap.timeline()
              .set(signal, { opacity: .85 })
              .to(signal, { duration: .3, scrambleText: { text: original.textContent ?? "", chars: "upperCase", speed: .8, revealDelay: .04, tweenLength: false }, ease: "none" })
              .to(signal, { opacity: 0, duration: .08 });
          });
          listen(host, "pointerenter", cut as EventListener);
          listen(host, "pointerleave", reset);
          cleanups.push(() => { signal.textContent = ""; });
        });

        const dock = root.querySelector<HTMLElement>(".preview-dock");
        const preview = root.querySelector<HTMLElement>(".project-preview");
        const opening = root.querySelector<HTMLElement>(".work-stage");
        const previewMotion = dock && preview ? {
          rotationX: gsap.quickTo(preview, "rotationX", { duration: 0.6, ease: "power3.out" }),
          rotationY: gsap.quickTo(preview, "rotationY", { duration: 0.6, ease: "power3.out" }),
        } : null;
        if (opening && previewMotion && preview) {
          gsap.set(preview, { transformPerspective: 1100 });
          listen(opening, "pointermove", ((event: PointerEvent) => {
            if (event.pointerType !== "mouse" || document.hidden || window.innerWidth < 900) return;
            const rect = opening.getBoundingClientRect();
            const x = clamp(-1, 1, (event.clientX - rect.left) / rect.width * 2 - 1);
            const y = clamp(-1, 1, (event.clientY - rect.top) / rect.height * 2 - 1);
            previewMotion.rotationX(-y * 5); previewMotion.rotationY(x * 7);
          }) as EventListener, { passive: true });
          listen(opening, "pointerleave", () => {
            previewMotion.rotationX(0); previewMotion.rotationY(0);
          });
        }
        if (opening && dock) {
          gsap.fromTo(dock, { y: window.innerWidth > 900 ? 150 : 64, rotation: 8 }, {
            y: 0, rotation: 0, ease: "none",
            scrollTrigger: { trigger: opening, start: "top 95%", end: "top 25%", scrub: .65 },
          });
        }
        if (preview) {
          const image = preview.querySelector("img");
          if (image) {
            const changePreview = safe(() => {
              gsap.fromTo(image, { clipPath: "inset(0% 100% 0% 0%)", scale: 1.065 }, {
                clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 0.65, ease: "expo.out", overwrite: true,
              });
              gsap.fromTo(preview.querySelectorAll(".preview-name, .preview-stack"), { y: 18, opacity: 0 }, {
                y: 0, opacity: 1, duration: 0.42, stagger: 0.045, ease: "power3.out", overwrite: true,
              });
            });
            const observer = new MutationObserver(changePreview);
            observer.observe(image, { attributes: true, attributeFilter: ["src"] });
            cleanups.push(() => observer.disconnect());
          }
        }

        const index = root.querySelector<HTMLElement>("#projects");
        const rows = Array.from(root.querySelectorAll<HTMLElement>("#projects .project-row"));
        let selectedIndex = 0;
        const rowsEntrance = index && rows.length ? gsap.fromTo(rows.map(row => row.querySelector(".project-label")),
          { y: 30, clipPath: "inset(0% 0% 100% 0%)" },
          { y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: .7, stagger: .06, ease: "portfolio-reveal",
            scrollTrigger: { trigger: index, start: "top 90%", once: true } }) : null;
        rows.forEach((row, rowIndex) => {
          const remember = () => { selectedIndex = rowIndex; };
          listen(row, "pointerenter", remember);
          listen(row, "focus", () => { rowsEntrance?.progress(1); remember(); });
        });
        if (index && rows.length) {
          ScrollTrigger.create({
            trigger: index, start: "top 65%", end: "bottom 20%",
            onUpdate: () => {
              if (window.scrollY < 2 || document.hidden || index.contains(document.activeElement)) return;
              const hovered = window.matchMedia("(hover: hover) and (pointer: fine)").matches ? rows.findIndex((row) => row.matches(":hover")) : -1;
              const middle = window.innerHeight * 0.5;
              const distances = rows.map((row) => {
                const rect = row.getBoundingClientRect();
                return Math.abs(rect.top + rect.height / 2 - middle);
              });
              const closest = hovered >= 0 ? hovered : distances.indexOf(Math.min(...distances));
              if (closest !== selectedIndex) { selectedIndex = closest; activeCallback.current(closest); }
            },
          });
        }

        const track = root.querySelector<HTMLElement>(".marquee-track");
        let marquee: gsap.core.Tween | undefined;
        let marqueeVisible = false;
        const marqueeRate = { value: 1 };
        let rateTo: gsap.QuickToFunc | undefined;
        let rateTimer: number | undefined;
        const syncMarquee = () => {
          if (marqueeVisible && !document.hidden) marquee?.play(); else marquee?.pause();
        };
        if (track && track.children.length >= 2) {
          const first = track.children[0] as HTMLElement;
          const second = track.children[1] as HTMLElement;
          marquee = gsap.to(track, {
            x: () => -(second.offsetLeft - first.offsetLeft), duration: 30,
            repeat: -1, ease: "none", paused: true,
          });
          rateTo = gsap.quickTo(marqueeRate, "value", {
            duration: 0.5, ease: "power2.out", onUpdate: () => { marquee?.timeScale(marqueeRate.value); },
          });
          ScrollTrigger.create({
            trigger: track.parentElement, start: "top bottom", end: "bottom top",
            onToggle: (self) => { marqueeVisible = self.isActive; syncMarquee(); },
            onUpdate: (self) => {
              if (!self.isActive || document.hidden) return;
              rateTo?.(clamp(1, 3, 1 + Math.abs(self.getVelocity()) / 1400));
              clearTimer(rateTimer); rateTimer = later(() => rateTo?.(1), 130);
            },
          });
        }

        const aboutBody = root.querySelector(".about-body");
        const portrait = root.querySelector(".portrait");
        if (aboutBody && portrait) {
          gsap.fromTo(portrait, { y: 70 }, { y: -20, ease: "none",
            scrollTrigger: { trigger: aboutBody, start: "top 90%", end: "bottom 30%", scrub: .7 } });
          gsap.fromTo(root.querySelectorAll(".about-copy > p, .practice-list > div"), { y: 28, opacity: 0 }, {
            y: 0, opacity: 1, duration: .72, stagger: .075, ease: "portfolio-reveal",
            scrollTrigger: { trigger: aboutBody, start: "top 85%", once: true },
          });
        }
        const close = root.querySelector(".contact-section");
        if (close) {
          gsap.fromTo(close.querySelector("h2"), { y: 60 }, { y: 0, duration: .88, ease: "portfolio-reveal",
            scrollTrigger: { trigger: close, start: "top 90%", once: true } });
          gsap.fromTo(close.querySelectorAll(".contact-links a"), { y: 20, opacity: 0 }, {
            y: 0, opacity: 1, duration: .5, stagger: .075, ease: "portfolio-reveal",
            scrollTrigger: { trigger: close.querySelector(".contact-links"), start: "top 95%", once: true },
          });
        }
        const caseHeading = root.querySelector(".case-title .glitch-text");
        if (caseHeading) {
          gsap.fromTo(caseHeading, { y: 48, clipPath: "inset(0% 0% 100% 0%)" }, {
            y: 0, clipPath: "inset(0% 0% 0% 0%)", duration: .85, ease: "portfolio-reveal",
          });
          root.querySelectorAll(".case-figure, .case-context, .case-information, .case-next").forEach((section) => {
            gsap.fromTo(section, { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: "portfolio-reveal",
              scrollTrigger: { trigger: section, start: "top 90%", once: true } });
          });
        }

        const pauseInteractive = safe(() => {
          if (entering) entrance?.progress(1);
          if (pointerFrame) { window.cancelAnimationFrame(pointerFrame); pointerFrame = 0; }
          letterMotion.forEach(({ weight, weightTo, yTo, rotateTo }, i) => {
            weightTo.tween.pause(); yTo.tween.pause(); rotateTo.tween.pause(); weight.value = 900;
            letters[i].style.fontVariationSettings = "'wght' 900, 'wdth' 75";
          });
          gsap.set(letters, { y: 0, rotation: 0 });
          if (previewMotion && dock && preview) {
            Object.values(previewMotion).forEach((to) => to.tween.pause());
            gsap.set(preview, { rotationX: 0, rotationY: 0 });
          }
          rateTo?.tween.pause(); clearTimer(rateTimer); marqueeRate.value = 1; marquee?.timeScale(1);

        });
        listen(document, "visibilitychange", () => {
          if (document.hidden) pauseInteractive();
          syncMarquee();
        });
        let resizeTimer: number | undefined;
        listen(window, "resize", () => {
          clearTimer(resizeTimer);
          resizeTimer = later(() => {
            pauseInteractive(); measureLetters();
            if (marquee) { const progress = marquee.progress(); marquee.invalidate().progress(progress); syncMarquee(); }
          }, 150);
        }, { passive: true });
        void document.fonts.ready.then(() => {
          if (active && !cancelled) { measureLetters(); ScrollTrigger.refresh(); }
        });

        return () => {
          active = false;
          if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
          timers.forEach((id) => window.clearTimeout(id));
          cleanups.forEach((cleanup) => cleanup());

        };
      }, root);
      dispose = () => media.revert();
      if (cancelled) dispose();
    }).catch(() => {
      // Content remains usable if the optional motion chunk cannot be loaded.
    });

    return () => { cancelled = true; dispose(); };
  }, [enabled, routeKey, rootRef, introduction]);
}
