import React from 'react'
import { Link } from '@tanstack/react-router'

interface NavItem {
  to: string
  label: string
}

interface NavigationProps {
  navItems: Array<NavItem>
  className?: string
}

const Navigation: React.FC<NavigationProps> = ({
  navItems,
  className = '',
}) => {
  return (
    <nav className={`hidden md:flex items-center gap-8 ${className}`}>
      {navItems.slice(1).map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className="font-medium transition-all duration-300 hover:scale-105 [&.active]:font-bold"
          style={{
            color: 'var(--text-strong)',
          }}
          activeProps={{
            style: {
              color: 'var(--primary)',
            },
          }}
          aria-label={`Navegar para seção ${item.label}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}

export default Navigation
