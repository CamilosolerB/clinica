const conexion = require('../conexion/conexion')
const cnn = conexion();
const bcrypjs = require('bcryptjs');
const multer = require('multer')
const upload = multer({ dest: '../public/upload'});
const pdf = require('html-pdf');
const tesseract = require('node-tesseract-ocr');
const { text } = require('express');
const controller  = {};

const options = {
    lang: 'spa',
    oem: 1,
    psm: 3,
};

controller.index=(req,res,next)=>{
    res.render('inicio')
}

controller.login=(req,res,next)=>{
    res.render('login')
}
controller.ingreso=(req,res,next)=>{
    const nom=req.body.documento;
    const cla=req.body.password;

    //cnn.query("SELECT * FROM usuario INNER JOIN doctor ON (doc_usu=documento)",(err,resbb)=>{
    cnn.query('SELECT * FROM usuario INNER JOIN doctor ON (doc_usu=documento) WHERE doc_usu="'+nom+'" AND password="'+cla+'"',(err,resbb)=>{
        if(err){
            next(new Error(err))
        }
        else if(resbb != 0){

            res.render("doctor",{datos:resbb})
            
        }
        else{
            res.send("usuario o contraseña incorrecta")
        }
    })
}
controller.firma=async(req,res,next)=>{
    /*const doctor = req.body.documentodoc;
    //const paci = req.body.documentopac;
    const histo = req.body.historia;
    const archivo = req.file;
    console.log(archivo)
    cnn.query('UPDATE doctor SET firma="'+archivo+'" WHERE documento="'+doctor+'"',(err,resbb)=>{
        if(err){
            next(new Error(err))
        }
        else{
            console.log('añadido')
            res.redirect('/')
        }
    })
    //cnn.query('INSERT INTO historia_clinica SET?',{Id_doctor:doctor,Id_paciente:paci,imagen:histo})
    //res.send("El archivo se subio")*/
    console.log(req.files)

    const image = ["./public/upload/nombre.PNG","./public/upload/documento.PNG","./public/upload/direccion.PNG","./public/upload/fecha.PNG","./public/upload/informacion.PNG"];
    
    console.log("Antes del ocr")
    //var nombre,doc;

        tesseract.recognize(image, options)
        .then((nombre) => {
            console.log(nombre)
            res.send(nombre)
            })
            .catch((error)=>{
                res.send(error.message)
            })



    

}



module.exports=controller;