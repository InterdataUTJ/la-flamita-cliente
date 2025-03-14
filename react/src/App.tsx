import { StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from "react-router";
import AuthContextProvider from './hooks/AuthContext/Provider';
import './global.css'

// Pages
import LandingPage from './pages/landing';
import LoginPage from './pages/Auth/Login';
import PerfilPage from './pages/Auth/Perfil';
import PerfilEditarPage from './pages/Auth/Editar';
import Error404Page from './pages/Errors/404';

export default function App() {

  return (
    <StrictMode>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>

            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/perfil" element={<PerfilPage />} />
            <Route path="/perfil/editar" element={<PerfilEditarPage />} />

            <Route path="*" element={<Error404Page />} />

          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </StrictMode>
  );
}