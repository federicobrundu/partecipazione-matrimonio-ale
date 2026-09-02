import { useState, type FormEvent } from 'react'
import { weddingConfig } from '../data/wedding'

interface FormState {
  name: string
  guests: string
  phone: string
  allergies: string
}

const initialState: FormState = {
  name: '',
  guests: '',
  phone: '',
  allergies: '',
}

export function RSVPForm() {
  const { formEndpoint, whatsappRsvp, rsvpDeadline } = weddingConfig.details
  const [form, setForm] = useState<FormState>(initialState)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<Record<'name' | 'guests', string>>>({})

  const buildMessage = () =>
    [
      'Ciao! Confermo la mia presenza al matrimonio di Alessandra & Andrea.',
      '',
      `Nome: ${form.name.trim()}`,
      `Numero invitati: ${form.guests}`,
      form.phone.trim() ? `Telefono: ${form.phone.trim()}` : null,
      form.allergies.trim() ? `Allergie / note: ${form.allergies.trim()}` : null,
    ]
      .filter(Boolean)
      .join('\n')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const nextErrors: typeof errors = {}
    if (!form.name.trim()) nextErrors.name = 'Inserisci nome e cognome.'
    if (!form.guests) nextErrors.guests = 'Seleziona il numero di invitati.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('sending')

    if (formEndpoint) {
      try {
        const res = await fetch(formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: form.name.trim(),
            guests: form.guests,
            phone: form.phone.trim(),
            allergies: form.allergies.trim(),
            _subject: 'Conferma presenza matrimonio',
          }),
        })
        if (res.ok) {
          setStatus('success')
          setForm(initialState)
          return
        }
        setStatus('error')
      } catch {
        setStatus('error')
      }
      return
    }

    const url = `https://wa.me/${whatsappRsvp.replace(/\D/g, '')}?text=${encodeURIComponent(buildMessage())}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setStatus('success')
  }

  return (
    <form className="rsvp-form" onSubmit={handleSubmit} noValidate>
      <p className="rsvp-form-deadline">
        Conferma entro il <strong>{rsvpDeadline}</strong>
      </p>

      <label className="form-field">
        <span className="form-label">
          Nome e cognome <span className="field-requirement">Richiesto</span>
        </span>
        <input
          type="text"
          name="name"
          required
          autoComplete="name"
          className="form-input"
          value={form.name}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
          onChange={(e) => {
            setForm((f) => ({ ...f, name: e.target.value }))
            if (errors.name) setErrors((current) => ({ ...current, name: undefined }))
          }}
          placeholder="Il tuo nome"
        />
        {errors.name && (
          <span className="field-error" id="name-error">
            {errors.name}
          </span>
        )}
      </label>

      <label className="form-field">
        <span className="form-label">
          Numero invitati <span className="field-requirement">Richiesto</span>
        </span>
        <select
          name="guests"
          required
          className="form-input form-select"
          value={form.guests}
          aria-invalid={Boolean(errors.guests)}
          aria-describedby={errors.guests ? 'guests-error' : undefined}
          onChange={(e) => {
            setForm((f) => ({ ...f, guests: e.target.value }))
            if (errors.guests) setErrors((current) => ({ ...current, guests: undefined }))
          }}
        >
          <option value="" disabled>
            Seleziona
          </option>
          {Array.from({ length: 6 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={String(n)}>
              {n} {n === 1 ? 'persona' : 'persone'}
            </option>
          ))}
          <option value="6+">Più di 6 — scriveteci</option>
        </select>
        {errors.guests && (
          <span className="field-error" id="guests-error">
            {errors.guests}
          </span>
        )}
      </label>

      <label className="form-field">
        <span className="form-label">
          Telefono <span className="field-optional">Facoltativo</span>
        </span>
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          className="form-input"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          placeholder="Per eventuali comunicazioni"
        />
      </label>

      <label className="form-field">
        <span className="form-label">
          Allergie o note alimentari <span className="field-optional">Facoltativo</span>
        </span>
        <textarea
          name="allergies"
          rows={3}
          className="form-input form-textarea"
          value={form.allergies}
          onChange={(e) => setForm((f) => ({ ...f, allergies: e.target.value }))}
          placeholder="Facoltativo"
        />
      </label>

      <button type="submit" className="btn-primary" disabled={status === 'sending'}>
        {status === 'sending'
          ? 'Invio in corso…'
          : formEndpoint
            ? 'Invia conferma'
            : 'Conferma via WhatsApp'}
      </button>

      {status === 'success' && (
        <p className="form-feedback form-feedback-success" role="status">
          WhatsApp è stato aperto: invia il messaggio per completare la conferma.
        </p>
      )}
      {status === 'error' && (
        <p className="form-feedback form-feedback-error" role="alert">
          Si è verificato un errore. Riprova o contattaci telefonicamente.
        </p>
      )}
    </form>
  )
}
