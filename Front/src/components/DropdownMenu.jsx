import { Link } from "react-router-dom";

export const DropdownMenu = () => {
  return (
    <div className="absolute top-16 right-12 mt-2 w-32 bg-slate-800 shadow-lg z-10">
      <ul>
        <li>
        <Link
          to="/ticketdni"
          className="block px-4 py-2 font-semibold hover:bg-slate-900 cursor-pointer"
        >
          Dni
        </Link>
        </li>
        <li>
        <Link 
        to="/ticketserie"
        className="block px-4 py-2 font-semibold hover:bg-slate-900 cursor-pointer">
        Serie
        </Link></li>
        <li>
        <Link 
        to="/ticketservice"
        className="block px-4 py-2 font-semibold hover:bg-slate-900 cursor-pointer">
        Servicio
        </Link>  
        </li>
      </ul>
    </div>
  );
};
