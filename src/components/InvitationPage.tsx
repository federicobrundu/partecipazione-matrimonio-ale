import { useCallback, useState } from 'react'
import chiesaImg from '../assets/chiesa.jpeg'
import locationImg from '../assets/location.jpeg'
import { weddingConfig } from '../data/wedding'
import { FloralDecoration } from './FloralDecoration'

function MapsLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="maps-link"
      aria-label={`${label} — apri in Google Maps`}
    >
      <span className="maps-pin" aria-hidden="true">
        📍
      </span>
      COME ARRIVARE
    </a>
  )
}

function VenueImage({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="venue-image-wrap">
      <img src={src} alt={alt} className="venue-image" loading="lazy" decoding="async" />
    </figure>
  )
}

function CopyIban({ iban }: { iban: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(iban)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* fallback silenzioso */
    }
  }, [iban])

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="iban-value"
      aria-label="Copia IBAN negli appunti"
    >
      {iban}
      {copied && <span className="iban-copied">Copiato!</span>}
    </button>
  )
}

export function InvitationPage() {
  const { bride, groom, date, ceremony, reception, details } = weddingConfig

  return (
    <div className="invitation">
      <FloralDecoration position="top-right" />

      <main className="invitation-content">
        {/* Hero */}
        <header className="hero">
          <h1 className="hero-names">
            <span className="hero-name">{bride}</span>
            <span className="hero-amp">&amp;</span>
            <span className="hero-name">{groom}</span>
          </h1>
          <p className="hero-date">{date}</p>
        </header>

        {/* Cerimonia */}
        <section className="event-section" aria-labelledby="cerimonia-title">
          <h2 id="cerimonia-title" className="section-title">
            {ceremony.title}
          </h2>
          <h3 className="venue-name">{ceremony.venue}</h3>
          <MapsLink href={ceremony.mapsUrl} label={ceremony.venue} />
          <p className="venue-address">{ceremony.address}</p>
          <p className="venue-time">{ceremony.time}</p>
          <VenueImage src={chiesaImg} alt={ceremony.imageAlt} />
        </section>

        {/* Ricevimento */}
        <section className="event-section" aria-labelledby="ricevimento-title">
          <h2 id="ricevimento-title" className="section-title">
            {reception.title}
          </h2>
          <h3 className="venue-name">{reception.venue}</h3>
          <MapsLink href={reception.mapsUrl} label={reception.venue} />
          <p className="venue-address">{reception.address}</p>
          <VenueImage src={locationImg} alt={reception.imageAlt} />
        </section>

        {/* Dettagli */}
        <section className="details-section" aria-labelledby="dettagli-title">
          <h2 id="dettagli-title" className="section-title">
            {details.title}
          </h2>
          <p className="details-intro">{details.rsvpIntro}</p>
          <div className="contacts">
            {details.contacts.map(({ name, phone, tel }) => (
              <p key={name} className="contact-line">
                <strong>{name}</strong>{' '}
                <a href={`tel:${tel}`} className="contact-phone">
                  {phone}
                </a>
              </p>
            ))}
          </div>
          <p className="gift-message">{details.giftMessage}</p>
          <div className="bank-details">
            <p className="bank-label">INTESTATARIO</p>
            <p className="bank-value">{details.accountHolder}</p>
            <p className="bank-label bank-label-iban">IBAN</p>
            <CopyIban iban={details.iban} />
          </div>
        </section>
      </main>

      <FloralDecoration position="bottom-left" />
    </div>
  )
}
