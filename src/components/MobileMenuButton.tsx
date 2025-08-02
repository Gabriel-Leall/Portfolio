import React from 'react'

interface MobileMenuButtonProps {
  isOpen: boolean
  onToggle: () => void
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({
  isOpen,
  onToggle,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onToggle()
    }
  }

  return (
    <button
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      className="md:hidden p-2 rounded-lg border"
      style={{
        borderColor: 'var(--support-neutral)',
        backgroundColor: 'var(--surface-soft)',
      }}
      tabIndex={0}
      aria-label={
        isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'
      }
      aria-expanded={isOpen}
    >
      <span className="text-xl">{isOpen ? '✕' : '☰'}</span>
    </button>
  )
}

export default MobileMenuButton
