import { CarritoItem } from "@/services/Perfil/types";

interface User {
  _id: string;
  estado: boolean;
  carrito: CarritoItem[],
  nombre: string;
  apellido: string;
  correo: string;
  avatar: string;
}

export interface AuthContextProviderProps {
  children: ReactNode;
}

export interface AuthContextData {
  token: string | undefined;
  user: User | undefined;
  goLogin: React.ReactNode;
  login: (correo: string, clave: string) => Promise<void>;
  logout: () => void;
  update: (props: PerfilEdit) => Promise<void>;
}



export interface AuthContextState {
  token: string | undefined;
  user: User | undefined;
}