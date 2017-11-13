'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const alumnoSchema = Schema({
    matricula: Number,
    nombre: String,
    paterno: String,
    materno: String,
    grado: Number,
    grupo: Number,
    curp: String,
    imagen: String
})

module.exports = mongoose.model('Alumno', alumnoSchema)