import React from 'react'
import ContactForm from '../ContactForm'
import ContactInfo from '../ContactInfo'

const Contact: React.FC = () => {
  const handleFormSubmit = (formData: any) => {
    console.log('Form submitted:', formData)
    // Aqui você implementaria o envio do formulário
  }

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
            <div className="order-2 lg:order-1">
              <ContactForm onSubmit={handleFormSubmit} />
            </div>

            <div className="order-1 lg:order-2">
              <ContactInfo />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
