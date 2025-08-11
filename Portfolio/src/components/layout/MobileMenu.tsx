import React from 'react'
import { Link } from '@tanstack/react-router'
import ThemeToggle from '../ui/ThemeToggle'

interface NavItem {
  to: string
  label: string
}

interface MobileMenuProps {
  isOpen: boolean
  navItems: Array<NavItem>
  theme: string
  onThemeToggle: () => void
  onClose: () => void
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  navItems,
  theme,
  onThemeToggle,
  onClose,
}) => {
  if (!isOpen) return null

  return (
    <div
      className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4 rounded-lg border shadow-lg"
      style={{
        backgroundColor: 'var(--surface-soft)',
        borderColor: 'var(--support-neutral)',
      }}
    >
      <nav className="p-4 space-y-3">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={onClose}
            className="block w-full text-left py-2 px-3 rounded-lg font-medium transition-all duration-300 [&.active]:font-bold"
            activeProps={{
              style: {
                color: 'var(--primary)',
              },
            }}
            style={{ color: 'var(--text-strong)' }}
            aria-label={`Navegar para seção ${item.label}`}
          >
            {item.label}
          </Link>
        ))}

        <div className="pt-2 flex justify-end">
          <ThemeToggle theme={theme} onToggle={onThemeToggle} isMobile={true} />
        </div>
      </nav>
    </div>
  )
}

export default MobileMenu
