import { createFileRoute } from '@tanstack/react-router'
import AboutMe from '../components/AboutMe'
import { InfiniteScrollLoader } from '../components/InfiniteScrollLoader'

export const Route = createFileRoute('/sobre')({
  component: SobrePage,
})

function SobrePage() {
  return (
    <>
      <AboutMe />
      <InfiniteScrollLoader />
    </>
  )
}
