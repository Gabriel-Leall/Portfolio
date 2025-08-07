import React from 'react'

const Projects: React.FC = () => {
  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action()
    }
  }

  const projects = [
    {
      id: 1,
      title: 'Barber Schedule',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      techStack: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
      demoLink: '#',
      repoLink: '#',
      image: '/images/barberschedule_thumb_large.webp',
    },
    {
      id: 2,
      title: 'Naurial',
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      techStack: ['Next.js', 'Prisma', 'PostgreSQL', 'TailwindCSS'],
      demoLink: '#',
      repoLink: '#',
      image: '/images/Naurial thumb.webp',
    },
    {
      id: 3,
      title: 'Weather Dashboard',
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
          <p
            className="text-base sm:text-lg text-center mb-12 lg:mb-16 max-w-3xl mx-auto"
            style={{ color: 'var(--text-muted)' }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Showcase
            dos melhores trabalhos.
          </p>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
            {projects.map((project) => (
              <div key={project.id} className="group">
                <div
                  className="relative rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                  style={{
                    backgroundColor: 'var(--surface-soft)',
                  }}
                >
                  {project.image === 'placeholder' ? (
                    <div
                      className="w-full h-48 sm:h-56 flex items-center justify-center"
                      style={{ backgroundColor: 'var(--support-neutral)' }}
                      role="img"
                      aria-label={`Preview do projeto ${project.title}`}
                    >
                      <span
                        className="text-sm font-medium"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        Preview do Projeto
                      </span>
                    </div>
                  ) : (
                    <img
                      src={project.image}
                      alt={`Preview do projeto ${project.title}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3
                    className="text-xl sm:text-2xl font-semibold mb-3"
                    style={{ color: 'var(--text-strong)' }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-sm sm:text-base leading-relaxed mb-4"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: 'var(--primary)',
                          color: 'var(--background)',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      className="flex-1 py-2 px-4 rounded-lg border font-medium text-sm transition-all duration-300 hover:opacity-90"
                      style={{
                        backgroundColor: 'var(--primary)',
                        color: 'var(--background)',
                        borderColor: 'var(--primary)',
                      }}
                      tabIndex={0}
                      aria-label={`Ver demo do projeto ${project.title}`}
                      onKeyDown={(e) =>
                        handleKeyDown(e, () =>
                          console.log(`Demo clicked: ${project.title}`),
                        )
                      }
                    >
                      🚀 Demo
                    </button>
                    <button
                      className="flex-1 py-2 px-4 rounded-lg border font-medium text-sm transition-all duration-300 hover:opacity-90"
                      style={{
                        borderColor: 'var(--support-neutral)',
                        color: 'var(--text-strong)',
                      }}
                      tabIndex={0}
                      aria-label={`Ver código do projeto ${project.title}`}
                      onKeyDown={(e) =>
                        handleKeyDown(e, () =>
                          console.log(`Repo clicked: ${project.title}`),
                        )
                      }
                    >
                      📦 Código
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
