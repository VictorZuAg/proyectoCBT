'use strict'

const express = require('express')
const multipart = require('connect-multiparty')

const alumnoCtrl = require('../controllers/alumno')
const asistenciaCtrl = require('../controllers/asistencia')
const auth = require('../middlewares/authenticated')

const mdUpload = multipart({uploadDir: './uploads/alumnos'})
const api = express.Router()

//rutas
api.post('/cbt/alumno',auth.ensureAuth, alumnoCtrl.saveAlumno)
api.get('/cbt/alumnos',auth.ensureAuth, alumnoCtrl.getAlumnos)
api.get('/cbt/alumno/:alumnoId',auth.ensureAuth, alumnoCtrl.getAlumno)
api.put('/cbt/alumno/:alumnoId',auth.ensureAuth, alumnoCtrl.updateAlumno)
api.delete('/cbt/alumno/:alumnoId',auth.ensureAuth, alumnoCtrl.deleteAlumno)
api.post('/cbt/subirImagenAlumno/:alumnoId', [auth.ensureAuth, mdUpload],alumnoCtrl.uploadImagen)
api.get('/cbt/obtenerImagenAlumno/:imagen', alumnoCtrl.getImagen)
//api.get('/cbt/buscarAlumno/:buscar?',auth.ensureAuth,alumnoCtrl.findAllAlumnos)

module.exports = api