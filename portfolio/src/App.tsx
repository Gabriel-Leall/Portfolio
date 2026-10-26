import { lazy, Suspense, useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import ProjectDetail from "./components/ProjectDetail";
import CharacterPortrait from "./components/CharacterPortrait";
import PortfolioEntrance from "./components/PortfolioEntrance";
import GlitchText from "./components/GlitchText";
import BrandGlyph from "./components/BrandGlyph";
import ContactFooter from "./components/ContactFooter";
import TechnologyList from "./components/TechnologyList";
import type { ProjectCursorProps } from "./components/ProjectCursor";
import type { ScrollTitleProps } from "./components/ScrollTitle";
import { projects, type Locale } from "./content/projects";
import usePortfolioMotion from "./hooks/usePortfolioMotion";
import useSmoothScroll from "./hooks/useSmoothScroll";
import useMagneticButtons from "./hooks/useMagneticButtons";

const StaticTitle = ({ text, id, className }: ScrollTitleProps) => <h2 className={className} id={id}>{text}</h2>;
const NoCursor = (_props: ProjectCursorProps) => null;
const ProjectCursor = lazy(() => import("./components/ProjectCursor").catch(() => ({ default: NoCursor })));
const ScrollTitle = lazy(() => import("./components/ScrollTitle").catch(() => ({ default: StaticTitle })));

const contact = { email: "gabrielleal7153@gmail.com", github: "https://github.com/Gabriel-Leall", linkedin: "https://www.linkedin.com/in/gabriel-llim/", x: "https://x.com/brook_kael" };
function saved(key: string, fallback: string) { try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; } }
function persist(key: string, value: string) { try { localStorage.setItem(key, value); } catch { /* Preferences still work for this visit. */ } }
function currentRoute() { return location.pathname.startsWith("/work/") ? location.pathname.split("/")[2] : null; }

