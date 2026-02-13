import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "hero", label: "Home", number: "00" },
  { id: "projects", label: "Projects", number: "01" },
  { id: "about", label: "About", number: "02" },
  { id: "process", label: "Process", number: "03" },
  { id: "skills", label: "Skills", number: "04" },
  { id: "contact", label: "Contact", number: "05" },
];

export function Sidebar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Determine active section based on scroll position
    const handleScroll = () => {
      // 1. Update Scroll Progress
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);

      // 2. Update Active Section
      const viewportHeight = window.innerHeight;
      const centerPoint = viewportHeight / 2;

      // Check if we're at the very bottom of the page
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50
      ) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }

      // Check which section is in the middle of the viewport
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the section covers the center point
          if (rect.top <= centerPoint && rect.bottom >= centerPoint) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside
      ref={sidebarRef}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-2"
    >
      {/* Progress Line Container */}
      <div className="absolute right-4 top-2 bottom-2 w-px">
        {/* Dashed Background Track */}
        <div
          className="absolute inset-0 border-r border-dashed border-black/20 dark:border-white/20"
          style={{ backgroundSize: "1px 8px" }} // Custom dash spacing if needed, but border-dashed handles it
        />

        {/* Solid Active Progress */}
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
                ${
                  isActive
                    ? "text-accent"
                    : "text-black/60 dark:text-white/60 hover:text-black/90 dark:hover:text-white/90"
                }
              `}
            >
              {/* Label (visible on hover) */}
              <span
                className={`
                  absolute right-10 whitespace-nowrap text-xs uppercase tracking-wider
                  transition-all duration-300 origin-right
                  ${
                    isHovered || isActive
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-2"
                  }
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
                <span className="absolute -right-3 w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_10px_var(--accent)]" />
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
