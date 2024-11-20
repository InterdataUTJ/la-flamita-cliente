<?php

use App\Http\Controllers\Auth\AuthClienteController;
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\CarritoController;
use App\Http\Controllers\PaypalController;
use App\Http\Controllers\PerfilController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\VentaController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


// General nos manda a menu
Route::view("/", "landing")->name("landing");

Route::get("/menu", [ProductoController::class, "index"])->name("menu");
Route::get("/producto/{id}", [ProductoController::class, "detalle"])->name("producto.detalle");


// Vista con Formulario para Contactarnos
Route::view('/contacto', 'contacto.contacto')->name('contacto');


// Clientes
Route::get('/login', [AuthClienteController::class, 'showForm'])->name('cliente.login');
Route::post('/login', [AuthClienteController::class, 'login'])->name('cliente.login');

Route::get('/singup', [AuthClienteController::class, 'showNewForm'])->name('cliente.singup');
Route::post('/singup', [AuthClienteController::class, 'create'])->name('cliente.singup');

Route::get("/auth/google/redirect", [GoogleController::class, "redirect"]);
Route::get("/auth/google/callback", [GoogleController::class, "callback"]);



// Clientes protegidos
Route::middleware("auth:cliente")->group(function() {
    Route::post('/logout', [AuthClienteController::class, 'logout'])->name('logout');

    Route::get("/perfil", [PerfilController::class, "index"])->name("perfil.index");
    Route::delete("/perfil/desactivar", [PerfilController::class, "desactivar"])->name("perfil.desactivar");

    Route::get("/perfil/editar", [PerfilController::class, "editar"])->name("perfil.editar");
    Route::put("/perfil/editar", [PerfilController::class, "update"])->name("perfil.editar");


    Route::get('/carrito', [CarritoController::class, 'index'])->name('carrito');
    Route::post('/carrito/add', [CarritoController::class, 'añadir'])->name('carrito.añadir');
    Route::post('/carrito/eliminar', [CarritoController::class, 'eliminar'])->name('carrito.eliminar');
    Route::post('/carrito/editar', [CarritoController::class, 'editar'])->name('carrito.editar');
    
    Route::get('/venta/confirmar', [VentaController::class, 'confirmar'])->name('venta.confirmar');
    Route::post('/venta/crear', [VentaController::class, 'crear'])->name('venta.crear');

    Route::get('/pedidos', [VentaController::class, 'index'])->name('venta.pedidos');
    Route::get('/venta/{id}', [VentaController::class, 'detalle'])->name('venta.detalle');

    Route::get('/paypal/redirect/{ventaId}', [PaypalController::class, 'redirect'])->name('paypal.redirect');
    Route::get('/paypal/cancelado', [PaypalController::class, 'cancelado'])->name('paypal.cancelado');
    Route::get('/paypal/aprovado', [PaypalController::class, 'aprovado'])->name('paypal.aprovado');

});