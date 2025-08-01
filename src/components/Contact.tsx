import React, { useState } from 'react'

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action()
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Aqui você implementaria o envio do formulário
  }

  const contacts = [
    {
      icon: '📧',
      title: 'Email',
      value: 'contato@exemplo.com',
      link: 'mailto:contato@exemplo.com',
    },
    {
      icon: '📱',
      title: 'WhatsApp',
      value: '+55 (11) 99999-9999',
      link: 'https://wa.me/5511999999999',
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      value: '/in/seulinkedin',
      link: 'https://linkedin.com/in/seulinkedin',
    },
    {
      icon: '🐙',
      title: 'GitHub',
      value: '/seugithub',
      link: 'https://github.com/seugithub',
    },
  ]

  return (
    <section
      id="contato"
      className="w-full py-16 lg:py-20 min-h-screen flex items-center"
      style={{ backgroundColor: 'var(--background)' }}
      aria-label="Seção Contato"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="w-full">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4 lg:mb-6"
            style={{ color: 'var(--text-strong)' }}
          >
            Contato
          </h2>
          <p
            className="text-base sm:text-lg text-center mb-12 lg:mb-16 max-w-3xl mx-auto"
            style={{ color: 'var(--text-muted)' }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vamos
            conversar sobre seu próximo projeto? Estou sempre aberto a novas
            oportunidades.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div className="order-2 lg:order-1">
              <h3
                className="text-2xl font-semibold mb-6"
                style={{ color: 'var(--text-strong)' }}
              >
                Envie uma Mensagem
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--text-strong)' }}
                  >
                    Nome *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-300"
                    style={{
                      backgroundColor: 'var(--surface-soft)',
                      borderColor: 'var(--support-neutral)',
                      color: 'var(--text-strong)',
                    }}
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--text-strong)' }}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-300"
                    style={{
                      backgroundColor: 'var(--surface-soft)',
                      borderColor: 'var(--support-neutral)',
                      color: 'var(--text-strong)',
                    }}
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--text-strong)' }}
                  >
                    Assunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-300"
                    style={{
                      backgroundColor: 'var(--surface-soft)',
                      borderColor: 'var(--support-neutral)',
                      color: 'var(--text-strong)',
                    }}
                    placeholder="Sobre o que você gostaria de falar?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                    style={{ color: 'var(--text-strong)' }}
                  >
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-300 resize-none"
                    style={{
                      backgroundColor: 'var(--surface-soft)',
                      borderColor: 'var(--support-neutral)',
                      color: 'var(--text-strong)',
                    }}
                    placeholder="Descreva seu projeto ou dúvida..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 hover:opacity-90 hover:scale-105"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--background)',
                  }}
                  aria-label="Enviar mensagem"
                >
                  🚀 Enviar Mensagem
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="order-1 lg:order-2">
              <h3
                className="text-2xl font-semibold mb-6"
                style={{ color: 'var(--text-strong)' }}
              >
                Informações de Contato
              </h3>

              <div className="space-y-6 mb-8">
                {contacts.map((contact, index) => (
                  <a
                    key={index}
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    style={{
                      backgroundColor: 'var(--surface-soft)',
                      borderColor: 'var(--support-neutral)',
                    }}
                    tabIndex={0}
                    aria-label={`Contato via ${contact.title}: ${contact.value}`}
                    onKeyDown={(e) =>
                      handleKeyDown(e, () =>
                        window.open(contact.link, '_blank'),
                      )
                    }
                  >
                    <span
                      className="text-2xl"
                      role="img"
                      aria-label={`Ícone ${contact.title}`}
                    >
                      {contact.icon}
                    </span>
                    <div>
                      <h4
                        className="font-semibold text-sm"
                        style={{ color: 'var(--text-strong)' }}
                      >
                        {contact.title}
                      </h4>
                      <p
                        className="text-sm"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {contact.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Availability Status */}
              <div
                className="p-6 rounded-lg border"
                style={{
                  backgroundColor: 'var(--surface-soft)',
                  borderColor: 'var(--support-neutral)',
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="w-3 h-3 rounded-full animate-pulse"
                    style={{ backgroundColor: 'var(--primary)' }}
                  ></span>
                  <h4
                    className="font-semibold"
                    style={{ color: 'var(--text-strong)' }}
                  >
                    Disponível para Projetos
                  </h4>
                </div>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  Estou aceitando novos projetos. Tempo de resposta: 24-48h.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
