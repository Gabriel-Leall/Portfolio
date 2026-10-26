import "./glitch-text.css";

export default function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  return <span className={"glitch-text " + className}>
    <span className="glitch-original">{text}</span>
    <span className="glitch-echo glitch-echo-a" aria-hidden="true">{text}</span>
    <span className="glitch-echo glitch-echo-b" aria-hidden="true">{text}</span>
    <span className="glitch-scramble" aria-hidden="true"/>
  </span>;
}
