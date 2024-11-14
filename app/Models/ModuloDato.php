<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModuloDato  extends Model {
    use HasFactory;

    public function modulos() {
      // Uno a muchos - belongsTo en el modelo que tiene la clave foránea
        return $this->belongsTo(Modulo::class);
    }
}
