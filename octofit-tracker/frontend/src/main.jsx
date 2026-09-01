import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './App.css';
import App from './App.jsx';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
if (!codespaceName) {
  console.warn(
    'VITE_CODESPACE_NAME is not defined. The frontend will fall back to http://localhost:8000 for API requests.'
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
