<?php

namespace App\Carrito;

use App\Carrito\CarritoStatic;

class Carrito extends CarritoStatic {
  private $cabeza = null;
  private $final = null;

  public function setCabeza($item) { 
    $this->cabeza = $item;
  }

  public function setFinal($item) {
    $this->final = $item;
  }

  public function getCabeza() {
    return $this->cabeza;
  }

  public function getFinal() {
    return $this->final;
  }

  public function esVacio() {
    return $this->cabeza === null;
  }
}

?>