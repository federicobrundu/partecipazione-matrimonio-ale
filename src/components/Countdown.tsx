import { useEffect, useState } from 'react'
import { weddingConfig } from '../data/wedding'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

const units: { key: keyof TimeLeft; label: string }[] = [
  { key: 'days', label: 'Giorni' },
  { key: 'hours', label: 'Ore' },
  { key: 'minutes', label: 'Min' },
  { key: 'seconds', label: 'Sec' },
]

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    getTimeLeft(new Date(weddingConfig.dateISO)),
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(new Date(weddingConfig.dateISO)))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      id="countdown"
      className="px-4 py-16 sm:px-6 sm:py-20"
      aria-label="Conto alla rovescia"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-2 text-xs font-medium tracking-[0.25em] text-sage uppercase sm:text-sm">
          Conto alla rovescia
        </p>
        <h2 className="font-serif text-3xl text-charcoal sm:text-4xl">
          {weddingConfig.date}
        </h2>
        <div
          className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
          role="timer"
          aria-live="polite"
        >
          {units.map(({ key, label }) => (
            <div
              key={key}
              className="rounded-2xl border border-gold/20 bg-ivory px-3 py-5 shadow-sm sm:px-4 sm:py-6"
            >
              <span className="block font-serif text-3xl text-gold tabular-nums sm:text-4xl md:text-5xl">
                {String(timeLeft[key]).padStart(2, '0')}
              </span>
              <span className="mt-1 block text-[10px] tracking-widest text-warm-gray uppercase sm:text-xs">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
