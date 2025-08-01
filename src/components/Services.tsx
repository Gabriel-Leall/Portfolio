import React from 'react'

const Services: React.FC = () => {
  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action()
    }
  }

  const services = [
    {
      id: 1,
      icon: '💻',
      title: 'Desenvolvimento Frontend',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Criação de interfaces modernas e responsivas usando React, TypeScript e tecnologias atuais.',
      features: [
        'React & Next.js',
        'TypeScript',
        'Design Responsivo',
        'Performance Optimization',
      ],
    },
    {
      id: 2,
      icon: '⚙️',
      title: 'Desenvolvimento Backend',
      description:
        'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. APIs robustas e escaláveis para suas aplicações.',
      features: [
        'Node.js & Express',
        'Banco de Dados',
        'APIs RESTful',
        'Autenticação',
      ],
    },
    {
      id: 3,
      icon: '🎨',
      title: 'UI/UX Design',
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco. Design centrado no usuário com foco na experiência.',
      features: [
        'Prototipagem',
        'Design System',
        'User Research',
        'Wireframing',
      ],
    },
    {
      id: 4,
      icon: '🚀',
      title: 'Consultoria Técnica',
      description:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum. Orientação estratégica para projetos digitais.',
      features: ['Arquitetura', 'Code Review', 'Performance', 'Mentoria'],
    },
  ]

  return (
    <section
      id="servicos"
      className="w-full py-16 lg:py-20 min-h-screen flex items-center"
      style={{ backgroundColor: 'var(--surface-soft)' }}
      aria-label="Seção Serviços"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="w-full">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4 lg:mb-6"
            style={{ color: 'var(--text-strong)' }}
          >
            Serviços
          </h2>
          <p
            className="text-base sm:text-lg text-center mb-12 lg:mb-16 max-w-3xl mx-auto"
            style={{ color: 'var(--text-muted)' }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Soluções
            completas para transformar suas ideias em realidade digital.
          </p>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-16">
            {services.map((service) => (
              <div
                key={service.id}
                className="p-6 lg:p-8 rounded-xl border transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{
                  backgroundColor: 'var(--background)',
                  borderColor: 'var(--support-neutral)',
                }}
              >
                <div className="mb-4">
                  <span
                    className="text-4xl mb-4 block"
                    role="img"
                    aria-label={`Ícone ${service.title}`}
                  >
                    {service.icon}
                  </span>
                  <h3
                    className="text-xl sm:text-2xl font-semibold mb-3"
                    style={{ color: 'var(--text-strong)' }}
                  >
                    {service.title}
                  </h3>
                </div>

                <p
                  className="text-sm sm:text-base leading-relaxed mb-6"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: 'var(--primary)' }}
                      ></span>
                      <span
                        className="text-sm"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className="w-full py-2 px-4 rounded-lg border font-medium text-sm transition-all duration-300 hover:opacity-90"
                  style={{
                    borderColor: 'var(--primary)',
                    color: 'var(--primary)',
                  }}
                  tabIndex={0}
                  aria-label={`Saiba mais sobre ${service.title}`}
                  onKeyDown={(e) =>
                    handleKeyDown(e, () =>
                      console.log(`Service clicked: ${service.title}`),
                    )
                  }
                >
                  Saiba Mais
                </button>
              </div>
            ))}
          </div>

          {/* Process Section */}
          <div className="text-center">
            <h3
              className="text-2xl sm:text-3xl font-semibold mb-8"
              style={{ color: 'var(--text-strong)' }}
            >
              Meu Processo de Trabalho
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: '01',
                  title: 'Análise',
                  desc: 'Entendimento do projeto e requisitos',
                },
                {
                  step: '02',
                  title: 'Planejamento',
                  desc: 'Estratégia e arquitetura da solução',
                },
                {
                  step: '03',
                  title: 'Desenvolvimento',
                  desc: 'Implementação com qualidade e agilidade',
                },
                {
                  step: '04',
                  title: 'Entrega',
                  desc: 'Deploy e suporte contínuo',
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'var(--background)',
                    }}
                  >
                    {item.step}
                  </div>
                  <h4
                    className="font-semibold mb-2"
                    style={{ color: 'var(--text-strong)' }}
                  >
                    {item.title}
                  </h4>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
