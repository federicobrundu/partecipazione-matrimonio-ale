const TOP_GAP_PX = 20

export function scrollToTop() {
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

/** Allinea il primo nome dell'hero sotto la barra del browser, misurando la posizione reale. */
export function alignHeroToViewport() {
  const anchor = document.querySelector<HTMLElement>('.hero-name')
  const spacer = document.querySelector<HTMLElement>('.page-top-spacer')
  if (!anchor) return

  const rect = anchor.getBoundingClientRect()
  const offset = rect.top - TOP_GAP_PX

  if (offset < -1) {
    window.scrollBy(0, offset)
    return
  }

  if (offset > 1 && window.scrollY > 0) {
    window.scrollBy(0, offset)
    return
  }

  // Scroll già a zero ma il nome è ancora troppo in alto: aumenta lo spacer
  if (spacer && rect.top < TOP_GAP_PX) {
    const current = spacer.getBoundingClientRect().height
    const needed = current + (TOP_GAP_PX - rect.top)
    spacer.style.height = `${needed}px`
  }
}

export function lockHeroPosition(durationMs = 6000) {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }

  const fix = () => {
    scrollToTop()
    alignHeroToViewport()
  }

  fix()

  const timers = [0, 50, 120, 250, 500, 900, 1500, 2500, 4000, 5500].map((delay) =>
    window.setTimeout(fix, delay),
  )

  const onShow = () => fix()
  const onResize = () => fix()

  window.addEventListener('pageshow', onShow)
  window.addEventListener('load', onShow)
  window.visualViewport?.addEventListener('resize', onResize)
  window.visualViewport?.addEventListener('scroll', onResize)
  document.fonts?.ready.then(fix)

  const stopTimer = window.setTimeout(() => {
    window.visualViewport?.removeEventListener('resize', onResize)
    window.visualViewport?.removeEventListener('scroll', onResize)
  }, durationMs)

  return () => {
    timers.forEach(clearTimeout)
    clearTimeout(stopTimer)
    window.removeEventListener('pageshow', onShow)
    window.removeEventListener('load', onShow)
    window.visualViewport?.removeEventListener('resize', onResize)
    window.visualViewport?.removeEventListener('scroll', onResize)
  }
}
