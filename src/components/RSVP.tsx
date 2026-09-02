import { weddingConfig } from '../data/wedding'

export function RSVP() {
  const { deadline, formUrl, email } = weddingConfig.rsvp

  return (
    <section
      id="rsvp"
      className="px-4 py-16 sm:px-6 sm:py-24"
      aria-labelledby="rsvp-title"
    >
      <div className="mx-auto max-w-xl text-center">
        <p className="text-xs font-medium tracking-[0.25em] text-sage uppercase sm:text-sm">
          Conferma la tua presenza
        </p>
        <h2
          id="rsvp-title"
          className="mt-2 font-serif text-3xl text-charcoal sm:text-4xl md:text-5xl"
        >
          RSVP
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-warm-gray sm:text-base">
          Vi preghiamo di confermare entro il{' '}
          <strong className="font-medium text-charcoal">{deadline}</strong>
        </p>

        {formUrl ? (
          <a
            href={formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full border border-gold bg-gold px-10 py-3.5 text-sm font-medium tracking-wider text-ivory uppercase transition-all hover:bg-gold-light hover:shadow-lg active:scale-[0.98]"
          >
            Compila il modulo
          </a>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-gold/30 bg-ivory px-6 py-8">
            <p className="text-sm text-warm-gray">
              Modulo RSVP in arrivo — contattaci a{' '}
              <a
                href={`mailto:${email}`}
                className="font-medium text-gold underline-offset-2 hover:underline"
              >
                {email}
              </a>
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-gold/10 bg-charcoal px-4 py-10 text-center text-ivory/80 sm:px-6 sm:py-12">
      <p className="font-serif text-2xl text-ivory sm:text-3xl">
        {weddingConfig.bride} & {weddingConfig.groom}
      </p>
      <p className="mt-2 text-sm tracking-wide">{weddingConfig.date}</p>
      {weddingConfig.socialHashtag && (
        <p className="mt-4 text-xs tracking-widest text-gold-light uppercase">
          {weddingConfig.socialHashtag}
        </p>
      )}
      <p className="mt-8 text-xs text-ivory/50">
        Con amore, per condividere il nostro giorno speciale con voi.
      </p>
    </footer>
  )
}
