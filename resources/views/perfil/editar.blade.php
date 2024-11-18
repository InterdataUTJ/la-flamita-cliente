@extends("plantillas.layout")

@section("titulo", "Editar Perfil")

@php
  $usuario = Auth::user();
@endphp

@section("contenido")
<h2 class="text-center font-extrabold text-3xl my-5">Editar Perfil</h2>

<div class="flex flex-col md:flex-row gap-4 justify-center items-center p-5 bg-quinary-300 rounded-lg shadow">
  <img class="w-20 h-20 rounded-full object-contain select-none bg-quinary-100" src="{{ $usuario->avatar }}" alt="avatar">
  <div class="flex flex-col gap-2">
    <p class="font-extrabold text-quinary-900">{{ $usuario->nombre }} {{ $usuario->apellido }}</p>
    <p class="font-semibold text-gray-600">{{ $usuario->correo }}</p>
  </div>
</div>

@if($usuario->google_id !== null)
  <div class="mt-5 flex gap-4 items-center bg-white border rounded-lg shadow p-3">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
    <p class="font-bold">Cuenta creada con Google</p>
  </div>
@endif

<form action="/perfil/editar" method="POST" class="my-8" enctype="multipart/form-data">
  @csrf
  @method("PUT")
    
  <div class="mb-5">
    <label for="nombre" class="block mb-2 text-sm font-semibold text-gray-900">Nombre *</label>
    <input type="text" id="nombre" name="nombre" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" required placeholder="Nombre" value="{{ $usuario->nombre }}" maxlength="50" minlength="3" />
  </div>
  <div class="mb-5">
    <label for="apellido" class="block mb-2 text-sm font-semibold text-gray-900">Apellido *</label>
    <input type="text" id="apellido" name="apellido" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" required placeholder="Apellido" value="{{ $usuario->apellido }}" maxlength="50" minlength="3" />
  </div>
  <div class="mb-5">
    <label for="correo" class="block mb-2 text-sm font-semibold text-gray-900">Correo *</label>
    <input type="email" id="correo" name="correo" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" required placeholder="Correo" value="{{ $usuario->correo }}" minlength="5" maxlength="255" />
  </div>
  
  <div class="mb-7">
    <label class="block text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Avatar</label>
    <p class="mt-1 text-sm text-gray-500 mb-2" id="user_avatar_help">Selecciona tu nuevo avatar</p>
    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50" id="avatar" name="avatar" type="file" accept="image/jpeg, image/png, image/jpg, image/gif, image/svg, image/webp">
  </div>

  <div class="mb-5">
    <label for="clave2" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nueva contraseña</label>
    <x-password :required="false" placeholder="Nueva contraseña" maxlength="50" name="clave" />
  </div>
  <div class="mb-5">
    <label for="clave2" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repetir contraseña</label>
    <x-password :required="false" placeholder="Repetir contraseña" maxlength="50" name="clave2" />
  </div>

  <button type="submit" class="mt-6 flex justify-center items-center gap-2 w-full text-white bg-primary-600 hover:bg-primary-500 focus:ring-4 focus:outline-none focus:ring-primary-400 font-bold rounded-lg text-sm px-5 py-2.5 text-center active:bg-primary-700">
    <i class="fa-solid fa-floppy-disk"></i>
    Guardar cambios
  </button>
</form>

@endsection