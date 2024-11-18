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


    // Metodos
    public function getTotal() {
        $total = 0;
        foreach ($this->productos as $producto) {
            $precio = $producto->pivot->precio - ($producto->pivot->precio * $producto->pivot->descuento / 100);
            $total += $precio * $producto->pivot->cantidad;
        }

        return round($total, 2);
    }

    public function getNumeroProductos() {
        $total = 0;
        foreach ($this->productos as $producto) {
            $total += $producto->pivot->cantidad;
        }

        return $total;
    }

    public function getSubtotal() {
        $total = 0;
        foreach ($this->productos as $producto) {
            $total += $producto->pivot->precio * $producto->pivot->cantidad;
        }

        return round($total, 2);
    }

    // Metodos
    public function getDescuentos() {
        $total = 0;
        foreach ($this->productos as $producto) {
            $total += ($producto->pivot->precio * $producto->pivot->descuento / 100);
        }

        return round($total, 2);
    }
}
