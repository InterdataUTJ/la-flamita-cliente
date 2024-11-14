<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carrito extends Model {
    use HasFactory;

    public function cliente() {
        // Relacion uno a uno - belongsTo en el modelo con la clave foránea
        return $this->belongsTo(Cliente::class);
    }

    public function carrito_items() {
        // Relacion uno a muchos - hasMany en el modelo que no tiene la clave foránea
        return $this->hasMany(CarritoItem::class);
    }
}
