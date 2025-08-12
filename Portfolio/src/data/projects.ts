export type Project = {
  id: number
  name: string
  description: string
  techStack: Array<string>
  demoLink: string
  image: string
}

export const projects: Array<Project> = [
  {
    id: 1,
    name: 'Barber Schedule',
    description: 'Saas de Barbearia para barbeiros e clientes.',
    techStack: [
      'React',
      'TypeScript',
      'Vite',
      'TailwindCSS',
      'Shadcn/ui',
      'Tanstack',
      'Lucide',
      'Figma',
    ],
    demoLink: 'https://barber-schedule-saas.vercel.app/',
    image: '/images/barberschedule_thumb_large.webp',
  },
  {
    id: 2,
    name: 'Naurial',
    description: 'Plataforma de aprendizado interativa com IA.',
    techStack: ['React', 'Next.js', 'TailwindCSS', 'Figma'],
    demoLink: 'https://naurial.vercel.app/',
    image: '/images/Naurial thumb.webp',
  },
  {
    id: 3,
    name: 'Weather Dashboard',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    techStack: ['Vue.js', 'Express', 'API Integration', 'Chart.js'],
    demoLink: '#',
    image: 'placeholder',
  },
]
