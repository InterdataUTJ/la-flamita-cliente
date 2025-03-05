import { createContext, useContext, useState } from "react";
import { AuthContextProviderProps, AuthContextData } from "./types";

const AuthContext = createContext({} as AuthContextData);
export const useAuthContext = () => useContext(AuthContext);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [stateToken, setStateToken] = useState<string | undefined>(undefined);
  const [stateIsLoggedIn, _stateIsLoggedIn] = useState<boolean>(false);

  return (
    <AuthContext.Provider value={{
      isLoggedIn: stateIsLoggedIn,
      token: stateToken, 
      setToken: (token: string) => setStateToken(token) 
    }}>
      {children}
    </AuthContext.Provider>
  );
}