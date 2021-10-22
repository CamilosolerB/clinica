const conexion = require('../conexion/conexion')
const cnn = conexion();
const bcrypjs = require('bcryptjs');
const multer = require('multer')
const upload = multer({ dest: '../public/upload'});
const pdf =require('pdfkit')
const fs = require('fs')
const tesseract = require('node-tesseract-ocr');
const { text } = require('express');
const alert = require('alert')
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
            let date = new Date()

            let day = date.getDate()
            let month = date.getMonth() 
            let year = date.getFullYear()
            let fechas = (day+'/'+month+'/'+year)
            
            cnn.query('INSERT INTO historia_clinica SET?',{Id_doctore:doc,id_paciente:paci,fecha:fechas},async(err,resbb)=>{
                if(err){
                    next(new Error(err))
                }
                else{
                    tesseract.recognize(nom, options)
                    .then((nombr) => {
                        const doc=req.body.documentodoc
                        const paci=req.body.documentopac
                        cnn.query('UPDATE historia_clinica SET nombre="'+nombr+'" WHERE Id_doctore="'+doc+'" AND id_paciente="'+paci+'"',async(err,resbb)=>{
                            if(err){
                                next(new Error(err))
                            }
                            else{
                                tesseract.recognize(dir, options)
                                .then((direct) => {
                                    const doc=req.body.documentodoc
                                    const paci=req.body.documentopac
                                    cnn.query('UPDATE historia_clinica SET direccion="'+direct+'" WHERE Id_doctore="'+doc+'" AND id_paciente="'+paci+'"',async(err,resbb)=>{
                                        if(err){
                                            next(new Error(err))
                                        }
                                        else{
                                            tesseract.recognize(info, options)
                                            .then((clinic) => {
                                                const doc=req.body.documentodoc
                                                const paci=req.body.documentopac
                                                cnn.query('UPDATE historia_clinica SET historia="'+clinic+'" WHERE Id_doctore="'+doc+'" AND id_paciente="'+paci+'"',async(err,resbb)=>{
                                                    if(err){
                                                        next(new Error(err))
                                                    }
                                                    else{
                                                        const doc=req.body.documentodoc
                                                        const paci=req.body.documentopac
                                                        cnn.query("SELECT * FROM historia_clinica WHERE Id_doctore=? AND id_paciente=?",[doc,paci],(err,resbb)=>{
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
controller.filtro=(req,res,next)=>{
    const nom = req.body.nombre;
    const fec = req.body.fecha;
    const doc = req.body.doctor;
    console.log(nom)
    console.log("hola"+fec)
    console.log(doc)
    if(nom == ""){
        cnn.query('SELECT * FROM historia_clinica INNER JOIN doctor ON (Id_doctore=id_doctor) WHERE fecha=? AND id_doctor=?',[fec,doc],(err,resbb)=>{
            if(err){
                next(new Error(err))
            }
            else{
                res.render('filtro',{datos:resbb})
            }
        })
    }
    else if(fec == ""){
        cnn.query('SELECT * FROM historia_clinica INNER JOIN doctor ON (historia_clinica.Id_doctore=doctor.id_doctor) WHERE nombre=? AND id_doctor=?',[nom,doc],(err,resbb)=>{
            if(err){
                next(new Error(err))
            }
            else{
                res.render('filtro',{datos:resbb})
            }
        })
    }
    else{
        cnn.query('SELECT * FROM historia_clinica INNER JOIN doctor ON (historia_clinica.Id_doctore=doctor.id_doctor) WHERE nombre=? AND fecha=? AND id_doctor=?',[nom,fec,doc],(err,resbb)=>{
            if(err){
                next(new Error(err))
            }
            else{
                res.render('filtro',{datos:resbb})
            }
        })
    }
}
controller.verhistoria=async(req,res,next)=>{
    const doc = req.body.docdoctor;
    const usu = req.body.docpac;
    const fec = req.body.fecha;
    console.log(doc)
    console.log(usu)
    console.log(fec)
    cnn.query('SELECT * FROM historia_clinica WHERE Id_doctore="'+doc[0]+'" AND id_paciente="'+usu[0]+'" AND fecha="'+fec[0]+'"',async(err,resbb)=>{
        if(err){
            next(new Error(err))
        }
        else{

            res.render('pdf',{datos:resbb})
            console.log(resbb)
        }
    })
}



module.exports=controller;