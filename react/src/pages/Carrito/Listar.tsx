import Button from '@/components/Button';
import Template from '@/layout';
import { Carrito } from '@/services/Carrito/types';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import CarritoService from '@/services/Carrito';
import useAuthContext from "@/hooks/AuthContext/hook";


export default function CarritoPage() {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState<Carrito>({} as Carrito);

  // Cart operations
  const editarCarrito = (id: string, incrementar: boolean = true) => {
    if (!auth.token) return alert('Debes iniciar sesión para editar el carrito');
    const token = auth.token as string;

    setCarrito(prevCarrito => {
      let nuevaCantidad = 1;
      const nuevoCarrito = prevCarrito.carrito.map(item => {
        if (item.producto_id._id === id) {
          nuevaCantidad = incrementar ? item.cantidad + 1 : (item.cantidad > 1 ? item.cantidad - 1 : 1);
          return {
            ...item,
            cantidad: nuevaCantidad
          };
        }
        return item
      });

      CarritoService.editar(token, id, nuevaCantidad)
        .catch(e => {
          if (e instanceof Error) alert(e.message);
          else alert('Ocurrió un error al eliminar el producto del carrito');
        });

      return ({
        ...prevCarrito,
        carrito: nuevoCarrito
      });
    });
  };

  const eliminarDelCarrito = (id: string) => {
    if (!auth.token) return alert('Debes iniciar sesión para eliminar productos del carrito');

    setCarrito(prevCarrito => ({
      ...prevCarrito,
      carrito: prevCarrito.carrito.filter(item => item.producto_id._id !== id)
    }));
    
    // Here you would also make an API call to update the server-side cart
    CarritoService.eliminar(auth.token, id)
      .catch(e => {
        if (e instanceof Error) alert(e.message);
        else alert('Ocurrió un error al eliminar el producto del carrito');
      });
  };


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

  return (
    <Template title='Carrito'>
      <h2 className="text-center font-extrabold text-3xl mb-4">Carrito</h2>

      <section className="flex flex-col gap-4 lg:flex-row">
        {!carrito?.carrito?.length ? (
          <p className="text-center grow">No hay productos en el carrito</p>
        ) : (
          <div className="flex flex-col gap-4 grow">
            {carrito?.carrito?.map((item) => (
              <section 
                id={`producto_carrito_container_${item.producto_id._id}`} 
                key={item.producto_id._id}
                className="rounded shadow w-full p-4 flex flex-col gap-4 bg-white"
              >
                <div className="flex gap-4">
                  <img className="w-20 rounded object-contain" alt="foto" src={item.producto_id.fotos?.[0]} />
                  <div>
                    <p className="line-clamp-1 font-bold text-xl">{item.producto_id.nombre}</p>
                    <p className="line-clamp-2">{item.producto_id.descripcion}</p>
                    <p className="line-clamp-1 font-bold mt-1">
                      {item.descuento > 0 && (
                        <span className="line-through text-gray-500">${item.precio} MXN</span>
                      )}
                      <span>
                        ${(item.precio - (item.precio * item.descuento / 100)).toFixed(2)} MXN
                      </span>
                    </p>
                  </div>
                </div>
                <div className="grow flex gap-4">
                  <div className="flex gap-1">
                    <button 
                      onClick={() => editarCarrito(item.producto_id._id, false)} 
                      type="button" 
                      className="p-3 text-white font-extrabold grow max-w-10 block rounded bg-primary-500 hover:bg-primary-400 active:bg-primary-600"
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      id={`producto_carrito_${item.producto_id._id}`} 
                      className="grow max-w-30 inline-block w-3/12 rounded" 
                      disabled 
                      value={item.cantidad} 
                    />
                    <button 
                      onClick={() => editarCarrito(item.producto_id._id)} 
                      type="button" 
                      className="p-3 text-white font-extrabold grow max-w-10 block rounded bg-primary-500 hover:bg-primary-400 active:bg-primary-600"
                    >
                      +
                    </button>
                  </div>

                  <button 
                    type="button" 
                    onClick={() => eliminarDelCarrito(item.producto_id._id)} 
                    className="text-white font-bold max-w-28 bg-red-500 rounded flex items-center justify-center gap-2 p-3 hover:bg-red-400 active:bg-red-600"
                  >
                    <i className="fa-solid fa-trash-can"></i>
                    Eliminar
                  </button>
                </div>
              </section>
            ))}
          </div>
        )}

        <div className="space-y-6 min-w-80">
          <div className="space-y-4 rounded border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            <p className="text-xl font-semibold text-gray-900 dark:text-white">Resumen de compra</p>

            <div className="space-y-4">
              <div className="space-y-2">
                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-base font-normal text-gray-500">Subtotal</dt>
                  <dd id="carrito_resumen_subtotal" className="text-base font-medium text-gray-900">
                    ${carrito?.subtotal || 0} MXN
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-base font-normal text-gray-500">Descuentos</dt>
                  <dd id="carrito_resumen_descuento" className="text-base font-medium text-green-600">
                    -${carrito?.descuento || 0} MXN
                  </dd>
                </dl>
              </div>

              <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                <dt className="text-base font-bold text-gray-900">Total</dt>
                <dd id="carrito_resumen_total" className="text-base font-bold text-gray-900">
                  ${carrito?.total || 0} MXN
                </dd>
              </dl>
            </div>

            <Button
              as={Link}
              to="/venta/confirmar"
            >
              Finalizar compra
            </Button>

            <div className="flex items-center justify-center gap-2">
              <span className="text-sm font-normal text-gray-500"> o </span>
              <Link to="/menu" 
                className="inline-flex items-center gap-2 text-sm font-medium text-quinary-700 underline hover:no-underline">
                Continuar comprando
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Template>
  );
};