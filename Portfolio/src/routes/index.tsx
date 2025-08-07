import { createFileRoute } from '@tanstack/react-router'
import AboutMe from '../components/pages/AboutMe'
import Contact from '../components/pages/Contact'
import Hero from '../components/pages/Hero'
import Projects from '../components/pages/Projects'
import Services from '../components/pages/Services'
import { InfiniteScrollLoader } from '../components/InfiniteScrollLoader'
import { Marquee } from '../components/pages/Marquee'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <main className="pt-16">
      <Hero />
      <Marquee />
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
