<?php

namespace App\Http\Controllers;

use App\Carrito\Carrito;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Categoria;
use App\Models\Producto;

class ProductoController extends Controller {
    public function index(Request $request) {
        $productos = Producto::where("estado", true)->get();

        $categorias = Categoria::all();

        

        //dd($request->c);
        //return view('menu')->with('productos', $productos)->with('categorias', $categorias);

        $productosFiltrados = [];

        if (!$request->has("c")) {  
          $productosFiltrados = $productos;
        } else {
          
          // Producto se vincula con categoria_valor y categoria_valor con categoria. Necesito
          // Validar si el producto tiene algun categoria_valor de los filtros seleccionados para aplicarlo
          // Si dicha categoria no afecta al producto entonces se ignora y se muestra el producto
          
          foreach ($productos as $producto) {
            $categoriasFaltantes = 0;

            foreach ($request->c as $categoria => $valores) {
              $datos = $producto->categoria_datos()->where("categoria_id", $categoria)->first();
              if ($datos != null) $categoriasFaltantes++;
              else continue;

              if (in_array($datos->id, array_keys($valores))) {
                $categoriasFaltantes--;
              }
            }

            if ($categoriasFaltantes == 0) {
              $productosFiltrados[] = $producto;
            }
          }
          
        }

        // Ordenar productos por precio
        if ($request->has("o") && in_array($request->o, ["pA", "pD", "nA", "nD"])) {
          $productosFiltrados = $this->bubbleSort($productosFiltrados, $request->o);
        }

        $carritoCantidad = Carrito::cantidad();

        return view('menu')->with('productos', $productosFiltrados)->with('categorias', $categorias)->with('carritoCantidad', $carritoCantidad);
    }

    private function comparar($a, $b, $metodo) {
      $ascendente = str_ends_with($metodo, "A");

      if (str_starts_with($metodo, "n")) {
        return ($ascendente && strcmp($a->nombre, $b->nombre) > 0) || 
          (!$ascendente && strcmp($a->nombre, $b->nombre) < 0);

      } else if (str_starts_with($metodo, "p")) {
        return ($ascendente && $a->precio > $b->precio) || 
            (!$ascendente && $a->precio < $b->precio);
      }
    }

    private function bubbleSort($productos, $metodo) {
      $nProductos = count($productos);
      
      // Realizar el algoritmo de Bubble Sort
      for ($producto = 0; $producto < $nProductos; $producto++) {
          for ($j = 0; $j < $nProductos - 1 - $producto; $j++) {
              // Comparar precios para el orden ascendente o descendente
              if ($this->comparar($productos[$j], $productos[$j + 1], $metodo)) {
                  // Intercambiar los productos
                  $temp = $productos[$j];
                  $productos[$j] = $productos[$j + 1];
                  $productos[$j + 1] = $temp;
              }
          }
      }
      return $productos;
    }


    public function detalle($id) {
      $producto = Producto::where("estado", true)->find($id);
      return view('producto.detalle')->with('producto', $producto);
    }
}