import { Navbar as FlowbiteNavbar } from "flowbite-react";
import { Link } from "react-router";
import AuthNavbar from "./Auth";
import useAuthContext from "@/hooks/AuthContext/hook";


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


export default function Navbar() {
  const auth = useAuthContext();
  if (auth.token) return <AuthNavbar auth={auth} />;
  
  return (
    <FlowbiteNavbar fluid rounded theme={navTheme}>
      <FlowbiteNavbar.Brand as={Link} to="/">
        <img src="/favicon.png" className="h-8 mr-2" alt="La Flamita logo" />
        <span className="self-center text-2xl font-extrabold whitespace-nowrap">La Flamita</span>
      </FlowbiteNavbar.Brand>

      <div className="flex md:order-2 gap-2">
        <FlowbiteNavbar.Toggle />
      </div>

      <FlowbiteNavbar.Collapse>
        <FlowbiteNavbar.Link as={Link} to="/" active={location.pathname === "/"}>Inicio</FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link as={Link} to="/menu" active={location.pathname === "/menu"}>Menú</FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link as={Link} to="/login" active={location.pathname === "/login"}>Iniciar sesión</FlowbiteNavbar.Link>
      </FlowbiteNavbar.Collapse>
    </FlowbiteNavbar>
  );
}