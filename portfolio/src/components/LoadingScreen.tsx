import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Stage 0: Show GL logo (0-1s)
    const timer1 = setTimeout(() => setStage(1), 1000);
    
    // Stage 1: Garganta opening (1-2.5s)
    const timer2 = setTimeout(() => setStage(2), 2500);
    
    // Stage 2: Complete (2.5s)
    const timer3 = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage < 2 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]">
            <motion.div
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `radial-gradient(circle at center, #00d4ff 1px, transparent 1px)`,
                backgroundSize: '50px 50px',
              }}
            />
          </div>

          {/* Stage 0: GL Logo */}
          {stage === 0 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.6,
                type: "spring",
                stiffness: 150,
              }}
              className="relative z-20"
            >
              {/* Glow Effect */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute inset-0 bg-[#00d4ff] blur-[80px] rounded-full"
              />

              {/* GL Logo */}
              <svg viewBox="0 0 200 200" className="w-64 h-64 relative z-10">
                {/* Outer Circle */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="#00d4ff"
                  strokeWidth="3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />

                {/* G Letter */}
                <motion.path
                  d="M 65 100 Q 65 65, 90 65 L 115 65 L 115 82 L 92 82 L 92 118 Q 92 135, 75 135 Q 65 135, 65 118 Z"
                  fill="#00d4ff"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  style={{
                    filter: 'drop-shadow(0 0 10px #00d4ff)',
                  }}
                />

                {/* L Letter */}
                <motion.path
                  d="M 125 65 L 142 65 L 142 118 L 165 118 L 165 135 L 125 135 Z"
                  fill="#00d4ff"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  style={{
                    filter: 'drop-shadow(0 0 10px #00d4ff)',
                  }}
                />
              </svg>
            </motion.div>
          )}

          {/* Stage 1: Garganta Opening Effect - VERTICAL */}
          {stage >= 1 && (
            <motion.div className="relative w-full h-full flex items-center justify-center">
              {/* GL Logo expands and fades */}
              <motion.div
                initial={{ scale: 1, opacity: 1 }}
                animate={{ 
                  scale: [1, 1.5, 2],
                  opacity: [1, 0.5, 0],
                }}
                transition={{ duration: 0.8 }}
                className="absolute z-20"
              >
                <svg viewBox="0 0 200 200" className="w-64 h-64">
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="#00d4ff"
                    strokeWidth="3"
                  />
                  <path
                    d="M 65 100 Q 65 65, 90 65 L 115 65 L 115 82 L 92 82 L 92 118 Q 92 135, 75 135 Q 65 135, 65 118 Z"
                    fill="#00d4ff"
                    style={{ filter: 'drop-shadow(0 0 20px #00d4ff)' }}
                  />
                  <path
                    d="M 125 65 L 142 65 L 142 118 L 165 118 L 165 135 L 125 135 Z"
                    fill="#00d4ff"
                    style={{ filter: 'drop-shadow(0 0 20px #00d4ff)' }}
                  />
                </svg>
              </motion.div>

              {/* Garganta Opening - Top Side */}
              <motion.div
                initial={{ y: 0, scaleY: 0 }}
                animate={{ y: "-50%", scaleY: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
                className="absolute top-1/2 left-0 right-0 h-1/2 bg-black origin-bottom"
                style={{
                  clipPath: 'polygon(0 100%, 0 0, 100% 0, 100% 100%, 50% 70%)',
                  boxShadow: 'inset 0 -10px 50px rgba(0, 212, 255, 0.6)',
                }}
              >
                {/* Electric Edge Effect - Top */}
                <motion.div
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.4,
                    repeat: Infinity,
                  }}
                  className="absolute bottom-0 left-0 right-0 h-1"
                  style={{
                    background: 'linear-gradient(to right, transparent, #00d4ff 10%, #9D4EDD 30%, #FFA500 50%, #9D4EDD 70%, #00d4ff 90%, transparent)',
                    boxShadow: '0 0 20px #00d4ff, 0 0 40px #00d4ff',
                  }}
                />
                
                {/* Particles on edge */}
                {[...Array(40)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      y: [-15, 15],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 1.2,
                      delay: 0.2 + i * 0.02,
                      repeat: Infinity,
                      repeatDelay: 0.5,
                    }}
                    className="absolute bottom-0 w-1 h-1 rounded-full"
                    style={{
                      left: `${(i / 40) * 100}%`,
                      background: i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#9D4EDD' : '#FFA500',
                      boxShadow: `0 0 8px ${i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#9D4EDD' : '#FFA500'}`,
                    }}
                  />
                ))}

                {/* Jagged energy lines */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`top-line-${i}`}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scaleX: [0, 1, 0],
                    }}
                    transition={{
                      duration: 0.4,
                      delay: 0.3 + i * 0.08,
                      repeat: 3,
                      repeatDelay: 0.2,
                    }}
                    className="absolute bottom-0 h-px bg-[#00d4ff]"
                    style={{
                      left: `${i * 12}%`,
                      width: '10%',
                      boxShadow: '0 0 5px #00d4ff',
                      transform: `translateY(-${Math.random() * 20}px)`,
                    }}
                  />
                ))}
              </motion.div>

              {/* Garganta Opening - Bottom Side */}
              <motion.div
                initial={{ y: 0, scaleY: 0 }}
                animate={{ y: "50%", scaleY: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
                className="absolute bottom-1/2 left-0 right-0 h-1/2 bg-black origin-top"
                style={{
                  clipPath: 'polygon(0 0, 0 100%, 100% 100%, 100% 0, 50% 30%)',
                  boxShadow: 'inset 0 10px 50px rgba(0, 212, 255, 0.6)',
                }}
              >
                {/* Electric Edge Effect - Bottom */}
                <motion.div
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.4,
                    repeat: Infinity,
                  }}
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{
                    background: 'linear-gradient(to right, transparent, #00d4ff 10%, #9D4EDD 30%, #FFA500 50%, #9D4EDD 70%, #00d4ff 90%, transparent)',
                    boxShadow: '0 0 20px #00d4ff, 0 0 40px #00d4ff',
                  }}
                />

                {/* Particles on edge */}
                {[...Array(40)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      y: [15, -15],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 1.2,
                      delay: 0.2 + i * 0.02,
                      repeat: Infinity,
                      repeatDelay: 0.5,
                    }}
                    className="absolute top-0 w-1 h-1 rounded-full"
                    style={{
                      left: `${(i / 40) * 100}%`,
                      background: i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#9D4EDD' : '#FFA500',
                      boxShadow: `0 0 8px ${i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#9D4EDD' : '#FFA500'}`,
                    }}
                  />
                ))}

                {/* Jagged energy lines */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`bottom-line-${i}`}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scaleX: [0, 1, 0],
                    }}
                    transition={{
                      duration: 0.4,
                      delay: 0.3 + i * 0.08,
                      repeat: 3,
                      repeatDelay: 0.2,
                    }}
                    className="absolute top-0 h-px bg-[#00d4ff]"
                    style={{
                      left: `${i * 12}%`,
                      width: '10%',
                      boxShadow: '0 0 5px #00d4ff',
                      transform: `translateY(${Math.random() * 20}px)`,
                    }}
                  />
                ))}
              </motion.div>

              {/* Lightning bolts across the opening - VERTICAL */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{
                    opacity: [0, 1, 0.7, 0],
                    scaleY: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.4 + i * 0.08,
                    repeat: 2,
                    repeatDelay: 0.1,
                  }}
                  className="absolute top-1/4 bottom-1/4 w-px"
                  style={{
                    left: `${15 + i * 10}%`,
                    background: 'linear-gradient(to bottom, transparent, #00d4ff 20%, #fff 50%, #00d4ff 80%, transparent)',
                    boxShadow: '0 0 15px #00d4ff, 0 0 30px #00d4ff',
                  }}
                />
              ))}

              {/* Central energy burst */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 2, 3],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 1,
                  delay: 0.5,
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div 
                  className="w-32 h-32 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)',
                  }}
                />
              </motion.div>

              {/* Reveal effect - the content behind */}
              <motion.div
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] -z-10"
              >
                <div className="absolute inset-0 opacity-20">
                  <div 
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `linear-gradient(#00d4ff 1px, transparent 1px), linear-gradient(90deg, #00d4ff 1px, transparent 1px)`,
                      backgroundSize: '50px 50px',
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
