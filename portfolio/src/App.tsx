import { useEffect, useState } from "react";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { ProcessTimeline } from "./components/ProcessTimeline";
import { FeaturedProjects } from "./components/FeaturedProjects";
import { SkillsPlayground } from "./components/SkillsPlayground";
import { AboutProfile } from "./components/AboutProfile";
import { ContactFooter } from "./components/ContactFooter";

export default function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateCursorPosition);
    return () => window.removeEventListener("mousemove", updateCursorPosition);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-background relative overflow-x-hidden">
        {/* Custom Cursor */}
        <div
          className="fixed w-8 h-8 border-2 border- rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-100 hidden lg:block"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Gradient Overlay */}
        <div className="fixed inset-0 bg-gradient-to-br from-background via-secondary to-background z-0" />

        {/* Content */}
        <div className="relative z-10">
          <Navigation />
          <HeroSection />
          <ProcessTimeline />
          <FeaturedProjects />
          <SkillsPlayground />
          <AboutProfile />
          <ContactFooter />
        </div>

        {/* Ambient glow effects - REMOVED */}
      </div>
    </>
  );
}
