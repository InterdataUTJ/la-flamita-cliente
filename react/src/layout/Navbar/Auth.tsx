import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link, useLocation } from "react-router";
import { AuthContextData } from "@/hooks/AuthContext/types";

const dropdownTheme = {
  content: "py-0", 
  floating: { 
    header: "block text-sm",
    item: { 
      base: "hover:bg-primary-100 hover:text-primary-900 flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-gray-700" 
    }
  }
};

const navTheme = {
  root: {
    base: "bg-white px-2 py-2.5 sm:px-4 shadow"
  },
  collapse: {
    list: "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-4 md:text-sm md:font-medium"
  },
  link: {
    base: "block py-2 pl-3 pr-4 md:px-3 md:py-2 rounded",
    active: {
      on: "bg-primary-600 text-white font-semibold md:bg-primary-100 md:text-primary-800",
      off: "border-b border-gray-100 text-black hover:bg-primary-100 md:border-0 md:hover:bg-transparent md:hover:text-primary-700"
    }
  } 
}

function format(text?: string) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export default function AuthNavbar({ auth }: { auth: AuthContextData }) {
  const location = useLocation();

  return (
    <Navbar fluid rounded theme={navTheme}>
      <Navbar.Brand as={Link} to="/">
        <img src="/favicon.png" className="h-8 mr-2" alt="La Flamita logo" />
        <span className="self-center text-2xl font-extrabold whitespace-nowrap">La Flamita</span>
      </Navbar.Brand>

      <div className="flex md:order-2 gap-2">
        <Dropdown
          arrowIcon={false}
          theme={dropdownTheme}
          inline
          label={
            <div className="flex items-center gap-2 text-sm bg-primary-100 rounded md:me-0 p-2 focus:ring-4 focus:ring-gray-300 hover:scale-105 transition duration-75">
              <span className="text-primary-800 font-bold hidden sm:inline">Cliente</span>
              <Avatar size="xs" alt="Avatar" img={auth.user?.avatar} rounded />
            </div>
          }
        >
          <Dropdown.Header>
            <span className="block px-4 py-3 bg-quinary-100 text-sm text-quinary-900 font-bold">Cliente</span>
            <span className="px-4 block text-sm text-gray-900 py-2">{format(auth.user?.nombre)} {format(auth.user?.apellido)}</span>
            <span className="px-4 border-b block text-sm pb-2 text-gray-500 truncate">{auth.user?.correo}</span>
          </Dropdown.Header>
          <Dropdown.Item as={Link} to="/perfil">Mi perfil</Dropdown.Item>
          <Dropdown.Item as={Link} to="/carrito">Mi carrito</Dropdown.Item>
          <Dropdown.Item as={Link} to="/venta/listar">Mis pedidos</Dropdown.Item>
          <Dropdown.Item onClick={auth.logout}>Cerrar sesión</Dropdown.Item>
        </Dropdown>

        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link as={Link} to="/" active={location.pathname === "/"}>Inicio</Navbar.Link>
        <Navbar.Link as={Link} to="/menu" active={location.pathname === "/menu"}>Menú</Navbar.Link>
        <Navbar.Link as={Link} to="/carrito" active={location.pathname === "/carrito"}>Carrito</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}