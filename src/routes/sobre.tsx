import { createFileRoute } from '@tanstack/react-router'
import AboutMe from '../components/AboutMe'

export const Route = createFileRoute('/sobre')({
  component: SobrePage,
})

function SobrePage() {
  return <AboutMe />
}
