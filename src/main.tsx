import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { setupInitialScroll } from './utils/scrollToTop'
import './index.css'
import App from './App.tsx'

setupInitialScroll()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    document.documentElement.classList.add('hero-ready')
  })
})
