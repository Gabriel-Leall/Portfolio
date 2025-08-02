import React from 'react'
import { Link } from '@tanstack/react-router'

interface LogoProps {
  text?: string
  className?: string
}

const Logo: React.FC<LogoProps> = ({ text = 'Portfolio', className = '' }) => {
  return (
    <Link
      to="/"
      className={`text-xl sm:text-2xl font-bold cursor-pointer transition-all duration-300 hover:scale-105 ${className}`}
      style={{ color: 'var(--primary)' }}
      aria-label="Voltar ao início"
    >
      {text}
    </Link>
  )
}

export default Logo