export default function App() {
  const [active, setActive] = useState(0);
  const [locale, setLocale] = useState<Locale>(() => saved("portfolio-language", "pt") === "en" ? "en" : "pt");
  const [theme, setTheme] = useState(() => saved("portfolio-theme", "dark"));
  const motion = saved("portfolio-motion", "on") !== "off";
  const [reducedMotion, setReducedMotion] = useState(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [route, setRoute] = useState<string | null>(currentRoute);
  const [menuOpen, setMenuOpen] = useState(false);
  const [entrance, setEntrance] = useState<"opening" | "revealing" | "complete">(() =>
    !currentRoute() && (!location.hash || location.hash === "#main-content") && window.scrollY < window.innerHeight * .5 && saved("portfolio-motion", "on") !== "off" && !matchMedia("(prefers-reduced-motion: reduce)").matches ? "opening" : "complete");
  const root = useRef<HTMLElement>(null);
  const previewLink = useRef<HTMLAnchorElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const homeScroll = useRef(0);
  const homeFocus = useRef<string | null>(null);
  const pendingTarget = useRef<string | null>(null);
  const initialRoute = useRef(true);
  const skipIntroduction = useRef(false);
  const pt = locale === "pt";
  const aboutText = pt ? "Entre o código e a experiência, eu cuido dos detalhes." : "From code to experience, I take care of the details.";
  const animated = motion && !reducedMotion;
  const entranceActive = entrance !== "complete" && !route && animated;
  const jumpTo = useSmoothScroll(animated, entranceActive);
  useMagneticButtons(root, animated && !entranceActive, (route ?? "home") + locale);
  const project = projects[active];
  const routeIndex = projects.findIndex(item => item.id === route);
  const routeProject = projects[routeIndex];
  const resume = pt ? "/cv-pt.pdf" : "/cv-en.pdf";
  const onActive = useCallback((index: number) => setActive(index), []);
  const revealEntrance = useCallback(() => setEntrance(state => state === "opening" ? "revealing" : state), []);
  const finishEntrance = useCallback((focusContent = false) => {
    if (focusContent) skipIntroduction.current = true;
    setEntrance("complete");
    if (focusContent) requestAnimationFrame(() => root.current?.focus({ preventScroll: true }));
  }, []);
  usePortfolioMotion(root, animated, (route ?? "home") + locale, onActive,
    skipIntroduction.current ? "skip" : "play");

  useEffect(() => { if (!animated || route) setEntrance("complete"); }, [animated, route]);
  useEffect(() => {
    const main = root.current;
    if (!entranceActive || !main) return;
    const html = document.documentElement;
    const overflow = html.style.overflow;
    const gutter = html.style.scrollbarGutter;
    const mainWidth = main.style.width;
    const contentWidth = main.getBoundingClientRect().width;
    main.inert = true;
    main.style.width = `${contentWidth}px`;
    html.style.scrollbarGutter = "auto";
    html.style.overflow = "hidden";
    return () => { main.inert = false; main.style.width = mainWidth; html.style.overflow = overflow; html.style.scrollbarGutter = gutter; };
  }, [entranceActive]);

  useEffect(() => { document.documentElement.lang = pt ? "pt-BR" : "en"; persist("portfolio-language", locale); }, [locale, pt]);
  useEffect(() => { document.documentElement.dataset.motion = animated ? "on" : "off"; }, [animated]);
  useEffect(() => { document.documentElement.dataset.theme = theme; persist("portfolio-theme", theme); }, [theme]);
  useEffect(() => { document.documentElement.dataset.motion = animated ? "on" : "off"; }, [animated]);
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const previous = history.scrollRestoration;
    history.scrollRestoration = "manual";
    const pop = () => { pendingTarget.current = location.hash || null; setMenuOpen(false); setRoute(currentRoute()); };
    addEventListener("popstate", pop);
    return () => { removeEventListener("popstate", pop); history.scrollRestoration = previous; };
  }, []);
  useEffect(() => {
    const role = pt ? "Desenvolvedor front-end" : "Front-end developer";
    const title = routeProject ? routeProject.name + " — Gabriel Leal" : "Gabriel Leal — " + role;
    const description = routeProject?.summary[locale] ?? (pt
      ? "Portfólio de Gabriel Leal, desenvolvedor front-end. Projetos com React, TypeScript e interfaces que conectam código, interação e experiência de produto."
      : "Gabriel Leal's front-end development portfolio. Projects built with React and TypeScript, connecting code, interaction and product experience.");
    const imageAlt = pt
      ? "Gabriel Leal, desenvolvedor front-end. Projetos: Syndesis, Kodan, Bon, Naurial e BarberSchedule."
      : "Gabriel Leal, front-end developer. Projects: Syndesis, Kodan, Bon, Naurial and BarberSchedule.";
    document.title = title;
    const updateMeta = (selector: string, content: string) => document.querySelector<HTMLMetaElement>(selector)?.setAttribute("content", content);
    updateMeta('meta[name="description"]', description);
    updateMeta('meta[property="og:title"]', title);
    updateMeta('meta[name="twitter:title"]', title);
    updateMeta('meta[property="og:description"]', description);
    updateMeta('meta[name="twitter:description"]', description);
    updateMeta('meta[property="og:locale"]', pt ? "pt_BR" : "en_US");
    updateMeta('meta[property="og:image:alt"]', imageAlt);
    updateMeta('meta[name="twitter:image:alt"]', imageAlt);
  }, [routeProject, pt, locale]);
  useEffect(() => {
    if (initialRoute.current) { initialRoute.current = false; return; }
    const frame = requestAnimationFrame(() => {
      if (route) {
        jumpTo(0);
        root.current?.querySelector<HTMLElement>(".route-title")?.focus({ preventScroll: true });
      } else {
        const target = pendingTarget.current;
        if (target && (target !== "#projects" || !homeFocus.current)) {
          const element = document.querySelector<HTMLElement>(target);
          if (element) jumpTo(element);
        } else jumpTo(homeScroll.current);
        if (homeFocus.current) document.getElementById(homeFocus.current)?.focus({ preventScroll: true });
      }
      pendingTarget.current = null;
    });
    return () => cancelAnimationFrame(frame);
  }, [route, jumpTo]);
  useEffect(() => {
    if (!menuOpen) return;
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); } };
    addEventListener("keydown", escape);
    return () => removeEventListener("keydown", escape);
  }, [menuOpen]);

  function navigate(event: MouseEvent<HTMLElement>) {
    const anchor = (event.target as HTMLElement).closest("a");
    if (!anchor || anchor.target || anchor.hasAttribute("download") || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.defaultPrevented) return;
    const url = new URL(anchor.href);
    if (url.origin !== location.origin || !(url.pathname === "/" || url.pathname.startsWith("/work/"))) return;
    setMenuOpen(false);
    if (url.pathname === location.pathname) {
      if (!route && url.hash === "#main-content") setActive(0);
      return;
    }
    event.preventDefault();
    if (!route) { homeScroll.current = scrollY; homeFocus.current = anchor.id || "project-" + project.id; }
    pendingTarget.current = url.hash;
    history.pushState({}, "", url.pathname + url.hash);
    setRoute(url.pathname === "/" ? null : url.pathname.split("/")[2]);
  }

  const header = <header className="site-header">
    <a className="wordmark" href="/#main-content" aria-label={pt ? "Gabriel Leal — início" : "Gabriel Leal — home"}><BrandGlyph compact/></a>
    <nav id="primary-navigation" className={"primary-nav" + (menuOpen ? " is-open" : "")} aria-label={pt ? "Navegação principal" : "Main navigation"}>
      <a className={!route ? "current" : ""} href="/#projects"><GlitchText text={pt ? "Projetos" : "Work"}/></a>
      <a href="/#about"><GlitchText text={pt ? "Sobre" : "About"}/></a>
      <a href={resume} target="_blank" rel="noopener noreferrer"><GlitchText text={pt ? "Currículo" : "Résumé"}/><span className="sr-only">{pt ? " (nova aba)" : " (new tab)"}</span></a>
      <a href="/#contact"><GlitchText text={pt ? "Contato" : "Contact"}/></a>
    </nav>
    <div className="language-switch" role="group" data-locale={locale} aria-label={pt ? "Idioma" : "Language"}>
      <span className="language-slider" aria-hidden="true"/>
      <button type="button" lang="pt-BR" aria-label="Português" aria-pressed={pt} onClick={() => setLocale("pt")}>PT</button><button type="button" lang="en" aria-label="English" aria-pressed={!pt} onClick={() => setLocale("en")}>EN</button>
    </div>
    <button className="theme-toggle" type="button" aria-label={pt ? (theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro") : (theme === "dark" ? "Switch to light theme" : "Switch to dark theme")} title={pt ? (theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro") : (theme === "dark" ? "Switch to light theme" : "Switch to dark theme")} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{theme === "dark" ? <Sun size={18} aria-hidden="true"/> : <Moon size={18} aria-hidden="true"/>}</button>
    <button ref={menuButton} className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label={pt ? (menuOpen ? "Fechar menu" : "Abrir menu") : (menuOpen ? "Close menu" : "Open menu")} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
  </header>;

  return <>
  {entranceActive && <PortfolioEntrance locale={locale} onReveal={revealEntrance} onComplete={finishEntrance}/>}
  <main ref={root} className="portfolio" id="main-content" tabIndex={-1} aria-hidden={entranceActive || undefined} onClick={navigate}>
    <a className="skip-link" href={route ? "#project-case-title" : "#projects"}>{pt ? "Ir para o conteúdo" : "Skip to content"}</a>
    {route ? <><div className="case-header">{header}</div>{routeProject ? <ProjectDetail project={routeProject} locale={locale} nextProject={projects[(routeIndex + 1) % projects.length]}/> : <section className="not-found"><h1 className="route-title" id="project-case-title" tabIndex={-1}>{pt ? "Projeto não encontrado." : "Project not found."}</h1><a className="text-link" href="/#projects"><ArrowLeft/>{pt ? "Voltar aos projetos" : "Back to work"}</a></section>}</> : <>
      <section className="opening" aria-label={pt ? "Apresentação e projetos" : "Introduction and projects"}>
        {header}
        <div className="hero-stage">
          <h1 className="hero-name" aria-label="Gabriel Leal">{["GABRIEL", "LEAL"].map(word => <span className="name-word" aria-hidden="true" key={word}>{[...word].map((letter, i) => <span className="letter-mask" key={i}><span className="letter" data-glyph={letter}>{letter}</span></span>)}</span>)}</h1>
          <div className="hero-intro">
            <div className="intro-copy"><p className="intro-line">{pt ? "Desenvolvedor front-end com olhar para UI/UX." : "Front-end developer with an eye for UI/UX."}</p><p className="role-line">{pt ? "Código, interface e atenção aos detalhes." : "Code, interfaces and attention to detail."}</p></div>
            <p className="hero-description">{pt ? "Transformo ideias em interfaces com React, Next.js e TypeScript, pensando em quem usa e no produto por trás da tela." : "I turn ideas into interfaces with React, Next.js and TypeScript, focusing on the people who use them and the product behind the screen."}</p>
            <div className="hero-actions"><a className="text-link" href="#projects"><GlitchText text={pt ? "Explorar projetos" : "Explore my work"}/><ArrowDown size={20} aria-hidden="true"/></a><a className="text-link resume-link" href={resume} target="_blank" rel="noopener noreferrer"><GlitchText text={pt ? "Ver currículo" : "View résumé"}/><ArrowUpRight size={20} aria-hidden="true"/></a></div>
          </div>
        </div>
        <div className="work-stage">
        <div className="project-index" id="projects">
          {projects.map((item, index) => <a href={"/work/" + item.id} id={"project-" + item.id} className={"project-row" + (active === index ? " is-active" : "")} key={item.id} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)}>
            <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
            <span className="project-label"><GlitchText className="project-name" text={item.name}/><span className="project-stack">{item.displayStack.replaceAll(" / ", " · ")}</span></span>
            <ArrowRight className="row-arrow" size={22} aria-hidden="true"/>
          </a>)}
        </div>
        <div className="preview-dock">
          <a className="project-preview" ref={previewLink} href={"/work/" + project.id} aria-label={(pt ? "Explorar " : "Explore ") + project.name}>
            <img src={project.image} srcSet={project.imageSrcSet} sizes="(max-width: 900px) 90vw, 52vw" alt={project.name + (pt ? " — captura da interface" : " — interface screenshot")} width="1280" height="720" {...{fetchpriority: "high"}}/>
            <div className="preview-band"><div><GlitchText className="preview-name" text={project.name}/><span className="preview-stack">{project.displayStack.replaceAll(" / ", " · ")}</span></div><ArrowRight size={21} aria-hidden="true"/></div>
          </a>
        </div>
        <a className="scroll-cue" href="#about"><ArrowDown size={24} aria-hidden="true"/><span>{pt ? "Sobre mim" : "About me"}</span></a>
        </div>
      </section>


      <div className="marquee" aria-hidden="true"><div className="marquee-track">{[0, 1, 2, 3].map(i => <span key={i}>FRONT-END <ArrowUpRight className="marquee-mark"/> UI / UX <ArrowUpRight className="marquee-mark"/> REACT <ArrowUpRight className="marquee-mark"/></span>)}</div></div>

      <section className="about-section" id="about" aria-labelledby="about-title">
        {animated ? <Suspense fallback={<StaticTitle className="about-statement" id="about-title" text={aboutText} enabled={false}/>}>
          <ScrollTitle className="about-statement" id="about-title" text={aboutText} enabled={animated}/>
        </Suspense> : <StaticTitle className="about-statement" id="about-title" text={aboutText} enabled={false}/>}
        <div className="about-body"><CharacterPortrait locale={locale} animated={animated}/>
          <div className="about-copy"><p>{pt ? "Sou desenvolvedor front-end com interesse em UI/UX. Trabalho com React, Next.js e TypeScript para transformar ideias em interfaces, pensando em desempenho, acessibilidade e na experiência de quem usa." : "I'm a front-end developer with an interest in UI/UX. I work with React, Next.js and TypeScript to turn ideas into interfaces, focusing on performance, accessibility and the user experience."}</p><p>{pt ? "Meus projetos exploram conhecimento, estudos e organização pessoal. Gosto de conectar decisões de interface ao comportamento do produto e de entender o que acontece além da tela." : "My projects explore knowledge, learning and personal organization. I enjoy connecting interface decisions to product behavior and understanding what happens beyond the screen."}</p>
            <dl className="practice-list"><div><dt>Front-end</dt><dd><TechnologyList items={["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"]}/></dd></div><div><dt>{pt ? "Back-end e dados" : "Back-end and data"}</dt><dd><TechnologyList items={["Node.js", "PostgreSQL"]}/></dd></div><div><dt>{pt ? "Interface e ferramentas" : "Interface and tools"}</dt><dd><TechnologyList items={["UI/UX", "Figma", "GSAP", "Git"]}/></dd></div><div><dt>{pt ? "Além da tela" : "Beyond the screen"}</dt><dd>{pt ? "Vôlei e RPG de mesa" : "Volleyball and tabletop RPGs"}</dd></div></dl><a className="text-link" href={resume} target="_blank" rel="noopener noreferrer"><GlitchText text={pt ? "Minha trajetória no currículo" : "Read my résumé"}/><ArrowUpRight size={20} aria-hidden="true"/></a>
          </div>
        </div>
      </section>
    </>}
    <ContactFooter locale={locale} animated={animated} contact={contact} resume={resume}/>
  </main>
  {animated && <Suspense fallback={null}><ProjectCursor root={root} target={previewLink} routeKey={(route ?? "home") + locale} label={pt ? "Ver" : "View"} enabled={animated && !entranceActive}/></Suspense>}
  </>;
}
