import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initPageScroll, lockScrollDuringLoad } from './utils/scrollToTop'
import './index.css'
import App from './App.tsx'

initPageScroll()
lockScrollDuringLoad()
document.documentElement.classList.add('hero-ready')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
