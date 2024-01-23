import { useState } from "react"
import { useTickets } from "../context/TicketContext"
import TicketCard from "../components/TicketCard"

export const FindTicketService = () => {
    const {getTicketByService} = useTickets();
    const [ticketService, setTicketService] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try {
          const response = await getTicketByService(ticketService);
          setResult(response);
          setError('')
        } catch (error) {
          setError('No se encuentra ticket asociado a la servicio');
          setResult(null)
        }
    }

  return (
    <div className="max-w-md mx-auto p-4 mt-24 mb-96">
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="mb-4 flex items-center">
            <label className="mr-2">Numero de Servicio: </label>
            <input
              type="text"
              placeholder="Ingrese el numero de servicio"
              value={ticketService}
              onChange={(e)=>setTicketService(e.target.value)}
              className="border rounded py-1 px-2 w-40 sm:w-auto"
            />
            </div>
            <button type="submit" className="bg-gray-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Buscar</button>
          </form>
          {error && <p className="text-red-500 font-bold text-center mt-8"> *{error}</p>}
          {result && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4 text-center">Ticket</h2>
              <TicketCard ticket={result.data.data} key={result._id} />
            </div>
          )}
        </div>
  )
}

export default FindTicketService;