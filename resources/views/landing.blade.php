@extends('plantillas.layout')

@section("titulo", "La Flamita")

@section("contenido.arriba")
<div class="flex flex-col justify-center items-center w-full select-none">
  <h3 class="text-white text-5xl font-extrabold bg-primary-500 w-full pt-10 pb-20 text-center">La Flamita</h3>
  <img src="/images/waves.svg" class="w-full select-none">
</div>
@endsection

@section("contenido")

<h2 class="font-bold text-2xl mt-8 mb-5 pb-2 border-b-2 border-quinary-700">Sobre nosotros</h2>

<h2 class="font-bold text-2xl mt-8 mb-5 pb-2 border-b-2 border-quinary-700">Nuestras instalaciones</h2>

<div id="default-carousel" class="relative w-full" data-carousel="slide">
  <!-- Carousel wrapper -->
  <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
       <!-- Item 1 -->
      <div class="hidden duration-700 ease-in-out" data-carousel-item>
          <img src="https://lh3.googleusercontent.com/p/AF1QipNNOXoFaFy138z_2-8WyNVHD1xWC9dqfVbVCa72=s1360-w1360-h1020" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
      </div>
      <!-- Item 2 -->
      <div class="hidden duration-700 ease-in-out" data-carousel-item>
          <img src="https://lh3.googleusercontent.com/p/AF1QipOTcD-zJ6Zhzynj04SbKQ6yl3dyUQXcxIFnnPie=s1360-w1360-h1020" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
      </div>
      <!-- Item 3 -->
      <div class="hidden duration-700 ease-in-out" data-carousel-item>
          <img src="https://lh3.googleusercontent.com/p/AF1QipNnPPsvdnnslREZqT36qZPcSidMd2grSb8_DIOs=s1360-w1360-h1020" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
      </div>
      <!-- Item 4 -->
      <div class="hidden duration-700 ease-in-out" data-carousel-item>
          <img src="https://lh3.googleusercontent.com/p/AF1QipM6xszwY1YVswx3pgJKAMEvwUE7G1dUHgwlVNsy=s1360-w1360-h1020" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
      </div>
      <!-- Item 5 -->
      <div class="hidden duration-700 ease-in-out" data-carousel-item>
          <img src="https://lh3.googleusercontent.com/p/AF1QipMC-uHytfN6-63UNLXRlJNXfCOeBprHABAvAT1e=s1360-w1360-h1020" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
      </div>
  </div>
  <!-- Slider indicators -->
  <div class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
      <button type="button" class="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
      <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
      <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
      <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
      <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
  </div>
  <!-- Slider controls -->
  <button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
      <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
          </svg>
          <span class="sr-only">Previous</span>
      </span>
  </button>
  <button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
      <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
          </svg>
          <span class="sr-only">Next</span>
      </span>
  </button>
</div>



<h2 class="font-bold text-2xl mt-8 mb-5 pb-2 border-b-2 border-quinary-700">Nuestra ubicación</h2>

<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d933.0766692172259!2d-103.35342583045355!3d20.69776765335163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428b1da297f251d%3A0x942606954ffc753a!2sTaquer%C3%ADa%20La%20Flamita!5e0!3m2!1ses!2smx!4v1731893295444!5m2!1ses!2smx" width="100%" height="500px" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="rounded-lg border shadow"></iframe>


@endsection