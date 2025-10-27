import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "./ui/button";

export function ContactFooter() {
  const { t } = useTranslation();

  const copyEmail = () => {
    navigator.clipboard.writeText("gabrielleal7153@gmail.com");
    // You can add a toast notification here
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
          <h2 className="text-4xl md:text-5xl mb-6 text-white">
            {t("contact.title")}
          </h2>
          <p className="text-lg text-gray-400 mb-8">{t("contact.subtitle")}</p>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-8">
            <motion.a
              href="https://github.com/Gabriel-Leall"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:border-teal-400 transition-all duration-300"
            >
              <Github size={20} className="text-teal-400" />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/gabriel-leal"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:border-teal-400 transition-all duration-300"
            >
              <Linkedin size={20} className="text-teal-400" />
            </motion.a>
            <motion.a
              href="https://twitter.com/gabriel-leal"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:border-teal-400 transition-all duration-300"
            >
              <Twitter size={20} className="text-teal-400" />
            </motion.a>
          </div>

          {/* Email Copy Section */}
          <div className="bg-gray-800 rounded-xl p-4 flex items-center justify-between max-w-md mx-auto mb-8">
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-gray-400" />
              <span className="text-gray-300">gabrielleal7153@gmail.com</span>
            </div>
            <Button
              onClick={copyEmail}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              Copiar e-mail
            </Button>
          </div>
        </motion.div>

        {/* Available for Projects Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="backdrop-blur-md bg-gradient-to-br from-teal-900/50 to-teal-800/50 border border-teal-700/30 rounded-2xl p-8"
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
            <div>
              <h4 className="text-xl text-white mb-2">
                {t("contact.quick.title")}
              </h4>
              <p className="text-gray-300">{t("contact.quick.responseTime")}</p>
            </div>
          </div>

          <p className="text-gray-400">{t("contact.quick.description")}</p>
        </motion.div>
      </div>
    </section>
  );
}
