<?php

namespace App\Http\Controllers;

use App\Carrito\Carrito;
use Illuminate\Http\Request;

class CarritoController extends Controller {

    public function index() {
        return view('carrito.carrito')->with('carrito', Carrito::getItems())->with('resumen', Carrito::getResumen());
    }

    public function añadir(Request $request) {
        $request->validate([
            'id' => 'required|integer',
            'cantidad' => 'required|integer',
        ]);

        $estado = Carrito::añadir([
            'id' => $request->id,
            'cantidad' => $request->cantidad,
        ]);

        if ($estado === false) {
            return response()->json([
                'estado' => 'Error al añadir al carrito',
            ], 400);
            
        }

        return response()->json([
            'cantidad' => $estado,
        ], 200);
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

        return response()->json(Carrito::getResumen(), 200);
    }

    
    public function editar(Request $request) {
        $request->validate([
            'id' => 'required|integer',
            'cantidad' => 'required|integer',
        ]);

        $estado = Carrito::editar([
            'id' => $request->id,
            'cantidad' => $request->cantidad,
        ]);

        if ($estado === false) {
            return response()->json([
                'estado' => 'Error al editar el carrito',
            ], 400);
            
        }

        return response()->json(Carrito::getResumen(), 200);
    }
}
