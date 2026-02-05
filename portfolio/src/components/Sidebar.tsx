import { useEffect, useRef, useState } from "react";
import { useLenis } from "../hooks/useLenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  { id: "hero", label: "Home", number: "00" },
  { id: "projects", label: "Projects", number: "01" },
  { id: "about", label: "About", number: "02" },
  { id: "process", label: "Process", number: "03" },
  { id: "contact", label: "Contact", number: "04" },
];

export function Sidebar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sidebarRef = useRef<HTMLElement>(null);
  const lenisRef = useLenis();

  useEffect(() => {
    // Track scroll progress
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    // Set up section observers
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: `#${section.id}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSection(section.id),
        onEnterBack: () => setActiveSection(section.id),
      });
    });

    return () => {
      window.removeEventListener("scroll", updateProgress);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element && lenisRef.current) {
      lenisRef.current.scrollTo(element, { offset: 0, duration: 1.2 });
    }
  };

  return (
    <aside
      ref={sidebarRef}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-2"
    >
      {/* Progress Line */}
      <div className="absolute right-4 top-0 bottom-0 w-px bg-white/10">
        <div
          className="absolute top-0 left-0 w-full bg-accent transition-all duration-300"
          style={{ height: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Section Numbers */}
      <nav className="relative flex flex-col gap-6 pr-8">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          const isHovered = hoveredSection === section.id;

          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              onMouseEnter={() => setHoveredSection(section.id)}
              onMouseLeave={() => setHoveredSection(null)}
              className={`
                relative flex items-center justify-end gap-3 text-sm font-mono
                transition-all duration-300 cursor-pointer
                ${isActive ? "text-accent" : "text-white/40 hover:text-white/80"}
              `}
            >
              {/* Label (visible on hover) */}
              <span
                className={`
                  absolute right-10 whitespace-nowrap text-xs uppercase tracking-wider
                  transition-all duration-300 origin-right
                  ${isHovered || isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"}
                `}
              >
                {section.label}
              </span>

              {/* Number */}
              <span className={`relative ${isActive ? "font-bold" : ""}`}>
                {section.number}
              </span>

              {/* Active indicator dot */}
              {isActive && (
                <span className="absolute -right-3 w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
