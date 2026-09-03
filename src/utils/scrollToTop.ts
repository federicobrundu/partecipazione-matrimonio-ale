function resetScrollPosition() {
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  if (document.body) document.body.scrollTop = 0

  const vv = window.visualViewport
  if (vv && vv.offsetTop > 0) {
    window.scrollTo(0, window.scrollY + vv.offsetTop)
  }
}

export function initPageScroll() {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }

  if (location.hash) {
    history.replaceState(history.state, '', location.pathname + location.search)
  }

  resetScrollPosition()
}

/**
 * Corregge lo shift di scroll quando la toolbar del WebView in-app collassa
 * (es. tap su link WhatsApp). Va chiamato prima di qualsiasi animazione hero.
 */
export function setupInitialScroll() {
  initPageScroll()

  let guardActive = true

  const onViewportChange = () => {
    if (guardActive) resetScrollPosition()
  }

  window.addEventListener('resize', onViewportChange, { passive: true })
  window.visualViewport?.addEventListener('resize', onViewportChange, { passive: true })
  window.visualViewport?.addEventListener('scroll', onViewportChange, { passive: true })

  window.addEventListener(
    'pageshow',
    () => {
      guardActive = true
      resetScrollPosition()
      window.setTimeout(() => {
        guardActive = false
      }, 500)
    },
    { passive: true },
  )

  const endGuard = () => {
    guardActive = false
    window.removeEventListener('resize', onViewportChange)
    window.visualViewport?.removeEventListener('resize', onViewportChange)
    window.visualViewport?.removeEventListener('scroll', onViewportChange)
  }

  const armPostLoadGuard = () => {
    resetScrollPosition()
    requestAnimationFrame(() => {
      requestAnimationFrame(resetScrollPosition)
    })
    window.setTimeout(endGuard, 1500)
  }

  if (document.readyState === 'complete') {
    armPostLoadGuard()
  } else {
    window.addEventListener('load', armPostLoadGuard, { once: true })
  }

  document.fonts?.ready.then(() => {
    if (guardActive) resetScrollPosition()
  })
}

/** Chiamare dopo il primo paint React (post-idratazione). */
export function resetScrollAfterPaint() {
  resetScrollPosition()
  requestAnimationFrame(() => {
    requestAnimationFrame(resetScrollPosition)
  })
}
