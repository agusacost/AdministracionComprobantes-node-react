import { useTickets } from "../context/TicketContext";
import {Link} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

/* eslint-disable react/prop-types */
const TicketCard = ({ ticket }) => {
  const { deleteTicket } = useTickets();
  const {isAuthenticated} = useAuth();

  return (
    <div className="border rounded-md p-4 bg-slate-300 shadow-md">
      <h2 className="text-xl font-bold mb-2">{ticket.seguimiento}</h2>
      <p className="my-1">{"Serie: " + ticket.serie}</p>
      <p className="my-1">{"DNI: " + ticket.dni}</p>
      <p className="my-1">{"Nombre: " + ticket.apellido + " " + ticket.nombre}</p>
      <p className="my-1">{"Colegio: " + ticket.colegio }</p>
      <p className="my-1">{"Observaciones: " + ticket.observaciones }</p>
      <p className="my-1">{"Fecha: " + new Date(ticket.date).toLocaleDateString()}</p>
      <div>
        {ticket.listo == false ? <p>Estado: pendiente </p> : <p>Estado: Listo </p>}
      </div>
      {isAuthenticated ? (
      <div className="flex justify-center gap-4 items-center">
        <Link to={`/tickets/${ticket._id}`} className='bg-green-500 px-4 py-1 rounded hover:bg-slate-400 text-white font-semibold'>Editar</Link>
        <button
          onClick={() => {
            deleteTicket(ticket._id);
          }}
          className='bg-red-500 px-4 py-1 rounded hover:bg-red-400 text-white font-semibold'
        >
          Eliminar
        </button>
      </div>
      ) : (<p></p>)}
    </div>
  );
};

export default TicketCard;
