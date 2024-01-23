const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors'); 

//conexion a mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TicketsAprenderConectados',{useNewUrlParser: true,family:4});

//crea servidor
const app = express();

//habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors({
    origin:'http://localhost:5173',
    credentials: true 
}));
app.use(cookieParser());

//rutas 
app.use('/api',routes());

app.listen(4000);