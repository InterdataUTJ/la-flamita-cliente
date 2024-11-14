<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Cliente;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller {

  public function redirect() {
    return Socialite::driver('google')->stateless()->redirect();
  }

  public function callback() {
    $user = Socialite::driver('google')->stateless()->user();

    $userDB = Cliente::updateOrCreate([
        'google_id' => $user->id,
    ], [
        'google_id' => $user->id,
        'nombre' => $user->user["given_name"],
        'apellido' => $user->user["family_name"],
        'correo' => $user->email,
        'avatar' => $user->avatar,
        'estado' => true,
        'verificado' => $user->user["email_verified"],
        'google_token' => $user->token,
        'google_refresh_token' => $user->refreshToken,
    ]);
 
    Auth::guard("cliente")->login($userDB);
    return redirect('/');
  }
}
