import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Rendering the React app inside the root div with StrictMode enabled
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* The App component is the root component for the entire application */}
    <App />
  </StrictMode>,
)
