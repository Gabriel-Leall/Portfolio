import { useState, useEffect, useCallback } from 'react'

interface MarqueeState {
  mode: 'desktop' | 'mobile' | 'transitioning'
  isAnimating: boolean
  orbitRadius: number
  animationSpeed: number
}

interface UseResponsiveMarqueeOptions {
  breakpoint?: number
  profileElement?: HTMLElement | null
}

interface UseResponsiveMarqueeReturn {
  state: MarqueeState
  isDesktop: boolean
  isMobile: boolean
  isTransitioning: boolean
  respectsReducedMotion: boolean
  startTransition: () => void
  completeTransition: () => void
}

export function useResponsiveMarquee({
  breakpoint = 1024,
  profileElement,
}: UseResponsiveMarqueeOptions): UseResponsiveMarqueeReturn {
  const [state, setState] = useState<MarqueeState>({
    mode: 'desktop',
    isAnimating: true,
    orbitRadius: 140,
    animationSpeed: 20,
  })

  // Check for reduced motion preference
  const [respectsReducedMotion, setRespectsReducedMotion] = useState(false)

  // Media query hook for responsive detection
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  )

  const updateWindowWidth = useCallback(() => {
    setWindowWidth(window.innerWidth)
  }, [])

  useEffect(() => {
    // Set up window resize listener
    window.addEventListener('resize', updateWindowWidth)
    
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setRespectsReducedMotion(mediaQuery.matches)
    
    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setRespectsReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleReducedMotionChange)

    return () => {
      window.removeEventListener('resize', updateWindowWidth)
      mediaQuery.removeEventListener('change', handleReducedMotionChange)
    }
  }, [updateWindowWidth])

  // Determine current mode based on window width
  const isDesktop = windowWidth >= breakpoint
  const isMobile = windowWidth < breakpoint
  const isTransitioning = state.mode === 'transitioning'

  // Handle mode changes
  useEffect(() => {
    const newMode = isDesktop ? 'desktop' : 'mobile'
    
    if (state.mode !== newMode && state.mode !== 'transitioning') {
      setState(prevState => ({
        ...prevState,
        mode: 'transitioning',
      }))
      
      // Auto-complete transition after a short delay
      setTimeout(() => {
        setState(prevState => ({
          ...prevState,
          mode: newMode,
          orbitRadius: newMode === 'mobile' ? (windowWidth < 768 ? 120 : 140) : 140,
        }))
      }, 300)
    }
  }, [isDesktop, state.mode, windowWidth])

  // Animation control functions
  const startTransition = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      mode: 'transitioning',
    }))
  }, [])

  const completeTransition = useCallback(() => {
    const newMode = isDesktop ? 'desktop' : 'mobile'
    setState(prevState => ({
      ...prevState,
      mode: newMode,
    }))
  }, [isDesktop])

  // Pause animations when element is not visible or reduced motion is preferred
  useEffect(() => {
    if (respectsReducedMotion) {
      setState(prevState => ({
        ...prevState,
        isAnimating: false,
      }))
      return
    }

    // Use Intersection Observer to pause animations when off-screen
    if (!profileElement) return

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0].isIntersecting
        setState(prevState => ({
          ...prevState,
          isAnimating: isVisible,
        }))
      },
      { threshold: 0.1 }
    )

    observer.observe(profileElement)

    return () => {
      observer.disconnect()
    }
  }, [profileElement, respectsReducedMotion])

  return {
    state,
    isDesktop,
    isMobile,
    isTransitioning,
    respectsReducedMotion,
    startTransition,
    completeTransition,
  }
}