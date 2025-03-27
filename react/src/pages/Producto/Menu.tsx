import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Dropdown, Modal } from "flowbite-react";
import {
  IconFilterFilled,
  IconChevronCompactDown,
  IconArrowsDownUp,
  IconSortDescendingLetters,
} from "@tabler/icons-react";
import Template from "@/layout";
import ProductoService from "@/services/Productos";
import CategoriaService from "@/services/Categorias";
import { ProductoResponse } from "@/services/Productos/types";
import { CategoriaDato, CategoriaResponse } from "@/services/Categorias/types";
import Button from "@/components/Button";
import MenuItem from "@/components/Menu";



export default function MenuPage() {
  const [search, setSearch] = useSearchParams();
  const [categorias, setCategorias] = useState<CategoriaResponse[]>([]);
  const [filtrar, setFiltrar] = useState<string[]>(JSON.parse(search.get("f") || "[]"));
  const [ordenar, setOrdenar] = useState(search.get("o") || "nA");
  const [productos, setProductos] = useState<ProductoResponse[]>([]);
  const [finalProductos, setFinalProductos] = useState<ProductoResponse[]>([]);
  const [showFiltros, setShowFiltros] = useState(false);

  const handleChangeFilter = (_id: string) => {
    const newFiltrar = (filtrar.includes(_id)) 
      ? filtrar.filter((id) => id !== _id)
      : [...filtrar, _id];
    
    setFiltrar(newFiltrar);
  };

  const handleModify = () => {
    let ordered: ProductoResponse[] = productos.filter((producto) => {
      for (const categoria of producto.categorias) {
        if (filtrar.includes(categoria)) return false;
      }

      return true;
    });

    if (ordenar === "nA") {
      // Ordenar a travez de producto.nombre ascendente
      ordered.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (ordenar === "nD") {
      // Ordenar a travez de producto.nombre descendente
      ordered.sort((a, b) => b.nombre.localeCompare(a.nombre));
    } else if (ordenar === "pA") {
      // Ordenar a travez de producto.precio ascendente
      ordered.sort(
        (a, b) =>
          a.precio -
          a.precio * (a.descuento / 100) -
          (b.precio - b.precio * (b.descuento / 100))
      );
    } else if (ordenar === "pD") {
      // Ordenar a travez de producto.precio descendente
      ordered.sort(
        (a, b) =>
          b.precio -
          b.precio * (b.descuento / 100) -
          (a.precio - a.precio * (a.descuento / 100))
      );
    }

    setSearch({ f: JSON.stringify(filtrar), o: ordenar });
    setFinalProductos(ordered);
  };


  useEffect(handleModify, [productos, ordenar, filtrar]);
  useEffect(() => {
    CategoriaService.listar().then((categorias) => {
      setCategorias(categorias);
    });

    ProductoService.listar().then((productos) => {
      setProductos(productos);
    });
  }, []);



  return (
    <Template title="Inicio">
      <h2 className="text-center font-extrabold text-3xl mb-2">Menú</h2>

      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mb-4 items-end gap-4 space-y-4 sm:flex sm:space-y-0 md:mb-8">
          <button
            onClick={() => setShowFiltros(true)}
            type="button"
            className="flex gap-2 w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-800 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 sm:w-auto"
          >
            <IconFilterFilled size={15} />
            Filtros
            <IconChevronCompactDown />
          </button>

          <Dropdown
            label={"Ordenar"}
            dismissOnClick
            renderTrigger={() => (
              <span className="flex gap-2 w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-800 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 sm:w-auto cursor-pointer select-none">
                <IconSortDescendingLetters size={20} />
                Ordenar
                <IconChevronCompactDown />
              </span>
            )}
            theme={{
              floating: {
                item: {
                  base: "flex w-full gap-2 cursor-pointer items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-800",
                },
              },
            }}
          >
            <Dropdown.Item
              onClick={() => setOrdenar(ordenar === "nA" ? "nD" : "nA")}
            >
              <IconArrowsDownUp size={15} />
              Nombre
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setOrdenar(ordenar === "pA" ? "pD" : "pA")}
            >
              <IconArrowsDownUp size={15} />
              Precio
            </Dropdown.Item>
          </Dropdown>
        </div>

        <Modal
          show={showFiltros}
          onClose={() => setShowFiltros(false)}
          theme={{ header: { title: "text-xl font-bold" } }}
          dismissible
        >
          <Modal.Header>Filtros</Modal.Header>
          <Modal.Body>
            {categorias.map((categoria) => (
              <div key={categoria._id}>
                <h2 className="font-semibold text-lg mb-2 pb-1 border-b-2 border-primary-700 max-w-prose">
                  {categoria.nombre}
                </h2>
                <div className="mb-4">
                  {(categoria.datos as CategoriaDato[]).map((dato) => (
                    <div className="flex items-center mb-1">
                      <input
                        name="categorias[]"
                        id={`cat-${categoria.nombre}-${dato._id}`}
                        value={dato._id}
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-primary-500 focus:border-primary-400 accent-primary-500 text-primary-500"
                        checked={!filtrar.includes(dato._id)}
                        onClick={() => handleChangeFilter(dato._id)}
                      />
                      <label
                        htmlFor={`cat-${categoria.nombre}-${dato._id}`}
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        {dato.nombre}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <Button onClick={() => setFiltrar([])}>Reiniciar filtros</Button>
          </Modal.Body>
        </Modal>

        <div className="mb-4 grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {finalProductos.map((producto) => (
            <MenuItem
              key={producto._id}
              _id={producto._id}
              nombre={producto.nombre}
              descripcion={producto.descripcion}
              precio={producto.precio}
              descuento={producto.descuento}
              cantidad={producto.existencias}
              imagen={producto.fotos[0]}
            />
          ))}
        </div>
      </div>
    </Template>
  );
}
