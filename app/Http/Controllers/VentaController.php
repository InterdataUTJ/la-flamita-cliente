<?php

namespace App\Http\Controllers;

use App\Carrito\Carrito;
use Exception;
use App\Models\Producto;
use App\Models\Venta;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class VentaController extends Controller {

    public function confirmar() {
        $carrito = Carrito::getItems();

        if ($carrito->esVacio()) {
            return redirect()->route("carrito")->withErrors(["error" => "No hay productos en el carrito"]);
        }

        return view("venta.confirmar")->with("carrito", $carrito)->with("resumen", Carrito::getResumen());
    }

    public function crear() {
        $ventaId = 0;
        $datos = [
            "fecha_venta" => now(),
            "fecha_pago" => now(),
            "carrito" => Carrito::getItems()
        ];


        try {
            DB::transaction(function() use ($datos, &$ventaId) {
                $venta = new Venta();
                $venta->cliente_id  = Auth::user()->id;
                $venta->fecha_venta = $datos["fecha_venta"];
                $venta->fecha_pago  = $datos["fecha_pago"];
                $venta->estado      = "PENDIENTE";
                $venta->metodo_pago = "PAYPAL";
                $venta->save();
                $ventaId = $venta->id;
                $randomString = Str::random(20);
                $venta->token = "{$ventaId}{$venta->cliente_id}{$randomString}";

                $productoItem = $datos["carrito"]->getCabeza();
                while($productoItem !== null) {
                    $producto = Producto::find($productoItem->producto_id);
                    if ($producto->existencias < $productoItem->cantidad) {
                        throw new Exception("No hay suficiente stock de {$productoItem->nombre}");
                    }

                    $producto->ventas()->attach($ventaId, [
                        "cantidad" => $productoItem->cantidad,
                        "precio" => $productoItem->precio,
                        "descuento" => $productoItem->descuento
                    ]);

                    $productoItem = $productoItem->getSiguiente();
                }

                $venta->save();
            });
        } catch (\Exception $e) {
            return redirect()->route("carrito")->withErrors(["error" => "Error: {$e->getMessage()}"]);
        }
        
        return redirect("/paypal/redirect/$ventaId");
    }

    public function index() {
        $ventas = Venta::where([
            "cliente_id" => Auth::user()->id,
            ["estado", "<>", "PENDIENTE"]
        ])->simplePaginate(8);
        
        return view("venta.listar")->with("pedidos", $ventas);
    }


    public function detalle($id) {
        $venta = Venta::where("cliente_id", Auth::user()->id)->find($id);
        if ($venta === null) {
            return redirect()->route("venta.pedidos")->withErrors(["error" => "No se encontró la venta"]);
        }

        return view("venta.detalle")->with("venta", $venta);
    }
}
