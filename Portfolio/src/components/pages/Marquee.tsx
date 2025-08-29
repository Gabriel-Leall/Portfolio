import { useRef } from 'react'
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
import { useResponsiveMarquee } from '../../hooks/useResponsiveMarquee'
import { OrbitingMarquee } from '../ui/OrbitingMarquee'

interface TechIcon {
  Icon: string
  name: string
  id?: string
}

interface ResponsiveMarqueeProps {
  profileElement?: HTMLElement | null
  className?: string
}

export function ResponsiveMarquee({ profileElement, className = '' }: ResponsiveMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const techIcons: TechIcon[] = [
    { Icon: CssIcon, name: 'CSS', id: 'css' },
    { Icon: FigmaIcon, name: 'Figma', id: 'figma' },
    { Icon: GitIcon, name: 'Git', id: 'git' },
    { Icon: GithubIcon, name: 'GitHub', id: 'github' },
    { Icon: Html5Icon, name: 'HTML5', id: 'html5' },
    { Icon: JavascriptIcon, name: 'JavaScript', id: 'javascript' },
    { Icon: MuiIcon, name: 'Material-UI', id: 'mui' },
    { Icon: NextdotjsIcon, name: 'Next.js', id: 'nextjs' },
    { Icon: ReactIcon, name: 'React', id: 'react' },
    { Icon: TailwindcssIcon, name: 'Tailwind CSS', id: 'tailwind' },
    { Icon: TypescriptIcon, name: 'TypeScript', id: 'typescript' },
  ]

  const {
    state,
    isDesktop,
    isMobile,
    isTransitioning,
    respectsReducedMotion,
  } = useResponsiveMarquee({
    profileElement,
    breakpoint: 1024,
  })

  return (
    <div 
      ref={containerRef}
      className={`responsive-marquee-container ${className}`}
      role="region"
      aria-label="Tecnologias e ferramentas utilizadas"
    >
      {/* Desktop Marquee */}
      {(isDesktop || isTransitioning) && (
        <div 
          className={`marquee-desktop transition-opacity duration-300 ${
            isTransitioning && isMobile ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <DesktopMarquee techIcons={techIcons} />
        </div>
      )}
      
      {/* Mobile Orbit */}
      {(isMobile || isTransitioning) && profileElement && (
        <div 
          className={`marquee-mobile transition-opacity duration-300 ${
            isTransitioning && isDesktop ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <OrbitingMarquee
            techIcons={techIcons}
            centerElement={profileElement}
            radius={state.orbitRadius}
            speed={state.animationSpeed}
            direction="clockwise"
            isAnimating={state.isAnimating}
            respectsReducedMotion={respectsReducedMotion}
            className="py-4"
          />
        </div>
      )}
      
      {/* Fallback for mobile when no profile element */}
      {isMobile && !profileElement && (
        <div className="marquee-mobile">
          <DesktopMarquee techIcons={techIcons} />
        </div>
      )}
    </div>
  )
}

// Desktop horizontal scrolling marquee component
interface DesktopMarqueeProps {
  techIcons: TechIcon[]
}

function DesktopMarquee({ techIcons }: DesktopMarqueeProps) {
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

// Export both for backward compatibility
export function Marquee() {
  return <ResponsiveMarquee />
}
