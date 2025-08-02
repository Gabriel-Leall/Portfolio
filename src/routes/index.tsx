import { createFileRoute } from '@tanstack/react-router'
import AboutMe from '../components/AboutMe'
import Contact from '../components/Contact'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Services from '../components/Services'
import { InfiniteScrollLoader } from '../components/InfiniteScrollLoader'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <main className="pt-16">
      <Hero />
      <InfiniteScrollLoader />
      <AboutMe />
      <InfiniteScrollLoader />
      <Projects />
      <InfiniteScrollLoader />
      <Services />
      <InfiniteScrollLoader />
      <Contact />
    </main>
  )
}
