<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Carrito\Carrito;
use Exception;
use App\Models\Producto;
use App\Models\Venta;
use App\Paypal\PaypalContext;
use App\Paypal\PaypalOrder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class VentaController extends Controller {

    private $paypalContext;

    public function __construct() {
        $config = Config::get("paypal");
        $this->paypalContext = new PaypalContext($config);
    }

    public function crear() {
        // La venta
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
          return redirect()->away("laflamita://venta/error/{$e->getMessage()}");
        }
        
        // Paypal
        $venta = Venta::find($ventaId);
        if (!$venta) return redirect()->away("laflamita://venta/error/Error al procesar el pago.");
        if ($venta->estado != "PENDIENTE") return redirect()->away("laflamita://venta/error/Venta ya pagada.");

        $order = new PaypalOrder($this->paypalContext);
        $success = $order->create($venta->getTotal(), true);

        if (!$success) {
          return redirect()->away("laflamita://venta/error/Error al procesar el pago.");
        }

        $venta->paypal_id = $order->id();
        $venta->save();

        return redirect()->away($order->link());
    }

    public function cancelado(Request $request) {
        if (!$request->has("token")) {
          return redirect()->away("laflamita://venta/error/Error al procesar el pago.");
        }

        $venta = Venta::where("token", $request->token)->first();
        if ($venta) $venta->delete();

        return redirect()->away("laflamita://venta/estado/cancelado");
    }


    public function aprobado(Request $request) {
      if (!$request->has("token")) {
        return redirect()->away("laflamita://venta/error/Error al procesar el pago.");
      }

      $venta = Venta::where("paypal_id", $request->token)->first();
      if (!$venta || $venta->estado != "PENDIENTE") {
        return redirect()->away("laflamita://venta/error/Venta ya realizada.");
      }

      $order = new PaypalOrder($this->paypalContext);
      $success = $order->capture($request->token);

      if (!$success || !$order->isCompleted()) {
        $venta->delete();
        return redirect()->away("laflamita://venta/estado/cancelado");
      }

      

      // Actualizar el inventario
      foreach ($venta->detalle_ventas as $detalleVenta) {
        $producto = $detalleVenta->producto;
        $producto->cantidad -= $detalleVenta->cantidad;
        $producto->save();
      }

      $venta->estado = "PAGADO";
      $venta->save();
      Carrito::limpiar();
      return redirect()->away("laflamita://venta/estado/aprovado/{$venta->id}");
    }

    public function index() {
        $ventas = Venta::where([
            "cliente_id" => Auth::user()->id,
            ["estado", "<>", "PENDIENTE"]
        ])->get();
        
        return view("venta.listar")->with("pedidos", $ventas);
    }


    public function detalle($id) {
        $venta = Venta::where("cliente_id", Auth::user()->id)->find($id);
        if ($venta === null) {
            return response()->json(["error" => "No se encontró la venta"], 404);
        }

        return response()->json($venta);
    }
}
