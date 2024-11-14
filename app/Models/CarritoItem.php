<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarritoItem extends Model {
    use HasFactory;

    public function carrito() {
        // Uno a muchos - belongsTo en el modelo que tiene la clave foránea
        return $this->belongsTo(Carrito::class);
    }

    public function producto() {
        // Uno a muchos - belongsTo en el modelo que tiene la clave foránea
        return $this->belongsTo(Producto::class);
    }
}
