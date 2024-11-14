<div class="fixed top-5 right-5 z-10 flex flex-col gap-1" id="toast-container">
    @isset($errors)
        @foreach ($errors->all() as $index => $error)
            
            <div id="toast-error-{{ $index }}" class="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                    <img class="w-5 h-5" src="/images/logo.svg" alt="">
                </div>
                <div class="ms-3 text-sm font-normal" id="div-toast-error-{{ $index }}">{{ $error }}</div>
                <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-error-{{ $index }}" aria-label="Close">
                    <span class="sr-only">Close</span>
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        @endforeach
    @endisset
</div>