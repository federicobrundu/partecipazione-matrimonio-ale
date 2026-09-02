import { useCallback, useLayoutEffect, useState, type CSSProperties } from 'react'
import { weddingConfig } from '../data/wedding'
import { FloralDecoration } from './FloralDecoration'
import { GoldHeart, MapPinIcon, WhatsAppIcon } from './Icons'
import { RevealOnScroll, SectionDivider } from './RevealOnScroll'
import { RSVPForm } from './RSVPForm'
import { Countdown } from './Countdown'
import { initPageScroll } from '../utils/scrollToTop'

function MapsButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="maps-button"
      aria-label={`${label} — apri navigazione in Google Maps`}
    >
      <MapPinIcon className="maps-button-icon" />
      <span>COME ARRIVARE</span>
    </a>
  )
}

function VenueImage({ src, alt, delay = 0 }: { src: string; alt: string; delay?: number }) {
  return (
    <RevealOnScroll as="figure" className="venue-image-wrap" delay={delay}>
      <div className="venue-image-frame">
        <img src={src} alt={alt} className="venue-image" loading="lazy" decoding="async" />
      </div>
    </RevealOnScroll>
  )
}

function CopyIbanBlock({ iban }: { iban: string }) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle')

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(iban)
      setCopyStatus('copied')
    } catch {
      const input = document.createElement('textarea')
      input.value = iban
      input.style.position = 'fixed'
      input.style.opacity = '0'
      document.body.appendChild(input)
      input.select()
      const copied = document.execCommand('copy')
      input.remove()
      setCopyStatus(copied ? 'copied' : 'error')
    }
    window.setTimeout(() => setCopyStatus('idle'), 2000)
  }, [iban])

  return (
    <div className="iban-block">
      <p className="iban-code">{iban}</p>
      <button type="button" onClick={handleCopy} className="btn-secondary">
        {copyStatus === 'copied' ? 'Copiato ✓' : 'Copia IBAN'}
      </button>
      <span className="sr-only" aria-live="polite">
        {copyStatus === 'copied'
          ? 'IBAN copiato negli appunti'
          : copyStatus === 'error'
            ? 'Copia non riuscita. Seleziona manualmente il codice IBAN.'
            : ''}
      </span>
    </div>
  )
}

function ContactRow({
  name,
  phone,
  tel,
  whatsapp,
}: {
  name: string
  phone: string
  tel: string
  whatsapp: string
}) {
  return (
    <div className="contact-row">
      <strong className="contact-name">{name}</strong>
      <div className="contact-actions">
        <a
          href={`tel:${tel}`}
          className="contact-action contact-action-phone"
          aria-label={`Chiama ${name} al numero ${phone}`}
        >
          {phone}
        </a>
        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-action contact-action-whatsapp"
          aria-label={`Scrivi a ${name} su WhatsApp`}
        >
          <WhatsAppIcon />
          WhatsApp
        </a>
      </div>
    </div>
  )
}

