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
use Illuminate\Support\Str;
use Illuminate\Http\Request;

use Picqer\Barcode\Types\TypeCode128;
use Picqer\Barcode\Renderers\SvgRenderer;

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

        if ($datos["carrito"]->getCabeza() === null) {
            return response()->json([ "message" => "Carrito vacío." ], 400);
        }


        try {
            DB::transaction(function() use ($datos, &$ventaId) {
                $venta = new Venta();
                $venta->cliente_id  = Auth::user()->id;
                $venta->fecha_venta = $datos["fecha_venta"];
                $venta->fecha_pago  = $datos["fecha_pago"];
                $venta->estado      = "PENDIENTE";
                $venta->metodo_pago = "PAYPAL_ANDROID";
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
          return response()->json([ "message" => "Error: {$e->getMessage()}" ], 400);
        }
        
        // Paypal
        $venta = Venta::find($ventaId);
        if (!$venta) return response()->json([ "message" => "Error al procesar el pago." ], 400);
        if ($venta->estado != "PENDIENTE") return response()->json([ "message" => "Venta ya pagada." ], 400);

        $order = new PaypalOrder($this->paypalContext);
        $success = $order->create($venta->getTotal(), true);

        if (!$success) {
          return response()->json([ "message" => "Error al procesar el pago." ], 400);
        }

        $venta->paypal_id = $order->id();
        $venta->save();

        return response()->json([ "url" => $order->link() ]);
    }

    public function cancelado(Request $request) {
        if (!$request->has("token")) {
          return redirect()->away("laflamita://venta/error/Error al procesar el pago.");
        }

        $venta = Venta::where("paypal_id", $request->token)->first();
        if ($venta) $venta->delete();

        return redirect()->away("laflamita://venta/error/Venta cancelada.");
    }


    public function aprobado(Request $request) {
      if (!$request->has("token")) {
        return redirect()->away("laflamita://venta/error/Error al procesar el pago.");
      }

      $venta = Venta::where("paypal_id", $request->token)->first();
      if (!$venta || $venta->estado != "PENDIENTE") {
        return redirect()->away("laflamita://venta/error/Esta venta ya fue pagada con anterioridad.");
      }

      $order = new PaypalOrder($this->paypalContext);
      $success = $order->capture($request->token);

      if (!$success || !$order->isCompleted()) {
        $venta->delete();
        return redirect()->away("laflamita://venta/error/Venta cancelada.");
      }

      

      $venta->productos()->each(function($producto) {
        $producto->existencias -= $producto->pivot->cantidad;
        $producto->save();
      });

      Carrito::limpiarCliente($venta->cliente_id);
      $venta->estado = "PAGADO";
      $venta->save();
      return redirect()->away("laflamita://venta/aprobada/{$venta->id}");
    }


    public function detalle($id) {
      $venta = Venta::with(['productos.producto_fotos' => function ($query) {
        $query->limit(1); // Solo traer la primera foto
      }])->find($id);

      if ($venta === null) {
        return response()->json(["message" => "No se encontró la venta"], 404);
      }

      $productos = $venta->productos->map(function ($producto) {
          return [
              'nombre'      => $producto->nombre,
              'descripcion' => $producto->descripcion,
              'cantidad'    => $producto->pivot->cantidad,
              'precio'      => $producto->pivot->precio,
              'descuento'   => $producto->pivot->descuento,
              'foto_url'    => $producto->producto_fotos->first()->url ?? null, // Primera foto o null si no existe
          ];
      });

      return response()->json([
          "id" => $venta->id,
          "fecha_venta" => $venta->fecha_venta,
          "estado" => $venta->estado,
          "token" => $venta->token,
          "metodo_pago" => $venta->metodo_pago,
          "paypal_id" => $venta->paypal_id,
          'productos' => $productos,
      ]);
    }

    

    public function codigo($token) {
      $barcode = (new TypeCode128())->getBarcode($token);

      $renderer = new SvgRenderer();
      $renderer->setForegroundColor([255, 255, 255]);
      $renderer->setBackgroundColor([243, 118, 73]);
      return response($renderer->render($barcode, 400, 70))->header("Content-Type", "image/svg+xml");
    }
}
