<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Venta extends Model {
    use HasFactory;

    public function productos() {
        // Muchos a muchos - belongsToMany en ambos modelos
        return $this->belongsToMany(Producto::class)->withPivot('precio', 'descuento', 'cantidad');
    }

    public function empleado() {
        // Uno a muchos - belongsTo en el modelo que tiene la llave foránea
        return $this->belongsTo(Empleado::class);
    }

    public function cliente() {
        // Uno a muchos - belongsTo en el modelo que tiene la llave foránea
        return $this->belongsTo(Cliente::class);
    }
}
