const conexion = require('../conexion/conexion')
const cnn = conexion();
const bcrypjs = require('bcryptjs')
const controller  = {};

controller.index=(req,res,next)=>{
    res.render('login')
}

module.exports=controller;