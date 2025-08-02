import { createFileRoute } from '@tanstack/react-router'
import Services from '../components/Services'
import { InfiniteScrollLoader } from '../components/InfiniteScrollLoader'

export const Route = createFileRoute('/servicos')({
  component: ServicesPage,
})

function ServicesPage() {
  return (
    <>
      <Services />
      <InfiniteScrollLoader />
    </>
  )
}
