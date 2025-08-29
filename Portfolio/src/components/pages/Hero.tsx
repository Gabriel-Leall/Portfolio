import React from 'react'

const Hero: React.FC = () => {
  return (
    <section className="hero-section" aria-label="Seção Hero">
      <div className="hero-content">
        <h1>Olá! sou o Gabriel, Desenvolvedor Front-End.</h1>
        <p>
          Transformando designs complexos em aplicações web rápidas e
          intuitivas.
        </p>
        <a
          href="#contato"
          className="inline-block rounded-xl px-5 py-2 transition-transform duration-300 hover:scale-105 cta-button font-semibold"
          style={{
            backgroundColor: 'var(--primary)',
            color: 'var(--primary-foreground)',
          }}
        >
          Contact Me
        </a>
      </div>
    </section>
  )
}

export default Hero
