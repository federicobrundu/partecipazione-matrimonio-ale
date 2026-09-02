import { useEffect, useMemo, useState } from 'react'

const units = [
  { key: 'days', label: 'giorni' },
  { key: 'hours', label: 'ore' },
  { key: 'minutes', label: 'minuti' },
  { key: 'seconds', label: 'secondi' },
] as const

function getRemaining(target: string) {
  const difference = Math.max(0, new Date(target).getTime() - Date.now())

  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
  }
}

export function Countdown({ target }: { target: string }) {
  const initial = useMemo(() => getRemaining(target), [target])
  const [remaining, setRemaining] = useState(initial)

  useEffect(() => {
    const update = () => setRemaining(getRemaining(target))
    update()
    const timer = window.setInterval(update, 1_000)
    return () => window.clearInterval(timer)
  }, [target])

  return (
    <div className="countdown" aria-label="Tempo rimanente al matrimonio">
      {units.map(({ key, label }) => (
        <div className="countdown-unit" key={key}>
          <span className="countdown-value">{String(remaining[key]).padStart(2, '0')}</span>
          <span className="countdown-label">{label}</span>
        </div>
      ))}
    </div>
  )
}
