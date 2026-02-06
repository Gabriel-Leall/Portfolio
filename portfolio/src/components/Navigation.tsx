import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { t, i18n } = useTranslation();

  const navLinks = [
    { key: "home", href: "#hero" },
    { key: "process", href: "#process" },
    { key: "projects", href: "#projects" },
    { key: "skills", href: "#skills" },
    { key: "about", href: "#about" },
    { key: "contact", href: "#contact" },
  ] as const;

  const toggleLanguage = () => {
    const next = i18n.language === "pt" ? "en" : "pt";
    i18n.changeLanguage(next);
  };

  // Detect active section on scroll with Intersection Observer
  useEffect(() => {
    const sections = navLinks.map((link) => link.href.replace("#", ""));

    // Intersection Observer with threshold - "sensor" for section visibility
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -50% 0px", // Top 20%, Bottom 50% - section needs to be well into view
      threshold: [0, 0.25, 0.5, 0.75, 1.0], // Multiple thresholds for smooth detection
    };

    const sectionVisibility = new Map<string, number>();

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id;

        // Store visibility ratio for each section
        if (entry.isIntersecting) {
          sectionVisibility.set(sectionId, entry.intersectionRatio);
        } else {
          sectionVisibility.set(sectionId, 0);
        }
      });

      // Find the section with highest visibility ratio
      let maxVisibility = 0;
      let mostVisibleSection = "hero";

      sectionVisibility.forEach((visibility, sectionId) => {
        if (visibility > maxVisibility) {
          maxVisibility = visibility;
          mostVisibleSection = sectionId;
        }
      });

      // Only update if we have significant visibility (at least 25%)
      if (maxVisibility >= 0.25) {
        setActiveSection(mostVisibleSection);
      }
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    // Observe all sections
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
        sectionVisibility.set(sectionId, 0);
      }
    });

    return () => observer.disconnect();
  }, [navLinks]);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }

    // Close mobile menu if open
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/40 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-accent tracking-wide"
          >
            Portfolio
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <motion.a
                  key={link.key}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  className={`transition-colors duration-300 relative group cursor-pointer ${
                    isActive ? "text-accent" : "text-muted hover:text-accent"
                  }`}
                >
                  {t(`navigation.${link.key}`)}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </motion.a>
              );
            })}

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="ml-4 px-3 py-1 rounded-full border border-accent/30 text-accent hover:bg-accent/10 transition-colors text-sm"
              aria-label={t("navigation.language")}
              title={t("navigation.language")}
            >
              {i18n.language === "pt" ? t("navigation.en") : t("navigation.pt")}
            </button>

            {/* Theme Toggle */}
            <AnimatedThemeToggler className="ml-2" />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-accent transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className={`block py-2 transition-colors cursor-pointer ${
                    isActive
                      ? "text-accent font-medium"
                      : "text-gray-300 hover:text-accent"
                  }`}
                >
                  {t(`navigation.${link.key}`)}
                </a>
              );
            })}
            <button
              onClick={() => {
                toggleLanguage();
                setIsOpen(false);
              }}
              className="mt-2 inline-flex px-3 py-1 rounded-full border border-accent/30 text-accent hover:bg-accent/10 transition-colors text-sm"
            >
              {i18n.language === "pt" ? t("navigation.en") : t("navigation.pt")}
            </button>

            <AnimatedThemeToggler className="mt-2 ml-2" />
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
