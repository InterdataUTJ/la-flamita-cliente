import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { PerfilEdit, RegisterRequest } from "@/services/Perfil/types";
import PerfilService from "@/services/Perfil";

import { AuthContextProviderProps, AuthContextState } from "./types";
import storage from './utils/localStorage';
import AuthContext from "./index";


export default function AuthContextProvider({ children }: AuthContextProviderProps) {

  // Save the token and user in the local storage
  const [state, setState] = useState<AuthContextState>(storage.load() as AuthContextState);


  useEffect(() => {
    if (!state.token) return;
    getPerfil(state.token);
  }, [state.token]);

  const getPerfil = async (token: string) => {
    try {
      const user = await PerfilService.perfil(token);
      setState(prev => storage.save({ ...prev, token, user }));
    } catch(e: Error | unknown) {
      if (e instanceof Error && e.name === "JwtInvalidError") alert("La sesión ha expirado.");
      else alert('Error al recuperar la sesión.');

      // El JWT es inválido, se limpia el estado y el local storage
      setState({} as AuthContextState);
      storage.remove();
    }
  }

  // Login function
  const handleGoogleLogin = async (code: string) => {
    const { token } = await PerfilService.googleLogin(code);
    const user = await PerfilService.perfil(token);
    setState(prev => storage.save({ ...prev, token, user }));
  }


  // Login function
  const handleLogin = async (correo: string, clave: string) => {
    const { token } = await PerfilService.login(correo, clave);
    const user = await PerfilService.perfil(token);
    setState(prev => storage.save({ ...prev, token, user }));
  }


  // Logout function
  const handleLogout = async () => {
    try {
      if (!state.token) throw new Error("No hay token de sesión.");
      await PerfilService.logout(state.token);
      setState({} as AuthContextState);
      storage.remove();
    } catch(e: Error | unknown) { 
      if (e instanceof Error) alert(e.message);
      else alert('Error al cerrar sesión.');

      if (e instanceof Error && e.name === "JwtInvalidError") {
        setState({} as AuthContextState);
        storage.remove();
      }
    }
  }

  const handleRegister = async (account: RegisterRequest) => {
    const { token } = await PerfilService.singup(account);
    const user = await PerfilService.perfil(token);
    setState(prev => storage.save({ ...prev, token, user }));
  }



  const handleUpdate = async (props: PerfilEdit) => {
    if (!state.token) throw new Error("No hay token de sesión.");

    await PerfilService.editar(state.token, props);
    const user = await PerfilService.perfil(state.token);
    setState(prev => storage.save({ ...prev, user }));
  }

  
  return (
    <AuthContext.Provider value={{
      token: state.token,
      user: state.user,
      login: handleLogin,
      googleLogin: handleGoogleLogin,
      register: handleRegister,
      logout: handleLogout,
      update: handleUpdate,
      goLogin: <Navigate to="/login" replace />,
      goAlreadyLogged: <Navigate to="/" replace />,
      goNotAllowed: <Navigate to="/error/403" replace />,
    }}>
      {children}
    </AuthContext.Provider>
  );
}