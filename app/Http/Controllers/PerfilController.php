<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PerfilController extends Controller {
    public function index() {
        return view('perfil.index');
    }

    public function editar() {
        return view('perfil.editar');
    }

    public function update(Request $request) {
        $id = auth()->user()->id;
        $request->validate([
            'nombre' => 'required|string|max:50|min:3',
            'apellido' => 'required|string|max:50|min:3',
            'correo' => "required|email|unique:clientes,correo,{$id}|max:255|min:5",
            'clave' => "nullable|min:8|max:255",
            'clave2' => "nullable|min:8|max:255|same:clave",
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        $cliente = Cliente::find(auth()->user()->id);
        $cliente-> nombre = $request->nombre;
        $cliente->apellido = $request->apellido;
        $cliente->correo = $request->correo;
        
        if ($request->has("clave") && $request->clave != null) {
            $cliente->clave = Hash::make($request->clave);
        }
        
        if ($request->hasFile("avatar") && $request->clave != null) {
            $image = $request->avatar;
            $imagennueva = "cliente_{$cliente->id}.{$image->extension()}";
            $ruta = $image->storeAs('imagenes/clientes/', $imagennueva, 'public');
            $cliente->avatar = "/storage/$ruta";
        }
        
        $cliente->save();
        return redirect()->route('perfil.index');
    }

    public function desactivar(Request $request) {
        $cliente = Cliente::find(auth()->user()->id);
        $cliente->estado = false;
        $cliente->save();
        
        auth()->logout();
        $request->session()->invalidate();
        $request->session()->regenerate();
        return redirect("/");
    }
}
