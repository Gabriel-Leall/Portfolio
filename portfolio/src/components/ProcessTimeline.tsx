import { motion } from "motion/react";
import { Search, Lightbulb, Palette, Code, CheckCircle } from "lucide-react";

const phases = [
  {
    icon: Search,
    title: "Discovery",
    description: "Research & user insights",
  },
  {
    icon: Lightbulb,
    title: "Strategy",
    description: "Planning & architecture",
  },
  {
    icon: Palette,
    title: "Design",
    description: "UI/UX creation",
  },
  {
    icon: Code,
    title: "Development",
    description: "Building & coding",
  },
  {
    icon: CheckCircle,
    title: "Testing",
    description: "QA & deployment",
  },
];

export function ProcessTimeline() {
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
          <h2 className="text-4xl md:text-5xl mb-4 text-white">My Process</h2>
          <p className="text-xl text-gray-400">From concept to deployment</p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent transform -translate-y-1/2 hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <motion.div
                  key={phase.title}
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
                      className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-background-light to-background border-2 border-primary/30 flex items-center justify-center mb-4 backdrop-blur-md group-hover:border-primary transition-all duration-300 group-hover:shadow-glow-primary"
                    >
                      <Icon size={32} className="text-primary" />

                      {/* Glow effect */}
                      <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-white mb-2 group-hover:text-primary transition-colors duration-300">
                      {phase.title}
                    </h3>
                    <p className="text-sm text-gray-500">{phase.description}</p>

                    {/* Number indicator */}
                    <div className="mt-4 w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-sm">
                      {index + 1}
                    </div>
                  </div>

                  {/* Connecting line for mobile */}
                  {index < phases.length - 1 && (
                    <div className="md:hidden w-0.5 h-8 bg-primary/30 mx-auto my-4" />
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
