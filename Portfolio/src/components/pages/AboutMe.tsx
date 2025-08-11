import React from 'react'
import { LiquidButton } from '../ui/liquid-button'

const AboutMe: React.FC = () => {
  return (
    <section id="sobre" className="w-full" aria-label="Seção Sobre Mim">
      {/* Primeira subseção - Fundo Principal */}
      <div
        className="py-16 lg:py-20 min-h-screen flex items-center"
        style={{ backgroundColor: 'var(--background)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="w-full">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 lg:mb-16"
              style={{ color: 'var(--text-strong)' }}
            >
              Sobre Mim
            </h2>
            <div className="relative flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
              <div className="lg:sticky top-20 flex-shrink-0 w-full lg:w-1/3">
                <div
                  className="aspect-square w-full max-w-sm mx-auto lg:max-w-none bg-gray-200 rounded-full flex items-center justify-center border-2 transition-transform duration-300 hover:scale-105"
                  style={{
                    backgroundColor: 'var(--support-neutral)',
                    borderColor: 'var(--support-neutral)',
                  }}
                  role="img"
                  aria-label="Placeholder para foto profissional"
                >
                  <span
                    className="text-lg sm:text-xl font-medium"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Foto Profissional
                  </span>
                </div>
              </div>
              <div className="flex-grow lg:pt-8">
                <p
                  className="text-base sm:text-lg leading-relaxed mb-6"
                  style={{ color: 'var(--text-strong)' }}
                >
                  Desde o início da minha trajetória na tecnologia, sou
                  fascinado pelo processo de transformar uma ideia abstrata em
                  um produto digital interativo e funcional. Para mim, o
                  desenvolvimento front-end é o lugar perfeito onde a lógica do
                  código encontra a criatividade do design para resolver
                  problemas reais.
                </p>
                <p
                  className="text-base leading-relaxed mb-6"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Para isso, utilizo ferramentas modernas do ecossistema
                  JavaScript, como React, Next.js e TypeScript, sempre com foco
                  em performance e escalabilidade. Acredito que a atenção aos
                  princípios de UI/UX e acessibilidade não é um extra, mas uma
                  parte fundamental da criação de produtos de alta qualidade.
                </p>
                <p
                  className="text-base leading-relaxed mb-6"
                  style={{ color: 'var(--text-strong)' }}
                >
                  Fora do código, gosto de jogar volêi e jogar rpg de mesa. Se
                  você está procurando um desenvolvedor detalhista e
                  colaborativo para sua equipe ou projeto, vamos conversar!
                </p>
                <LiquidButton
                  variant="outline"
                  size="lg"
                  className="border-[var(--support-neutral)] text-[var(--text-strong)] dark:text-[var(--primary-foreground)]"
                >
                  <a
                    href="/assets/curriculo.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
          className="text-sm sm:text-base font-semibold text-current"
                    aria-label="Curriculum Vitae (CV)"
                  >
                    Curriculum Vitae (CV)
                  </a>
                </LiquidButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutMe
