let scrollLockActive = false

export function initPageScroll() {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }

  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

/** Blocca lo scroll durante il load iniziale — fix per WhatsApp iOS che sposta la posizione. */
export function lockScrollDuringLoad() {
  if (scrollLockActive) return () => undefined
  scrollLockActive = true

  initPageScroll()

  const html = document.documentElement
  html.style.overflow = 'hidden'

  const unlock = () => {
    html.style.overflow = ''
    initPageScroll()
  }

  const onPageShow = () => initPageScroll()

  window.addEventListener('pageshow', onPageShow)
  window.addEventListener('load', unlock, { once: true })
  document.fonts?.ready.then(unlock)

  const fallback = window.setTimeout(unlock, 800)

  return () => {
    window.clearTimeout(fallback)
    window.removeEventListener('pageshow', onPageShow)
    unlock()
    scrollLockActive = false
  }
}
