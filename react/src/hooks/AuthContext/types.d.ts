export interface AuthContextProviderProps {
  children: ReactNode;
}

export interface AuthContextData {
  isLoggedIn: boolean;
  token: string | undefined;
  setToken: (token: string) => void;
}