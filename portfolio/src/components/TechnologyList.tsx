import type { ReactNode } from "react";
import "./technology-list.css";

const icons: Record<string, ReactNode> = {
  React: <><ellipse cx="12" cy="12" rx="10.5" ry="4.1"/><ellipse cx="12" cy="12" rx="10.5" ry="4.1" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10.5" ry="4.1" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none"/></>,
  "Next.js": <><circle cx="12" cy="12" r="10"/><path d="M8 17V7l11 14M16 7v8"/></>,
  TypeScript: <><rect x="2" y="2" width="20" height="20" rx="1"/><path d="M5 11h7M8.5 11v8M19 12c-.7-1.3-4.5-1.6-4.5.8 0 2.5 4.7 1.3 4.7 4 0 2.4-3.8 2.6-5 .9"/></>,
  JavaScript: <><rect x="2" y="2" width="20" height="20" rx="1"/><path d="M11 11v6c0 2.9-4.5 2.9-4.5 0M19 12c-.7-1.3-4.5-1.6-4.5.8 0 2.5 4.7 1.3 4.7 4 0 2.4-3.8 2.6-5 .9"/></>,
  HTML5: <><path d="m3 2 1.7 18L12 22l7.3-2L21 2ZM16.6 6.5H7.4l.4 4.4h8.4l-.7 5.7-3.5 1-3.5-1-.2-2.2"/></>,
  CSS3: <><path d="m3 2 1.7 18L12 22l7.3-2L21 2ZM7.5 6.5h9l-.4 4.4H8l.3 3h7.5l-.3 2.7-3.5 1-3.5-1"/></>,
  "Tailwind CSS": <path d="M2 9c1.3-5.3 6.7-6.7 10-3 1.7 1.9 3.3 2.8 5.3 1.6C19 6.6 20 5 20 5c-1.3 5.3-6.7 6.7-10 3C8.3 6.1 6.7 5.2 4.7 6.4 3 7.4 2 9 2 9Zm2 10c1.3-5.3 6.7-6.7 10-3 1.7 1.9 3.3 2.8 5.3 1.6C21 16.6 22 15 22 15c-1.3 5.3-6.7 6.7-10 3-1.7-1.9-3.3-2.8-5.3-1.6C5 17.4 4 19 4 19Z" fill="currentColor" stroke="none"/>,
  "Node.js": <><path d="m12 1 9.5 5.5v11L12 23l-9.5-5.5v-11ZM10 8v7c0 3-4 3-4 0M18 9c-1-2-5-1.8-5 .8 0 2.6 5 1.2 5 4.4 0 2.6-4.2 3-5.3 1"/></>,
  PostgreSQL: <><path d="M9 19c-3.8 2-6-2-6-6C1 5 5 1 12 2c7-1 11 3 9 11-.8 3.4-2.5 5.3-5 4.5M8 6c-4-1-4 5-1.5 8.5L9 17M16 6c4-1 4 5 1.5 8.5L15 17M10 8c1-1 3-1 4 0v11c0 4-4 4-4 1v-5c-3 .7-5-.8-5-.8M14 15c3 .7 5-.8 5-.8"/><circle cx="8" cy="10" r=".6" fill="currentColor"/><circle cx="16" cy="10" r=".6" fill="currentColor"/></>,
  Figma: <><path d="M12 2H8a4 4 0 0 0 0 8h4Zm0 8H8a4 4 0 0 0 0 8h4Zm0 8H8a4 4 0 1 0 4 4V2h4a4 4 0 0 1 0 8h-4" transform="translate(0 -1) scale(1 .96)"/><circle cx="16" cy="12.5" r="4"/></>,
  GSAP: <><path d="m14 1-3 8h10L9 23l3-10H3L14 1Z" fill="currentColor" stroke="none"/></>,
  Git: <><rect x="4.2" y="4.2" width="15.6" height="15.6" rx="1.5" transform="rotate(45 12 12)"/><path d="m7 7 10 10M12 12v6"/><circle cx="7.5" cy="7.5" r="1.5" fill="currentColor"/><circle cx="12" cy="18" r="1.5" fill="currentColor"/><circle cx="16.5" cy="16.5" r="1.5" fill="currentColor"/></>,
  "UI/UX": <><rect x="2" y="3" width="20" height="17" rx="1"/><path d="M2 8h20M9 8v12M5 5.5h.1M8 5.5h.1M12 12h7M12 16h4"/></>,
};

export default function TechnologyList({ items }: { items: string[] }) {
  return <ul className="technology-list" role="list">
    {items.map(item => <li className="technology-item" key={item}>
      {icons[item] && <svg className="technology-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{icons[item]}</svg>}
      <span>{item}</span>
    </li>)}
  </ul>;
}
