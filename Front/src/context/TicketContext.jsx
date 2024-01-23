/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";
import {
  createTicketRequest,
  getTicketRequest,
  getTicketsRequest,
  deleteTicketsRequest,
  updateTicketsRequest,
  getTicketDni,
  getTicketSerie,
  getTicketServicio,
} from "../api/tickets.js";

export const TicketContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useTickets = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function TicketProvider({ children }) {
  const [tickets, setTickets] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [ticketDni, setTicketDni] = useState(null);
  
  const getTickets = async () => {
    try {
      const res = await getTicketsRequest();
      setTickets(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTicketId = async (id) => {
    try {
      const res = await getTicketRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getTicketByDni = async (dni) =>{
      try {
        const res = await getTicketDni(dni);
        return res;
      } catch (error) {
        throw new Error('Error al buscar ticket por dni');
      }
  }

  const getTicketBySerie = async (dni) =>{
    try {
      const res = await getTicketSerie(dni);
      return res;
    } catch (error) {
      throw new Error('Error al buscar ticket por dni');
    }
  }
  
  const getTicketByService = async (seguimiento)=>{
    try {
      const res = await getTicketServicio(seguimiento);
      return res;
    } catch (error) {
      throw new Error('Error al buscar ticket por servicio tecnico');
    }
  }

  const createTicket = async (ticket) => {
    const res = await createTicketRequest(ticket);
    console.log(res);
  };

  const deleteTicket = async (id) => {
    try {
      const res = await deleteTicketsRequest(id);
      console.log(res);
      if (res.status === 204)
        setTickets(tickets.filter((ticket) => ticket._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const updateTicket = async (id, ticket) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await updateTicketsRequest(id, ticket);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        createTicket,
        getTickets,
        getTicketId,
        deleteTicket,
        updateTicket,
        getTicketByDni,
        getTicketBySerie,
        getTicketByService,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}
