//llamado de las librerias
const express = require('express');
const controller = require('../controller/controller')
const multer = require('multer')
Storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        
    }
})
const upload = multer({ dest: "./public/upload"});
const rutas = express.Router()

//links
rutas.get('/',controller.index);
rutas.get('/iniciasesion',controller.login);
rutas.post('/validar',controller.ingreso);
rutas.post('/foto',upload.single('firma'),controller.firma);


module.exports=rutas;