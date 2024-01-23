import { useEffect } from "react";
import { useTickets } from "../context/TicketContext";
import TicketCard from '../components/TicketCard'

function TicketsPage() {
  const { getTickets, tickets } = useTickets();

  useEffect(() => {
    getTickets();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(tickets.length === 0 )return(<h1>No hay tickets</h1>)

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="py-10 text-3xl font-extrabold text-center">
          Tickets 
        </h2>
    <div className='p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4'>
      {tickets.map((ticket) => (
          <TicketCard ticket={ticket} key={ticket._id}/>
      ))}
    </div>
    </div>
  );
}

export default TicketsPage;
