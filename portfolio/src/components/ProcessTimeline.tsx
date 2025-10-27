import { motion, useAnimation } from "motion/react";
import { Search, Lightbulb, Palette, Code, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const phases = [
  { key: "discovery", icon: Search },
  { key: "strategy", icon: Lightbulb },
  { key: "design", icon: Palette },
  { key: "development", icon: Code },
  { key: "testing", icon: CheckCircle },
];

export function ProcessTimeline() {
  const { t } = useTranslation();
  const controls = useAnimation();
  const [currentPhase, setCurrentPhase] = useState(-1);
  const [hasAnimated, setHasAnimated] = useState(false);

  const startAnimation = async () => {
    if (hasAnimated) return;
    setHasAnimated(true);
    setCurrentPhase(-1);

    // Reset the line
    await controls.set({ pathLength: 0 });

    // Animate the line progressing through each phase
    for (let i = 0; i < phases.length; i++) {
      // Animate line to current phase
      await controls.start({
        pathLength: (i + 1) / phases.length,
        transition: { duration: 1, ease: "easeInOut" },
      });

      // Trigger phase activation
      setCurrentPhase(i);

      // Wait for the phase animation to complete
      await new Promise((resolve) => setTimeout(resolve, 800));
    }
  };

  return (
    <section id="process" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onViewportEnter={() => startAnimation()}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-white">
            {t("process.title")}
          </h2>
          <p className="text-xl text-gray-400">{t("process.subtitle")}</p>
        </motion.div>

        <div className="relative">
          {/* Animated Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 hidden md:block">
            <svg
              className="w-full h-1"
              viewBox="0 0 100 1"
              preserveAspectRatio="none"
            >
              {/* Background line */}
              <line
                x1="10%"
                y1="0.5"
                x2="90%"
                y2="0.5"
                stroke="rgba(0, 212, 255, 0.2)"
                strokeWidth="0.5"
              />
              {/* Animated progress line */}
              <motion.line
                x1="10%"
                y1="0.5"
                x2="90%"
                y2="0.5"
                stroke="rgba(0, 212, 255, 0.8)"
                strokeWidth="0.5"
                strokeDasharray="1"
                strokeDashoffset="1"
                animate={controls}
                style={{
                  pathLength: 0,
                  filter: "drop-shadow(0 0 4px rgba(0, 212, 255, 0.6))",
                }}
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              const isActive = currentPhase === index;
              const hasBeenActive = currentPhase >= index;

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
                      animate={
                        isActive
                          ? {
                              scale: [1, 1.3, 1],
                              transition: { duration: 0.6, ease: "easeInOut" },
                            }
                          : {}
                      }
                      className={`relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-secondary to-background border-2 flex items-center justify-center mb-4 backdrop-blur-md transition-all duration-300 ${
                        hasBeenActive || isActive
                          ? "border-accent ring-2 ring-accent/40"
                          : "border-accent/30 group-hover:border-accent group-hover:ring-2 group-hover:ring-accent/40"
                      }`}
                    >
                      <Icon
                        size={32}
                        className={`transition-colors duration-300 ${
                          hasBeenActive || isActive
                            ? "text-accent"
                            : "text-accent/70"
                        }`}
                      />

                      {/* Glow effect */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-accent/20 blur-xl"
                        animate={
                          isActive
                            ? {
                                opacity: [0, 1, 0],
                                scale: [1, 1.5, 1],
                                transition: {
                                  duration: 0.6,
                                  ease: "easeInOut",
                                },
                              }
                            : {
                                opacity: 0,
                              }
                        }
                      />

                      {/* Permanent glow for completed phases */}
                      {hasBeenActive && !isActive && (
                        <div className="absolute inset-0 rounded-full bg-accent/10 blur-lg" />
                      )}
                    </motion.div>

                    {/* Content */}
                    <motion.h3
                      className={`mb-2 transition-colors duration-300 ${
                        hasBeenActive || isActive
                          ? "text-accent"
                          : "text-white group-hover:text-accent"
                      }`}
                      animate={
                        isActive
                          ? {
                              scale: [1, 1.05, 1],
                              transition: { duration: 0.6, ease: "easeInOut" },
                            }
                          : {}
                      }
                    >
                      {t(`process.phases.${phase.key}.title`)}
                    </motion.h3>
                    <p className="text-sm text-gray-500">
                      {t(`process.phases.${phase.key}.desc`)}
                    </p>

                    {/* Number indicator */}
                    <motion.div
                      className={`mt-4 w-8 h-8 rounded-full border flex items-center justify-center text-sm transition-all duration-300 ${
                        hasBeenActive || isActive
                          ? "bg-accent/20 border-accent text-accent"
                          : "bg-accent/10 border-accent/30 text-accent/70"
                      }`}
                      animate={
                        isActive
                          ? {
                              scale: [1, 1.2, 1],
                              transition: { duration: 0.6, ease: "easeInOut" },
                            }
                          : {}
                      }
                    >
                      {index + 1}
                    </motion.div>
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
