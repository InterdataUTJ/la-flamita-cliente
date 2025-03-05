import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { AuthContextProvider } from '@/hooks/AuthContext';
import LoginPage from '@/pages/Auth/Login';
import './global.css';

function App() {
  return (
    <StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to={"/login"} />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
    </StrictMode>
  );
}

createRoot(document.getElementById('root')!).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
