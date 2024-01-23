const jwt = require('jsonwebtoken');
const config = require('../config.js');

exports.authRequired = async(req,res,next)=>{
    const {token} = req.cookies;
    const TOKEN_SECRET = config.TOKEN_SECRET;

    if(!token) return res.status(401).json({mensaje: 'No Token, autorizacion denegada'});

    jwt.verify(token, TOKEN_SECRET, (err,user)=>{
        if(err) return res.status(403).json({mensaje:'Invalid Token'});

        req.user = user; 
        next();
    })
    
}