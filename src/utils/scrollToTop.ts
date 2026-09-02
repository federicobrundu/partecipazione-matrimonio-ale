export function scrollToTop() {
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

export function lockScrollToTop(durationMs = 2000) {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }

  scrollToTop()

  const timers = [0, 50, 120, 250, 500, 900, 1500].map((delay) =>
    window.setTimeout(scrollToTop, delay),
  )

  const onShow = () => scrollToTop()
  const onResize = () => scrollToTop()

  window.addEventListener('pageshow', onShow)
  window.addEventListener('load', onShow)
  window.visualViewport?.addEventListener('resize', onResize)

  const stopTimer = window.setTimeout(() => {
    window.visualViewport?.removeEventListener('resize', onResize)
  }, durationMs)

  return () => {
    timers.forEach(clearTimeout)
    clearTimeout(stopTimer)
    window.removeEventListener('pageshow', onShow)
    window.removeEventListener('load', onShow)
    window.visualViewport?.removeEventListener('resize', onResize)
  }
}
