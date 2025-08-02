import { createFileRoute } from '@tanstack/react-router'
import Hero from '../components/Hero'
import { InfiniteScrollLoader } from '../components/InfiniteScrollLoader'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <Hero />
      <InfiniteScrollLoader />
    </>
  )
}
