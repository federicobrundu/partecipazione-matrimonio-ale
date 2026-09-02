import { weddingConfig } from '../data/wedding'

const navItems = [
  { href: '#countdown', label: 'Data' },
  { href: '#dettagli', label: 'Dettagli' },
  { href: '#rsvp', label: 'RSVP' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gold/10 bg-ivory/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <a
          href="#"
          className="font-serif text-lg tracking-wide text-charcoal sm:text-xl"
        >
          {weddingConfig.bride} & {weddingConfig.groom}
        </a>
        <nav aria-label="Navigazione principale">
          <ul className="flex gap-4 sm:gap-8">
            {navItems.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-xs font-medium tracking-wider text-warm-gray uppercase transition-colors hover:text-gold sm:text-sm"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export function Hero() {
  return (
    <section
      className="relative flex min-h-[85dvh] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center sm:min-h-[90dvh] sm:px-6"
      aria-labelledby="hero-title"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-gold-light)_0%,_transparent_50%)] opacity-20"
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-2xl">
        <p className="mb-4 text-xs font-medium tracking-[0.3em] text-sage uppercase sm:text-sm">
          Ci sposiamo
        </p>
        <h1
          id="hero-title"
          className="font-serif text-5xl leading-tight text-charcoal sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {weddingConfig.bride}
          <span className="my-2 block text-3xl font-light text-gold sm:my-3 sm:text-4xl md:text-5xl">
            &
          </span>
          {weddingConfig.groom}
        </h1>
        <p className="mt-6 text-balance text-sm leading-relaxed text-warm-gray sm:mt-8 sm:text-base md:text-lg">
          {weddingConfig.tagline}
        </p>
        <a
          href="#rsvp"
          className="mt-10 inline-block rounded-full border border-gold bg-gold px-8 py-3 text-sm font-medium tracking-wider text-ivory uppercase transition-all hover:bg-gold-light hover:shadow-lg active:scale-[0.98] sm:px-10 sm:py-3.5"
        >
          Conferma presenza
        </a>
      </div>
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-gold/60"
        aria-hidden="true"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  )
}
