import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import useAuthContext from "@/hooks/AuthContext/hook";
import Template from "@/layout";
import Input from "@/components/Input";
import { User } from "@/components/Icon";
import Button from "@/components/Button";


export default function LoginPage() {
  const navigate = useNavigate();
  const auth = useAuthContext();
  const correoRef = useRef<HTMLInputElement>(null);
  const claveRef = useRef<HTMLInputElement>(null);
  const [loading, setloading] = useState(false);

  if (!!auth.token) return auth.goAlreadyLogged;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (!correoRef.current || !claveRef.current) return;
    setloading(true);

    try {
      await auth.login(correoRef.current.value, claveRef.current.value);
      navigate("/", { replace: true });
    } catch (e) {
      if (e instanceof Error) alert(e.message);
      else alert('Ocurrió un error inesperado');
    }

    setloading(false);
  };

  return (
    <Template title="Iniciar sesión" className="max-w-screen-sm lg:max-w-screen-sm">

      <h1 className="pt-5 mb-5 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
        Iniciar sesión
      </h1>

      <form onSubmit={handleLogin}>
        <Input
          label="Correo electrónico"
          placeholder="example@laflamita.live"
          name="correo"
          type="email"
          ref={correoRef}
          required
        />

        <Input 
          type="password"
          placeholder="********"
          label="Contraseña" 
          name="password" 
          ref={claveRef}
          minLength={8}
          maxLength={50}
          required
        />

        <Button
          loading={loading}
          type="submit"
        >
          <User />
          Iniciar sesión
        </Button>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-5">
            ¿No tienes una cuenta? <Link to="/register" className="font-bold text-primary-600 hover:underline">Crea una</Link>
        </p>
      </form>
      <hr className="h-px my-8 bg-gray-300 border-0" />

      <div className="flex flex-col gap-3">
          <a href={`${import.meta.env.VITE_API_BASE_URL}/google/redirect`} className="w-full text-black font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center gap-2 border border-black hover:bg-gray-100 active:bg-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
              </svg>
              Iniciar con Google
          </a>
      </div>
    </Template>
  );
}
