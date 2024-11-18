@extends('plantillas.layout')

@section("titulo", "Menú")

@section("contenido")
<h2 class="text-center font-extrabold text-3xl mb-2">Menú</h2>

<section class="antialiased">
  <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
    <!-- Heading & Filters -->
    <div class="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
      <div class="flex items-center space-x-4">
        <button onclick="document.getElementById('filterModal').showModal();" type="button" class="flex gap-2 w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-800 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 sm:w-auto">
          <i class="fa-solid fa-filter"></i>
          Filtros
          <i class="fa-solid fa-chevron-down"></i>
        </button>
        <button id="sortDropdownButton1" data-dropdown-toggle="dropdownSort1" type="button" class="flex gap-2 w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-800 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 sm:w-auto">
          <i class="fa-solid fa-arrow-up-z-a"></i>
          Ordenar
          <i class="fa-solid fa-chevron-down"></i>
        </button>
        @if (Auth::check())
        <a href="/carrito" class="flex gap-2 w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-800 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 sm:w-auto">
          <i class="fa-solid fa-cart-shopping"></i>
          <span id="carrito-numero">{{ $carritoCantidad }}</span>
        </a>
        @endif
        <div id="dropdownSort1" class="z-50 hidden w-40 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700" data-popper-placement="bottom">
          <ul class="p-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400" aria-labelledby="sortDropdownButton">
            @if(request()->has("o") && request()->o == "nA")
              <li>
                <a href="{{ request()->fullUrlWithQuery([ "o" => "nD" ]) }}" class="group inline-flex w-full gap-2 items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-primary-800 {{ request()->o == "nA" ? "bg-primary-100 text-primary-800" : "" }}" >
                  <i class="fa-solid fa-arrow-up-long"></i>
                  Nombre
                </a>
              </li>
            @else
              <li>
                <a href="{{ request()->fullUrlWithQuery([ "o" => "nA" ]) }}" class="group inline-flex w-full gap-2 items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-primary-800 {{ request()->o == "nD" ? "bg-primary-100 text-primary-800" : "" }}">
                  <i class="fa-solid fa-arrow-down-long"></i>
                  Nombre
                </a>
              </li>
            @endif
            @if(request()->has("o") && request()->o == "pA")
              <li>
                <a href="{{ request()->fullUrlWithQuery([ "o" => "pD" ]) }}" class="group inline-flex w-full gap-2 items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-primary-800 {{ request()->o == "pA" ? "bg-primary-100 text-primary-800" : "" }}" >
                  <i class="fa-solid fa-arrow-up-long"></i>
                  Precio
                </a>
              </li>
            @else
              <li>
                <a href="{{ request()->fullUrlWithQuery([ "o" => "pA" ]) }}" class="group inline-flex w-full gap-2 items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-primary-800 {{ request()->o == "pD" ? "bg-primary-100 text-primary-800" : "" }}">
                  <i class="fa-solid fa-arrow-down-long"></i>
                  Precio
                </a>
              </li>
            @endif
          </ul>
        </div>
      </div>
    </div>

    
    <x-menu.filtro :categorias="$categorias" />

    <!-- Products -->
    <div class="mb-4 grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">

      @foreach ($productos as $producto)

        <x-menu.item id="{{ $producto->id }}" nombre="{{ $producto->nombre }}" descuento="{{ $producto->descuento }}" precio="{{ $producto->precio }}" imagen="{{ $producto->producto_fotos->first()->url }}" descripcion="{{ $producto->descripcion }}" cantidad="{{ $producto->existencias }}" />
          
      @endforeach
      
    </div>
    
  </div>

</section>
@endsection