import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  CheckIcon,
  CopyIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { GlitchText } from "./ui/GlitchText";
import { SectionTitle } from "./ui/SectionTitle";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ContactFooter() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const socialRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title with glitch reveal from bottom
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        },
      );

      // Content fade in
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "top 40%",
            scrub: 1,
          },
        },
      );

      // Social links stagger
      socialRefs.current.forEach((ref, index) => {
        if (!ref) return;
        gsap.fromTo(
          ref,
          { opacity: 0, y: 20, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
            },
          },
        );
      });

      // Card slide up
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 90%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("gabrielleal7153@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy email: ", err);
    }
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/Gabriel-Leall" },
    { icon: Linkedin, href: "https://linkedin.com/in/gabriel-leal" },
    { icon: Twitter, href: "https://x.com/brook_kael" },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 relative min-h-screen flex items-center"
    >
      {/* Section Number - Removed in favor of SectionTitle */}

      <div className="max-w-4xl mx-auto px-6">
        <div ref={titleRef} className="text-center mb-12 opacity-0">
          <SectionTitle
            number="04"
            title={
              <GlitchText
                className="text-foreground"
                intensity="high"
                continuous={false}
              >
                {t("contact.title")}
              </GlitchText>
            }
            centered
            className="mb-6"
          />
          <p className="text-lg text-muted-foreground mb-8">
            {t("contact.subtitle")}
          </p>
        </div>

        <div ref={contentRef} className="opacity-0">
          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-8">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  ref={(el) => {
                    socialRefs.current[index] = el;
                  }}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:border-accent hover:scale-110 transition-all duration-300 opacity-0"
                >
                  <Icon size={20} className="text-accent" />
                </a>
              );
            })}
          </div>

          {/* Email Copy Section */}
          <div className="bg-accent rounded-xl p-4 flex items-center justify-between max-w-md mx-auto mb-8">
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-secondary" />
              <span className="text-secondary">gabrielleal7153@gmail.com</span>
            </div>
            <Button
              variant="outline"
              onClick={copyEmail}
              disabled={copied}
              className="border-background border text-muted hover:bg-secondary hover:text-accent dark:bg-foreground dark:text-background dark:hover:bg-[#030712] dark:hover:text-accent dark:border-2 dark:border-muted-foreground dark:hover:border-muted-foreground disabled:opacity-100 relative px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <span
                className={cn(
                  "transition-all",
                  copied ? "scale-100 opacity-100" : "scale-0 opacity-0",
                )}
              >
                <CheckIcon
                  className="stroke-green-600 dark:stroke-green-400"
                  size={17}
                />
              </span>
              <span
                className={cn(
                  "absolute left-4 transition-all",
                  copied ? "scale-0 opacity-0" : "scale-100 opacity-100",
                )}
              >
                <CopyIcon size={17} />
              </span>
              {copied ? t("contact.emailCopied") : t("contact.copyEmail")}
            </Button>
          </div>
        </div>

        {/* Available for Projects Card */}
        <div
          ref={cardRef}
          className="backdrop-blur-md bg-white/5 border border-muted-foreground/20 rounded-2xl p-8 opacity-0"
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="w-3 h-3 bg-accent rounded-full mt-2 animate-pulse" />
            <div>
              <h4 className="text-xl text-foreground/60 mb-2">
                {t("contact.quick.title")}
              </h4>
              <p className="text-accent">{t("contact.quick.responseTime")}</p>
            </div>
          </div>
          <p className="text-muted-foreground">
            {t("contact.quick.description")}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-sm text-white/30 font-mono">
          <p>© 2024 Gabriel Leal. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
}
