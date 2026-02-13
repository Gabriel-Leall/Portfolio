import { lazy, Suspense, useEffect, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { HeroSection } from "./components/HeroSection";
import { PageLoader } from "./components/PageLoader";
import { ScrollProgress } from "./components/ui/ScrollProgress";
import { useLenis } from "./hooks/useLenis";
import { useReducedMotion } from "./hooks/useReducedMotion";

const FeaturedProjects = lazy(() =>
  import("./components/FeaturedProjects").then((module) => ({
    default: module.FeaturedProjects,
  })),
);
const AboutProfile = lazy(() =>
  import("./components/AboutProfile").then((module) => ({
    default: module.AboutProfile,
  })),
);
const ProcessTimeline = lazy(() =>
  import("./components/ProcessTimeline").then((module) => ({
    default: module.ProcessTimeline,
  })),
);
const SkillsPlayground = lazy(() =>
  import("./components/SkillsPlayground").then((module) => ({
    default: module.SkillsPlayground,
  })),
);
const ContactFooter = lazy(() =>
  import("./components/ContactFooter").then((module) => ({
    default: module.ContactFooter,
  })),
);

export default function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [enableCustomCursor, setEnableCustomCursor] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Initialize Lenis smooth scroll
  useLenis(!prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      setEnableCustomCursor(false);
      return;
    }

    const media = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const update = () => setEnableCustomCursor(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!enableCustomCursor) return;

    const updateCursorPosition = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateCursorPosition);
    return () => window.removeEventListener("mousemove", updateCursorPosition);
  }, [enableCustomCursor]);

  return (
    <>
      {/* Page Loader */}
      <PageLoader />

      {/* Scroll Progress Bar */}
      <ScrollProgress />

      <div className="min-h-screen bg-background relative overflow-x-hidden">
        {/* Custom Cursor */}
        {enableCustomCursor && (
          <div
            className="fixed w-8 h-8 border-2 border-foreground rounded-full pointer-events-none z-9999 mix-blend-difference transition-transform duration-100"
            style={{
              left: `${cursorPosition.x}px`,
              top: `${cursorPosition.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}

        {/* Gradient Overlay */}
        <div className="fixed inset-0 bg-background z-0" />

        {/* Sidebar Navigation */}
        <Sidebar />

        {/* Content - Order: Home → Projects → About → Process → Skills → Contact */}
        <div className="relative z-10">
          <HeroSection />
          <Suspense
            fallback={<div className="min-h-[60vh]" aria-hidden="true" />}
          >
            <FeaturedProjects />
          </Suspense>

          {/* Transition: Projects → About (Glitch effect) */}
          <div className="h-32 relative overflow-hidden">
            <div
              className="absolute inset-0 transition-section-glitch"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, var(--background) 100%)",
              }}
            />
          </div>

          <Suspense
            fallback={<div className="min-h-[70vh]" aria-hidden="true" />}
          >
            <AboutProfile />
          </Suspense>

          <Suspense
            fallback={<div className="min-h-[40vh]" aria-hidden="true" />}
          >
            <ProcessTimeline />
          </Suspense>
          <Suspense
            fallback={<div className="min-h-[50vh]" aria-hidden="true" />}
          >
            <SkillsPlayground />
          </Suspense>
          <Suspense
            fallback={<div className="min-h-[40vh]" aria-hidden="true" />}
          >
            <ContactFooter />
          </Suspense>
        </div>
      </div>
    </>
  );
}
