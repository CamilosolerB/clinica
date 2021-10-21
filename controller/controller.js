const conexion = require('../conexion/conexion')
const cnn = conexion();
const bcrypjs = require('bcryptjs');
const multer = require('multer')
const upload = multer({ dest: '../public/upload'});
const pdf =require('pdfkit')
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
    req.session.login=true;
    //cnn.query("SELECT * FROM usuario INNER JOIN doctor ON (doc_usu=documento)",(err,resbb)=>{
    cnn.query('SELECT * FROM usuario INNER JOIN doctor ON (doc_usu=documentod) WHERE doc_usu="'+nom+'" AND password="'+cla+'"',(err,resbb)=>{
        if(err){
            next(new Error(err))
        }
        else if(resbb != 0){

            res.render("eleccion",{datos:resbb})
            
        }
        else{
            res.send("usuario o contraseña incorrecta")
        }
    })
}
controller.firma=async(req,res,next)=>{
    console.log(req.files)

    const nom="./public/upload/nombre.PNG"
    const dir="./public/upload/direccion.PNG";
    const fec ="./public/upload/fecha.PNG"
    const info = "./public/upload/informacion.PNG";
    
    console.log("Antes del ocr")
    //var nombre,doc;

        tesseract.recognize(fec, options)
        .then((dia) => {
            const doc=req.body.documentodoc
            const paci=req.body.documentopac
            const fech= new Date();
            cnn.query('INSERT INTO historia_clinica SET?',{Id_doctor:doc,id_paciente:paci,fecha:fech},async(err,resbb)=>{
                if(err){
                    next(new Error(err))
                }
                else{
                    tesseract.recognize(nom, options)
                    .then((nombr) => {
                        const doc=req.body.documentodoc
                        const paci=req.body.documentopac
                        cnn.query('UPDATE historia_clinica SET nombre="'+nombr+'" WHERE Id_doctor="'+doc+'" AND id_paciente="'+paci+'"',async(err,resbb)=>{
                            if(err){
                                next(new Error(err))
                            }
                            else{
                                tesseract.recognize(dir, options)
                                .then((direct) => {
                                    const doc=req.body.documentodoc
                                    const paci=req.body.documentopac
                                    cnn.query('UPDATE historia_clinica SET direccion="'+direct+'" WHERE Id_doctor="'+doc+'" AND id_paciente="'+paci+'"',async(err,resbb)=>{
                                        if(err){
                                            next(new Error(err))
                                        }
                                        else{
                                            tesseract.recognize(info, options)
                                            .then((clinic) => {
                                                const doc=req.body.documentodoc
                                                const paci=req.body.documentopac
                                                cnn.query('UPDATE historia_clinica SET historia="'+clinic+'" WHERE Id_doctor="'+doc+'" AND id_paciente="'+paci+'"',async(err,resbb)=>{
                                                    if(err){
                                                        next(new Error(err))
                                                    }
                                                    else{
                                                        const doc=req.body.documentodoc
                                                        const paci=req.body.documentopac
                                                        cnn.query("SELECT * FROM historia_clinica WHERE Id_doctor=? AND id_paciente=?",[doc,paci],(err,resbb)=>{
                                                            if(err){
                                                                next(new Error(err))
                                                            }
                                                            else{
                                                                res.render('pdf',{datos:resbb})
                                                            }
                                                        })
                                                        
                                                    }
                                        })
                                    })
                                }
                            })
                        })
                    }
                })
            })
            }
        })
    })
            .catch((error)=>{
                res.send(error.message)
            })
        }
controller.paginafiltrar=(req,res,next)=>{
    const doc = req.body.doc
    cnn.query('SELECT * FROM doctor INNER JOIN historia_clinica ON (id_doctor=Id_doctore) INNER JOIN paciente ON (id_paciente=id_pacientes) WHERE id_doctor="'+doc+'"',(err,resbb)=>{
        if(err){
            next(new Error(err))
        }
        else{
            res.render('filtro',{datos:resbb})
        }
    })
}

controller.cerrar=(req,res,next)=>{
    req.session.destroy(()=>{
    res.redirect('/iniciasesion')
    })
}

controller.inserta=(req,res,next)=>{
    const doc = req.body.doc
    req.session.login=true;
    //cnn.query("SELECT * FROM usuario INNER JOIN doctor ON (doc_usu=documento)",(err,resbb)=>{
    cnn.query('SELECT * FROM usuario INNER JOIN doctor ON (doc_usu=documentod) WHERE doc_usu="'+doc+'"',(err,resbb)=>{
        if(err){
            next(new Error(err))
        }
        else {
            res.render("doctor",{datos:resbb}) 
        }
    })
}




module.exports=controller;