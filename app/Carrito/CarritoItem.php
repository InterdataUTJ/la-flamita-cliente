<?php

namespace App\Carrito;

class CarritoItem {
  private $siguiente = null;
  public $id;
  public $producto_id;
  public $nombre;
  public $descripcion;
  public $foto;
  public $cantidad;
  public $precio;
  public $descuento;

  public function __construct($item) {
    $this->id = $item->id;
    $this->producto_id = $item->producto_id; 
    $this->nombre = $item->producto->nombre; 
    $this->descripcion = $item->producto->descripcion;
    $this->foto = $item->producto->producto_fotos->first()->url;
    $this->cantidad = $item->cantidad; 
    $this->precio = $item->precio; 
    $this->descuento = $item->descuento; 
  }

  public function setSiguiente($item) {
    $this->siguiente = $item;
  }

  public function getSiguiente() {
    return $this->siguiente;
  }
}

?>