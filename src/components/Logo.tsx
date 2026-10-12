import { Link } from "@tanstack/react-router";

export function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2" aria-label="Indian Schemes home">
      <svg viewBox="0 0 48 48" className="h-11 w-11" aria-hidden>
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--saffron)" />
            <stop offset="0.5" stopColor="var(--magenta)" />
            <stop offset="1" stopColor="var(--teal)" />
          </linearGradient>
        </defs>
        <circle cx="24" cy="24" r="22" fill="url(#lg)" className="logo-pulse" />
        <g className="logo-spin" stroke="var(--background)" strokeWidth="1.6" fill="none">
          <circle cx="24" cy="24" r="12" />
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={i} x1="24" y1="24" x2="24" y2="12" transform={`rotate(${i * 30} 24 24)`} />
          ))}
        </g>
        <circle cx="24" cy="24" r="3" fill="var(--background)" />
      </svg>
      <span className="font-display text-2xl font-extrabold leading-none text-gradient">
        Indian Schemes
      </span>
    </Link>
  );
}
