import { useEffect, useRef, useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { routeOrder } from '../route-order'

export function InfiniteScrollLoader() {
  const router = useRouter()
  const triggerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading) {
          const currentPath = router.state.location.pathname

          // Se estamos na página principal ('/'), não navegar automaticamente
          // O usuário pode usar o scroll livremente
          if (currentPath === '/') {
            return
          }

          const currentIndex = routeOrder.indexOf(currentPath)
          const nextIndex = currentIndex + 1

          if (nextIndex < routeOrder.length) {
            const nextPath = routeOrder[nextIndex]
            setIsLoading(true)
            router.navigate({ to: nextPath }).finally(() => {
              // Adiciona um pequeno delay para evitar múltiplos triggers
              setTimeout(() => setIsLoading(false), 200)
            })
          }
        }
      },
      {
        root: null, // Observa em relação ao viewport
        rootMargin: '0px',
        threshold: 0.1, // Trigger quando 10% do elemento estiver visível
      },
    )

    const currentRef = triggerRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [router, isLoading])

  const currentPath = router.state.location.pathname

  // Na página principal, mostrar apenas um divisor visual sutil
  if (currentPath === '/') {
    return (
      <div
        ref={triggerRef}
        className="h-8 w-full flex items-center justify-center opacity-30"
      >
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
      </div>
    )
  }

  return (
    <div
      ref={triggerRef}
      className="h-40 w-full flex items-center justify-center"
    >
      {isLoading && (
        <div className="flex items-center space-x-2 text-gray-600">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
          <span>Carregando próxima seção...</span>
        </div>
      )}
    </div>
  )
}
