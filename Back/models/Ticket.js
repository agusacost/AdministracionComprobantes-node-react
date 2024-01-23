const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketsSchema = new Schema({
    seguimiento: {
        type: String,
        trim: true,
        required: true
    },
    nombre: {
        type: String,
        trim: true,
        required: true
    },
    apellido: {
        type: String,
        trim: true,
        required: true
    },
    colegio:{
        type: String,
        trim: true,
        required: true
    },
    dni: {
        type: String,
        trim:true,
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    },
    serie:{
        type:String,
        trim:true,
        required: true
    },
    observaciones: {
        type: String,
        trim: true,
    },
    listo:{
        type: Boolean,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Ticket', ticketsSchema);