export function initPageScroll() {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }

  if (location.hash) {
    history.replaceState(history.state, '', location.pathname + location.search)
  }

  window.scrollTo(0, 0)
}

/**
 * Corregge lo shift di scroll quando la toolbar del WebView in-app collassa
 * (es. tap su link WhatsApp). Va chiamato prima di qualsiasi animazione hero.
 */
export function setupInitialScroll() {
  initPageScroll()

  const resetScroll = () => window.scrollTo(0, 0)
  let guardActive = true

  const onViewportChange = () => {
    if (guardActive) resetScroll()
  }

  window.addEventListener('resize', onViewportChange)
  window.visualViewport?.addEventListener('resize', onViewportChange)

  const endGuard = () => {
    guardActive = false
    window.removeEventListener('resize', onViewportChange)
    window.visualViewport?.removeEventListener('resize', onViewportChange)
  }

  const armPostLoadGuard = () => {
    resetScroll()
    window.setTimeout(endGuard, 500)
  }

  if (document.readyState === 'complete') {
    armPostLoadGuard()
  } else {
    window.addEventListener('load', armPostLoadGuard, { once: true })
  }
}
