import { StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from "react-router";
import AuthContextProvider from './hooks/AuthContext/Provider';
import './global.css'

// Pages
import LandingPage from './pages/landing';
import LoginPage from './pages/Auth/Login';
import GoogleLoginPage from './pages/Auth/Google';
import PerfilPage from './pages/Auth/Perfil';
import PerfilEditarPage from './pages/Auth/Editar';
import Error404Page from './pages/Errors/404';

// Productos
import MenuPage from './pages/Producto/Menu';
import MostrarProducto from './pages/Producto/Mostrar';
import CarritoPage from './pages/Carrito/Listar';
import VentaConfirmar from './pages/Venta/Confirmar';
import VentaListar from './pages/Venta/Listar';
import VentaMostrar from './pages/Venta/Mostrar';
import RegisterPage from './pages/Auth/Register';

export default function App() {

  return (
    <StrictMode>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>

            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login/google" element={<GoogleLoginPage />} />

            <Route path="/register" element={<RegisterPage />} />
            <Route path="/perfil" element={<PerfilPage />} />
            <Route path="/perfil/editar" element={<PerfilEditarPage />} />

            <Route path="/menu" element={<MenuPage />} />
            <Route path="/producto/:id" element={<MostrarProducto />} />

            <Route path="/carrito" element={<CarritoPage />} />
            <Route path="/venta/confirmar" element={<VentaConfirmar />} />
            <Route path="/venta/listar" element={<VentaListar />} />
            <Route path="/venta/mostrar/:id" element={<VentaMostrar />} />

            <Route path="*" element={<Error404Page />} />

          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </StrictMode>
  );
}