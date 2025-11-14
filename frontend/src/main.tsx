import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'

import 'antd/dist/reset.css'; // ✅ for antd v5+
import 'antd-css-utilities/utility.min.css'; // ✅ for antd classes

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
