@props(['id' => '0', 'cantidad' => 0, 'nombre' => "Producto", 'descripcion' => '', 'precio' => 0, 'descuento' => 0, 'imagen' => "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"])

<div class="rounded-lg border grow bg-white p-6 flex flex-col">
  <div class="h-56 w-full">
    <a href="/producto/{{ $id }}">
      <img loading="lazy" class="mx-auto h-full rounded object-contain" src="{{ $imagen }}" alt="{{ $nombre }}" />
    </a>
  </div>
  <div class="pt-6 flex flex-col grow">
    @if ($descuento > 0)
      <div class="mb-4 flex items-center justify-between gap-4">
        <span class="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300"> {{ $descuento + 0 }}% descuento </span>
      </div>
    @endif

    <a href="/producto/{{ $id }}" class="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">{{ $nombre }}</a>

    <p class="line-clamp-2 grow">{{ $descripcion }}</p>

    
    <p class="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white mt-4">${{ $precio }}</p>


    <div class="mt-4 flex items-center justify-between gap-4">

      @if ($cantidad <= 0)
        <button type="button" class="grayscale-[30%] rounded-lg bg-red-500 px-5 py-2.5 text-sm font-medium text-white cursor-not-allowed">
          Agotado
        </button>
      @elseif (auth()->guard("cliente")->check())
        <input type="number" id="add_carrito_producto_{{ $id }}" class="w-3/12 h-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5" value="1" />
        <button type="button" onclick="Carrito.add(this, {{ $id }});" class="grow inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-500 active:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300">
          <i class="fa-solid fa-cart-plus"></i>
          Añadir al carrito
        </button>
      @endif
    </div>
  </div>
</div>