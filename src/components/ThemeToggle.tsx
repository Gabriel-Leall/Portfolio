import React from 'react'

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
  isMobile = false,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onToggle()
    }
  }

  if (isMobile) {
    return (
      <button
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        className={`w-full text-left py-2 px-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-3 ${className}`}
        style={{ color: 'var(--text-strong)' }}
        tabIndex={0}
        aria-label={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
      >
        <span>{theme === 'light' ? '🌙' : '☀️'}</span>
        Tema {theme === 'light' ? 'Escuro' : 'Claro'}
      </button>
    )
  }

  return (
    <button
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      className={`p-2 rounded-lg border transition-all duration-300 hover:scale-105 ${className}`}
      style={{
        borderColor: 'var(--support-neutral)',
        backgroundColor: 'var(--surface-soft)',
      }}
      tabIndex={0}
      aria-label={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
    >
      <span className="text-lg">{theme === 'light' ? '🌙' : '☀️'}</span>
    </button>
  )
}

export default ThemeToggle
