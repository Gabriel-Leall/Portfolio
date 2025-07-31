import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <main className="container mx-auto px-4">
      <section className="flex min-h-screen flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-bold md:text-7xl">Gabriel Leal</h1>
        <p className="mt-4 text-lg text-gray-600 md:text-2xl">
          Desenvolvedor Front-End & UI/UX Designer
        </p>
        <a
          href="#projects"
          className="mt-8 rounded-md bg-slate-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-slate-700"
        >
          Ver meus projetos
        </a>
      </section>
    </main>
  )
}
