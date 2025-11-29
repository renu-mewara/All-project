import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Menubar from './Menubar'

import './assets/css/style.css'  

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Menubar />
  </StrictMode>,
)
