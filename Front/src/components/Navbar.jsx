import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext'
import { DropdownMenu } from "./DropdownMenu";
import { useState } from "react";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [openFind, setOpenFind] = useState(false);

  return (
    <nav className="bg-gray-800 text-white flex justify-between py-5 px-10 ">
      <h1 className="text-2xl font-bold">
        <Link to="/tickets">Gestor Tickets</Link>
      </h1>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>
              <Link
                to="/tickets"
                className=" px-4 py-1 rounded hover:bg-slate-400 text-white font-semibold"
              >
                Tickets
              </Link>
            </li>
            <li>
              <Link
                to="/add-tickets"
                className=" px-4 py-1 rounded hover:bg-slate-400 text-white font-semibold"
              >
                Crear
              </Link>
            </li>
            <li
              className="px-4 rounded text-white font-semibold cursor-pointer relative"
              onClick={() => setOpenFind((prev)=> !prev)}
            >
              Buscar
            </li>
            <li>
              <Link
                to="/login"
                onClick={() => {
                  logout();
                }}
                className="bg-red-500 px-4 py-1 rounded hover:bg-red-400 text-white font-semibold"
              >
                Salir
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/solicitud">
                Soy cliente
              </Link>
            </li>
          </>
        )}
      </ul>
      {openFind && <DropdownMenu />}
    </nav>
  );
}

export default Navbar;
