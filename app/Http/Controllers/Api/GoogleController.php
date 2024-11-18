<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cliente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller {

  public function google(Request $request) {

    $request->validate([
      "token" => "required",
    ]);

    $response = Http::post("https://oauth2.googleapis.com/tokeninfo", [
      "id_token" => $request->token,
    ]);

    if ($response->failed()) {
      return response()->json([
        "mensaje" => "Token invalido.",
      ], 401);
    }

    $user = $response->object();
    $userDB = Cliente::updateOrCreate([
        'google_id' => $user->sub,
    ], [
        'google_id' => $user->sub,
        'nombre' => $user->given_name,
        'apellido' => $user->family_name,
        'correo' => $user->email,
        'avatar' => $user->picture,
        'estado' => true,
        'verificado' => $user->email_verified === "true",
        'google_token' => null,
        'google_refresh_token' => null,
    ]);
 
    Auth::guard("cliente")->login($userDB);
    $usuario = Auth::guard("cliente")->user();
    $token = $usuario->createToken("ApiTokenUser");
    
    return ['token' => $token->plainTextToken];
  }
}
