import { useLayoutEffect } from 'react'
import { InvitationPage } from './components/InvitationPage'
import { resetScrollAfterPaint } from './utils/scrollToTop'

function App() {
  useLayoutEffect(() => {
    resetScrollAfterPaint()
  }, [])

  return <InvitationPage />
}

export default App
