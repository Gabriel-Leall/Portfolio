import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";

export function Navigation() {
  const { t, i18n } = useTranslation();

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
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={toggleLanguage}
            className="px-3 py-1 rounded-full border border-accent/30 text-accent hover:bg-accent/10 transition-colors text-sm"
            aria-label={t("navigation.language")}
            title={t("navigation.language")}
          >
            {i18n.language === "pt" ? t("navigation.en") : t("navigation.pt")}
          </button>

          <AnimatedThemeToggler />
        </div>
      </div>
    </motion.nav>
  );
}
