@extends('plantillas.layout')

@section("contenido")

<h1 class="text-center mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl mb-5">Hola por favor deja <span class="text-primary-600">tu Mensaje</span> aquí</h1>

<form action="https://formsubmit.co/2123300397@soy.utj.edu.mx" method="POST">
    <div class="mb-5">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Escribe tu email: </label>
        <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" placeholder="Juan@gmail.com" required />
    </div>
    <div class="mb-5">
        <label for="mensaje" class="block mb-2 text-sm font-medium text-gray-900">Déjanos tu mensaje: </label>
        <textarea id="mensaje" name="mensaje" rows="4" class="min-h-24 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500" placeholder="Escribe tu mensaje aqui..."></textarea>
    </div>
    <button type="submit" class="flex justify-center items-center gap-2 w-full text-white bg-primary-500 hover:bg-primary-400 focus:ring-4 focus:outline-none focus:ring-primary-400 font-bold rounded-lg text-sm px-5 py-2.5 text-center active:bg-primary-600">
        <i class="fa-solid fa-envelope"></i>
        Enviar mensaje
    </button>
</form>

@endsection