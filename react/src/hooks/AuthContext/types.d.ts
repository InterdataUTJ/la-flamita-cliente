import { RegisterRequest } from "@/services/Perfil/types";

interface User {
  _id: string;
  nombre: string;
  apellido: string;
  correo: string;
  avatar: string;
  estado: boolean;
}

export interface AuthContextProviderProps {
  children: ReactNode;
}

export interface AuthContextData {
  token: string | undefined;
  user: User | undefined;
  goLogin: React.ReactNode;
  goNotAllowed: React.ReactNode;
  login: (correo: string, clave: string) => Promise<void>;
  register: (account: RegisterRequest) => Promise<void>;
  logout: () => void;
  update: (props: PerfilEdit) => Promise<void>;
}



export interface AuthContextState {
  token: string | undefined;
  user: undefined | User;
}