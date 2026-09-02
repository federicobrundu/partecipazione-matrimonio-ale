export function initPageScroll() {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }

  if (location.hash) {
    history.replaceState(history.state, '', location.pathname + location.search)
  }

  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

function enforceTopIfScrolled() {
  if (window.scrollY !== 0) {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }
}

/**
 * WhatsApp / in-app browser ripristinano lo scroll della sessione al tap sul link.
 * Incollare l'URL in Safari no — serve forzare scroll 0 finché il handoff non finisce.
 */
export function setupExternalHandoffScrollFix() {
  initPageScroll()

  const bursts = [0, 50, 120, 250, 500, 900, 1400, 2200, 3200]

  const runBursts = () => {
    bursts.forEach((delay) => window.setTimeout(enforceTopIfScrolled, delay))
  }

  const onPageShow = (event: PageTransitionEvent) => {
    initPageScroll()
    runBursts()
    if (event.persisted) {
      bursts.forEach((delay) => window.setTimeout(initPageScroll, delay))
    }
  }

  const onVisible = () => {
    if (document.visibilityState === 'visible') {
      enforceTopIfScrolled()
    }
  }

  window.addEventListener('pageshow', onPageShow)
  document.addEventListener('visibilitychange', onVisible)
  document.fonts?.ready.then(() => {
    initPageScroll()
    runBursts()
  })

  runBursts()

  const start = performance.now()
  let frame = 0

  const watch = () => {
    enforceTopIfScrolled()
    if (performance.now() - start < 3500) {
      frame = requestAnimationFrame(watch)
    }
  }

  frame = requestAnimationFrame(watch)

  return () => {
    cancelAnimationFrame(frame)
    window.removeEventListener('pageshow', onPageShow)
    document.removeEventListener('visibilitychange', onVisible)
  }
}
