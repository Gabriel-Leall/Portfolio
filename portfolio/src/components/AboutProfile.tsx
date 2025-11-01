import { motion } from "motion/react";
import { Github, Linkedin, Twitter, Download, Mail } from "lucide-react";
import { MagneticButton } from "./ui/magnetic-button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTranslation } from "react-i18next";

const socialLinks = [
  { icon: Github, href: "https://github.com/Gabriel-Leall", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/gabriel-leal", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/brook_kael", label: "Twitter" },
  { icon: Mail, href: "mailto:gabrielleal7153@gmail.com", label: "Email" },
];

// Function to render text with highlights
const renderTextWithHighlight = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const highlightedText = part.slice(2, -2);
      return (
        <span key={index} className="text-accent font-semibold">
          {highlightedText}
        </span>
      );
    }
    return part;
  });
};

export function AboutProfile() {
  const { t } = useTranslation();
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-foreground">
            {t("about.title")}
          </h2>
          <p className="text-xl text-muted-foreground">{t("about.subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Image & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-80 h-80 mx-auto">
              {/* Decorative circles */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-accent/20"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 rounded-full border-2 border-dotted border-accent/10"
              />

              {/* Profile Image */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="absolute inset-8 rounded-full overflow-hidden border-4 border-accent/30 shadow-[0_0_50px_var(--accent)]"
              >
                <ImageWithFallback
                  src="../../public/images/myphoto.webp"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Social Icons positioned geometrically */}
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                const angle = index * 90 - 45; // Distribute icons around circle
                const radius = 170;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="absolute w-14 h-14 rounded-full backdrop-blur-md bg-linear-to-br from-secondary to-background border border-accent/30 flex items-center justify-center hover:border-accent transition-all duration-300 hover:shadow-[0_0_20px_var(--accent)]"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <Icon size={22} className="text-accent" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Bio Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="backdrop-blur-md bg-linear-to-br from-background-secondary/50 to-background-primary/50 border border-white/5 rounded-2xl p-8">
              <h3 className="text-2xl text-muted-foreground/80 mb-4">
                {t("about.hi")},{" "}
                <span className="text-accent">{t("about.name")}</span>
              </h3>
              <p className="text-muted-foreground/80 mb-4 leading-relaxed">
                {renderTextWithHighlight(t("about.bio1"))}
              </p>
              <p className="text-muted-foreground/80 mb-4 leading-relaxed">
                {renderTextWithHighlight(t("about.bio2"))}
              </p>
              <p className="text-muted-foreground/80 leading-relaxed">
                {renderTextWithHighlight(t("about.bio3"))}
              </p>
            </div>

            
            <MagneticButton>
              <button
                className="w-full bg-accent/80 hover:bg-accent transition-colors px-10 text-lg text-secondary py-4 rounded-full flex items-center justify-center gap-2"
                onClick={() => {
                  // Link para download do CV
                  window.open("/cv.pdf", "_blank");
                }}
              >
                <Download size={20} />
                {t("about.resume.download")}
              </button>
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
