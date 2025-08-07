import {
  CssIcon,
  FigmaIcon,
  GitIcon,
  GithubIcon,
  Html5Icon,
  JavascriptIcon,
  MuiIcon,
  NextdotjsIcon,
  ReactIcon,
  TailwindcssIcon,
  TypescriptIcon,
} from '../icons'

export function Marquee() {
  const techIcons = [
    { Icon: CssIcon, name: 'CSS' },
    { Icon: FigmaIcon, name: 'Figma' },
    { Icon: GitIcon, name: 'Git' },
    { Icon: GithubIcon, name: 'GitHub' },
    { Icon: Html5Icon, name: 'HTML5' },
    { Icon: JavascriptIcon, name: 'JavaScript' },
    { Icon: MuiIcon, name: 'Material-UI' },
    { Icon: NextdotjsIcon, name: 'Next.js' },
    { Icon: ReactIcon, name: 'React' },
    { Icon: TailwindcssIcon, name: 'Tailwind CSS' },
    { Icon: TypescriptIcon, name: 'TypeScript' },
  ]

  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {techIcons.map(({ Icon, name }, index) => (
          <div key={`first-${index}`} className="tech-item">
            <img src={Icon} alt={name} className="tech-icon" />
            <span className="tech-name">{name}</span>
          </div>
        ))}
        {techIcons.map(({ Icon, name }, index) => (
          <div key={`second-${index}`} className="tech-item">
            <img src={Icon} alt={name} className="tech-icon" />
            <span className="tech-name">{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
