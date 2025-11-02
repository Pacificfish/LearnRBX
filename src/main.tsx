import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

try {
  const rootElement = document.getElementById('root')
  if (!rootElement) {
    throw new Error('Root element not found')
  }
  
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} catch (error) {
  console.error('❌ Failed to render app:', error)
  const errorMessage = error instanceof Error ? error.message : 'Unknown error'
  const errorStack = error instanceof Error ? error.stack : ''
  
  document.body.innerHTML = `
    <div style="padding: 2rem; font-family: system-ui; max-width: 800px; margin: 0 auto;">
      <h1 style="color: #dc2626;">Failed to load application</h1>
      <p><strong>Error:</strong> ${errorMessage}</p>
      <pre style="background: #f5f5f5; padding: 1rem; border-radius: 4px; overflow-x: auto; font-size: 12px;">${errorStack}</pre>
      <p>Please check the browser console (F12) for more details.</p>
    </div>
  `
}

