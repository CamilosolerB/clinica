//llamado de las librerias
const express = require('express');
const controller = require('../controller/controller')
const multer = require('multer')
const fs = require('fs');
const { name } = require('ejs');
storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './public/upload')
    }
})
const upload = multer({storage});
const rutas = express.Router()

const nom = upload.fields([{ name: "nombre",maxCount: 1}])

//links
rutas.get('/',controller.index);
rutas.get('/iniciasesion',controller.login);
rutas.post('/validar',controller.ingreso);
rutas.post('/foto',upload.single('firma'),controller.firma);


module.exports=rutas;