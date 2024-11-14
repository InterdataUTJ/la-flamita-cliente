<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Modulo extends Model {
    use HasFactory;

    public function modulo_datos() {
        // Relacion uno a muchos - hasMany en el modelo que no tiene la clave foránea
        return $this->hasMany(ModuloDato::class);
    }
}
