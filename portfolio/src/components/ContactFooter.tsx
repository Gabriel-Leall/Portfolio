import { motion } from "motion/react";
import { useState } from "react";
import { Send, MapPin, Phone, Mail, Github, Linkedin, Twitter } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

export function ContactFooter() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-white">Get In Touch</h2>
          <p className="text-xl text-gray-400">Let's create something amazing together</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name Field */}
              <div className="relative">
                <Label
                  htmlFor="name"
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === 'name' || formData.name
                      ? '-top-3 text-xs text-[#00d4ff] bg-[#1a1a1a] px-2'
                      : 'top-3 text-gray-400'
                  }`}
                >
                  Your Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="backdrop-blur-md bg-[#1a1a1a]/50 border-white/10 focus:border-[#00d4ff] text-white rounded-xl h-12 transition-all duration-300"
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <Label
                  htmlFor="email"
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === 'email' || formData.email
                      ? '-top-3 text-xs text-[#00d4ff] bg-[#1a1a1a] px-2'
                      : 'top-3 text-gray-400'
                  }`}
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="backdrop-blur-md bg-[#1a1a1a]/50 border-white/10 focus:border-[#00d4ff] text-white rounded-xl h-12 transition-all duration-300"
                />
              </div>

              {/* Message Field */}
              <div className="relative">
                <Label
                  htmlFor="message"
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === 'message' || formData.message
                      ? '-top-3 text-xs text-[#00d4ff] bg-[#1a1a1a] px-2'
                      : 'top-3 text-gray-400'
                  }`}
                >
                  Your Message
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  className="backdrop-blur-md bg-[#1a1a1a]/50 border-white/10 focus:border-[#00d4ff] text-white rounded-xl min-h-[150px] resize-none transition-all duration-300"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#00d4ff] hover:bg-[#00b8e6] text-black rounded-full py-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] group"
              >
                Send Message
                <Send className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="backdrop-blur-md bg-gradient-to-br from-[#2a2a2a]/50 to-[#1a1a1a]/50 border border-white/5 rounded-2xl p-8">
              <h3 className="text-2xl text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center">
                    <MapPin size={20} className="text-[#00d4ff]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-gray-300">San Francisco, CA</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center">
                    <Phone size={20} className="text-[#00d4ff]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-300">+1 (555) 123-4567</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center">
                    <Mail size={20} className="text-[#00d4ff]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-300">alex@example.com</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Quick Contact Card */}
            <div className="backdrop-blur-md bg-gradient-to-br from-[#00d4ff]/10 to-[#00a8cc]/10 border border-[#00d4ff]/30 rounded-2xl p-8">
              <h4 className="text-xl text-white mb-4">Available for Projects</h4>
              <p className="text-gray-400 mb-6">
                I'm currently available for freelance work and exciting project collaborations.
              </p>
              <div className="flex gap-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:border-[#00d4ff] transition-all duration-300"
                >
                  <Github size={20} className="text-[#00d4ff]" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:border-[#00d4ff] transition-all duration-300"
                >
                  <Linkedin size={20} className="text-[#00d4ff]" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:border-[#00d4ff] transition-all duration-300"
                >
                  <Twitter size={20} className="text-[#00d4ff]" />
                </motion.a>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24 pt-8 border-t border-white/5"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2025 Alex Johnson. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-[#00d4ff] transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-[#00d4ff] transition-colors text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
