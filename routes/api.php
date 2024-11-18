<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CarritoController;
use App\Http\Controllers\Api\GoogleController;
use App\Http\Controllers\Api\ProductoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [AuthController::class, "login"]);
Route::post('/singup', [AuthController::class, "singup"]);
Route::post('/google', [GoogleController::class, "google"]);

Route::middleware('auth:sanctum')->group(function () {
    Route::post("/logout", [AuthController::class, "logout"]);
    Route::get("/validar", [AuthController::class, "validar"]);
    Route::get("/profile", [AuthController::class, "profile"]);

    Route::get("/carrito", [CarritoController::class, "items"]);
    Route::post("/carrito/add", [CarritoController::class, "añadir"]);
    Route::post("/carrito/eliminar", [CarritoController::class, "eliminar"]);
});

Route::get("/categoria/{categoria}", [ProductoController::class, "categorias"]);
Route::get("/producto/categoria/{categoriaDatoId}", [ProductoController::class, "productos"]);