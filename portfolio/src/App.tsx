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
      <div className="min-h-screen bg-[#1a1a1a] relative overflow-x-hidden">
        {/* Custom Cursor */}
        <div
          className="fixed w-8 h-8 border-2 border-[#00d4ff] rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-100 hidden lg:block"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Matte Graffiti Texture Background */}
        <div
          className="fixed inset-0 z-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.6'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />

        {/* Gradient Overlay */}
        <div className="fixed inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] z-0" />

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

        {/* Ambient glow effects */}
        <div className="fixed top-1/4 -left-1/4 w-1/2 h-1/2 bg-[#00d4ff] opacity-5 blur-[120px] rounded-full pointer-events-none" />
        <div className="fixed bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-[#00a8cc] opacity-5 blur-[120px] rounded-full pointer-events-none" />
      </div>
    </>
  );
}
