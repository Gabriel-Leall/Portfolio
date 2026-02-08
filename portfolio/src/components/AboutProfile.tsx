import { motion } from "motion/react";
import { Github, Linkedin, Twitter, Download, Mail } from "lucide-react";
import { MagneticButton } from "./ui/magnetic-button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTranslation } from "react-i18next";
import { useRef, useState, useEffect } from "react";

const socialLinks = [
  { icon: Github, href: "https://github.com/Gabriel-Leall", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/gabriel-leal",
    label: "LinkedIn",
  },
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
  const { t, i18n } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isHoveringPhoto, setIsHoveringPhoto] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  // Holographic photo effect with canvas (defer until hover)
  useEffect(() => {
    if (!canvasRef.current || !imageRef.current || !imageLoaded) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = imageRef.current;

    if (!ctx) return;

    // Set canvas size to match image
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    let glitchIntensity = 0;
    let scanlineOffset = 0;

    const drawBaseFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    const drawHolographicEffect = () => {
      if (!ctx || !img) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw base image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      if (isHoveringPhoto) {
        // Increase glitch intensity
        glitchIntensity = Math.min(glitchIntensity + 0.1, 1);

        // RGB Split effect

        // Red channel
        ctx.globalCompositeOperation = "screen";
        ctx.fillStyle = `rgba(255, 0, 0, ${0.3 * glitchIntensity})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Cyan channel
        ctx.fillStyle = `rgba(0, 255, 255, ${0.3 * glitchIntensity})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.globalCompositeOperation = "source-over";

        // Scanlines effect
        scanlineOffset = (scanlineOffset + 2) % 4;
        for (let y = scanlineOffset; y < canvas.height; y += 4) {
          ctx.fillStyle = `rgba(0, 255, 255, ${0.1 * glitchIntensity})`;
          ctx.fillRect(0, y, canvas.width, 1);
        }

        // Random glitch bars
        if (Math.random() > 0.7) {
          const barY = Math.random() * canvas.height;
          const barHeight = 2 + Math.random() * 10;
          ctx.fillStyle = `rgba(255, 0, 255, ${0.2 * glitchIntensity})`;
          ctx.fillRect(0, barY, canvas.width, barHeight);
        }

        // Wireframe overlay (occasional)
        if (Math.random() > 0.95) {
          ctx.strokeStyle = `rgba(0, 255, 255, ${0.5 * glitchIntensity})`;
          ctx.lineWidth = 1;
          const gridSize = 20;
          for (let x = 0; x < canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
          }
          for (let y = 0; y < canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
          }
        }
      } else {
        // Fade out glitch and stop animation when not hovering
        glitchIntensity = Math.max(glitchIntensity - 0.15, 0);
        drawBaseFrame();
        return;
      }

      animationFrameRef.current = requestAnimationFrame(drawHolographicEffect);
    };

    if (isHoveringPhoto) {
      drawHolographicEffect();
    } else {
      drawBaseFrame();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isHoveringPhoto, imageLoaded]);

  const handlePhotoMouseEnter = () => {
    setIsHoveringPhoto(true);
  };

  const handlePhotoMouseLeave = () => {
    setIsHoveringPhoto(false);
  };

  return (
    <section id="about" className="py-24 relative" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-foreground/90 dark:text-white/90">
            {t("about.title")}
          </h2>
          <p className="text-xl text-foreground/70 dark:text-muted-foreground">
            {t("about.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Image & Social Links - Holographic Effect */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
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

              {/* Profile Image with Holographic Canvas Effect */}
              <motion.div
                ref={photoRef}
                whileHover={{ scale: 1.05 }}
                onMouseEnter={handlePhotoMouseEnter}
                onMouseLeave={handlePhotoMouseLeave}
                className="absolute inset-8 rounded-full overflow-hidden border-4 border-accent/30 shadow-[0_0_50px_var(--accent)] cursor-pointer transition-all duration-100"
              >
                {/* Hidden image for canvas source */}
                <img
                  ref={imageRef}
                  src="/images/myphoto.webp"
                  alt="Profile"
                  className="hidden"
                  onLoad={() => setImageLoaded(true)}
                  crossOrigin="anonymous"
                />

                {/* Canvas for holographic effect */}
                <canvas
                  ref={canvasRef}
                  className="w-full h-full object-cover"
                  style={{ display: imageLoaded ? "block" : "none" }}
                />

                {/* Fallback while loading */}
                {!imageLoaded && (
                  <ImageWithFallback
                    src="/images/myphoto.webp"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                )}
              </motion.div>

              {/* Social Icons positioned geometrically */}
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                const angle = index * 90 - 45;
                const radius = 170;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit my ${social.label}`}
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
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
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
              <div className="w-full flex justify-center">
                <a
                  href={i18n.language === "en" ? "/cv-en.pdf" : "/cv-pt.pdf"}
                  download={
                    i18n.language === "en"
                      ? "Gabriel_Leal_Resume.pdf"
                      : "Gabriel_Leal_Curriculo.pdf"
                  }
                  className="bg-accent/80 hover:bg-accent transition-colors px-8 text-lg text-secondary py-4 rounded-full flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <Download size={18} />
                  {i18n.language === "en" ? "Download CV" : "Baixar CV"}
                </a>
              </div>
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
