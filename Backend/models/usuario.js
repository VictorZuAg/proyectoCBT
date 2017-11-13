'use strict'

const mongoose = require('mongoose')

const usuarioSchema = mongoose.Schema({
    nombre: String,
    paterno: String,
    materno: String,
    usuario: String,
    password: String,
    role : String,
    imagen: String
})

module.exports = mongoose.model('Usuario', usuarioSchema)