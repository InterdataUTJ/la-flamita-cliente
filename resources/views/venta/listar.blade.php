@extends("plantillas.layout")

@section("titulo", "Mis pedidos")

@section("contenido")
  
@if($pedidos->isEmpty())   
  No existen pedidos
@else
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-quinary-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="text-center px-6 py-3">
                    #
                </th>
                <th scope="col" class="text-center px-6 py-3">
                    Fecha
                </th>
                <th scope="col" class="text-center px-6 py-3">
                    Metodo de pago
                </th>
                <th scope="col" class="text-center px-6 py-3">
                    Total
                </th>
                <th scope="col" class="text-center px-6 py-3">
                    Productos
                </th>
                <th scope="col" class="text-center px-6 py-3">
                    Estado
                </th>
                <th scope="col" class="text-center px-6 py-3">
                    Acción
                </th>
            </tr>
        </thead>
        <tbody>
            @foreach($pedidos as $pedido)
            <tr pedido="{{ $pedido->id }}" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" class="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {{$pedido->id}}
                </th>
                <th campo="nombre" scope="row" class="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{$pedido->fecha_venta}}
                </th>
                <td class="text-center px-6 py-4">
                    {{$pedido->metodo_pago}}
                </td>
                <td class="text-center px-6 py-4">
                    ${{$pedido->getTotal()}} MXN
                </td>
                <td class="text-center px-6 py-4">
                    {{$pedido->getNumeroProductos()}}
                </td>
                <td class="text-center px-6 py-4">
                    {{ $pedido->estado === "COMPLETADO" ? "Completado" : "Por recoger" }}
                </td>
                <td class="text-center px-6 py-4 flex gap-4 justify-center items-center">
                  <a href="/venta/{{$pedido->id}}">
                    <i class="fa-regular fa-eye fa-lg text-quaternary-500 hover:scale-105"></i>
                  </a>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
  </div>
  <div class="grid justify-items-center gap-4 mt-4">
      {{ $pedidos->links() }}
  </div>
@endif
@endsection