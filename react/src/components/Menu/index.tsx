import { Link } from "react-router";
import { MenuItemProps } from "./types";
import Button from "../Button";
import useAuthContext from "@/hooks/AuthContext/hook";

export default function MenuItem(props: MenuItemProps) {
  const auth = useAuthContext();

  return (
    <div className="rounded-lg border grow shadow bg-white p-6 flex flex-col">
      <div className="h-56 w-full">
        <Link to={`/producto/${props._id}`}>
          <img
            loading="lazy"
            className="mx-auto h-full rounded object-contain"
            src={props.imagen}
            alt={props.nombre}
          />
        </Link>
      </div>
      <div className="pt-6 flex flex-col grow">
        {props.descuento > 0 && (
          <div className="mb-4 flex items-center justify-between gap-4">
            <span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-bold text-primary-800">
              {props.descuento}% descuento
            </span>
          </div>
        )}

        <Link
          to={`/producto/${props._id}`}
          className="text-lg font-bold leading-tight text-gray-900 hover:underline"
        >
          {props.nombre}
        </Link>

        <p className="line-clamp-2 grow mb-3 text-gray-800">{props.descripcion}</p>

        {props.descuento > 0 ? (
          <div className="flex items-center gap-5">
            <p className="text-md font-semibold text-gray-600 line-through">
              ${props.precio}
            </p>
            <p className="text-2xl font-extrabold leading-tight text-gray-900">
              ${props.precio - props.precio * (props.descuento / 100)}
            </p>
          </div>
        ) : (
          <p className="text-2xl font-extrabold leading-tight text-gray-900">
            ${props.precio}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between gap-4">
          {props.cantidad <= 0 ? (
            <button
              type="button"
              className="grayscale-[30%] rounded-lg bg-red-500 px-5 py-2.5 text-sm font-medium text-white cursor-not-allowed"
            >
              Agotado
            </button>
          ) : auth.token ? (
            <>
              <input
                type="number"
                id="add_carrito_producto_{{ $id }}"
                className="w-5/12 h-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5"
                defaultValue="1"
                min={1}
                max={props.cantidad}
              />

              <Button>
                <i className="fa-solid fa-cart-plus"></i>
                Añadir al carrito
              </Button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
