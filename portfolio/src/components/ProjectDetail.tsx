import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Locale, Project } from "../content/projects";
import GlitchText from "./GlitchText";
import "./project-detail.css";

interface ProjectDetailProps {
  project: Project;
  locale: Locale;
  nextProject: Project;
}

const imageSizes: Record<string, { width: number; height: number }> = {
  syndesis: { width: 1280, height: 720 },
  kodan: { width: 1280, height: 720 },
  bon: { width: 1280, height: 720 },
  naurial: { width: 900, height: 600 },
  "barber-schedule": { width: 900, height: 600 },
};

const copy = {
  pt: {
    back: "Voltar aos projetos",
    context: "Sobre o projeto",
    features: "O que faz",
    stack: "Tecnologias",
    demo: "Abrir projeto",
    code: "Ver código no GitHub",
    next: "Próximo projeto",
    screenshot: "captura da interface",
    external: "abre em uma nova aba",
    open: "Explorar",
  },
  en: {
    back: "Back to projects",
    context: "About the project",
    features: "What it does",
    stack: "Technologies",
    demo: "Open project",
    code: "View code on GitHub",
    next: "Next project",
    screenshot: "interface screenshot",
    external: "opens in a new tab",
    open: "Explore",
  },
};

export default function ProjectDetail({
  project,
  locale,
  nextProject,
}: ProjectDetailProps) {
  const text = copy[locale];
  const imageSize = imageSizes[project.id] ?? { width: 1280, height: 720 };
  const demo = project.demo?.[locale];

  return (
    <article className="project-case" aria-labelledby="project-case-title">
      <a className="case-back" href="/#projects">
        <ArrowLeft size={20} aria-hidden="true" />
        <GlitchText text={text.back}/>
      </a>

      <div className="case-heading">
        <h1
          className={`case-title route-title${project.name.length > 10 ? " case-title-long" : ""}`}
          id="project-case-title"
          tabIndex={-1}
        >
          <GlitchText text={project.name}/>
        </h1>
        <p className="case-tagline">{project.tagline[locale]}</p>
        <div className="case-actions">
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${text.demo}: ${project.name} (${text.external})`}
            >
              <GlitchText text={text.demo}/>
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>
          )}
          <a
            href={project.code}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${text.code}: ${project.name} (${text.external})`}
          >
            <GlitchText text={text.code}/>
            <ArrowUpRight size={20} aria-hidden="true" />
          </a>
        </div>
      </div>

      <figure className="case-figure">
        <img
          src={project.image}
          srcSet={project.imageSrcSet}
          sizes="(max-width: 900px) 92vw, 88vw"
          width={imageSize.width}
          height={imageSize.height}
          alt={`${project.name} — ${text.screenshot}`}
          {...{fetchpriority: "high"}}
          decoding="async"
        />
        <figcaption>
          <span>{project.category[locale]}</span>
          <span>{project.displayStack.replaceAll(" / ", " · ")}</span>
        </figcaption>
      </figure>

      <section className="case-context" aria-labelledby="case-context-title">
        <h2 id="case-context-title">{text.context}</h2>
        <div className="case-prose">
          {project.details[locale].map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <div className="case-information">
        <section className="case-features" aria-labelledby="case-features-title">
          <h2 id="case-features-title">{text.features}</h2>
          <ul>
            {project.features[locale].map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </section>
        <section className="case-stack" aria-labelledby="case-stack-title">
          <h2 id="case-stack-title">{text.stack}</h2>
          <ul>
            {project.stack.map((technology) => (
              <li key={technology}>{technology === "AI" && locale === "pt" ? "IA" : technology}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="case-next" aria-labelledby="case-next-title">
        <h2 id="case-next-title">{text.next}</h2>
        <a
          className="case-next-link"
          href={`/work/${nextProject.id}`}
          aria-label={`${text.open} ${nextProject.name}`}
        >
          <div>
            <GlitchText className="case-next-name" text={nextProject.name}/>
            <span className="case-next-category">{nextProject.category[locale]}</span>
          </div>
          <ArrowRight aria-hidden="true" />
        </a>
      </section>
    </article>
  );
}
