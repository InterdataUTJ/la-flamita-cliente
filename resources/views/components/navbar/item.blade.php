@props(['url', 'label' => 'Item'])

@php
  $activo = str_starts_with("/".Request::path(), $url);
  if ($url == "/") $activo = Request::path() == $url;
@endphp

<a href="{{ $url }}" 
  @if ($activo)
    class="block py-2 px-3 text-white bg-primary-600 rounded md:bg-transparent md:text-primary-700 md:p-0"
    aria-current="page"
  @else
    class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-500 md:p-0 dark:text-white md:dark:hover:text-primary-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
  @endif
>
  {{ $label }}
</a>