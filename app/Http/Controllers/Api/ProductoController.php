<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Categoria;

class ProductoController extends Controller {

  public function categorias($categoria) {
    $categorias = Categoria::where("nombre", "=", $categoria)->first();
    if (!$categorias) {
      return response()->json([
        "mensaje" => "No se encontro la categoria.",
      ], 404);
    }

    return $categorias->categoria_datos->pluck("nombre", "id");
  }
  
}
