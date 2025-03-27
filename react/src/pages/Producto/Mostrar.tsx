import Template from "@/layout";
import CategoriaService from "@/services/Categorias";
import { CategoriaResponse } from "@/services/Categorias/types";
import ProductoService from "@/services/Productos";
import { ProductoResponse } from "@/services/Productos/types";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import useAuthContext from "@/hooks/AuthContext/hook";
import Button from "@/components/Button";
import CarritoService from "@/services/Carrito";

export default function MostrarProducto() {

  const auth = useAuthContext();
  const { id } = useParams();
  const [producto, setProducto] = useState({} as ProductoResponse);
  const [currentFoto, setCurrentFoto] = useState("");
  const [categorias, setCategorias] = useState({} as CategoriaResponse[]);
  const [loading, setLoading] = useState(true);
  const cantidadRef = useRef<HTMLInputElement>(null);

  const getCategoriaName = (categoriaDatoId: string) => {
    if (!Array.isArray(categorias)) return "";
    if (!producto.categorias) return "";

    for (const categoria of categorias) {
      if (!Array.isArray(categoria.datos)) continue;
      const dato = categoria.datos.find((dato) => dato._id === categoriaDatoId);
      if (!dato) continue;
      return dato.nombre;
    }

    return "";
  };

  const onHoverFoto = (foto: string) => {
    setCurrentFoto(foto);
  }

  const handleCarrito = () => {
    if (!cantidadRef?.current?.value) return;
    if (!auth.token) return alert("Debes iniciar sesión para agregar productos al carrito");
    CarritoService.agregar(auth.token, producto._id, parseInt(cantidadRef.current.value))
      .catch(e => {
        if (e instanceof Error) alert(e.message);
        else alert("Ocurrió un error al agregar el producto al carrito");
      });
  };

  useEffect(() => {
    if (!id) return;

    // Esperar a que se resuelvan las promesas para mostrar el contenido
    Promise.all([
      ProductoService.mostrar(id).then((producto) => {
        setProducto(producto);
        setCurrentFoto(producto.fotos[0] || "");
      }),
  
      CategoriaService.listar().then((categorias) => {
        setCategorias(categorias);
      })
    ]).then(() => setLoading(false));
  }, []);

  if (loading) return <Template title="Cargando...">Cargando...</Template>;

  return (
    <Template title="Ver producto">
      <section className="py-8 flex flex-col gap-8 lg:flex-row">
        <div className="flex flex-col gap-4 mx-auto md:w-[60%] lg:mx-0 lg:w-96">
          <img
            className="shadow border inline-block w-full aspect-[4/3] object-contain rounded"
            src={currentFoto}
          />

          <div className="flex gap-4 h-16 w-full overflow-x-auto">
            {producto.fotos.map((foto) => (
              <img
                key={foto}
                onMouseOver={() => onHoverFoto(foto)}
                className="h-full w-auto rounded border cursor-pointer hover:border-primary-500 shadow" 
                src={foto} 
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 grow">
          <p className="font-bold text-3xl">{producto.nombre}</p>

          {producto.descuento > 0 && (
            <div className="mb-2 flex items-center justify-between gap-4">
              <span className="select-none rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-900">
                {producto.descuento}% descuento{" "}
              </span>
            </div>
          )}

          <p className="font-extrabold text-primary-900 text-2xl">
            {producto.descuento > 0 && (
              <span className="line-through text-gray-500 mr-4">
                ${producto.precio} MXN
              </span>
            )}
            <span>
              ${producto.precio - producto.precio * (producto.descuento / 100)}{" "}
              MXN
            </span>
          </p>

          {auth.token && (
            <section className="mt-4 flex items-center justify-between gap-4">
              <input
                type="number"
                className="w-5/12 h-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5"
                defaultValue={1}
                ref={cantidadRef}
                min={1}
                max={producto.existencias}
              />
              <Button
                onClick={handleCarrito}
              >
                <i className="fa-solid fa-cart-plus"></i>
                Añadir al carrito
              </Button>
            </section>
          )}

          <h2 className="font-bold text-base mt-4 pb-1 border-b-2 border-primary-700 max-w-prose">
            Categorías
          </h2>
          <section className="flex gap-2 flex-wrap">
            {producto.categorias.map((categoria_id) => (
              <span
                key={categoria_id}
                className="select-none py-1 px-2 text-sm rounded-lg bg-primary-200 font-semibold text-primary-900"
              >
                {getCategoriaName(categoria_id)}
              </span>
            ))}
          </section>

          <p className="mt-5">{producto.descripcion}</p>
        </div>
      </section>
    </Template>
  );
}
