@extends("plantillas.layout")

@section("titulo", "Compra exitosa")

@section("contenido")

  <h2 class="text-center font-extrabold text-3xl my-2">Gracias por tu compra!!</h2>
  <p class="text-center text-xl my-4">Puedes recoger tu pedido siguiendo las instrucciones del pedido:</p>

  <a href="/venta/{{ $venta->id }}" class="flex my-4 gap-2 items-center justify-center w-full focus:outline-none text-white bg-primary-600 hover:bg-primary-500 focus:ring-4 focus:ring-primary-400 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
    <i class="fa-solid fa-bag-shopping"></i>
    Ver pedido
  </a>

@endsection