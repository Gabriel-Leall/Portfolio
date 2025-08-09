import React, { useState } from 'react'
import { useTheme } from '../../hooks/useTheme'
import Logo from '../ui/Logo'
import MobileMenu from './MobileMenu'
import MobileMenuButton from '../ui/MobileMenuButton'
import Navigation from './Navigation'
import ThemeToggle from '../ui/ThemeToggle'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme('dark')

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/sobre', label: 'Sobre', sectionId: 'sobre' },
    { to: '/projetos', label: 'Projetos', sectionId: 'projetos' },
    {
      to: '/servicos',
      label: 'Meu processo de trabalho',
      sectionId: 'processo',
    },
    { to: '/contato', label: 'Contato', sectionId: 'contato' },
  ]

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-6 lg:px-8 transition-all duration-300"
      style={{
        backgroundColor: 'var(--background)',
        borderBottom: `1px solid var(--support-neutral)`,
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo />

        <div className="flex items-center gap-4">
          <Navigation navItems={navItems} />

          <ThemeToggle
            theme={theme}
            onToggle={toggleTheme}
            className="hidden md:block"
          />

          <MobileMenuButton isOpen={isMenuOpen} onToggle={toggleMenu} />
        </div>
      </div>

      <MobileMenu
        isOpen={isMenuOpen}
        navItems={navItems}
        theme={theme}
        onThemeToggle={toggleTheme}
        onClose={closeMenu}
      />
    </header>
  )
}

export default Header
