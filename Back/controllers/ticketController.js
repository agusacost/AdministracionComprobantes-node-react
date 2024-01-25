const Ticket = require('../models/Ticket.js');
const Contador = require('../models/Contador.js');

//incrementa el contador para asignarlo al ticket
//no se exporta porque se usa unicamente en ticketController
async function obtenerSeguimientoActual(){
    let contador = await Contador.findOne();
    if(!contador){
        contador = new Contador({numeroSeguimientoActual: 1});
        await contador.save();
    }
    return contador;

}

//Agrega un nuevo ticket
//obtien datos desde un formulario
exports.nuevoTicket = async (req,res)=>{
    try {
        const {nombre,apellido,colegio,dni,date,serie,observaciones}=req.body;
        const contador = await obtenerSeguimientoActual();
        let numeroSeguimiento = `ST-${String(contador.numeroSeguimientoActual).padStart(6,'0')}`;
        const ticket  = new Ticket({
            seguimiento: numeroSeguimiento,
            nombre,
            apellido,
            colegio,
            dni,
            date,
            serie,
            observaciones,
            listo: false,
            user: req.user.id
        });
        //almacena en bd
        await ticket.save();
        //actualiza contador y almacena en bd
        contador.numeroSeguimientoActual +=1;
        await contador.save();
        res.status(200).json({status:'succes',mensaje: 'se agrego nuevo ticket'});
    } catch (error) {
        return res.status(400).json({status:'error', mensaje: error})
    }
}

//Extrae los datos de la bd
exports.mostrarTicket = async(req,res)=>{
    try {
        const ticket = await Ticket.find({}).populate('user','user');
        res.status(200).json(ticket);
    } catch (error) {
        return res.status(404).json({status: 'error', mensaje: 'Error en la busqueda'});
    }
}

//Extrae datos de un ticket por su id
//Obtiene el id por url
exports.mostrarTicketId = async(req,res) =>{
    const ticket = await Ticket.findById(req.params.idTicket);
    try {
        res.status(200).json(ticket);
    } catch (error) {
        return res.status(404).json({status: 'error', mensaje: 'Error en la busqueda'});
    }
}

//actualizar ticket
//recibe el id por parametro
//new:true devuelve el ticket actualizadp
exports.actualizarTicket = async(req,res,next) =>{
    try {
        const ticket = await Ticket.findOneAndUpdate({_id : req.params.idTicket},req.body,{
            new:true
        });
        res.status(200).json(ticket);
    } catch (error) {
        return res.status(404).json({status: 'error', mensaje: 'Error al actualizar'});
    }
}

//eliminar ticket
//lo elimina por id que recibe como parametro
exports.eliminarTicket = async(req,res) =>{
    try {
        const ticket = await Ticket.findByIdAndDelete({_id: req.params.idTicket});
        if(!ticket) return res.status(404).json({mensaje: 'Ticket no encontrado'})
        return res.sendStatus(204);
    } catch (error) {
        return res.status(404).json({mensaje: 'Ticket no encontrado'})
    }
}

//buscar ticket por dni
//busca por formulario
exports.buscarTicketDni = async(req,res)=>{
    try {
        const {dni} = req.body;
        const ticketFound = await Ticket.findOne({dni,});
        if(!ticketFound) return res.status(404).json({mensaje: 'Ticket no encontrado'});

        return res.status(200).json({status: 'success', data: ticketFound});
    } catch (error) {
        return res.status(404).json({status: 'error', mensaje:'Error en la busqueda'})
    }
}

//buscar ticket por serie
//busca por formulario
exports.buscartTicketSerie = async(req,res) =>{
    try {
        const {serie} = req.body;
        const ticketFound = await Ticket.findOne({serie,});
        if(!ticketFound) return res.status(404).json({mensaje: 'Ticket no encontrado'});

        return res.status(200).json({status: 'succes', data: ticketFound});
    } catch (error) {
        return res.status(404).json({status: 'error', mensaje: 'Error en la busqueda'});
    }
}

//buscar ticket por num de servicio
//busca por formulario
exports.buscarTicketServicio = async(req,res)=>{
    try {
        const {seguimiento} = req.body;
        const ticketFound = await Ticket.findOne({seguimiento,});
        if(!ticketFound) return res.status(404).json({mensaje: 'Ticket no encontrado'});

        return res.status(200).json({status: 'succes', data: ticketFound});
    } catch (error) {
        return res.status(404).json({status:'error', mensaje: 'Error en la busqueda'});
    }
}