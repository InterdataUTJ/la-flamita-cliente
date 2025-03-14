import { Link } from "react-router";
import { IconPencil } from '@tabler/icons-react';
import useAuthContext from "@/hooks/AuthContext/hook";
import Template from "@/layout";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function PerfilPage() {
  const auth = useAuthContext();
  if (!auth.token) return auth.goLogin;
  
  return (
    <Template title="Panel">
      <h2 className="text-center font-extrabold text-3xl mb-8">Mi perfil</h2>
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center p-5 bg-quinary-300 rounded-lg shadow">
        <img className="w-20 h-20 rounded-full object-cover select-none bg-quinary-100" src={auth.user?.avatar} alt="avatar" />
        <div className="flex flex-col gap-2">
          <p className="font-extrabold text-quinary-900">{ auth.user?.nombre } { auth.user?.apellido }</p>
          <p className="font-bold text-gray-600">Cliente</p>
          <p className="font-semibold text-gray-600">{ auth.user?.correo }</p>
        </div>
      </div>

    <div className="mt-8">
      <Input 
        label="Nombre" 
        name="nombre" 
        placeholder="Nombre" 
        value={auth.user?.nombre}
        required
        disabled
      />

      <Input 
        label="Apellido" 
        name="apellido" 
        placeholder="Apellido" 
        value={auth.user?.apellido}
        required
        disabled
      />

      <Input 
        label="Correo" 
        name="correo" 
        placeholder="Correo" 
        value={auth.user?.correo}
        required
        disabled
      />

      <Button as={Link} to="/perfil/editar">
        <IconPencil />
        Editar perfil
      </Button>
    </div>

    </Template>
  );
}