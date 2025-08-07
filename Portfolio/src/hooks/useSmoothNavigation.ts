import { useCallback } from 'react'
import { useRouter } from '@tanstack/react-router'

export const useSmoothNavigation = () => {
  const router = useRouter()

  const navigateToSection = useCallback(
    (sectionId: string) => {
      const currentPath = router.state.location.pathname

      // Se estamos na página principal, fazer scroll suave para a seção
      if (currentPath === '/') {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })

          // Atualizar a URL sem navegar
          window.history.pushState(null, '', `#${sectionId}`)
        }
      } else {
        // Se estamos em uma página individual, navegar para a página principal com a seção
        router.navigate({ to: '/', hash: sectionId })
      }
    },
    [router],
  )

  const navigateToRoute = useCallback(
    (route: string) => {
      router.navigate({ to: route })
    },
    [router],
  )

  return {
    navigateToSection,
    navigateToRoute,
  }
}
