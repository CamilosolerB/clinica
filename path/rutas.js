//llamado de las librerias
const express = require('express');
const controller = require('../controller/controller')
const rutas = express.Router()

//links
rutas.get('/',controller.index)


module.exports=rutas;