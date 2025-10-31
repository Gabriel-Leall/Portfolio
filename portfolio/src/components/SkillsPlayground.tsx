import { motion } from "motion/react";
import { useState } from "react";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Shuffle } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

export function SkillsPlayground() {
  const { t } = useTranslation();
  const [sliderValue, setSliderValue] = useState([50]);
  const [switchEnabled, setSwitchEnabled] = useState(false);
  const [generatedColor, setGeneratedColor] = useState("rgb(0, 212, 255)");

  const generateRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 20 + Math.floor(Math.random() * 30);
    const lightness = 70 + Math.floor(Math.random() * 20);
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    setGeneratedColor(color);
  };

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-foreground">
            {t("skills.title")}
          </h2>
          <p className="text-xl text-muted-foreground">{t("skills.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Custom Slider */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="backdrop-blur-md bg-gradient-to-180 from-secondary/50 to-background/50 border border-white/5 rounded-2xl p-8 hover:border-accent/30 transition-all duration-300"
          >
            <h3 className="text-xl text-foreground mb-6">{t("skills.slider")}</h3>
            <div className="space-y-6">
              <Slider
                value={sliderValue}
                onValueChange={setSliderValue}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="text-center">
                <motion.div
                  key={sliderValue[0]}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="inline-block px-6 py-3 rounded-full bg-accent/10 border border-accent/30"
                >
                  <span className="text-3xl text-accent">{sliderValue[0]}</span>
                  <span className="text-gray-accent/80 ml-1">%</span>
                </motion.div>
              </div>
              <div className="relative h-4 bg-background rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${sliderValue[0]}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-gradient-to-r from-accent/ to-accent"
                />
              </div>
            </div>
          </motion.div>

          {/* Animated Toggle Switch */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="backdrop-blur-md bg-gradient-to-br from-secondary/50 to-background/50 border border-white/5 rounded-2xl p-8 hover:border-accent/30 transition-all duration-300"
          >
            <h3 className="text-xl text-foreground mb-6">Animated Toggle</h3>
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              <Switch
                checked={switchEnabled}
                onCheckedChange={setSwitchEnabled}
                className="scale-150"
              />
              <motion.div
                animate={{
                  rotate: switchEnabled ? 360 : 0,
                  scale: switchEnabled ? 1.2 : 1,
                }}
                transition={{ duration: 0.5 }}
                className={`w-24 h-24 rounded-2xl ${
                  switchEnabled
                    ? "bg-gradient-to-br from-accent/50 to-accent shadow-[0_0_30px_var(--accent)]"
                    : "bg-gradient-to-br from-secondary to-accent/50"
                } transition-all duration-500`}
              />
              <p className="text-muted-foreground">
                Status:{" "}
                <span
                  className={switchEnabled ? "text-accent" : "text-gray-400"}
                >
                  {switchEnabled
                    ? t("skills.status.active")
                    : t("skills.status.inactive")}
                </span>
              </p>
            </div>
          </motion.div>

          {/* Color Generator */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="backdrop-blur-md bg-gradient-to-br from-secondary/50 to-background/50 border border-white/5 rounded-2xl p-8 hover:border-accent/30 transition-all duration-300"
          >
            <h3 className="text-xl text-foreground mb-6">{t("skills.colorGen")}</h3>
            <div className="flex flex-col items-center justify-center space-y-6">
              <motion.div
                key={generatedColor}
                initial={{ scale: 0.8, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                className="w-32 h-32 rounded-2xl shadow-2xl"
                style={{
                  backgroundColor: generatedColor,
                  boxShadow: `0 0 40px ${generatedColor}80`,
                }}
              />
              <div className="text-center">
                <p className="text-muted-foreground text-sm mb-2">
                  {t("skills.generatedColor")}
                </p>
                <code className="px-4 py-2 rounded-lg bg-background border border-accent/20 text-accent">
                  {generatedColor}
                </code>
              </div>
              <Button
                onClick={generateRandomColor}
                className="bg-accent/90 hover:bg-accent text-secondary rounded-full px-6 group"
              >
                <Shuffle
                  className="mr-2 group-hover:rotate-180 transition-transform duration-500"
                  size={18}
                />
                {t("skills.generate")}
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Skills List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            "React",
            "TypeScript",
            "Next.js",
            "Tailwind CSS",
            "Node.js",
            "GraphQL",
            "Firebase",
            "Figma",
          ].map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="backdrop-blur-md bg-gradient-to-br from-secondary/30 to-background/30 border border-white/5 rounded-xl p-4 text-center hover:border-accent/30 transition-all duration-300 cursor-pointer"
            >
              <span className="text-foreground hover:text-accent transition-colors">
                {skill}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
