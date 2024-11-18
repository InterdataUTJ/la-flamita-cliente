<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use App\Models\Producto;

class ProductoController extends Controller {

  public function categorias($categoria) {
    $categorias = Categoria::where("nombre", "=", $categoria)->first();
    if (!$categorias) {
      return response()->json([
        "mensaje" => "No se encontro la categoria.",
      ], 404);
    }

    $datos = $categorias->categoria_datos->pluck("nombre", "id");
    return response()->json($datos, 200)->header('Cache-Control', 'public, max-age=3600');
  }

  public function productos($categoriaDatoId) {
    // Productos y una foto que tengan la categoriaDatoId
    $productos = Producto::whereHas("categoria_datos", function ($query) use ($categoriaDatoId) {
      $query->where("categoria_dato_id", $categoriaDatoId);
    })->get();

    if ($productos->isEmpty()) {
      return response()->json([
        "mensaje" => "No se encontraron productos.",
      ], 404);
    }

    $resultado = [];
    foreach ($productos as $producto) {
      $resultado[$producto->id] = $producto->only(["id", "nombre", "descripcion", "precio"]);
      $resultado[$producto->id]["foto"] = $producto->producto_fotos->first()->url;
    }

    return response()->json($resultado, 200)->header('Cache-Control', 'public, max-age=3600');
  }
  
}
