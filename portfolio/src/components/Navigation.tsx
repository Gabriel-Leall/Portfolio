import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background-primary/40 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-accent-cyan tracking-wide"
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
                className="text-gray-300 hover:text-accent-cyan transition-colors duration-300 relative group"
              >
                {t(`navigation.${link.key}`)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-cyan group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="ml-4 px-3 py-1 rounded-full border border-accent-cyan/30 text-accent-cyan hover:bg-accent-cyan/10 transition-colors text-sm"
              aria-label={t("navigation.language")}
              title={t("navigation.language")}
            >
              {i18n.language === "pt" ? t("navigation.en") : t("navigation.pt")}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-accent-cyan transition-colors"
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
                className="block py-2 text-gray-300 hover:text-accent-cyan transition-colors"
              >
                {t(`navigation.${link.key}`)}
              </a>
            ))}
            <button
              onClick={() => {
                toggleLanguage();
                setIsOpen(false);
              }}
              className="mt-2 inline-flex px-3 py-1 rounded-full border border-accent-cyan/30 text-accent-cyan hover:bg-accent-cyan/10 transition-colors text-sm"
            >
              {i18n.language === "pt" ? t("navigation.en") : t("navigation.pt")}
            </button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
