import { motion } from "motion/react";
import { Search, Lightbulb, Palette, Code, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const phases = [
  { key: "discovery", icon: Search },
  { key: "strategy", icon: Lightbulb },
  { key: "design", icon: Palette },
  { key: "development", icon: Code },
  { key: "testing", icon: CheckCircle },
];

export function ProcessTimeline() {
  const { t } = useTranslation();
  return (
    <section id="process" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-white">
            {t("process.title")}
          </h2>
          <p className="text-xl text-gray-400">{t("process.subtitle")}</p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent/30 to-transparent transform -translate-y-1/2 hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <motion.div
                  key={phase.key}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative"
                >
                  <div className="flex flex-col items-center text-center group">
                    {/* Icon Container */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-secondary to-background border-2 border-accent/30 flex items-center justify-center mb-4 backdrop-blur-md group-hover:border-accent transition-all duration-300 group-hover:ring-2 group-hover:ring-accent/40"
                    >
                      <Icon size={32} className="text-accent" />

                      {/* Glow effect */}
                      <div className="absolute inset-0 rounded-full bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-white mb-2 group-hover:text-accent transition-colors duration-300">
                      {t(`process.phases.${phase.key}.title`)}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {t(`process.phases.${phase.key}.desc`)}
                    </p>

                    {/* Number indicator */}
                    <div className="mt-4 w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-sm">
                      {index + 1}
                    </div>
                  </div>

                  {/* Connecting line for mobile */}
                  {index < phases.length - 1 && (
                    <div className="md:hidden w-0.5 h-8 bg-accent/30 mx-auto my-4" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
