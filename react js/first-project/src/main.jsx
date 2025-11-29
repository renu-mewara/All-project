import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Header from './assets/header'
import Home from './assets/Home'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)
