@extends('plantillas.layout')

@section('titulo', 'Pedido #'.$venta->id)

@section('contenido')
    <h2 class="font-bold text-3xl mb-3">Pedido #{{ $venta->id }}</h2>

    @if ($venta->estado == 'PAGADO')
      <div class="p-4 border rounded shadow bg-white my-5">
        <h3 class="font-bold text-lg pb-1 mb-2 border-b-2 border-primary-700">¿Cómo recojo mi pedido?</h3>
        <ol class="list-decimal ml-8 my-2 marker:font-bold">
          <li>Acude a la sucursal de <span class="font-bold text-primary-700">La Flamita</span>.</li>
          <li>Presenta el siguiente código en la caja.</li>
        </ol>
        <p class="italic my-2"><b>Importante:</b> No compartas el código con nadie, solo muestralo al llegar a la caja.</p>
        
        <div class="bg-primary-600 text-white p-5 my-4 rounded-lg flex flex-col items-center justify-center gap-2">
          <img src="/api/pedido/token/{{ $venta->token }}" class="select-none" id="venta_token_barcode" alt="token">
          <p class="text-sm md:text-base lg:text-lg text-center font-bold tracking-wider">{{ $venta->token }}</p>
        </div>
      </div>
    @endif

    
    <div class="space-y-4 p-4 border rounded shadow bg-white my-5">
      <h3 class="font-bold text-lg pb-1 border-b-2 border-primary-700">Resumen</h3>
      <div class="space-y-2">
        <dl class="flex items-center justify-between gap-4">
          <dt class="text-base font-normal text-gray-500">Subtotal</dt>
          <dd id="carrito_resumen_subtotal" class="text-base font-medium text-gray-900">${{ $venta->getSubtotal() }} MXN</dd>
        </dl>

        <dl class="flex items-center justify-between gap-4">
          <dt class="text-base font-normal text-gray-500">Descuentos</dt>
          <dd id="carrito_resumen_descuento" class="text-base font-medium text-green-600">-${{ $venta->getDescuentos() }} MXN</dd>
        </dl>
      </div>

      <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
        <dt class="text-base font-bold text-gray-900">Total</dt>
        <dd id="carrito_resumen_total" class="text-base font-bold text-gray-900">${{ $venta->getTotal() }} MXN</dd>
      </dl>
    </div>

    <div class="flex flex-col gap-3 my-5">
      <h3 class="font-bold text-lg pb-1 border-b-2 border-primary-700">Productos</h3>
      @foreach ($venta->productos as $producto)
        
        <div class="flex gap-2 p-3 bg-white rounded shadow items-center">
          <img src="{{ $producto->producto_fotos->first()->url }}" alt="imagen" class="h-12 rounded">
          <span class="text-lg font-bold px-3">{{ $producto->nombre }}</span>
          <span class="text-lg font-semibold">
            @if ($producto->pivot->descuento > 0)
              <span class="line-through text-gray-500">${{ $producto->pivot->precio }} MXN</span>
            @endif
            ${{ number_format((float)$producto->pivot->precio - ($producto->pivot->precio * $producto->pivot->descuento / 100), 2, '.', '') }} MXN
          </span>
          <span class="text-lg font-light">x{{ $producto->pivot->cantidad }}</span>
        </div>
       
      @endforeach
    </div>


@endsection