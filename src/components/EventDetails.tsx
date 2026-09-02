import { weddingConfig } from '../data/wedding'

function LocationCard({
  title,
  name,
  address,
  time,
  mapsUrl,
}: {
  title: string
  name: string
  address: string
  time: string
  mapsUrl: string
}) {
  return (
    <article className="flex flex-col rounded-2xl border border-gold/15 bg-ivory p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8">
      <p className="text-xs font-medium tracking-[0.2em] text-sage uppercase">
        {title}
      </p>
      <h3 className="mt-2 font-serif text-2xl text-charcoal sm:text-3xl">
        {name}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-warm-gray sm:text-base">
        {address}
      </p>
      <p className="mt-4 font-serif text-xl text-gold">{time}</p>
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-sage-dark transition-colors hover:text-gold"
      >
        Apri in Maps
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>
    </article>
  )
}

export function EventDetails() {
  const { ceremony, reception } = weddingConfig.locations

  return (
    <section
      id="dettagli"
      className="bg-ivory px-4 py-16 sm:px-6 sm:py-24"
      aria-labelledby="dettagli-title"
    >
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-xs font-medium tracking-[0.25em] text-sage uppercase sm:text-sm">
            Il grande giorno
          </p>
          <h2
            id="dettagli-title"
            className="mt-2 font-serif text-3xl text-charcoal sm:text-4xl md:text-5xl"
          >
            Dettagli dell&apos;evento
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:mt-16 sm:grid-cols-2 sm:gap-8">
          <LocationCard {...ceremony} />
          <LocationCard {...reception} />
        </div>

        <div className="mt-10 rounded-2xl border border-gold/10 bg-cream px-6 py-8 text-center sm:mt-12 sm:px-10">
          <p className="text-xs font-medium tracking-[0.2em] text-sage uppercase">
            Dress code
          </p>
          <p className="mt-3 font-serif text-xl text-charcoal sm:text-2xl">
            {weddingConfig.dressCode}
          </p>
        </div>
      </div>
    </section>
  )
}
