//llamado de las librerias
const express = require('express');
const controller = require('../controller/controller')
const rutas = express.Router()

//links
rutas.get('/',controller.index);
rutas.get('/iniciasesion',controller.login);


module.exports=rutas;