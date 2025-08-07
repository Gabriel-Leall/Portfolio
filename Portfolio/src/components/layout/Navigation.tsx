import React from 'react'
import { Link } from '@tanstack/react-router'
import { useSmoothNavigation } from '../../hooks/useSmoothNavigation'

interface NavItem {
  to: string
  label: string
  sectionId?: string
}

interface NavigationProps {
  navItems: Array<NavItem>
  className?: string
  preferScrollNavigation?: boolean
}

const Navigation: React.FC<NavigationProps> = ({
  navItems,
  className = '',
  preferScrollNavigation = true,
}) => {
  const { navigateToSection, navigateToRoute } = useSmoothNavigation()

  const handleNavigation = (item: NavItem, e: React.MouseEvent) => {
    if (preferScrollNavigation && item.sectionId) {
      e.preventDefault()
      navigateToSection(item.sectionId)
    } else {
      navigateToRoute(item.to)
    }
  }

  return (
    <nav className={`hidden md:flex items-center gap-8 ${className}`}>
      {navItems.slice(1).map((item) => (
        <Link
          key={item.to}
          to={item.to}
          onClick={(e) => handleNavigation(item, e)}
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
