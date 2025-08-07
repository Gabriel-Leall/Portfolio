import React, { useState } from 'react'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface ContactFormProps {
  onSubmit?: (data: FormData) => void
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

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
    if (onSubmit) {
      onSubmit(formData)
    } else {
      console.log('Form submitted:', formData)
    }
  }

  const inputStyle = {
    backgroundColor: 'var(--surface-soft)',
    borderColor: 'var(--support-neutral)',
    color: 'var(--text-strong)',
  }

  return (
    <div>
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
            style={inputStyle}
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
            style={inputStyle}
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
            style={inputStyle}
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
            style={inputStyle}
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
  )
}

export default ContactForm
