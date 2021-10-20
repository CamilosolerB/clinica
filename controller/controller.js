const conexion = require('../conexion/conexion')
const cnn = conexion();
const bcrypjs = require('bcryptjs')
const controller  = {};

controller.index=(req,res,next)=>{
    res.render('inicio')
}

controller.login=(req,res,next)=>{
    res.render('login')
}
controller.ingreso=(req,res,next)=>{
    const nom=req.body.username;
    const cla=req.body.password;

    cnn.query('SELECT * FROM usuario INNER JOIN doctor ON (doc_usu=documento) WHERE doc_usu=? AND password=?',[nom,cla],(err,resbb)=>{
        if(err){
            next(new Error(err))
        }
        else{
            res.render("doctor",{datos:resbb})
        }
    })
}

module.exports=controller;