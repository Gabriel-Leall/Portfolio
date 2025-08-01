import React, { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'

export default function Header() {
  const [theme, setTheme] = useState('dark')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.body.className = newTheme + '-theme'
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action()
    }
  }

  useEffect(() => {
    document.body.className = theme + '-theme'
  }, [theme])

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/sobre', label: 'Sobre' },
    { to: '/projetos', label: 'Projetos' },
    { to: '/servicos', label: 'Serviços' },
    { to: '/contato', label: 'Contato' },
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
        <Link
          to="/"
          className="text-xl sm:text-2xl font-bold cursor-pointer"
          style={{ color: 'var(--primary)' }}
          aria-label="Voltar ao início"
        >
          Portfolio
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
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

          {/* Theme Toggle Desktop */}
          <button
            onClick={toggleTheme}
            onKeyDown={(e) => handleKeyDown(e, toggleTheme)}
            className="p-2 rounded-lg border transition-all duration-300 hover:scale-105"
            style={{
              borderColor: 'var(--support-neutral)',
              backgroundColor: 'var(--surface-soft)',
            }}
            tabIndex={0}
            aria-label={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
          >
            <span className="text-lg">{theme === 'light' ? '🌙' : '☀️'}</span>
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          onKeyDown={(e) => handleKeyDown(e, toggleMenu)}
          className="md:hidden p-2 rounded-lg border"
          style={{
            borderColor: 'var(--support-neutral)',
            backgroundColor: 'var(--surface-soft)',
          }}
          tabIndex={0}
          aria-label="Abrir menu de navegação"
        >
          <span className="text-xl">{isMenuOpen ? '✕' : '☰'}</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
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
                onClick={() => setIsMenuOpen(false)}
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

            {/* Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              onKeyDown={(e) => handleKeyDown(e, toggleTheme)}
              className="w-full text-left py-2 px-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-3"
              style={{ color: 'var(--text-strong)' }}
              tabIndex={0}
              aria-label={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
            >
              <span>{theme === 'light' ? '🌙' : '☀️'}</span>
              Tema {theme === 'light' ? 'Escuro' : 'Claro'}
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
