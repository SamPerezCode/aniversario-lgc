import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App.jsx';
import './styles/global.css';
import { ModalProvider } from './context/ModalContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { InscripcionesProvider } from './context/InscripcionesContext.jsx'; // Asegúrate de importar esto

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <InscripcionesProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </InscripcionesProvider>
    </AuthProvider>
  </StrictMode>
);
