import React, { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { OrbitingIcon } from './OrbitingIcon'

interface TechIcon {
  Icon: string
  name: string
  id?: string
}

interface OrbitingMarqueeProps {
  techIcons: TechIcon[]
  centerElement: HTMLElement | null
  radius: number
  speed: number
  direction?: 'clockwise' | 'counterclockwise'
  isAnimating: boolean
  respectsReducedMotion: boolean
  className?: string
}

export const OrbitingMarquee: React.FC<OrbitingMarqueeProps> = ({
  techIcons,
  centerElement,
  radius,
  speed,
  direction = 'clockwise',
  isAnimating,
  respectsReducedMotion,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [centerPosition, setCenterPosition] = useState({ x: 0, y: 0 })
  const [hoveredIcon, setHoveredIcon] = useState<TechIcon | null>(null)

  // Add unique IDs to icons if they don't have them
  const iconsWithIds = techIcons.map((icon, index) => ({
    ...icon,
    id: icon.id || `tech-icon-${index}`,
  }))

  // Calculate center position based on profile element
  useEffect(() => {
    if (!centerElement || !containerRef.current) return

    const updatePosition = () => {
      const centerRect = centerElement.getBoundingClientRect()
      const containerRect = containerRef.current?.getBoundingClientRect()

      if (containerRect) {
        setCenterPosition({
          x: centerRect.left + centerRect.width / 2 - containerRect.left,
          y: centerRect.top + centerRect.height / 2 - containerRect.top,
        })
      }
    }

    updatePosition()

    // Update position on scroll and resize
    const handleUpdate = () => updatePosition()
    window.addEventListener('scroll', handleUpdate, { passive: true })
    window.addEventListener('resize', handleUpdate)

    return () => {
      window.removeEventListener('scroll', handleUpdate)
      window.removeEventListener('resize', handleUpdate)
    }
  }, [centerElement])

  // Calculate angle spacing for icons
  const angleStep = 360 / iconsWithIds.length

  const handleIconHover = (icon: TechIcon, isHovered: boolean) => {
    setHoveredIcon(isHovered ? icon : null)
  }

  // If reduced motion is preferred, show a static grid instead
  if (respectsReducedMotion) {
    return (
      <div 
        className={`static-tech-grid ${className}`}
        role="region"
        aria-label="Tecnologias utilizadas (versão estática)"
      >
        <div 
          className="grid grid-cols-3 md:grid-cols-4 gap-4 max-w-xs mx-auto"
          role="list"
          aria-label="Lista de tecnologias"
        >
          {iconsWithIds.slice(0, 8).map((icon, index) => (
            <div
              key={icon.id}
              className="tech-item-static flex flex-col items-center gap-2 p-2 rounded-lg transition-transform duration-300 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              style={{ backgroundColor: 'var(--surface-soft)' }}
              role="listitem"
              tabIndex={0}
              aria-label={`Tecnologia ${icon.name}, ${index + 1} de 8`}
            >
              <img
                src={icon.Icon}
                alt={`Ícone da tecnologia ${icon.name}`}
                className="w-8 h-8 md:w-10 md:h-10"
              />
              <span
                className="text-xs font-medium text-center"
                style={{ color: 'var(--text-muted)' }}
              >
                {icon.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`orbit-container relative w-full h-full pointer-events-none ${className}`}
      style={{
        minHeight: `${radius * 2 + 120}px`,
      }}
      role="region"
      aria-label="Tecnologias em órbita ao redor da foto de perfil"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Screen reader announcement */}
      <div className="sr-only" aria-live="polite">
        {hoveredIcon ? `Tecnologia em destaque: ${hoveredIcon.name}` : 
         `Órbita com ${iconsWithIds.length} tecnologias ${isAnimating ? 'em movimento' : 'pausada'}`}
      </div>
      {/* Orbit path visualization (optional, for debugging) */}
      {process.env.NODE_ENV === 'development' && (
        <div
          className="absolute border border-dashed opacity-20"
          style={{
            left: centerPosition.x - radius,
            top: centerPosition.y - radius,
            width: radius * 2,
            height: radius * 2,
            borderRadius: '50%',
            borderColor: 'var(--primary)',
          }}
        />
      )}

      {/* Orbiting icons container */}
      <div
        className="absolute pointer-events-auto"
        style={{
          left: centerPosition.x,
          top: centerPosition.y,
          transform: 'translate(-50%, -50%)',
        }}
        role="list"
        aria-label={`Lista de tecnologias: ${iconsWithIds.map(icon => icon.name).join(', ')}`}
      >
        <AnimatePresence mode="wait">
          {iconsWithIds.map((icon, index) => (
            <OrbitingIcon
              key={icon.id}
              icon={icon}
              angle={index * angleStep}
              radius={radius}
              index={index}
              totalIcons={iconsWithIds.length}
              isAnimating={isAnimating}
              animationSpeed={speed}
              direction={direction}
              onHover={handleIconHover}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Hovered icon tooltip */}
      <AnimatePresence>
        {hoveredIcon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-none z-50"
          >
            <div
              className="px-3 py-2 rounded-lg text-sm font-medium shadow-lg"
              style={{
                backgroundColor: 'var(--surface-soft)',
                color: 'var(--text-strong)',
                border: '1px solid var(--support-neutral)',
              }}
            >
              {hoveredIcon.name}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}