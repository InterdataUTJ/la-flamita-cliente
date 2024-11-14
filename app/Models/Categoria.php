<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model {
    use HasFactory;

    public function categoria_datos() {
        // Relacion uno a muchos - hasMany en el modelo que no tiene la clave foránea
        return $this->hasMany(CategoriaDato::class);
    }
}
