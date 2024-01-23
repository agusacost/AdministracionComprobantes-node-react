const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    user:{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('User', usuarioSchema);