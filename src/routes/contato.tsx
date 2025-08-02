import { createFileRoute } from '@tanstack/react-router'
import Contact from '../components/Contact'

export const Route = createFileRoute('/contato')({
  component: ContactPage,
})

function ContactPage() {
  return (
    <>
      <Contact />
    </>
  )
}
