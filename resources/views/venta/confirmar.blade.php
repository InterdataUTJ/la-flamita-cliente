@extends('plantillas.layout')

@php
  $cartAux = $carrito->getCabeza();
@endphp

@section('titulo', 'Confirmar compra')

@section('contenido')

    <h2 class="font-bold text-2xl mb-3">Confirmar compra</h2>
    <h3>Estás a punto de realizar la compra de: </h3>

    <div class="flex flex-col gap-3 my-5">
      @while ($cartAux !== null)
        <div class="flex gap-2 p-3 bg-white rounded shadow items-center">
          <img src="{{ $cartAux->foto }}" alt="imagen" class="h-12 rounded">
          <span class="text-lg font-bold px-3">{{ $cartAux->nombre }}</span>
          <span class="text-lg font-semibold">
            @if ($cartAux->descuento > 0)
              <span class="line-through text-gray-500">${{ $cartAux->precio }} MXN</span>
            @endif
            ${{ number_format((float)$cartAux->precio - ($cartAux->precio * $cartAux->descuento / 100), 2, '.', '') }} MXN
          </span>
          <span class="text-lg font-light">x{{ $cartAux->cantidad }}</span>
        </div>
        @php
          $cartAux = $cartAux->getSiguiente();
        @endphp
      @endwhile
    </div>

    <hr class="my-6">

    <p class="text-xl mb-3">Pagarás un total de <b>${{ $resumen["total"] }} MXN</b></p>
    @if ($resumen["descuento"] > 0)
      <p class="text-lg mb-3">Se aplicó un descuento total de <b>${{ $resumen["descuento"] }} MXN</b></p>
    @endif

    <hr class="my-6">

    <p class="text-xl font-semibold">¿Deseas continuar con el pago?</p>
    
    <div class="flex gap-3 w-full my-5">
      <a href="{{ route("carrito") }}" class="grow text-secondary-900 hover:text-white border border-secondary-600 hover:bg-secondary-600 focus:ring-4 focus:outline-none focus:ring-secondary-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Volver</a>
      <form action="{{ route("venta.crear") }}" method="POST" class="grow">
        @csrf
        <button type="submit" class="flex gap-2 items-center justify-center w-full focus:outline-none text-white bg-primary-600 hover:bg-primary-500 focus:ring-4 focus:ring-primary-400 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
          <i class="fa-brands fa-paypal"></i>
          Realizar pago
        </button>
      </form>
    </div>

@endsection