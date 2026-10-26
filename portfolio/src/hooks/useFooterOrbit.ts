import { useEffect, type RefObject } from "react";

interface Glyph { angle: number; radius: number; ring: number; char: string; seed: number }
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/.-+";

/** A bounded, local canvas: typography orbits the contact action and loosens at the exit. */
export default function useFooterOrbit(root: RefObject<HTMLElement>, canvasRef: RefObject<HTMLCanvasElement>, enabled: boolean, locale: string) {
  useEffect(() => {
    const footer = root.current;
    const canvas = canvasRef.current;
    const stage = footer?.querySelector<HTMLElement>(".footer-portal");
    const scene = footer?.querySelector<HTMLElement>(".footer-orbit-scene");
    const eye = footer?.querySelector<HTMLElement>(".footer-eye");
    const ctx = canvas?.getContext("2d", { alpha: false });
    if (!footer || !canvas || !ctx || !stage || !scene || !eye) return;
    let disposed = false;
    let visible = false;
    let frame = 0;
    let lastFrame = 0;
    let time = 0;
    let width = 1;
    let height = 1;
    let ratio = 1;
    let glyphs: Glyph[] = [];
    let disposeMotion = () => {};
    const state = { progress: 0 };
    const pointer = { x: 0, y: 0, active: false };
    const atlas = document.createElement("canvas");
    const atlasContext = atlas.getContext("2d");
    const cell = 32;
    atlas.width = letters.length * cell;
    atlas.height = cell * 2;
    if (atlasContext) {
      atlasContext.font = "18px Consolas, monospace";
      atlasContext.textAlign = "center";
      atlasContext.textBaseline = "middle";
      ["#ced5df", "#8bbbff"].forEach((color, row) => {
        atlasContext.fillStyle = color;
        [...letters].forEach((letter, index) => atlasContext.fillText(letter, index * cell + cell / 2, row * cell + cell / 2));
      });
    }

    const draw = () => {
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.fillStyle = "#111315";
      ctx.fillRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const release = Math.max(0, (state.progress - .48) / .52);
      const size = width < 600 ? 11 : 14;
      for (const glyph of glyphs) {
        const direction = glyph.ring % 2 ? -1 : 1;
        const angle = glyph.angle + time * (.011 + glyph.ring * .0012) * direction + state.progress * .28 * direction;
        const ripple = Math.sin(angle * 4 + time * .55 + glyph.ring) * (enabled ? 6 : 0);
        let x = cx + Math.cos(angle) * (glyph.radius + ripple);
        let y = cy + Math.sin(angle) * (glyph.radius + ripple);
        const loose = release * release * (glyph.seed > .55 ? 1 : .24);
        y += loose * (height * .65 + glyph.seed * 130);
        x += Math.sin(glyph.seed * 25) * loose * 70;
        if (pointer.active && enabled) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 125 && distance > 1) {
            const force = (1 - distance / 125) ** 2 * 34;
            x += dx / distance * force;
            y += dy / distance * force;
          }
        }
        if (x < -30 || x > width + 30 || y < -30 || y > height + 30) continue;
        ctx.globalAlpha = glyph.seed > .86 ? .4 : .82;
        ctx.setTransform(ratio, 0, 0, ratio, x * ratio, y * ratio);
        ctx.rotate(angle + Math.PI / 2 + loose * Math.sin(glyph.seed * 15));
        if (atlasContext) {
          const index = letters.indexOf(glyph.char);
          if (index >= 0) ctx.drawImage(atlas, index * cell, (glyph.seed > .93 ? 1 : 0) * cell, cell, cell, -size, -size, size * 2, size * 2);
        }
      }
      ctx.globalAlpha = 1;
    };
    const tick = (now: number) => {
      frame = 0;
      if (disposed || !visible || document.hidden || !enabled) return;
      if (now - lastFrame >= 1000 / 30) {
        time += Math.min((now - lastFrame) / 1000, .05);
        lastFrame = now;
        draw();
      }
      frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (enabled && visible && !document.hidden && !frame && !disposed) { lastFrame = performance.now(); frame = requestAnimationFrame(tick); }
    };
    const stop = () => { if (frame) cancelAnimationFrame(frame); frame = 0; pointer.active = false; };
    const measure = () => {
      width = stage.clientWidth;
      height = stage.clientHeight;
      ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      const innerRadius = eye.offsetWidth / 2 + (width < 600 ? 22 : 34);
      const step = width < 600 ? 29 : 38;
      const maxRadius = Math.hypot(width / 2, height / 2) + 45;
      const phrase = "GABRIEL LEAL / FRONT-END / REACT / TYPESCRIPT / ";
      glyphs = [];
      for (let radius = innerRadius, ring = 0; radius <= maxRadius; radius += step, ring++) {
        const count = Math.floor(Math.PI * 2 * radius / (width < 600 ? 9 : 11));
        for (let i = 0; i < count; i++) {
          const char = phrase[(i + ring * 9) % phrase.length];
          if (char === " ") continue;
          const seed = ((i * 7919 + ring * 104729) % 997) / 997;
          glyphs.push({ angle: i / count * Math.PI * 2 + ring * .17, radius, ring, char, seed });
          if (glyphs.length >= 2300) break;
        }
        if (glyphs.length >= 2300) break;
      }
      stage.dataset.orbitReady = "true";
      draw();
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !enabled) return;
      const rect = stage.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };
    const leave = () => { pointer.active = false; };
    const visibility = () => { if (document.hidden) stop(); else start(); };
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start(); else stop();
    }, { rootMargin: "80px" });
    const resize = new ResizeObserver(measure);
    measure();
    resize.observe(stage);
    intersection.observe(stage);
    stage.addEventListener("pointermove", move, { passive: true });
    stage.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", leave, { passive: true });
    document.addEventListener("visibilitychange", visibility);

    if (enabled) void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(state, { progress: 1, ease: "none", scrollTrigger: {
          trigger: scene, start: "top top", end: "bottom top", scrub: .65,
          onUpdate: () => { if (!frame) draw(); },
        } });
        gsap.fromTo(eye, { scale: .83, y: 32 }, { scale: 1, y: 0, ease: "none", scrollTrigger: {
          trigger: scene, start: "clamp(top 80%)", end: "top top", scrub: .65,
        } });
        ScrollTrigger.refresh();
      }, footer);
      disposeMotion = () => media.revert();
    }).catch(() => { /* The static ring and contact action remain visible. */ });

    return () => {
      disposed = true;
      stop();
      intersection.disconnect();
      resize.disconnect();
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", leave);
      document.removeEventListener("visibilitychange", visibility);
      disposeMotion();
      delete stage.dataset.orbitReady;
    };
  }, [root, canvasRef, enabled, locale]);
}
