import React, { useCallback, useState } from 'react'
import {
  FaCheck,
  FaCopy,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
} from 'react-icons/fa'
import { Button } from '@/components/ui/stateful-button'
import { LinkPreview } from '@/components/ui/link-preview'

const Contact: React.FC = () => {
  const email = 'gabrielleal7153@gmail.com'
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Falha ao copiar e-mail', err)
    }
  }, [email])

  return (
    <section
      id="contato"
      className="w-full py-16 lg:py-20 min-h-screen flex items-center"
      style={{ backgroundColor: 'var(--background)' }}
      aria-label="Seção Contato"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4 lg:mb-6"
          style={{ color: 'var(--text-strong)' }}
        >
          Vamos conversar
        </h2>
        <p
          className="text-base sm:text-lg text-center mb-10 max-w-2xl mx-auto"
          style={{ color: 'var(--text-muted)' }}
        >
          Estou aberto a projetos e oportunidades. Respondo em até 24–48h. Fale
          comigo por LinkedIn, GitHub ou copie meu e‑mail abaixo.
        </p>

        <div className="flex items-center justify-center gap-4 mb-8">
          <LinkPreview
            url="https://www.linkedin.com/in/gabriel-llim/"
            className="group"
          >
            <button
              type="button"
              aria-label="Abrir meu perfil no LinkedIn em nova aba"
              onClick={() =>
                window.open(
                  'https://www.linkedin.com/in/gabriel-llim/',
                  '_blank',
                  'noopener,noreferrer',
                )
              }
              className="h-12 w-12 grid place-items-center rounded-full bg-[#0a66c2] text-white shadow transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#0a66c2]"
            >
              <FaLinkedin className="text-lg" />
            </button>
          </LinkPreview>

          <LinkPreview url="https://github.com/Gabriel-Leall" className="group">
            <button
              type="button"
              aria-label="Abrir meu perfil no GitHub em nova aba"
              onClick={() =>
                window.open(
                  'https://github.com/Gabriel-Leall',
                  '_blank',
                  'noopener,noreferrer',
                )
              }
              className="h-12 w-12 grid place-items-center rounded-full bg-[#24292e] text-white shadow transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#24292e]"
            >
              <FaGithub className="text-lg" />
            </button>
          </LinkPreview>
        </div>

        <div
          className="rounded-lg border p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3"
          style={{
            borderColor: 'var(--support-neutral)',
            backgroundColor: 'var(--surface-soft)',
          }}
          aria-label="Bloco de e‑mail para contato"
        >
          <div className="flex items-center gap-3">
            <FaEnvelope />
            <span
              className="font-mono text-sm sm:text-base break-all"
              aria-label="Endereço de e‑mail"
            >
              {email}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              className="min-w-[160px] bg-green-600 text-white hover:ring-green-600 dark:bg-green-600 dark:text-white light:bg-green-700 light:text-black"
              aria-label="Copiar e‑mail para a área de transferência"
              onClick={handleCopyEmail}
            >
              <span className="inline-flex items-center gap-2">
                {copied ? <FaCheck /> : <FaCopy />}
                <span>{copied ? 'E‑mail copiado' : 'Copiar e‑mail'}</span>
              </span>
            </Button>
          </div>
        </div>

        <div
          className="mt-8 rounded-lg border p-4 flex items-center gap-3"
          style={{
            borderColor: 'var(--support-neutral)',
            backgroundColor: 'var(--surface-soft)',
          }}
        >
          <span className="relative inline-flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
          </span>
          <div>
            <p className="font-medium" style={{ color: 'var(--text-strong)' }}>
              Disponível para projetos
            </p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Tempo de resposta: 24–48h
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
