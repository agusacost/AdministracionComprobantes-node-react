//rutas tickets
import axios from "./axios.js";

export const getTicketsRequest = () => axios.get("/tickets");

export const getTicketRequest = (id) => axios.get(`/tickets/${id}`);

export const getTicketClientRequest = (id) => axios.get(`/solicitud/${id}`);

export const getTicketDni = (dni) => axios.post("/ticketdni", {dni});

export const getTicketSerie = (serie) => axios.post("/ticketserie", {serie});

export const getTicketServicio = (seguimiento) => axios.post("/ticketservice", {seguimiento});

export const createTicketRequest = (ticket) =>
  axios.post("/add-tickets", ticket);

export const updateTicketsRequest = (id, ticket) =>
  axios.put(`/tickets/${id}`, ticket);

export const deleteTicketsRequest = (id) => axios.delete(`/tickets/${id}`);
