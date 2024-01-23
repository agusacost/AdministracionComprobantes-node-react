import { useState } from "react";
import { useTickets } from "../context/TicketContext.jsx";
import TicketCard from "../components/TicketCard.jsx";

function ClientePage() {
  const {getTicketByDni} = useTickets();
  const [ticketDni, setTicketDni] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  

  const handleSubmit = async (event) =>{
    event.preventDefault();
    try {
      const response = await getTicketByDni(ticketDni);
      setResult(response);
      setError('')
    } catch (error) {
      setError('No se encuentra un ticket asociado al dni');
      setResult(null)
    }
  }
  

    return (
        <div className="max-w-md mx-auto p-4 mt-24 mb-96">
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="mb-4 flex items-center">
            <label className="mr-2">Dni: </label>
            <input
              type="number"
              placeholder="Ingrese el DNI"
              value={ticketDni}
              onChange={(e)=>setTicketDni(e.target.value)}
              className="border rounded py-1 px-2 w-40 sm:w-auto"
            />
            </div>
            <button type="submit" className="bg-gray-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Buscar</button>
          </form>
          {error && <p className="text-red-500 font-bold text-center"> *{error}</p>}
          {result && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-center">Ticket</h2>
              <TicketCard ticket={result.data.data} key={result._id} />
            </div>
          )}
          
        </div>
    );
}

export default ClientePage;