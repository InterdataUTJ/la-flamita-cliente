<footer class="bg-white shadow dark:bg-gray-900 mt-4">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
            <a href="{{ route("landing") }}" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <img src="/images/logo.svg" class="h-8" alt="La Flamita Logo" />
                <span class="self-center text-2xl font-extrabold whitespace-nowrap dark:text-white">La Flamita</span>
            </a>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="{{ route("landing") }}" class="hover:underline hover:text-primary-600 me-4 md:me-6">Inicio</a>
                </li>
                <li>
                    <a href="{{ route("menu") }}" class="hover:underline hover:text-primary-600 me-4 md:me-6">Menú</a>
                </li>
                @if (Auth::check())
                    <li>
                        <a href="{{ route("carrito") }}" class="hover:underline hover:text-primary-600 me-4 md:me-6">Carrito</a>
                    </li>
                    <li>
                        <form action="{{ route("logout") }}" method="POST">
                            @csrf
                            <button type="submit" class="hover:underline hover:text-primary-600 me-4 md:me-6">Cerrar sesión</a>
                        </form>
                    </li>
                @else
                    <li>
                        <a href="{{ route("cliente.login") }}" class="hover:underline hover:text-primary-600 me-4 md:me-6">Iniciar sesión</a>
                    </li>
                @endif
            </ul>
        </div>
        <hr class="my-6 border-primary-400 sm:mx-auto lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© {{ date("Y") }} <a href="{{ route("landing") }}" class="hover:underline">La Flamita™</a></span>
    </div>
</footer>

