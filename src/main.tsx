import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initPageScroll } from './utils/scrollToTop'
import './index.css'
import App from './App.tsx'

initPageScroll()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
