import React, { useRef, useState } from 'react'
import { projects } from '../../data/projects'
import { ProjectCard } from './projects/ProjectCard'

const Projects: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(null)
  const persistTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleActivate = (id: number) => {
    if (persistTimer.current) {
      clearTimeout(persistTimer.current)
    }
    setActiveId(id)
  }

  const handleDeactivate = () => {
    persistTimer.current = setTimeout(() => {
      setActiveId(null)
    }, 4000)
  }

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
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-10 lg:mb-14"
            style={{ color: 'var(--text-strong)' }}
          >
            Projetos
          </h2>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isActive={activeId === project.id}
                onActivate={() => handleActivate(project.id)}
                onDeactivate={handleDeactivate}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
