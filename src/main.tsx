import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { setupInitialScroll } from './utils/scrollToTop'
import './index.css'
import App from './App.tsx'

setupInitialScroll()
document.documentElement.classList.add('hero-ready')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
