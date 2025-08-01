import React from 'react'

const AboutMe: React.FC = () => {
  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action()
    }
  }

  return (
    <section id="sobre" className="w-full" aria-label="Seção Sobre Mim">
      {/* Primeira subseção - Fundo Principal */}
      <div
        className="py-16 lg:py-20 min-h-[60vh] flex items-center"
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <h3
                  className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 lg:mb-8"
                  style={{ color: 'var(--text-strong)' }}
                >
                  Minha Jornada
                </h3>
                <p
                  className="text-base sm:text-lg leading-relaxed mb-6"
                  style={{ color: 'var(--text-strong)' }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p
                  className="text-base leading-relaxed mb-6"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </p>
              </div>
              <div className="order-1 lg:order-2">
                <div
                  className="w-full h-64 sm:h-80 lg:h-96 rounded-xl flex items-center justify-center border-2 transition-transform duration-300 hover:scale-105"
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
            </div>
          </div>
        </div>
      </div>

      {/* Segunda subseção - Fundo Alternativo */}
      <div
        className="py-16 lg:py-20 min-h-[60vh] flex items-center"
        style={{ backgroundColor: 'var(--surface-soft)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="w-full">
            <h3
              className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-8 lg:mb-12 text-center lg:text-left"
              style={{ color: 'var(--text-strong)' }}
            >
              Habilidades & Expertise
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mt-8">
              <div
                className="p-6 lg:p-8 rounded-xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/20"
                style={{
                  backgroundColor: 'var(--background)',
                  borderColor: 'var(--support-neutral)',
                }}
              >
                <h4
                  className="text-lg sm:text-xl font-semibold mb-4"
                  style={{ color: 'var(--primary)' }}
                >
                  Frontend Development
                </h4>
                <p
                  className="leading-relaxed mb-6 text-sm sm:text-base"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris viverra lorem sed nunc tempor, at consectetur justo
                  tincidunt.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span
                    className="px-3 py-2 rounded-full text-sm font-medium transition-opacity duration-300 hover:opacity-90 cursor-pointer"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'var(--background)',
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label="Tecnologia React"
                    onKeyDown={(e) =>
                      handleKeyDown(e, () => console.log('React clicked'))
                    }
                  >
                    React
                  </span>
                  <span
                    className="px-3 py-2 rounded-full text-sm font-medium transition-opacity duration-300 hover:opacity-90 cursor-pointer"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'var(--background)',
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label="Tecnologia TypeScript"
                    onKeyDown={(e) =>
                      handleKeyDown(e, () => console.log('TypeScript clicked'))
                    }
                  >
                    TypeScript
                  </span>
                  <span
                    className="px-3 py-2 rounded-full text-sm font-medium transition-opacity duration-300 hover:opacity-90 cursor-pointer"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'var(--background)',
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label="Tecnologia CSS3"
                    onKeyDown={(e) =>
                      handleKeyDown(e, () => console.log('CSS3 clicked'))
                    }
                  >
                    CSS3
                  </span>
                </div>
              </div>

              <div
                className="p-6 lg:p-8 rounded-xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/20"
                style={{
                  backgroundColor: 'var(--background)',
                  borderColor: 'var(--support-neutral)',
                }}
              >
                <h4
                  className="text-lg sm:text-xl font-semibold mb-4"
                  style={{ color: 'var(--primary)' }}
                >
                  Backend Development
                </h4>
                <p
                  className="leading-relaxed mb-6 text-sm sm:text-base"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span
                    className="px-3 py-2 rounded-full text-sm font-medium transition-opacity duration-300 hover:opacity-90 cursor-pointer"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'var(--background)',
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label="Tecnologia Node.js"
                    onKeyDown={(e) =>
                      handleKeyDown(e, () => console.log('Node.js clicked'))
                    }
                  >
                    Node.js
                  </span>
                  <span
                    className="px-3 py-2 rounded-full text-sm font-medium transition-opacity duration-300 hover:opacity-90 cursor-pointer"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'var(--background)',
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label="Tecnologia Python"
                    onKeyDown={(e) =>
                      handleKeyDown(e, () => console.log('Python clicked'))
                    }
                  >
                    Python
                  </span>
                  <span
                    className="px-3 py-2 rounded-full text-sm font-medium transition-opacity duration-300 hover:opacity-90 cursor-pointer"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'var(--background)',
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label="Tecnologia SQL"
                    onKeyDown={(e) =>
                      handleKeyDown(e, () => console.log('SQL clicked'))
                    }
                  >
                    SQL
                  </span>
                </div>
              </div>

              <div
                className="p-6 lg:p-8 rounded-xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/20 md:col-span-2 xl:col-span-1"
                style={{
                  backgroundColor: 'var(--background)',
                  borderColor: 'var(--support-neutral)',
                }}
              >
                <h4
                  className="text-lg sm:text-xl font-semibold mb-4"
                  style={{ color: 'var(--primary)' }}
                >
                  Design & UX
                </h4>
                <p
                  className="leading-relaxed mb-6 text-sm sm:text-base"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                  aute irure dolor in reprehenderit in voluptate velit esse
                  cillum.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span
                    className="px-3 py-2 rounded-full text-sm font-medium transition-opacity duration-300 hover:opacity-90 cursor-pointer"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'var(--background)',
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label="Ferramenta Figma"
                    onKeyDown={(e) =>
                      handleKeyDown(e, () => console.log('Figma clicked'))
                    }
                  >
                    Figma
                  </span>
                  <span
                    className="px-3 py-2 rounded-full text-sm font-medium transition-opacity duration-300 hover:opacity-90 cursor-pointer"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'var(--background)',
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label="Habilidade UI/UX"
                    onKeyDown={(e) =>
                      handleKeyDown(e, () => console.log('UI/UX clicked'))
                    }
                  >
                    UI/UX
                  </span>
                  <span
                    className="px-3 py-2 rounded-full text-sm font-medium transition-opacity duration-300 hover:opacity-90 cursor-pointer"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'var(--background)',
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label="Design Responsivo"
                    onKeyDown={(e) =>
                      handleKeyDown(e, () => console.log('Responsive clicked'))
                    }
                  >
                    Responsive
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terceira subseção - Fundo Principal novamente */}
      <div
        className="py-16 lg:py-20 min-h-[60vh] flex items-center"
        style={{ backgroundColor: 'var(--background)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="w-full">
            <h3
              className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-8 lg:mb-12 text-center lg:text-left"
              style={{ color: 'var(--text-strong)' }}
            >
              Filosofia de Trabalho
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              <div className="order-2 lg:order-1">
                <p
                  className="text-base sm:text-lg leading-relaxed mb-6"
                  style={{ color: 'var(--text-strong)' }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p
                  className="text-base leading-relaxed mb-6"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum. Sed ut
                  perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium.
                </p>
              </div>

              <div className="order-1 lg:order-2 grid grid-cols-1 gap-6">
                <div
                  className="flex items-start gap-4 p-6 rounded-lg border transition-all duration-300 hover:opacity-90"
                  style={{
                    backgroundColor: 'var(--surface-soft)',
                    borderColor: 'var(--support-neutral)',
                  }}
                >
                  <div
                    className="text-3xl min-w-[3rem] flex items-center justify-center"
                    role="img"
                    aria-label="Ícone de qualidade"
                  >
                    🎯
                  </div>
                  <div>
                    <h5
                      className="text-lg font-semibold mb-2"
                      style={{ color: 'var(--text-strong)' }}
                    >
                      Qualidade
                    </h5>
                    <p
                      className="leading-relaxed text-sm"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-start gap-4 p-6 rounded-lg border transition-all duration-300 hover:opacity-90"
                  style={{
                    backgroundColor: 'var(--surface-soft)',
                    borderColor: 'var(--support-neutral)',
                  }}
                >
                  <div
                    className="text-3xl min-w-[3rem] flex items-center justify-center"
                    role="img"
                    aria-label="Ícone de inovação"
                  >
                    🚀
                  </div>
                  <div>
                    <h5
                      className="text-lg font-semibold mb-2"
                      style={{ color: 'var(--text-strong)' }}
                    >
                      Inovação
                    </h5>
                    <p
                      className="leading-relaxed text-sm"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Sed do eiusmod tempor incididunt ut labore et dolore
                      magna.
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-start gap-4 p-6 rounded-lg border transition-all duration-300 hover:opacity-90"
                  style={{
                    backgroundColor: 'var(--surface-soft)',
                    borderColor: 'var(--support-neutral)',
                  }}
                >
                  <div
                    className="text-3xl min-w-[3rem] flex items-center justify-center"
                    role="img"
                    aria-label="Ícone de colaboração"
                  >
                    🤝
                  </div>
                  <div>
                    <h5
                      className="text-lg font-semibold mb-2"
                      style={{ color: 'var(--text-strong)' }}
                    >
                      Colaboração
                    </h5>
                    <p
                      className="leading-relaxed text-sm"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutMe
