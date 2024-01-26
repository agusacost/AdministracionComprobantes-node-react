const jwt = require('jsonwebtoken');
const config = require('../config.js');

//verifica la existencia de token para el ingreso 
exports.authRequired = async(req,res,next)=>{
    const {token} = req.cookies;
    const TOKEN_SECRET = config.TOKEN_SECRET;

    if(!token) return res.status(401).json({mensaje: 'No Token, autorizacion denegada'});

    //decodifica el token y verifica
    jwt.verify(token, TOKEN_SECRET, (err,user)=>{
        if(err) return res.status(403).json({mensaje:'Invalid Token'});

        req.user = user; 
        next();
    })
    
}