<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Carrito\Carrito;
use Illuminate\Http\Request;

class CarritoController extends Controller {

    public function items() {
        $items = Carrito::getItemsArray();

        $itemsResult = [];
        foreach ($items as $item) {
            $ietmArray = [];
            $ietmArray = $item->only(["id", "cantidad", "precio", "descuento"]);
            $ietmArray["producto"] = $item->producto->only(["id", "nombre", "descripcion"]);
            $ietmArray["producto"]["foto"] = $item->producto->producto_fotos->first()->url;
            $itemsResult[] = $ietmArray;
        }

        return response()->json(["items" => $itemsResult, "resumen" => Carrito::getResumen()]);
    }

    public function añadir(Request $request) {
        $request->validate([
            'id' => 'required|integer',
        ]);

        $estado = Carrito::añadir([
            'id' => $request->id,
            'cantidad' => 1,
        ]);

        if ($estado === false) {
            return response()->json([
                'estado' => 'Error al añadir al carrito',
            ], 400);
            
        }

        return response()->json(null, 204);
    }


    public function eliminar(Request $request) {
        $request->validate([
            'id' => 'required|integer'
        ]);

        $estado = Carrito::quitar([
            'id' => $request->id
        ]);

        if ($estado === false) {
            return response()->json([
                'estado' => 'Error al añadir al carrito',
            ], 400);
            
        }
        
        $items = Carrito::getItemsArray();
        $itemsResult = [];
        foreach ($items as $item) {
            $ietmArray = [];
            $ietmArray = $item->only(["id", "cantidad", "precio", "descuento"]);
            $ietmArray["producto"] = $item->producto->only(["id", "nombre", "descripcion"]);
            $ietmArray["producto"]["foto"] = $item->producto->producto_fotos->first()->url;
            $itemsResult[] = $ietmArray;
        }

        return response()->json(["items" => $itemsResult, "resumen" => Carrito::getResumen()]);
    }
}
