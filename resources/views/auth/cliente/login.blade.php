@extends('plantillas.layout')

@section('titulo', 'Iniciar sesión')

@section("contenido")
<main class="w-11/12 max-w-screen-sm mx-auto pt-5">
    <h1 class="mb-5 text-center mb-4 text-xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
        Iniciar sesión
    </h1>
    
    <form class="mb-10" action="/login" method="POST" enctype="multipart/form-data">
        @csrf
        <div class="mb-5">
            <label for="correo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo electrónico</label>
            <input type="email" name="correo" id="correo" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-400 block w-full p-2.5" placeholder="ejemplo@ejemplo.com" maxlength="50" required />
        </div>

        <div class="mb-5">
            <label for="clave" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
            <x-password placeholder="Contraseña" maxlength="50" required name="clave" />
        </div>

        <div class="flex items-start mb-5">
            <div class="flex items-center h-5">
                <input id="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-primary-500 focus:border-primary-400 accent-primary-500 text-primary-500" />
            </div>
            <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Recuérdame</label>
        </div>

        <button type="submit" class="mb-5 w-full text-black font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex flex items-center justify-center gap-2 hover:bg-gray-100 active:bg-gray-200 text-white bg-primary-500 hover:bg-primary-400 active:bg-primary-600">
            <i class="fa-solid fa-user"></i>
            Iniciar sesión
        </button>

        <p class="text-sm text-gray-500 dark:text-gray-400">
            ¿No tienes una cuenta? <a href="/singup" class="font-bold text-primary-600 hover:underline">Crea una</a>
        </p>
    </form>

    <hr class="h-px my-8 bg-gray-300 border-0">

    <div class="flex flex-col gap-3">
        <a href="/auth/google/redirect" class="w-full text-black font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex flex items-center justify-center gap-2 border border-black hover:bg-gray-100 active:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>
            Iniciar con Google
        </a>
    </div>

</main>
@endsection