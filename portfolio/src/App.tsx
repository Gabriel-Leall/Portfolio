import { useEffect, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { HeroSection } from "./components/HeroSection";
import { ProcessTimeline } from "./components/ProcessTimeline";
import { FeaturedProjects } from "./components/FeaturedProjects";
import { AboutProfile } from "./components/AboutProfile";
import { ContactFooter } from "./components/ContactFooter";
import { PageLoader } from "./components/PageLoader";
import { ScrollProgress } from "./components/ui/ScrollProgress";
import { useLenis } from "./hooks/useLenis";

export default function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Initialize Lenis smooth scroll
  useLenis();

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateCursorPosition);
    return () => window.removeEventListener("mousemove", updateCursorPosition);
  }, []);

  return (
    <>
      {/* Page Loader */}
      <PageLoader />

      {/* Scroll Progress Bar */}
      <ScrollProgress />

      <div className="min-h-screen bg-background relative overflow-x-hidden">
        {/* Custom Cursor */}
        <div
          className="fixed w-8 h-8 border-2 border-foreground rounded-full pointer-events-none z-9999 mix-blend-difference transition-transform duration-100 hidden lg:block"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Gradient Overlay */}
        <div className="fixed inset-0 bg-background z-0" />

        {/* Sidebar Navigation */}
        <Sidebar />

        {/* Content - Order: Home → Projects → About → Process → Contact */}
        <div className="relative z-10">
          <HeroSection />
          <FeaturedProjects />
          <AboutProfile />
          <ProcessTimeline />
          <ContactFooter />
        </div>
      </div>
    </>
  );
}
