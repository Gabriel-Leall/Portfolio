import { useId, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "../content/projects";
import BrandGlyph from "./BrandGlyph";
import GlitchText from "./GlitchText";
import useFooterOrbit from "../hooks/useFooterOrbit";
import "./contact-footer.css";

interface ContactFooterProps {
  locale: Locale;
  animated: boolean;
  contact: { email: string; github: string; linkedin: string; x: string };
  resume: string;
}

export default function ContactFooter({ locale, animated, contact, resume }: ContactFooterProps) {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const orbitId = useId().replaceAll(":", "");
  const pt = locale === "pt";
  const signal = "GABRIEL LEAL / FRONT-END / REACT / TYPESCRIPT / ";
  useFooterOrbit(root, canvas, animated, locale);

  return <footer className="orbital-footer" id="contact" aria-labelledby="contact-title" ref={root}>
    <div className="footer-orbit-scene">
      <div className="footer-portal">
        <svg className="footer-orbit-fallback" viewBox="0 0 1200 800" aria-hidden="true" focusable="false">
          <defs>{Array.from({ length: 10 }, (_, i) => {
            const radius = 240 + i * 42;
            return <path id={`${orbitId}-${i}`} key={i} d={`M ${600 - radius} 400 a ${radius} ${radius} 0 1 1 ${radius * 2} 0 a ${radius} ${radius} 0 1 1 ${-radius * 2} 0`}/>;
          })}</defs>
          {Array.from({ length: 10 }, (_, i) => <text key={i} fontSize="14" letterSpacing="3"><textPath href={`#${orbitId}-${i}`} startOffset={`${i * 7}%`}>{signal.repeat(6)}</textPath></text>)}
        </svg>
        <canvas className="footer-orbit-canvas" ref={canvas} aria-hidden="true"/>
        <div className="footer-eye">
          <h2 id="contact-title">{pt ? <>Vamos construir<br/>algo juntos?</> : <>Let’s build<br/>something together.</>}</h2>
          <a className="footer-contact-button" href={`mailto:${contact.email}`}>
            <GlitchText text={pt ? "Vamos conversar" : "Let’s talk"}/><ArrowUpRight size={20} aria-hidden="true"/>
          </a>
        </div>
      </div>
    </div>
    <div className="footer-directory">
      <div className="footer-identity">
        <div className="footer-signature"><BrandGlyph compact/><span>Gabriel Leal<span>{pt ? "Desenvolvedor front-end" : "Front-end developer"}</span></span></div>
        <p>{pt ? "Uma conversa sobre produto, interface ou uma oportunidade na sua equipe." : "Let’s talk about products, interfaces or an opportunity on your team."}</p>
        <a className="email-link" href={`mailto:${contact.email}`}>{contact.email}<ArrowUpRight size={18} aria-hidden="true"/></a>
      </div>
      <nav className="footer-navigation footer-nav" aria-label={pt ? "Navegação do rodapé" : "Footer navigation"}>
        <div className="footer-link-group"><h3>Explore</h3>
          <a href="/#projects"><GlitchText text={pt ? "Projetos" : "Work"}/><ArrowUpRight size={16} aria-hidden="true"/></a>
          <a href="/#about"><GlitchText text={pt ? "Sobre" : "About"}/><ArrowUpRight size={16} aria-hidden="true"/></a>
          <a href={resume} target="_blank" rel="noopener noreferrer"><GlitchText text={pt ? "Currículo" : "Résumé"}/><ArrowUpRight size={16} aria-hidden="true"/><span className="sr-only">{pt ? " (nova aba)" : " (new tab)"}</span></a>
        </div>
        <div className="footer-link-group"><h3>{pt ? "Conecte-se" : "Connect"}</h3>
          {([['GitHub', contact.github], ['LinkedIn', contact.linkedin], ['X', contact.x]] as const).map(([label, href]) => <a key={label} href={href} target="_blank" rel="noopener noreferrer"><GlitchText text={label}/><ArrowUpRight size={16} aria-hidden="true"/><span className="sr-only">{pt ? " (nova aba)" : " (new tab)"}</span></a>)}
        </div>
      </nav>
    </div>
  </footer>;
}
