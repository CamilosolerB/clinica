//llamado de las librerias
const express = require('express');
const controller = require('../controller/controller')
const multer = require('multer')
const fs = require('fs');
//const TesseractWorker = require('tesseract.js')
//const worker =  TesseractWorker();
storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './public/upload')
    },
    filename: (req,file,cb)=>{
        cb(null, file.originalname)
    }
})
const upload = multer({storage});
const rutas = express.Router()

//links
rutas.get('/',controller.index);
rutas.get('/iniciasesion',controller.login);
rutas.post('/validar',controller.ingreso);
rutas.post('/foto',upload.single('firma'),controller.firma);


module.exports=rutas;