@props(['categorias'])


@php
  $rCategorias = request()->c;
  if (!$rCategorias) $rCategorias = [];
@endphp

<dialog id="filterModal" class="rounded">
  <header class="flex gap-2 min-w-64 p-3 bg-quinary-100">
    <h2 class="text-lg font-bold grow">Filtros</h2>
    <button class="transition hover:scale-110" autofocus onclick="document.getElementById('filterModal').close();">
      <i class="fa-solid fa-xmark"></i>
    </button>
  </header>
  <form action="/" method="GET" class="p-5">
    @if(request()->has("o"))
      <input type="hidden" name="o" value="{{ request()->o }}">
    @endif
    @foreach ($categorias as $categoria)
        <h2 class="font-semibold text-lg mb-2 pb-1 border-b-2 border-primary-700 max-w-prose">{{ $categoria->nombre }}</h2>

        <div class="mb-4">
          @foreach ($categoria->categoria_datos as $dato)
            <div class="flex items-center mb-1">
              <input name="c[{{ $categoria->id }}][{{ $dato->id }}]" id="{{ $categoria->nombre }}-{{ $dato->nombre }}" value="." type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-primary-500 focus:border-primary-400 accent-primary-500 text-primary-500" {{ !in_array($categoria->id, array_keys($rCategorias)) || in_array($dato->id, array_keys($rCategorias[$categoria->id])) ? "checked" : "" }} >
              <label for="{{ $categoria->nombre }}-{{ $dato->nombre }}" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ $dato->nombre }}</label>
            </div>
          @endforeach
        </div>
    @endforeach

    <button type="submit" class="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-500 active:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300">
      <i class="fa-solid fa-filter"></i>
      Aplicar
    </button>
  </form>
</dialog>