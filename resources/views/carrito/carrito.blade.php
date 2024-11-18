@extends('plantillas.layout')

@section('titulo', 'Carrito')

@php
  $cartItemAux = $carrito->getCabeza();
@endphp

@section("contenido")
  
  <h2 class="text-center font-extrabold text-3xl mb-2">Carrito</h2>

  <section class="flex flex-col gap-4 lg:flex-row">
    

    @if($cartItemAux == null)
      <p class="text-center">No hay productos en el carrito</p>
    @endif

    <div class="flex flex-col gap-4 grow">
      @while ($cartItemAux != null)

        <section id="producto_carrito_container_{{ $cartItemAux->id }}" class="rounded shadow w-full p-4 flex flex-col gap-4 bg-white">
          <div class="flex gap-4">
            <img class="w-20 rounded object-contain" alt="foto" src="{{ $cartItemAux->foto }}">
            <div>
              <p class="line-clamp-1 font-bold text-xl">{{ $cartItemAux->nombre }}</p>
              <p class="line-clamp-2">{{ $cartItemAux->descripcion }}</p>
              <p class="line-clamp-1 font-bold mt-1">
                @if ($cartItemAux->descuento > 0)
                  <span class="line-through text-gray-500">${{ $cartItemAux->precio }} MXN</span>
                @endif
                <span>${{ number_format((float)$cartItemAux->precio - ($cartItemAux->precio * $cartItemAux->descuento / 100), 2, '.', '') }} MXN</span>
              </p>
            </div>
          </div>
          <div class="grow flex gap-4">
            
            <div class="flex gap-1">
              <button onclick="Carrito.editar({{ $cartItemAux->id }}, false);" type="button" class="p-3 text-white font-extrabold grow max-w-10 block rounded bg-primary-500 hover:bg-primary-400 active:bg-primary-600">-</button>
              <input type="number" id="producto_carrito_{{ $cartItemAux->id }}" class="grow max-w-20 inline-block w-3/12 rounded" disabled value="{{ $cartItemAux->cantidad }}">
              <button onclick="Carrito.editar({{ $cartItemAux->id }});" type="button" class="p-3 text-white font-extrabold grow max-w-10 block rounded bg-primary-500 hover:bg-primary-400 active:bg-primary-600">+</button>
            </div>

            <button type="button" onclick="Carrito.eliminar({{ $cartItemAux->id }});" class="text-white font-bold block max-w-28 bg-red-500 rounded flex items-center justify-center gap-2 p-3 hover:bg-red-400 active:bg-red-600">
              <i class="fa-solid fa-trash-can"></i>
              Eliminar
            </button>
          </div>
        </section>

        @php
          $cartItemAux = $cartItemAux->getSiguiente();
        @endphp
      @endwhile
    </div>

    <div class="space-y-6 min-w-80">
      <div class="space-y-4 rounded border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <p class="text-xl font-semibold text-gray-900 dark:text-white">Resumen de compra</p>

        <div class="space-y-4">
          <div class="space-y-2">
            <dl class="flex items-center justify-between gap-4">
              <dt class="text-base font-normal text-gray-500">Subtotal</dt>
              <dd id="carrito_resumen_subtotal" class="text-base font-medium text-gray-900">${{ $resumen["subtotal"] }} MXN</dd>
            </dl>

            <dl class="flex items-center justify-between gap-4">
              <dt class="text-base font-normal text-gray-500">Descuentos</dt>
              <dd id="carrito_resumen_descuento" class="text-base font-medium text-green-600">-${{ $resumen["descuento"] }} MXN</dd>
            </dl>
          </div>

          <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
            <dt class="text-base font-bold text-gray-900">Total</dt>
            <dd id="carrito_resumen_total" class="text-base font-bold text-gray-900">${{ $resumen["total"] }} MXN</dd>
          </dl>
        </div>

        <a href="/venta/confirmar" class="flex w-full items-center justify-center rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-400 focus:outline-none focus:ring-4 focus:ring-primary-300">Finalizar compra</a>


        <div class="flex items-center justify-center gap-2">
          <span class="text-sm font-normal text-gray-500"> or </span>
          <a href="{{ route("menu") }}" class="inline-flex items-center gap-2 text-sm font-medium text-quinary-700 underline hover:no-underline">
            Continuar comprando
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
          
  </section>
        

@endsection