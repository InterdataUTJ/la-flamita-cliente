<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Cliente extends Authenticatable {
    
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nombre',
        'apellido',
        'correo',
        'clave',
        'avatar',
        'estado',
        'verificado',
        'google_id',
        'google_token',
        'google_refresh_token',
        'remember_token'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'clave',
        'google_token',
        'google_refresh_token',
        'remember_token'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    // protected $casts = [
    //     'email_verified_at' => 'datetime',
    //     'password' => 'hashed',
    // ];

    public function ventas() {
        // Relación uno a muchos - hasMany en el modelo que NO tiene la llave foránea
        return $this->hasMany(Venta::class);
    }

    public function carrito() {
        // Relación uno a uno - hasOne en el modelo que NO tiene la llave foránea
        return $this->hasOne(Carrito::class);
    }

    public function getAuthPassword() {
        return $this->clave;
    }
}
