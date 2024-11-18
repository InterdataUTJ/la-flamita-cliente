<?php

namespace App\Carrito;

use App\Carrito\CarritoItem as CarritoItemNodo;
use App\Models\Producto;
use App\Models\CarritoItem;
use Exception;
use Illuminate\Support\Facades\Auth;

class CarritoStatic {

  public static function añadir($item) {
    if (!Auth::check()) return false;
    if (!is_array($item)) return false;
    if (!isset($item["id"])) return false;
    if (!isset($item["cantidad"])) return false;
    if ($item["cantidad"] <= 0) return false;

    $producto = Producto::find($item["id"]);
    if (!$producto) return false;
    if (!$producto->estado) return false;

    try {

      $carritoItem = CarritoItem::where("producto_id", $item["id"])->where("cliente_id", Auth::user()->id)->first();
      if (!$carritoItem) {
        $carritoItem = new CarritoItem();
        $carritoItem->producto_id = $item["id"];
        $carritoItem->cliente_id = Auth::user()->id;
        $carritoItem->cantidad = $item["cantidad"];
        $carritoItem->precio = $producto->precio;
        $carritoItem->descuento = $producto->descuento;
      } else {
        $carritoItem->cantidad += $item["cantidad"];
      }

      $carritoItem->save();
      return Carrito::cantidad();

    } catch(Exception $e) {
      return false;
    }
  }


  public static function cantidad() {
    if (!Auth::check()) return false;
    try {
      // Sumar columna cantidad
      $cantidad = CarritoItem::where("cliente_id", Auth::user()->id)->sum("cantidad");
      return $cantidad;
    } catch(Exception $e) {
      return false;
    }
  }

  public static function editar($item) {
    if (!Auth::check()) return false;
    if (!is_array($item)) return false;
    if (!isset($item["id"])) return false;
    if (!isset($item["cantidad"])) return false;

    $cartItem = CarritoItem::find($item["id"]);
    $producto = $cartItem->producto;
    if (!$producto) return false;
    if (!$producto->estado) return false;

    try {
      $colCambiadas = $cartItem->update([
        "cantidad" => $item["cantidad"],
        "precio" => $producto->precio,
        "descuento" => $producto->descuento
      ]);

      return $colCambiadas;
    } catch(Exception $e) {
      return false;
    }
  }

  

  
  public static function quitar($item) {
    if (!Auth::check()) return false;
    if (!is_array($item)) return false;
    if (!isset($item["id"])) return false;


    try {
      $carritoItem = CarritoItem::find($item["id"])->delete();

      return $carritoItem;
    } catch(Exception $e) {
      return false;
    }
  }



  public static function limpiar() {
    try {
      $carritoItems = CarritoItem::where("cliente_id",  Auth::user()->id)->delete();

      return isset($carritoItems);
    } catch(Exception $e) {
      return false;
    }
  }


  public static function getResumen() {
    $total = 0;
    $subtotal = 0;
    $descuento = 0;

    try {
      $items = CarritoItem::where("cliente_id",  Auth::user()->id)->get();
      foreach($items as $item) {
        $total += ($item->precio - ($item->precio * $item->descuento / 100)) * $item->cantidad;
        $subtotal += $item->precio * $item->cantidad;
        $descuento += ($item->precio * $item->descuento / 100) * $item->cantidad;
      }
    } catch(Exception $e) {
      return null;
    }

    return [
      "total" => round($total, 2),
      "subtotal" => round($subtotal, 2),
      "descuento" => round($descuento, 2)
    ];
  }  


  public static function getItems() {
    $items = CarritoItem::where("cliente_id",  Auth::user()->id)->get();
    $carrito = new Carrito();
    
    foreach($items as $item) {
      $itemNodo = new CarritoItemNodo($item);
      if ($carrito->getCabeza() != null) $carrito->getFinal()->setSiguiente($itemNodo);
      else $carrito->setCabeza($itemNodo);
      $carrito->setFinal($itemNodo);
    }

    return $carrito;
  }

  public static function getItemsArray() {
    $items = CarritoItem::with("producto.producto_fotos")->where("cliente_id",  Auth::user()->id)->get();
    return $items;
  }
}

?>