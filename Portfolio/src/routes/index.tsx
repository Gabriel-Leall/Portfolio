import { createFileRoute } from '@tanstack/react-router'
import { useState, useCallback } from 'react'
import AboutMe from '../components/pages/AboutMe'
import Contact from '../components/pages/Contact'
import Hero from '../components/pages/Hero'
import Projects from '../components/pages/Projects'
import Services from '../components/pages/Services'
import { InfiniteScrollLoader } from '../components/InfiniteScrollLoader'
import { ResponsiveMarquee } from '../components/pages/Marquee'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const [profilePhotoElement, setProfilePhotoElement] = useState<HTMLElement | null>(null)
  
  const handleProfilePhotoRef = useCallback((element: HTMLDivElement | null) => {
    setProfilePhotoElement(element)
  }, [])

  return (
    <main className="pt-16">
      <Hero />
      <ResponsiveMarquee profileElement={profilePhotoElement} />
      <InfiniteScrollLoader />
      <Projects />
      <InfiniteScrollLoader />
      <AboutMe onProfilePhotoRef={handleProfilePhotoRef} />
      <InfiniteScrollLoader />
      <Services />
      <InfiniteScrollLoader />
      <Contact />
    </main>
  )
}
