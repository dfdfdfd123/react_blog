import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    // 개발 중일때만 이렇게 변경
  // <StrictMode>
    <App />
  // {/*</StrictMode>,*/}
)
