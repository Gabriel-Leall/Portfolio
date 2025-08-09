import React, { useEffect, useRef, useState } from 'react'
import { Compass, Code2, ShieldCheck, Cloud } from 'lucide-react'

const Services: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: 'Descoberta e Planejamento',
      description:
        'Tudo começa com o entendimento profundo do problema. Analiso os requisitos e os designs (Figma), quebro as funcionalidades em tarefas menores e planejo a estrutura de componentes antes de escrever a primeira linha de código.',
      Icon: Compass,
      label: 'Bússola',
    },
    {
      id: 2,
      title: 'Desenvolvimento e Versionamento',
      description:
        'Desenvolvo com foco em código limpo, semântico e reutilizável. Todo o progresso é rigorosamente versionado com Git, utilizando um fluxo de trabalho com branches para manter a organização e facilitar a colaboração.',
      Icon: Code2,
      label: 'Código',
    },
    {
      id: 3,
      title: 'Qualidade e Responsividade',
      description:
        'Garanto a qualidade através de testes manuais em múltiplos navegadores e dispositivos. A construção de interfaces responsivas e acessíveis (mobile-first) é uma prioridade, não uma reflexão tardia.',
      Icon: ShieldCheck,
      label: 'Qualidade',
    },
    {
      id: 4,
      title: 'Revisão e Deploy',
      description:
        'Após a revisão do código e a confirmação de que todos os requisitos foram atendidos, realizo o deploy em plataformas modernas como Vercel ou Netlify, garantindo uma entrega contínua e confiável.',
      Icon: Cloud,
      label: 'Nuvem',
    },
  ] as const

  const containerRef = useRef<HTMLDivElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const ref = containerRef.current
    if (!ref) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(ref)
    return () => observer.disconnect()
  }, [])

  const totalDurationMs = 2400
  const perStepDelayMs = Math.floor(totalDurationMs / steps.length)

  return (
    <section
      id="processo"
      className="w-full py-16 lg:py-20 min-h-screen flex items-center"
      style={{ backgroundColor: 'var(--surface-soft)' }}
      aria-label="Seção Meu processo de trabalho"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="w-full">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4 lg:mb-6"
            style={{ color: 'var(--text-strong)' }}
          >
            Meu processo de trabalho
          </h2>
          <p
            className="text-base sm:text-lg text-center mb-12 lg:mb-16 max-w-3xl mx-auto"
            style={{ color: 'var(--text-muted)' }}
          >
            Da concepção à entrega, sigo um processo estruturado para garantir a
            qualidade e a eficiência em cada projeto
          </p>

          <div ref={containerRef} className="relative">
            {/* Base line (desktop) */}
            <div
              className="hidden lg:block absolute left-0 right-0 h-1 rounded-full z-0 top-8"
              style={{ backgroundColor: 'var(--support-neutral)' }}
              aria-hidden="true"
            />
            {/* Progress line (desktop) */}
            <div
              className="hidden lg:block absolute left-0 h-1 rounded-full z-0 top-8"
              style={{
                backgroundColor: 'var(--primary)',
                width: inView ? '100%' : '0%',
                transition: `width ${totalDurationMs}ms linear`,
              }}
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 relative z-10">
              {steps.map((step, index) => {
                const IconCmp = step.Icon
                return (
                  <div key={step.id} className="relative">
                    {/* Mobile connector per item */}
                    {index < steps.length - 1 && (
                      <div
                        className="lg:hidden absolute left-8 top-16 bottom-[-24px] w-px"
                        style={{ backgroundColor: 'var(--support-neutral)' }}
                        aria-hidden="true"
                      />
                    )}

                    <div className="flex flex-col items-center text-center">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: 'var(--primary)',
                          color: 'var(--background)',
                        }}
                        role="img"
                        aria-label={step.label}
                        tabIndex={0}
                      >
                        <IconCmp aria-hidden="true" />
                      </div>
                      <div
                        className={`mt-4 transition-all duration-500 ${
                          inView
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-2'
                        }`}
                        style={{
                          transitionDelay: `${(index + 1) * perStepDelayMs}ms`,
                        }}
                      >
                        <h3
                          className="text-xl sm:text-2xl font-semibold"
                          style={{ color: 'var(--text-strong)' }}
                        >
                          {step.title}
                        </h3>
                        <p
                          className="mt-2 text-sm sm:text-base leading-relaxed"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
