import { motion } from "motion/react";
import { Github, Linkedin, Twitter, Download, Mail } from "lucide-react";
import { Button } from "./ui/button";

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub", color: "#00d4ff" },
  { icon: Linkedin, href: "#", label: "LinkedIn", color: "#00d4ff" },
  { icon: Twitter, href: "#", label: "Twitter", color: "#00d4ff" },
  { icon: Mail, href: "#", label: "Email", color: "#00d4ff" },
];

export function AboutProfile() {
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
          <h2 className="text-4xl md:text-5xl mb-4 text-white">About Me</h2>
          <p className="text-xl text-gray-400">Get to know me better</p>
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
                className="absolute inset-0 rounded-full border-2 border-dashed border-[#00d4ff]/20"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 rounded-full border-2 border-dotted border-[#00d4ff]/10"
              />

              {/* Profile Image */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="absolute inset-8 rounded-full overflow-hidden border-4 border-[#00d4ff]/30 shadow-[0_0_50px_rgba(0,212,255,0.3)]"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1737575655055-e3967cbefd03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjEyMjQwODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Social Icons positioned geometrically */}
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                const angle = (index * 90) - 45; // Distribute icons around circle
                const radius = 170;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="absolute w-14 h-14 rounded-full backdrop-blur-md bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-[#00d4ff]/30 flex items-center justify-center hover:border-[#00d4ff] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,212,255,0.5)]"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <Icon size={22} className="text-[#00d4ff]" />
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
            <div className="backdrop-blur-md bg-gradient-to-br from-[#2a2a2a]/50 to-[#1a1a1a]/50 border border-white/5 rounded-2xl p-8">
              <h3 className="text-2xl text-white mb-4">
                Hi, I'm <span className="text-[#00d4ff]">Alex Johnson</span>
              </h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                I'm a passionate front-end developer with over 8 years of experience 
                crafting beautiful, accessible, and performant web applications. 
                I specialize in React, TypeScript, and modern web technologies.
              </p>
              <p className="text-gray-400 mb-4 leading-relaxed">
                My approach combines technical excellence with user-centered design 
                principles, ensuring that every project not only looks great but 
                provides an exceptional user experience.
              </p>
              <p className="text-gray-400 leading-relaxed">
                When I'm not coding, you'll find me contributing to open-source 
                projects, writing technical articles, or exploring the latest web 
                development trends.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <motion.div
                whileHover={{ y: -5 }}
                className="backdrop-blur-md bg-gradient-to-br from-[#2a2a2a]/30 to-[#1a1a1a]/30 border border-white/5 rounded-xl p-4 text-center"
              >
                <div className="text-3xl text-[#00d4ff] mb-2">8+</div>
                <div className="text-sm text-gray-400">Years Exp.</div>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="backdrop-blur-md bg-gradient-to-br from-[#2a2a2a]/30 to-[#1a1a1a]/30 border border-white/5 rounded-xl p-4 text-center"
              >
                <div className="text-3xl text-[#00d4ff] mb-2">100+</div>
                <div className="text-sm text-gray-400">Projects</div>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="backdrop-blur-md bg-gradient-to-br from-[#2a2a2a]/30 to-[#1a1a1a]/30 border border-white/5 rounded-xl p-4 text-center"
              >
                <div className="text-3xl text-[#00d4ff] mb-2">50+</div>
                <div className="text-sm text-gray-400">Clients</div>
              </motion.div>
            </div>

            <Button
              size="lg"
              className="w-full bg-[#00d4ff] hover:bg-[#00b8e6] text-black rounded-full py-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.5)]"
            >
              <Download className="mr-2" size={20} />
              Download Resume
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
