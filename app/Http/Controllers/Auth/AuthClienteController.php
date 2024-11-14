<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Cliente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthClienteController extends Controller {
    public function showForm() {
        return view("auth.cliente.login");
    }

    public function login(Request $request) {
        $credenciales = $request->validate([
            "correo" => "required|email|max:255|min:5",
            "clave" => "required|min:8|max:255",
        ]);
    
        if (Auth::guard("cliente")->attempt([
            "password" => $credenciales["clave"],
            "correo" => $credenciales["correo"],
            "estado" => true
        ])) {
            $request->session()->regenerate();
            return redirect()->intended("/");
        }

        return back()->withErrors([
            "msg" => "Las credenciales proporcionadas no son correctas.",
        ])->onlyInput("correo");
    }



    public function showNewForm() {
        return view("auth.cliente.create");
    }

    public function create(Request $request) {
        $credenciales = $request->validate([
            "nombre" => "required|min:3|max:50",
            "apellido" => "required|min:3|max:50",
            "correo" => "unique:clientes,correo|max:255|min:5|required|email",
            "clave" => "required|min:8|max:255",
            "clave2" => "required|min:8|max:255|same:clave",
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

        Auth::guard("cliente")->login($cliente, $request->has("remember"));
        return redirect("/");
    }



    public function logout(Request $request) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerate();
        return redirect("/");
    }
}
