import React from 'react'
import { TechIcons } from './TechIcons'
import type { Project } from '../../../data/projects'

type ProjectCardProps = {
  project: Project
  isActive: boolean
  onActivate: () => void
  onDeactivate: () => void
}

export function ProjectCard({
  project,
  isActive,
  onActivate,
  onDeactivate,
}: ProjectCardProps) {
  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action()
    }
  }

  return (
    <div
      className={`flex flex-col items-start relative transition-all duration-300 ${isActive ? 'z-20' : 'z-10'}`}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
      tabIndex={0}
      style={{ outline: 'none' }}
    >
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

      {isActive && (
        <div
          className="w-full flex flex-col items-start mt-14 transition-all duration-500 ease-out"
          style={{
            opacity: 1,
            transform: 'translateY(0)',
            transition:
              'opacity 0.5s cubic-bezier(0.4,0,0.2,1), transform 0.5s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <p
            className="font-bold text-2xl sm:text-3xl mb-2 text-left w-full"
            style={{
              fontFamily: 'Inter, Montserrat, Arial, sans-serif',
              color: 'var(--text-strong)',
            }}
          >
            {project.description}
          </p>

          <span
            className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-6 text-left block w-full"
            style={{ fontFamily: 'Inter, Montserrat, Arial, sans-serif' }}
          >
            {project.name}
          </span>

          <TechIcons stack={project.techStack} />

          <div className="flex gap-3 mt-6 sm:mt-8">
            <button
              className="py-2 px-5 rounded-lg border font-medium text-sm transition-all duration-300 hover:opacity-90 hover:cursor-pointer bg-primary text-white border-primary"
              tabIndex={0}
              aria-label={`Ver demo do projeto ${project.name}`}
              onClick={() => window.open(project.demoLink, '_blank', 'noreferrer')}
              onKeyDown={(e) =>
                handleKeyDown(e, () =>
                  window.open(project.demoLink, '_blank', 'noreferrer'),
                )
              }
            >
              🚀 Demo
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectCard
