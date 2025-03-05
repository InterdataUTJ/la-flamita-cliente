import Template from "@/layout";
import Input from "@/components/Input";

import { User } from "@/components/Icon";

export default function LoginPage() {
  return (
    <Template title="Iniciar sesión">
      <h1 className="pt-5 mb-5 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
        Iniciar sesión
      </h1>

      <Input label="Correo electrónico" name="correo" type="email" />
      <Input label="Contraseña" name="password" />

      <button
        type="submit"
        className="w-full font-bold rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center gap-2 hover:bg-gray-100 active:bg-gray-200 text-white bg-primary-600 hover:bg-primary-500 active:bg-primary-700"
      >
        <User />
        Iniciar sesión
      </button>
    </Template>
  );
}