export function InvitationPage() {
  const {
    bride,
    groom,
    date,
    dateIso,
    hashtag,
    couplePhoto,
    timeline,
    ceremony,
    reception,
    practicalInfo,
    details,
  } = weddingConfig

  useLayoutEffect(() => {
    initPageScroll()
  }, [])

  return (
    <div className="invitation">
      <FloralDecoration position="top-right" />

      <main className="invitation-content">
        <div className="page-top-spacer" aria-hidden="true" />
        <header className="hero">
          <h1 className="hero-names">
            <span className="hero-name hero-animate" style={{ '--i': 0 } as CSSProperties}>
              {bride}
            </span>
            <span className="hero-amp hero-animate" style={{ '--i': 1 } as CSSProperties}>
              &amp;
            </span>
            <span className="hero-name hero-animate" style={{ '--i': 2 } as CSSProperties}>
              {groom}
            </span>
          </h1>
          <p className="hero-date hero-animate" style={{ '--i': 3 } as CSSProperties}>
            {date}
          </p>
          <div className="hero-countdown hero-animate" style={{ '--i': 4 } as CSSProperties}>
            <Countdown target={dateIso} />
          </div>
        </header>

        {couplePhoto && (
          <>
            <RevealOnScroll className="couple-photo-wrap" delay={100}>
              <div className="couple-photo-frame">
                <img src={couplePhoto} alt={`${bride} e ${groom}`} className="couple-photo" />
              </div>
            </RevealOnScroll>
            <SectionDivider />
          </>
        )}

        <section className="timeline-section" aria-labelledby="programma-title">
          <RevealOnScroll delay={0}>
            <h2 id="programma-title" className="section-title">
              {timeline.title}
            </h2>
          </RevealOnScroll>
          <ol className="timeline-list">
            {timeline.items.map((item, index) => (
              <RevealOnScroll
                as="li"
                key={item.time + item.label}
                className="timeline-item"
                delay={index * 80}
              >
                <span className="timeline-time">{item.time}</span>
                <span className="timeline-marker" aria-hidden="true" />
                <div className="timeline-content">
                  <span className="timeline-label">{item.label}</span>
                  <span className="timeline-detail">{item.detail}</span>
                </div>
              </RevealOnScroll>
            ))}
          </ol>
        </section>

        <SectionDivider />

        <section className="event-section" aria-labelledby="cerimonia-title">
          <RevealOnScroll delay={0}>
            <h2 id="cerimonia-title" className="section-title">
              {ceremony.title}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={60}>
            <h3 className="venue-name">{ceremony.venue}</h3>
          </RevealOnScroll>
          <RevealOnScroll delay={90}>
            <MapsButton href={ceremony.mapsUrl} label={ceremony.venue} />
          </RevealOnScroll>
          <RevealOnScroll delay={120}>
            <p className="venue-address">{ceremony.address}</p>
          </RevealOnScroll>
          <RevealOnScroll delay={140}>
            <p className="venue-time">{ceremony.time}</p>
          </RevealOnScroll>
          <VenueImage src={ceremony.image} alt={ceremony.imageAlt} delay={160} />
        </section>

        <SectionDivider />

        <section className="event-section" aria-labelledby="ricevimento-title">
          <RevealOnScroll delay={0}>
            <h2 id="ricevimento-title" className="section-title">
              {reception.title}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={60}>
            <h3 className="venue-name">{reception.venue}</h3>
          </RevealOnScroll>
          <RevealOnScroll delay={90}>
            <MapsButton href={reception.mapsUrl} label={reception.venue} />
          </RevealOnScroll>
          <RevealOnScroll delay={120}>
            <p className="venue-address">{reception.address}</p>
          </RevealOnScroll>
          {reception.time && (
            <RevealOnScroll delay={140}>
              <p className="venue-time">{reception.time}</p>
            </RevealOnScroll>
          )}
          <VenueImage src={reception.image} alt={reception.imageAlt} delay={160} />
        </section>

        <SectionDivider />

        <section className="info-section" aria-labelledby="info-pratiche">
          <RevealOnScroll delay={0}>
            <h2 id="info-pratiche" className="section-title section-title-sm">
              Informazioni utili
            </h2>
          </RevealOnScroll>
          <div className="info-cards">
            <RevealOnScroll as="article" className="info-card" delay={60}>
              <h3 className="info-card-title">{practicalInfo.dressCode.title}</h3>
              <p className="info-card-text">{practicalInfo.dressCode.text}</p>
            </RevealOnScroll>
            <RevealOnScroll as="article" className="info-card" delay={120}>
              <h3 className="info-card-title">{practicalInfo.parking.title}</h3>
              <p className="info-card-text">{practicalInfo.parking.text}</p>
            </RevealOnScroll>
          </div>
        </section>

        <SectionDivider />

        <section className="details-section" aria-labelledby="dettagli-title">
          <RevealOnScroll delay={0}>
            <h2 id="dettagli-title" className="section-title">
              {details.title}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={60}>
            <p className="details-intro">{details.rsvpIntro}</p>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <RSVPForm />
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <p className="details-or">oppure contattateci direttamente</p>
          </RevealOnScroll>

          <div className="contacts">
            {details.contacts.map((contact, index) => (
              <RevealOnScroll key={contact.name} delay={index * 80}>
                <ContactRow {...contact} />
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll delay={80}>
            <p className="gift-message">
              {details.giftMessage}
              <GoldHeart className="gift-heart" />
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <div className="bank-details">
              <p className="bank-label">INTESTATARIO</p>
              <p className="bank-value">{details.accountHolder}</p>
              <p className="bank-label bank-label-iban">IBAN</p>
              <CopyIbanBlock iban={details.iban} />
            </div>
          </RevealOnScroll>
        </section>

        <RevealOnScroll as="footer" className="site-footer" delay={60}>
          <p className="hashtag">{hashtag}</p>
          <p className="footer-note">Condividete i vostri scatti con noi</p>
        </RevealOnScroll>
      </main>

      <FloralDecoration position="bottom-left" />
    </div>
  )
}
