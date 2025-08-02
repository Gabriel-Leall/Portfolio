import React from 'react'

interface ContactItem {
  icon: string
  title: string
  value: string
  link: string
}

interface ContactInfoProps {
  contacts?: Array<ContactItem>
}

const defaultContacts: Array<ContactItem> = [
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

const ContactInfo: React.FC<ContactInfoProps> = ({
  contacts = defaultContacts,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent, link: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      window.open(link, '_blank')
    }
  }

  return (
    <div>
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
            onKeyDown={(e) => handleKeyDown(e, contact.link)}
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
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
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
          <h4 className="font-semibold" style={{ color: 'var(--text-strong)' }}>
            Disponível para Projetos
          </h4>
        </div>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Estou aceitando novos projetos. Tempo de resposta: 24-48h.
        </p>
      </div>
    </div>
  )
}

export default ContactInfo
