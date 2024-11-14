<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoriaDato extends Model {
    use HasFactory;

    public function productos() {
        // Muchos a muchos - belongsToMany en ambos modelos
        return $this->belongsToMany(Producto::class);
    }

    public function categoria() {
      // Uno a muchos - belongsTo en el modelo que tiene la clave foránea
      return $this->belongsTo(Categoria::class);
    }
}
