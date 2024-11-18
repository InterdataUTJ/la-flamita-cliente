@extends("plantillas.layout")

@section("contenido")

<section class="py-8 flex flex-col gap-8 lg:flex-row">
  <div class="flex flex-col gap-4 mx-auto md:w-[60%] lg:mx-0 lg:w-96">
    <img id="producto_imagen_main" class="shadow border inline-block w-full aspect-[4/3] object-contain rounded" src="{{ $producto->producto_fotos->first()->url }}" alt="">

    <div class="flex gap-4 h-16 w-full overflow-x-auto">
      @foreach ($producto->producto_fotos as $foto)
        <img onmouseover="Producto.imagen.onMouse(this);" class="h-full w-auto rounded border cursor-pointer hover:border-primary-500 shadow" src="{{ $foto->url }}" alt="">
      @endforeach
    </div>
  </div>

  <div class="flex flex-col gap-2 grow">
    <p class="font-bold text-3xl">{{ $producto->nombre }}</p>

    @if ($producto->descuento > 0)
      <div class="mb-2 flex items-center justify-between gap-4">
        <span class="select-none rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-900"> {{ $producto->descuento + 0 }}% descuento </span>
      </div>
    @endif

    <p class="font-extrabold text-primary-900 text-2xl">
      @if ($producto->descuento > 0)
        <span class="line-through text-gray-500">${{ $producto->precio }} MXN</span>
      @endif
      <span>${{ number_format((float)$producto->precio - ($producto->precio * $producto->descuento / 100), 2, '.', '') }} MXN</span>
    </p>

    @if (Auth::check())
      <section class="mt-4 flex items-center justify-between gap-4">
        <input type="number" id="add_carrito_producto_{{ $producto->id }}" class="w-3/12 h-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5" value="1" min="1" />
        <button type="button" onclick="Carrito.add(this, {{ $producto->id }});" class="grow inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-500 active:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300">
          <i class="fa-solid fa-cart-plus"></i>
          Añadir al carrito
        </button>
      </section>
    @endif

    <h2 class="font-bold text-base mt-4 pb-1 border-b-2 border-primary-700 max-w-prose">Categorías</h2>
    <section class="flex gap-2 flex-wrap">
      @foreach ($producto->categoria_datos as $categoria)
        <span class="select-none py-1 px-2 text-sm rounded-lg bg-primary-200 font-semibold text-primary-900">{{ $categoria->nombre }}</span>
      @endforeach
    </section>
    
    <p class="mt-5">{{ $producto->descripcion }}</p>
  </div>
</section>

@endsection