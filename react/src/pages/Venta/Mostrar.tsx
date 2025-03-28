import { useEffect, useState } from "react";
import useAuthContext from "@/hooks/AuthContext/hook";
import { useNavigate, useParams } from "react-router";
import Template from "@/layout";
import VentaService from "@/services/Ventas";
import { VentaResponse } from "@/services/Ventas/types";
import timestamp from "@/utils/timestamp";
import QRCode from "react-qr-code";

export default function VentaMostrar() {
  //El auth para ver que este autenticado el usuario
  const navigate = useNavigate();
  const auth = useAuthContext();
  const { id } = useParams();

  //Variable de estado para la venta mediante su id
  const [Venta, setVenta] = useState<VentaResponse>({} as VentaResponse);


  //Aqui hacemos una peticion a la APi para listar la venta actual
  useEffect(() => {
    if (!auth.token || !id) return;
    //Aqui se puede hacer una peticion a la API para obtener las venta correspondiente al ID
    VentaService.mostrar(auth.token, id)
      .then((venta) => setVenta(venta))
      .catch((e) => {
        if (e instanceof Error) alert(e.message);
        else alert("Ocurrió un error al listar la venta");
        navigate("/venta/listar", { replace: true });
      });
  }, [auth.token, id]);


  if (!auth.token) return auth.goLogin;

  //Listamos los datos de la venta
  return (
    <Template title="Mostrar venta">
      <h2 className="text-center font-extrabold text-xl md:text-2xl lg:text-3xl mb-8 mt-4">Venta #{Venta._id}</h2>

      {Venta.estado === "PAGADO" && Venta.token && (
        <div className="p-4 border rounded shadow bg-white my-5">
          <h3 className="font-bold text-lg pb-1 mb-2 border-b-2 border-primary-700">
            ¿Cómo recojo mi pedido?
          </h3>
          <ol className="list-decimal ml-8 my-2 marker:font-bold">
            <li>
              Acude a la sucursal de{" "}
              <span className="font-bold text-primary-700">La Flamita</span>.
            </li>
            <li>Presenta el siguiente código en la caja.</li>
          </ol>
          <p className="italic my-2">
            <b>Importante:</b> No compartas el código con nadie, solo muestralo
            al llegar a la caja.
          </p>

          <div className="p-5 flex items-center justify-center">
            <QRCode
              value={Venta.token}
              size={240}
              bgColor="white"
              fgColor="#e6480f"
            />
          </div>
        </div>
      )}

      <div className="space-y-4 p-4 border rounded shadow bg-white my-5">
        <h3 className="font-bold text-lg pb-1 border-b-2 border-primary-700">
          Resumen
        </h3>
        <div className="space-y-2">
          {Venta.empleado_id && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500">
                ID del Empleado
              </dt>
              <dd className="text-base font-medium text-gray-900">
                {Venta.empleado_id}
              </dd>
            </dl>
          )}

          {Venta.cliente_id && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500">
                ID del Cliente
              </dt>
              <dd className="text-base font-medium text-gray-900">
                {Venta.cliente_id}
              </dd>
            </dl>
          )}

          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500">
              Fecha de la venta
            </dt>
            <dd className="text-base font-medium text-gray-900">
              {timestamp.format(Venta.fecha_venta)}
            </dd>
          </dl>

          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500">
              Fecha de pago
            </dt>
            <dd className="text-base font-medium text-gray-900">
              {timestamp.format(Venta.fecha_pago)}
            </dd>
          </dl>

          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500">
              Método de pago
            </dt>
            <dd className="text-base font-medium text-gray-900">
              {Venta.metodo_pago}
            </dd>
          </dl>

          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500">Estado</dt>
            <dd className="text-base font-medium text-gray-900">
              {Venta.estado}
            </dd>
          </dl>
        </div>
      </div>

      <div className="space-y-4 p-4 border rounded shadow bg-white my-5">
        <h3 className="font-bold text-lg pb-1 border-b-2 border-primary-700">
          Productos asignados a la venta
        </h3>
        <div className="space-y-2">
          {Venta.productos?.map((producto) => (
            <div key={producto._id} className="p-2 border-b border-gray-200">
              <div className="flex flex-row items-center gap-2">
                <p className="text-base font-normal text-gray-500">Nombre:</p>
                <p className="text-base font-medium text-gray-900">
                  {producto.producto_id.nombre}
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <p className="text-base font-normal text-gray-500">
                  Id del producto:
                </p>
                <p className="text-base font-medium text-gray-900">
                  {producto.producto_id._id}
                </p>
              </div>
              <img
                src={producto.producto_id.fotos[0]}
                alt="Imagen del producto"
                className="h-12 rounded my-2"
              />
              <div className="flex flex-row items-center gap-2">
                <p className="text-base font-normal text-gray-500">Cantidad:</p>
                <p className="text-base font-medium text-gray-900">
                  {producto.cantidad}
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <p className="text-base font-normal text-gray-500">Precio:</p>
                <p className="text-base font-medium text-gray-900">
                  ${producto.precio}
                </p>
              </div>
              {producto.descuento !== 0 && (
                <div className="flex flex-row items-center gap-2">
                  <p className="text-base font-normal text-gray-500">
                    Descuento:
                  </p>
                  <p className="text-base font-medium text-green-600">
                    - {producto.descuento}%
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 p-4 border rounded shadow bg-white my-5">
        <h3 className="font-bold text-lg pb-1 border-b-2 border-primary-700">
          Total de la venta
        </h3>
        <div className="space-y-2">
          {(() => {
            const total =
              Venta.productos?.reduce((total, producto) => {
                return (
                  total +
                  (producto.precio -
                    producto.precio * (producto.descuento / 100)) *
                    producto.cantidad
                );
              }, 0) || 0;

            const subtotal =
              Venta.productos?.reduce((subtotal, producto) => {
                return subtotal + producto.precio * producto.cantidad;
              }, 0) || 0;

            const descuento =
              Venta.productos?.reduce((descuento, producto) => {
                return (
                  descuento +
                  producto.precio *
                    (producto.descuento / 100) *
                    producto.cantidad
                );
              }, 0) || 0;

            return (
              <>
                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-base font-semibold text-gray-500">
                    Subtotal:
                  </dt>
                  <dd className="text-base font-semibold text-gray-600">
                    ${subtotal.toFixed(2)}
                  </dd>
                </dl>
                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-base font-semibold text-gray-500">
                    Descuento:
                  </dt>
                  <dd className="text-base font-semibold text-green-700">
                    -${descuento.toFixed(2)}
                  </dd>
                </dl>
                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-lg font-bold text-gray-900">Total:</dt>
                  <dd className="text-lg font-bold text-gray-900">
                    ${total.toFixed(2)} MXN
                  </dd>
                </dl>
              </>
            );
          })()}
        </div>
      </div>
    </Template>
  );
}
