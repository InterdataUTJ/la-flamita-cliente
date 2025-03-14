import { useState } from 'react';
import { IconDeviceFloppy } from '@tabler/icons-react';
import useAuthContext from "@/hooks/AuthContext/hook";
import Template from "@/layout";
import Input from "@/components/Input";
import File from "@/components/Input/File";
import Button from "@/components/Button";
import { PerfilEdit } from '@/services/Perfil/types';
import { useNavigate } from 'react-router';

export default function PerfilEditarPage() {

  const navigate = useNavigate();
  const auth = useAuthContext();
  const [loading, setLoading] = useState(false);
  if (!auth.token) return auth.goLogin;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const formData = Object.fromEntries(new FormData(e.currentTarget));
      const toSend: PerfilEdit = {} as PerfilEdit;

      if (formData.nombre && formData.nombre !== auth.user?.nombre) toSend.nombre = formData.nombre as string;
      if (formData.apellido && formData.apellido !== auth.user?.apellido) toSend.apellido = formData.apellido as string;
      if (formData.correo && formData.correo !== auth.user?.correo) toSend.correo = formData.correo as string;
      if (formData.clave && formData.clave2 && formData.clave === formData.clave2) toSend.clave = formData.clave as string;
      if (formData.avatar && (formData.avatar as File).name !== "" ) toSend.avatar = formData.avatar as File;
      
      await auth.update(toSend);
      navigate("/perfil", { replace: true });
    } catch (e: Error | unknown) {
      console.error(e);
    }

    setLoading(false);
  }
  
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

    <form className="mt-8" onSubmit={handleSubmit}>
      <Input 
        label="Nombre" 
        name="nombre" 
        placeholder="Nombre" 
        defaultValue={auth.user?.nombre}
        required
        minLength={3}
        maxLength={50}
      />

      <Input 
        label="Apellido" 
        name="apellido" 
        placeholder="Apellido" 
        defaultValue={auth.user?.apellido}
        required
        minLength={3}
        maxLength={50}
      />

      <Input
        type="email"
        label="Correo" 
        name="correo" 
        placeholder="Correo" 
        defaultValue={auth.user?.correo}
        required
      />
  
      <File
        name="avatar"
        label="Avatar"
        description="Selecciona tu nuevo avatar"
      />

      <Input 
        type="password"
        label="Nueva contraseña" 
        name="clave" 
        placeholder="Contraseña"
        minLength={8}
        maxLength={50}
      />

      <Input 
        type="password"
        label="Repetir contraseña" 
        name="clave2" 
        placeholder="Contraseña"
        minLength={8}
        maxLength={50}
      />

      <Button type="submit" loading={loading}>
        <IconDeviceFloppy />
        Guardar cambios
      </Button>
    </form>

    </Template>
  );
}