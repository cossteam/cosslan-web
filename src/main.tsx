import ReactDOM from 'react-dom/client'
import {StrictMode} from 'react'
import {BrowserRouter} from 'react-router-dom'
import App from './App.tsx'
import './i18n/config';
import '../app/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </StrictMode>,
)
