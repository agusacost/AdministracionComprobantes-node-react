const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contadorSchema = new Schema({
    numeroSeguimientoActual: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Contador', contadorSchema);