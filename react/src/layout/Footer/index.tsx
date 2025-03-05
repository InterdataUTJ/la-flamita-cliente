export default function Footer() {
  return (
    <footer className="bg-white shadow dark:bg-gray-900 mt-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src="/favicon.png" className="h-8" alt="La Flamita Logo" />
            <span className="self-center text-2xl font-extrabold whitespace-nowrap dark:text-white">
              La Flamita
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a className="hover:underline hover:text-primary-600 me-4 md:me-6">
                Panel
              </a>
            </li>
            <li>
              <a className="hover:underline hover:text-primary-600 me-4 md:me-6">
                Perfil
              </a>
            </li>
            <li>
              <button className="hover:underline hover:text-primary-600 me-4 md:me-6">
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-primary-400 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © { new Date().getFullYear() + " " }
          <a className="hover:underline">La Flamita™</a>
        </span>
      </div>
    </footer>
  );
}
