<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model {
    use HasFactory;

    public function categoria_datos() {
        // Muchos a muchos - belongsToMany en ambos modelos
        return $this->belongsToMany(CategoriaDato::class);
    }

    public function ventas() {
        // Muchos a muchos - belongsToMany en ambos modelos
        return $this->belongsToMany(Venta::class)->withPivot('precio', 'descuento', 'cantidad');
    }

    public function producto_fotos() {
        // Uno a muchos - has many en el modelo que NO tieene la llave foránea
        return $this->hasMany(ProductoFoto::class);
    }

    public function carrito_items() {
        // Uno a muchos - has many en el modelo que NO tieene la llave foránea
        return $this->hasMany(CarritoItem::class);
    }
}
