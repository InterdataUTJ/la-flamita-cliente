<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cliente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller {
  
  // Metodo para iniciar sesion creando un nuevo token
  public function login (Request $request) {
    $credenciales = $request->validate([
        "correo" => "required|email|max:255|min:5",
        "clave" => "required|min:8|max:255",
    ]);
    
    if (!Auth::guard("cliente")->attempt([
        "password" => $credenciales["clave"],
        "correo" => $credenciales["correo"],
        "estado" => true
    ])) {
        return response()->json([
            "mensaje" => "Las credenciales son incorrectas.",
        ], 401);
    }
    
    $usuario = Auth::guard("cliente")->user();
    $token = $usuario->createToken("ApiTokenUser");
    
    return ['token' => $token->plainTextToken];
  }

  public function singup(Request $request) {
    $credenciales = $request->validate([
      "nombre" => "required|min:3|max:50",
      "apellido" => "required|min:3|max:50",
      "correo" => "unique:clientes,correo|max:255|min:5|required|email",
      "clave" => "required|min:8|max:255",
    ]);

    $cliente = new Cliente();
    $cliente->nombre = $credenciales["nombre"];
    $cliente->apellido = $credenciales["apellido"];
    $cliente->correo = $credenciales["correo"];
    $cliente->clave = Hash::make($credenciales["clave"]);
    $cliente->estado = true;
    $cliente->verificado = false;
    $cliente->avatar = "/storage/avatar/default.svg";
    $cliente->save();
    $token = $cliente->createToken("ApiTokenUser");
    
    return ['token' => $token->plainTextToken];
  }

  public function profile(Request $request) {
    $cliente = $request->user();

    $perfil = [];
    $perfil["avatar"] = $cliente->avatar;
    $perfil["nombre"] = "{$cliente->nombre} {$cliente->apellido}";
    $perfil["estado"] = boolval($cliente->estado);
    $perfil["correo"] = $cliente->correo;
    $perfil["verificado"] = boolval($cliente->verificado);
    $perfil["google"] = $cliente->google_id != null;

    return $perfil;
  }


  // Metodo para cerrar sesion eliminando el token de la base de datos
  public function logout(Request $request) {
    $request->user()->currentAccessToken()->delete();
    return response()->json([
        "mensaje" => "Sesión cerrada.",
    ]);
  }
}
