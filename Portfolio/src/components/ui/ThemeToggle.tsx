import React, { useMemo } from 'react'
import DarkIcon from '@/components/icons/icon_toogle_darktheme'
import LightIcon from '@/components/icons/icon_toogle_lighttheme'

interface ThemeToggleProps {
  theme: string
  onToggle: () => void
  className?: string
  isMobile?: boolean
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onToggle,
  className = '',
  isMobile: _isMobile = false,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onToggle()
    }
  }

  // Variante mobile usará o mesmo toggle compacto (sem texto)

  const isLight = theme === 'light'
  const containerClasses = useMemo(
    () =>
      `relative inline-flex items-center h-[31px] w-[60px] rounded-[999px] p-[2px] transition-[background,box-shadow] duration-[600ms] ease-out cursor-pointer ${
        isLight
          ? 'bg-gradient-to-b from-[#f4c86a] to-[#b77118] shadow-[inset_0_2px_6px_rgba(255,255,255,.35)]'
          : 'bg-[#050b2a]'
      } ${className}`,
    [isLight, className],
  )

  const knobClasses = useMemo(
    () =>
      `absolute top-[2px] left-[2px] h-[27px] w-[27px] rounded-full grid place-items-center transition-transform duration-[600ms] ease-out will-change-transform ${
        isLight
          ? 'translate-x-0 bg-[#e5e6ea]/95 text-[#b77118] shadow-[0_4px_10px_rgba(183,113,24,.35)]'
          : 'translate-x-[29px] bg-[#e5e6ea]/95 text-[#0a1b5a] shadow-[0_4px_10px_rgba(5,11,42,.35)]'
      }`,
    [isLight],
  )

  return (
    <button
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      className={containerClasses}
      tabIndex={0}
      aria-label={`Mudar para tema ${isLight ? 'escuro' : 'claro'}`}
    >
      {!isLight && (
        <div className="pointer-events-none absolute inset-0">
          <span className="absolute left-[18px] top-[8px] block h-[6px] w-[6px] rotate-45 rounded-[1px] bg-white/80 animate-pulse duration-[1200ms]" />
          <span className="absolute left-[36px] top-[16px] block h-[5px] w-[5px] rotate-45 rounded-[1px] bg-white/60 animate-pulse duration-[1400ms]" />
        </div>
      )}
      <div className={knobClasses} aria-hidden>
        {isLight ? <LightIcon /> : <DarkIcon />}
      </div>
    </button>
  )
}

export default ThemeToggle
