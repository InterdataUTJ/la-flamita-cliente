<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class ProductoFoto extends Model {
    use HasFactory;

    public function producto() {
        // Relación de uno a muchos - belongsTo en el modelo con la llave foranea
        return $this->belongsTo(Producto::class);
    }

    // Borrar imagen del storage cuando se elimina el modelo
    protected static function booted() {
        static::deleting(function ($productoFoto) {
            // Verifica si existe el archivo en el storage
            $ruta = str_replace(asset('/storage/'), '', $productoFoto->url);
            if (Storage::disk("public")->exists($ruta)) {
                Storage::disk("public")->delete($ruta); // Elimina el archivo
            }
        });
    }


}
