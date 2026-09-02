import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'header' | 'figure' | 'article' | 'footer' | 'p' | 'li'
  'aria-labelledby'?: string
}

export function RevealOnScroll({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
  'aria-labelledby': ariaLabelledby,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
      aria-labelledby={ariaLabelledby}
    >
      {children}
    </Tag>
  )
}

export function SectionDivider() {
  return (
    <RevealOnScroll className="section-divider-wrap">
      <div className="section-divider" aria-hidden="true">
        <span className="section-divider-line" />
        <svg className="section-divider-branch" viewBox="0 0 72 28" fill="none">
          <path d="M8 22C24 21 35 14 51 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M21 19C17 13 18 9 24 7C28 12 27 16 21 19Z" fill="currentColor" opacity=".7" />
          <path d="M33 15C30 9 32 5 38 3C41 8 39 12 33 15Z" fill="currentColor" opacity=".82" />
          <path d="M42 11C47 9 51 11 52 16C47 18 43 16 42 11Z" fill="currentColor" opacity=".58" />
          <path d="M51 6C55 3 60 4 62 8C58 12 53 11 51 6Z" fill="currentColor" opacity=".74" />
        </svg>
        <span className="section-divider-line" />
      </div>
    </RevealOnScroll>
  )
}
