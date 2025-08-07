import { createFileRoute } from '@tanstack/react-router'
import Projects from '../components/pages/Projects'
import { InfiniteScrollLoader } from '../components/InfiniteScrollLoader'

export const Route = createFileRoute('/projetos')({
  component: ProjectsPage,
})

function ProjectsPage() {
  return (
    <>
      <Projects />
      <InfiniteScrollLoader />
    </>
  )
}
