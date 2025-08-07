import React, { useState } from 'react'

const Projects: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action()
    }
  }

  const projects = [
    {
      id: 1,
      name: 'Barber Schedule',
      description:
        'Saas de Barbearia para barbeiros e clientes.',
      techStack: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
      demoLink: '#',
      repoLink: '#',
      image: '/images/barberschedule_thumb_large.webp',
    },
    {
      id: 2,
      name: 'Naurial',
      description:
        'Plataforma de aprendizado interativa com IA.',
      techStack: ['Next.js', 'Prisma', 'PostgreSQL', 'TailwindCSS'],
      demoLink: '#',
      repoLink: '#',
      image: '/images/Naurial thumb.webp',
    },
    {
      id: 3,
      name: 'Weather Dashboard',
      description:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      techStack: ['Vue.js', 'Express', 'API Integration', 'Chart.js'],
      demoLink: '#',
      repoLink: '#',
      image: 'placeholder',
    },
  ]

  return (
    <section
      id="projetos"
      className="w-full py-16 lg:py-20 min-h-screen flex items-center"
      style={{ backgroundColor: 'var(--background)' }}
      aria-label="Seção Projetos"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="w-full">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4 lg:mb-6"
            style={{ color: 'var(--text-strong)' }}
          >
            Projetos
          </h2>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
            {projects.map((project, idx) => {
              const isActive = activeIndex === idx
              return (
                <div
                  key={project.id}
                  className={`flex flex-col items-start relative transition-all duration-300 ${isActive ? 'z-20' : 'z-10'}`}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onMouseLeave={() => setActiveIndex(null)}
                  onFocus={() => setActiveIndex(idx)}
                  onBlur={() => setActiveIndex(null)}
                  tabIndex={0}
                  style={{ outline: 'none' }}
                >
                  {/* Card de Imagem */}
                  <div
                    className={`relative w-[380px] h-[260px] sm:w-[420px] sm:h-[300px] rounded-2xl overflow-hidden shadow-xl transition-all duration-300 ${isActive ? 'shadow-2xl scale-105' : ''}`}
                    style={{ backgroundColor: 'transparent' }}
                  >
                    {project.image === 'placeholder' ? (
                      <div
                        className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-neutral-800"
                        role="img"
                        aria-label={`Preview do projeto ${project.name}`}
                      >
                        <span className="text-base font-medium text-gray-400 dark:text-gray-500">
                          Preview do Projeto
                        </span>
                      </div>
                    ) : (
                      <img
                        src={project.image}
                        alt={`Preview do projeto ${project.name}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Conteúdo do Projeto - só aparece se ativo */}
                  {isActive && (
                    <div
                      className="w-full flex flex-col items-start mt-14 transition-all duration-500 ease-out"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive
                          ? 'translateY(0)'
                          : 'translateY(16px)',
                        transition:
                          'opacity 0.5s cubic-bezier(0.4,0,0.2,1), transform 0.5s cubic-bezier(0.4,0,0.2,1)',
                      }}
                    >
                      {/* Parágrafo de descrição com estilo de título, alinhado à esquerda, fonte grande, moderna */}
                      <p
                        className="font-bold text-2xl sm:text-3xl mb-2 text-left w-full"
                        style={{
                          fontFamily: 'Inter, Montserrat, Arial, sans-serif',
                          color: 'var(--text-strong)',
                        }}
                      >
                        {project.description}
                      </p>
                      {/* Nome do projeto pequeno, uppercase, tracking-widest, acinzentado */}
                      <span
                        className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-6 text-left block w-full"
                        style={{
                          fontFamily: 'Inter, Montserrat, Arial, sans-serif',
                        }}
                      >
                        {project.name}
                      </span>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-4 justify-start">
                        {project.techStack.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-gray-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button
                          className="py-2 px-5 rounded-lg border font-medium text-sm transition-all duration-300 hover:opacity-90 bg-primary text-white border-primary"
                          tabIndex={0}
                          aria-label={`Ver demo do projeto ${project.name}`}
                          onKeyDown={(e) =>
                            handleKeyDown(e, () =>
                              console.log(`Demo clicked: ${project.name}`),
                            )
                          }
                        >
                          🚀 Demo
                        </button>
                        <button
                          className="py-2 px-5 rounded-lg border font-medium text-sm transition-all duration-300 hover:opacity-90 border-gray-300 text-gray-700 dark:text-gray-200"
                          tabIndex={0}
                          aria-label={`Ver código do projeto ${project.name}`}
                          onKeyDown={(e) =>
                            handleKeyDown(e, () =>
                              console.log(`Repo clicked: ${project.name}`),
                            )
                          }
                        >
                          📦 Código
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* View More Button */}
          <div className="text-center mt-12 lg:mt-16">
            <button
              className="py-3 px-8 rounded-lg font-medium text-base transition-all duration-300 hover:opacity-90 hover:scale-105"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--background)',
              }}
              tabIndex={0}
              aria-label="Ver todos os projetos"
              onKeyDown={(e) =>
                handleKeyDown(e, () => console.log('Ver mais projetos clicked'))
              }
            >
              Ver Todos os Projetos
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
