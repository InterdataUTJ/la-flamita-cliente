import Template from '@/layout';
import { Carrito } from '@/services/Carrito/types';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import CarritoService from '@/services/Carrito';
import useAuthContext from "@/hooks/AuthContext/hook";
import Button from '@/components/Button';
import { IconBrandPaypalFilled } from '@tabler/icons-react';
import VentaService from '@/services/Ventas';


export default function VentaConfirmar() {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState<Carrito>({} as Carrito);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!auth.token) return;
    CarritoService.listar(auth.token)
      .then(carrito => setCarrito(carrito))
      .catch(e => {
        if (e instanceof Error) alert(e.message);
        else alert('Ocurrió un error al cargar el carrito');
        navigate('/menu', { replace: true });
      });
  }, []);

  const handlePay = async () => {
    if (!auth.token) return;
    setLoading(true);
    await VentaService.crear(auth.token)
      .then(data => {
        if (!data.paypalLink) throw new Error('No se pudo obtener el link de pago');
        window.location.href = data.paypalLink;
      })
      .catch(e => {
        if (e instanceof Error) alert(e.message);
        else alert('Ocurrió un error al realizar la venta');
        navigate('/carrito', { replace: true });
      });
    
    setLoading(false);
  };

  if (!auth.token) return auth.goLogin;

  return (
    <Template title='Confirmar venta'>
      <h2 className="font-bold text-2xl mb-3">Confirmar venta</h2>
      <h3>Estás a punto de realizar la compra de: </h3>

      <div className="flex flex-col gap-3 my-5">
        {carrito?.carrito?.map(item => (
          <div className="flex gap-2 p-3 bg-white rounded shadow items-center">
            <img src={item.producto_id.fotos[0]} alt="imagen" className="h-12 rounded" />
            <span className="text-lg font-bold px-3">{item.producto_id.nombre}</span>
            <span className="text-lg font-semibold">
              {item.descuento > 0 && (
                <span className="line-through text-gray-500">${ item.precio } MXN</span>
              )}
              ${ item.precio - (item.precio * item.descuento / 100) } MXN
            </span>
            <span className="text-lg font-light">x{item.cantidad}</span>
          </div>  
        ))}
      </div>

      <hr className="my-6" />

      <p className="text-xl mb-3">Pagarás un total de <b>${ carrito.total } MXN</b></p>
      {carrito.descuento > 0 && (
        <p className="text-lg mb-3">Se aplicó un descuento total de <b>${ carrito.descuento } MXN</b></p>
      )}

      <hr className="my-6" />
      button
      <p className="text-xl font-semibold">¿Deseas continuar con el pago?</p>
      
      <div className="flex gap-3 w-full my-5">
        <Button
          as={Link}
          to="/carrito"
          color='secondary'  
        >
          Volver
        </Button>

        <Button
          onClick={handlePay}
          loading={loading}
        >
          <IconBrandPaypalFilled size={20} />
          Realizar pago
        </Button>
        
      </div>
    </Template>
  );
};