'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const inasistenciasSchema = mongoose.Schema({
    alumno: {type: Schema.ObjectId, ref: 'Alumno'},
    fecha: String
})
module.exports = mongoose.model('Inasistencia', inasistenciasSchema)