<?php

use App\Http\Controllers\Auth\AuthClienteController;
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\ProductoController;
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
Route::get("/", [ProductoController::class, "index"])->name("menu");





// Clientes
Route::get('/login', [AuthClienteController::class, 'showForm'])->name('cliente.login');
Route::post('/login', [AuthClienteController::class, 'login'])->name('cliente.login');

Route::get('/singup', [AuthClienteController::class, 'showNewForm'])->name('cliente.singup');
Route::post('/singup', [AuthClienteController::class, 'create'])->name('cliente.singup');

Route::get("/auth/google/redirect", [GoogleController::class, "redirect"]);
Route::get("/auth/google/callback", [GoogleController::class, "callback"]);



// Clientes protegidos
Route::group(["middleware" => "auth:cliente", "as" => "cliente;"],function() {
    Route::post('/logout', [AuthClienteController::class, 'logout'])->name('logout');
});