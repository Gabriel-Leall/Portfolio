import React, { useState } from 'react'
import { motion, type Variants } from 'motion/react'

interface TechIcon {
  Icon: string
  name: string
  id?: string
}

interface OrbitingIconProps {
  icon: TechIcon
  angle: number
  radius: number
  index: number
  totalIcons: number
  isAnimating: boolean
  animationSpeed: number
  direction?: 'clockwise' | 'counterclockwise'
  onHover?: (icon: TechIcon, isHovered: boolean) => void
}

export const OrbitingIcon: React.FC<OrbitingIconProps> = ({
  icon,
  angle,
  radius,
  index,
  totalIcons,
  isAnimating,
  animationSpeed,
  direction = 'clockwise',
  onHover,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  // Calculate z-index based on y position (back to front)
  const y = Math.sin((angle * Math.PI) / 180) * radius
  const zIndex = Math.round((y + radius) / (radius * 2) * 10) + 11

  // Animation variants for the orbit motion
  const orbitVariants: Variants = {
    animate: {
      rotate: direction === 'clockwise' ? 360 : -360,
      transition: {
        duration: animationSpeed,
        ease: 'linear',
        repeat: Infinity,
      },
    },
    paused: {
      rotate: 0,
      transition: {
        duration: 0,
      },
    },
  }

  // Icon hover animation
  const iconVariants: Variants = {
    normal: {
      scale: 1,
      rotateY: 0,
    },
    hovered: {
      scale: 1.2,
      rotateY: 15,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 20,
      },
    },
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    onHover?.(icon, true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    onHover?.(icon, false)
  }

  return (
    <motion.div
      className="absolute"
      style={{
        left: '50%',
        top: '50%',
        transformOrigin: '0 0',
        zIndex,
      }}
      variants={orbitVariants}
      animate={isAnimating ? 'animate' : 'paused'}
      initial={{ rotate: (index * 360) / totalIcons }}
      role="listitem"
      aria-label={`Tecnologia ${icon.name}, ${index + 1} de ${totalIcons}`}
    >
      <motion.div
        className="absolute orbit-icon-wrapper"
        style={{
          left: `${radius}px`,
          top: '0px',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <motion.div
          className="orbit-icon relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
          variants={iconVariants}
          animate={isHovered ? 'hovered' : 'normal'}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            // Counter-rotate to keep icon upright
            rotate: direction === 'clockwise' ? -360 : 360,
          }}
          whileTap={{ scale: 0.95 }}
          tabIndex={0}
          role="button"
          aria-label={`Ícone da tecnologia ${icon.name}. Pressione Enter para obter mais informações.`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleMouseEnter()
              setTimeout(handleMouseLeave, 2000) // Show tooltip for 2 seconds
            }
          }}
        >
          <div className="tech-item-orbit flex flex-col items-center gap-2 p-2 rounded-lg transition-all duration-300">
            <img
              src={icon.Icon}
              alt={icon.name}
              className="tech-icon-orbit w-8 h-8 md:w-10 md:h-10"
              style={{
                filter: isHovered ? 'brightness(1.2) saturate(1.2)' : 'none',
              }}
            />
            <span
              className="tech-name-orbit text-xs font-medium text-center transition-opacity duration-300"
              style={{
                color: 'var(--text-muted)',
                opacity: isHovered ? 1 : 0.7,
              }}
            >
              {icon.name}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}