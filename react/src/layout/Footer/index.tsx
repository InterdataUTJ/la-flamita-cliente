import { Link } from "react-router";
import useAuthContext from "@/hooks/AuthContext/hook";

export default function Footer() {
  const auth = useAuthContext();

  return (
    <footer className="bg-white shadow border-t-2 border-gray-200 mt-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className={`flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse`}>
            <img src="/favicon.png" className="h-8" alt="La Flamita Logo" />
            <span className="self-center text-2xl font-extrabold whitespace-nowrap dark:text-white">
              La Flamita
            </span>
          </div>
          
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <Link to="/" className="hover:underline hover:text-primary-600 me-4 md:me-6">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:underline hover:text-primary-600 me-4 md:me-6">
                  Menú
                </Link>
              </li>
            { auth.token ? (
              <>
                <li>
                  <Link to="/perfil" className="hover:underline hover:text-primary-600 me-4 md:me-6">
                    Perfil
                  </Link>
                </li>
                <li>
                  <button type="button" onClick={auth.logout} className="hover:underline hover:text-primary-600 me-4 md:me-6">
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className="hover:underline hover:text-primary-600 me-4 md:me-6">
                  Iniciar sesión
                </Link>
              </li>
            )}
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
