<?php

namespace App\Http\Controllers;

use App\Carrito\Carrito;
use App\Paypal\PaypalOrder;
use App\Paypal\PaypalContext;
use App\Models\Venta;
use Illuminate\Support\Facades\Config;
use Illuminate\Http\Request;

class PaypalController extends Controller {
    private $paypalContext;

    public function __construct() {
        $config = Config::get("paypal");
        $this->paypalContext = new PaypalContext($config);
    }

    public function redirect($ventaId) {
        $venta = Venta::find($ventaId);
        if (!$venta) return redirect()->route("carrito")->withErrors(['venta' => 'Error al procesar el pago.']);
        if ($venta->estado != "PENDIENTE") return redirect()->route("carrito")->withErrors(['venta' => 'Venta ya pagada.']);

        $order = new PaypalOrder($this->paypalContext);
        $success = $order->create($venta->getTotal());

        if (!$success) {
            return redirect()->route("carrito")->withErrors(['venta' => 'Error al procesar el pago.']);
        }

        $venta->paypal_id = $order->id();
        $venta->save();

        return redirect()->away($order->link());
    }


    public function cancelado(Request $request) {
        $request->validate([
            "token" => "required"
        ]);

        $venta = Venta::where("paypal_id", $request->token)->first();
        if ($venta) $venta->delete();

        return view("venta.cancelado");
    }


    public function aprovado(Request $request) {
        $request->validate([
            "token" => "required"
        ]);

        $venta = Venta::where("paypal_id", $request->token)->first();
        if (!$venta || $venta->estado != "PENDIENTE") {
            return redirect()->route("carrito")->withErrors(['venta' => 'Venta ya realizada.']);
        }

        $order = new PaypalOrder($this->paypalContext);
        $success = $order->capture($request->token);

        if (!$success || !$order->isCompleted()) {
            $venta->delete();
            return view("venta.cancelado");
        }


        $venta->productos()->each(function($producto) {
            $producto->existencias -= $producto->pivot->cantidad;
            $producto->save();
        });

        $venta->estado = "PAGADO";
        $venta->save();
        Carrito::limpiar();
        return view("venta.aprovado")->with("venta", $venta);

    }
}
