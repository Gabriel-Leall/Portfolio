import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface LanguageTogglerProps {
  className?: string;
}

export function LanguageToggler({ className }: LanguageTogglerProps) {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const next = i18n.language === "pt" ? "en" : "pt";
    i18n.changeLanguage(next);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        "flex items-center justify-center w-10 h-10 rounded-full border border-accent/30 text-accent hover:bg-accent/10 transition-all duration-300 text-xs font-bold backdrop-blur-sm",
        className,
      )}
      aria-label="Toggle Language"
    >
      {i18n.language === "pt" ? "EN" : "PT"}
    </button>
  );
}
