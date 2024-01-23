import { useForm } from "react-hook-form";
import { useTickets } from "../context/TicketContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";  

function TicketFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTicket, getTicketId, updateTicket } = useTickets(); 
  const navigate = useNavigate();
  const params = useParams();

  useEffect(()=>{
    async function loadTicket(){
      if(params.id){
        const ticket = await getTicketId(params.id);
        setValue('nombre', ticket.nombre)
        setValue('apellido', ticket.apellido)
        setValue('colegio', ticket.colegio)
        setValue('dni', ticket.dni)
        setValue('serie', ticket.serie)
        setValue('observaciones', ticket.observaciones)
        setValue('listo', ticket.listo)
      }
    }
    loadTicket()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  const onSubmit = handleSubmit((data) => {
    if(params.id) {
      data.listo = !!data.listo
      updateTicket(params.id, data)
    }else{
      createTicket(data);
      
    }
    navigate('/tickets');
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center">
      <div className="w-full md:w-1/2">
        <h2 className="py-10 text-3xl font-extrabold text-center">
          Crear Ticket
        </h2>
        <form
          onSubmit={onSubmit}
          className="bg-slate-50 px-8 pt-6 pb-8 mb-4 rounded"
          action=""
        >
          <div className="mb-4">
            <div className="grid grid-flow-row sm:grid-flow-col gap-3">
              <div className="sm:col-span-4 justify-center">
                <input
                  className="mb-2 mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Nombre"
                  {...register("nombre")}
                  autoFocus
                />
                <input
                  className="mb-2 mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Apellido"
                  {...register("apellido")}
                  autoFocus
                />
                <input
                  className="mb-2 mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Colegio"
                  {...register("colegio")}
                  autoFocus
                />
                <input
                  className="mb-2 mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  type="text"
                  placeholder="DNI"
                  {...register("dni")}
                  autoFocus
                />
                <input
                  className="mb-2 mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Numero de serie"
                  {...register("serie")}
                  autoFocus
                />
                <input
                  className="mb-2 mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Observaciones"
                  {...register("observaciones")}
                  autoFocus
                />
              <div className="m-2 text-gray-700">
              <label>Listo </label>
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-500 border-2 border-gray-300 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300" {...register("listo")}/>
              </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-400 hover:bg-blue-700 text-white font-bold py-3 cursor-pointer rounded"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export default TicketFormPage;
