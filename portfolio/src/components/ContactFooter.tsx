import { motion } from "motion/react";
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
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ContactFooter() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("gabrielleal7153@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy email: ", err);
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl mb-6 text-foreground">
            {t("contact.title")}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">{t("contact.subtitle")}</p>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-8">
            <motion.a
              href="https://github.com/Gabriel-Leall"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:border-accent transition-all duration-300"
            >
              <Github size={20} className="text-accent" />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/gabriel-leal"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:border-accent transition-all duration-300"
            >
              <Linkedin size={20} className="text-accent" />
            </motion.a>
            <motion.a
              href="https://twitter.com/gabriel-leal"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:border-accent transition-all duration-300"
            >
              <Twitter size={20} className="text-accent" />
            </motion.a>
          </div>

          {/* Email Copy Section */}
          <div className="bg-accent rounded-xl p-4 flex items-center justify-between max-w-md mx-auto mb-8">
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-secondary" />
              <span className="text-secondary">
                gabrielleal7153@gmail.com
              </span>
            </div>
            <Button
              variant="outline"
              onClick={copyEmail}
              disabled={copied}
              className="border-background border g-muted-foreground text-muted hover:bg-secondary hover:text-accent dark:bg-foreground dark:text-background dark:hover:bg-muted-foreground dark:hover:text-accent dark:border-2 dark:border-muted-foreground dark:hover:border-muted-foreground disabled:opacity-100 relative px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <span
                className={cn(
                  "transition-all",
                  copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
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
                  copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
                )}
              >
                <CopyIcon size={17} />
              </span>
              {copied ? t("contact.emailCopied") : t("contact.copyEmail")}
            </Button>
          </div>
        </motion.div>

        {/* Available for Projects Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="backdrop-blur-md bg-white/5 border border-muted-foreground/20 rounded-2xl p-8"
        >
          <div className="flex items-start gap-3 mb-4">
            <motion.div
              className="w-3 h-3 bg-accent rounded-full mt-2"
              animate={{
                opacity: [1, 0.3, 1],
                scale: [1, 1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <div>
              <h4 className="text-xl text-foreground/60 mb-2">
                {t("contact.quick.title")}
              </h4>
              <p className="text-accent">{t("contact.quick.responseTime")}</p>
            </div>
          </div>

          <p className="text-muted-foreground">{t("contact.quick.description")}</p>
        </motion.div>
      </div>

      {/** Toast Container global em App.tsx **/}
    </section>
  );
}
