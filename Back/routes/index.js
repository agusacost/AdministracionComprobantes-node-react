const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController.js');
const userController = require('../controllers/userController.js');
const validateToken = require('../middleware/validateToken.js');
const validatorMiddleware = require('../middleware/validatorMiddleware.js');
const {registerSchema,loginSchema} = require('../schemas/auth.schema.js');
const {createTicketSchema} = require('../schemas/ticket.schema.js');

module.exports = function(){
    
    //agregar ticket POST
    router.post('/add-tickets', validateToken.authRequired,validatorMiddleware.validateSchema(createTicketSchema),ticketController.nuevoTicket);
    //muestra los tickets GET
    router.get('/tickets', validateToken.authRequired,ticketController.mostrarTicket);
    //obtiene ticket por id
    router.get('/tickets/:idTicket',validateToken.authRequired ,ticketController.mostrarTicketId);
    //busca ticket por dni
    router.post('/ticketdni', ticketController.buscarTicketDni);
    //busca ticket por serie
    router.post('/ticketserie', validateToken.authRequired, ticketController.buscartTicketSerie);
    //busca ticket por seguimiento
    router.post('/ticketservice', validateToken.authRequired, ticketController.buscarTicketServicio);
    //actualiza el ticket por el id
    router.put('/tickets/:idTicket',validateToken.authRequired ,ticketController.actualizarTicket);
    //elimina tickets por id
    router.delete('/tickets/:idTicket',validateToken.authRequired ,ticketController.eliminarTicket);
    //busqueda de ticket para el solicitante
    router.get('/solicitud/:idTicket', ticketController.mostrarTicketId);
    


    //Usuarios
    //agregar un usuario
    router.post('/register',validatorMiddleware.validateSchema(registerSchema) ,userController.nuevoUser);
    //login
    router.post('/login',validatorMiddleware.validateSchema(loginSchema) ,userController.login);
    //logout
    router.post('/logout',userController.logout);
    //perfil autenticado 
    router.get('/profile',validateToken.authRequired ,userController.profile);
    //actualizar un usuario
    router.put('/user/:idUser', userController.actualizarUser);
    //elimina un usuario
    router.delete('/user/:idUser', userController.eliminarUser);
    //verifica el token 
    router.get('/verify', userController.verifyToken);

    return router;
}