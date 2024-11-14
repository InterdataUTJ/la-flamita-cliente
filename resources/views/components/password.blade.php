@props(['name' => 'password', 'required' => true, 'minlength' => 8, 'maxlength' => 255, "placeholder" => "", "class" => "", "buttonClass" => "", "value" => ""])

<div class="flex">
  <input type="password" {{ $attributes->merge(["name" => $name, "placeholder" => $placeholder, "minlength" => $minlength, "maxlength" => $maxlength, "value" => $value]) }} {{ $required ? "required" : "" }} id="{{ $name }}" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 grow {{ $class }}" />
  <button type="button" class="bg-tertiary-700 hover:bg-tertiary-600 active:bg-tertiary-800 px-4 rounded-r-lg" onclick="togglePassword(this)">
    <i class="fa-regular fa-eye text-tertiary-100"></i>
  </button>
</div>