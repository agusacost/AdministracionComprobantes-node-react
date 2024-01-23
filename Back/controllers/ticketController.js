const Ticket = require('../models/Ticket.js');
const Contador = require('../models/Contador.js');

//agrega un ticket
async function obtenerSeguimientoActual(){
    let contador = await Contador.findOne();
    if(!contador){
        contador = new Contador({numeroSeguimientoActual: 1});
        await contador.save();
    }
    return contador;

}

exports.nuevoTicket = async (req,res,next)=>{
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
        //almacenar
        await ticket.save();
        contador.numeroSeguimientoActual +=1;
        await contador.save();
        res.json({mensaje: 'se agrego nuevo ticket'});
    } catch (error) {
        //si hay error next
        console.log(error);
        next();
    }
}

//muestra los tickets
exports.mostrarTicket = async(req,res,next)=>{
    try {
        const ticket = await Ticket.find({}).populate('user','user');
        res.json(ticket);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.mostrarTicketId = async(req,res,next) =>{
    const ticket = await Ticket.findById(req.params.idTicket);
    try {
        res.json(ticket);
    } catch (error) {
        res.json({mensaje: 'No se encuentra el ticket'});
        next();
    }
}

//actualizar ticket
exports.actualizarTicket = async(req,res,next) =>{
    try {
        const ticket = await Ticket.findOneAndUpdate({_id : req.params.idTicket},req.body,{
            new:true
        });
        res.json(ticket);
    } catch (error) {
        res.send(error);
        next();
    }
}

//eliminar ticket
exports.eliminarTicket = async(req,res,next) =>{
    try {
        const ticket = await Ticket.findByIdAndDelete({_id: req.params.idTicket});
        if(!ticket) return res.status(404).json({mensaje: 'Ticket no encontrado'})
        return res.sendStatus(204);
    } catch (error) {
        return res.status(404).json({mensaje: 'Ticket no encontrado'})
        next();
    }
}

//buscar ticket por serie

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