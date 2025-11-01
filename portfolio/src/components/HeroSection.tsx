import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "./ui/magnetic-button";
import { useTranslation } from "react-i18next";
import LightRays from "./ui/LightRays";

export function HeroSection() {
  const { t } = useTranslation();
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Light Rays Background */}
      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00d4ff"
          raysSpeed={0.8}
          lightSpread={0.5}
          rayLength={1.8}
          pulsating={true}
          fadeDistance={1.2}
          saturation={0.8}
          followMouse={true}
          mouseInfluence={0.15}
          noiseAmount={0.1}
          distortion={0.1}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6"
          ></motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-4xl lg:text-4xl mb-6 text-muted-foreground"
          >
            {t("hero.name")}
            <br />
            <span className="text-7xl md:text-7xl text-foreground">
              {t("hero.headline")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto"
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <MagneticButton>
              <button
                className="bg-accent/80 hover:bg-accent transition-colors px-10 text-lg text-secondary py-4 rounded-full flex items-center gap-2"
                onClick={() => {
                  const projectsSection = document.getElementById("projects");
                  projectsSection?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t("hero.cta.viewProjects")}
                <ArrowRight size={20} />
              </button>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-10 w-20 h-20 rounded-lg bg-accent/10 backdrop-blur-md border border-accent/20 hidden lg:block"
        />

        <motion.div
          animate={{
            y: [0, 20, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute top-1/3 right-10 w-32 h-32 rounded-full bg-accent/5 backdrop-blur-md border border-accent/20 hidden lg:block"
        />
      </div>
    </section>
  );
}
