import { motion } from "motion/react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();

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
            {navLinks.map((link, index) => (
              <motion.a
                key={link.key}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                className="text-gray-300 hover:text-accent transition-colors duration-300 relative group"
              >
                {t(`navigation.${link.key}`)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}

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
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="ml-2 inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/10 text-gray-300 hover:text-accent hover:border-accent/30 transition-colors"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
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
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-gray-300 hover:text-accent transition-colors"
              >
                {t(`navigation.${link.key}`)}
              </a>
            ))}
            <button
              onClick={() => {
                toggleLanguage();
                setIsOpen(false);
              }}
              className="mt-2 inline-flex px-3 py-1 rounded-full border border-accent/30 text-accent hover:bg-accent/10 transition-colors text-sm"
            >
              {i18n.language === "pt" ? t("navigation.en") : t("navigation.pt")}
            </button>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="mt-2 ml-2 inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/10 text-gray-300 hover:text-accent hover:border-accent/30 transition-colors"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
