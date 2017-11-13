'use strict'

const express = require('express')
const multipart = require('connect-multiparty')

const usuarioCtrl = require('../controllers/usuario')
const auth = require('../middlewares/authenticated')

const mdUpload = multipart({uploadDir: './uploads/usuarios'})
const api = express.Router()

api.post('/cbt/singup', usuarioCtrl.saveUsuario)
api.post('/cbt/login', usuarioCtrl.loginUsuario)
api.put('/cbt/actualizarUsuario/:usuarioId', auth.ensureAuth, usuarioCtrl.updateUsuario)
api.post('/cbt/subirImagenUsuario/:usuarioId', [auth.ensureAuth, mdUpload], usuarioCtrl.uploadImagen)
api.get('/cbt/obtenerImagenUsuario/:imagen', usuarioCtrl.getImagen)


module.exports = api