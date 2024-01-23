const User = require('../models/Usuario.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config.js');

//agregar un usuario
exports.nuevoUser = async(req,res,next)=>{
    const {user,password} = req.body;
    const TOKEN_SECRET = config.TOKEN_SECRET;
    try {
        const userFound = await User.findOne({user})
        if(userFound) 
            return res.status(400).json(['Usuario ya existe']);
        //hash del password
        const passwordHash = await bcrypt.hash(password, 10);
        ///almacena en bd
        const newUser = new User({
            user,
            password:passwordHash,
        });

        const userSaved = await newUser.save();

        jwt.sign(
            {
            id: userSaved._id,
            },
            TOKEN_SECRET,
            {
                expiresIn: '1d'
            },
            (err,token)=>{
                if(err) console.log(err);
                res.cookie('token',token);
                res.json({
                mensaje: 'Usuario creado con exito'
                });
            }
        )
    } catch (error) {
        res.status(500).json({mensaje: error.mensaje})
        next();
    }
}

exports.login = async(req,res,next)=>{
    const {user,password} = req.body;
    const TOKEN_SECRET = config.TOKEN_SECRET;
    try {
        const userFound = await User.findOne({user});
        if(!userFound) return res.status(400).json(['Usuario incorrecto']);

        const isMatch = await bcrypt.compare(password, userFound.password);

        if(!isMatch) return res.status(400).json(['Contraseña incorrecta']);

        jwt.sign(
            {
            id: userFound._id,
            },
            TOKEN_SECRET,
            {
                expiresIn: '1d'
            },
            (err,token)=>{
                if(err) console.log(err);
                res.cookie('token',token);
                res.json({
                    mensaje: 'Usuario logueado'
                    });  
            }
        )
        
    } catch (error) {
        res.status(500).json({mensaje: error.mensaje})
        next();
    }
}

//logout
exports.logout = (req,res,next)=>{
    res.cookie('token',"",{
        expires: new Date(0)
    });
    return res.sendStatus(200);
}

exports.profile = async (req,res,next)=>{
    const userFound = await User.findById(req.user.id);

    if(!userFound) return res.status(400).json({mensaje: 'Usuario no encontrado'});

    return res.json({
        id: userFound._id,
        username: userFound.user
    });
}

//actualizar un usuario
exports.actualizarUser = async(req,res,next)=>{
    try {
        const user = await User.findOneAndUpdate({_id:req.params.idUser},req.body,{
            new:true
        });
        res.json(user);
    } catch (error) {
        res.send(error);
        next();
    }
}

//eliminar un usuario
exports.eliminarUser = async(req,res,next)=>{
    try {
        const user = await User.findByIdAndDelete({_id: req.params.idUser});
        res.json({mensaje: 'Usuario eliminado'});
    } catch (error) {
        res.json({mensaje: 'No se encuentra el usuario'});
        next();
    }
}

exports.verifyToken = async(req,res,next)=>{
    const {token} = req.cookies
    const TOKEN_SECRET = config.TOKEN_SECRET;

    if(!token) return res.status(401).json({mensaje: 'No autorizado'});

    jwt.verify(token, TOKEN_SECRET, async (err,user)=>{
        if(err) return res.status(401).json({mensaje: 'No autorizado'});

        const userFound = await User.findById(user.id)
        if(!userFound) return res.status(401).json({mensaje: 'No autorizado'});

        return res.json({
            id: userFound._id,
            user: userFound.user,
        });

    });
}