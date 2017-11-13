'use strict'

const express = require('express')

const alumnoCtrl = require('../controllers/alumno')
const inasistenciaCtrl = require('../controllers/inasistencia')
const auth = require('../middlewares/authenticated')

const api = express.Router()

//rutas
api.get('/cbt/inasistencias/:id',inasistenciaCtrl.getInasistencia)
api.get('/cbt/home',inasistenciaCtrl.getInasistenciasDias)

module.exports = api