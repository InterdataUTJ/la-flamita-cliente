<?php

namespace App\Carrito;

use Illuminate\Support\Facades\Facade;

class CarritoFacade extends Facade {
  protected static function getFacadeAccessor() {
    return 'carrito';
  }
}

?>