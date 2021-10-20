const conexion = require('../conexion/conexion')
const cnn = conexion();
const bcrypjs = require('bcryptjs');
const multer = require('multer')
const upload = multer({ dest: '../public/upload'});
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
controller.firma=(req,res,next)=>{

    console.log(req.file)
    res.send("El archivo se subio")
}
module.exports=controller;