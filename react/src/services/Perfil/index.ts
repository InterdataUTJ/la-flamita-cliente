import Http from "../base";
import { LoginResponse, PerfilResponse, PerfilEdit, RegisterRequest } from "./types";

export default class PerfilService {
  static login(correo: string, clave: string): Promise<LoginResponse> {
    return Http.post<LoginResponse>("/login", { correo, clave }) as Promise<LoginResponse>;
  }
  
  static googleLogin(params: string): Promise<LoginResponse> {
    return Http.post<LoginResponse>(`/google/callback${params}`, {}) as Promise<LoginResponse>;
  }

  static singup(account: RegisterRequest): Promise<LoginResponse> {
    return Http.post<LoginResponse>("/singup", account) as Promise<LoginResponse>;
  }

  static logout(jwt: string) {
    return Http.post<undefined>("/logout", {}, { jwt });;
  }

  static perfil(jwt: string) {
    return Http.get<PerfilResponse>("/perfil", { jwt } ) as Promise<PerfilResponse>;
  }

  static editar(jwt: string, data: PerfilEdit) {
    return Http.put<undefined>("/perfil/editar", data, { jwt, asForm: true } );
  }
}