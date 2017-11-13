'use strict'

const mongoose = require ('mongoose')
const Schema = mongoose.Schema;

const asistenciaSchema = mongoose.Schema({
    alumno: {type: Schema.ObjectId, ref: 'Alumno'} ,
    horaEntrada: String,
    fechaEntrada: String,
    horaSalida: String,
    fechaSalida: String
})
module.exports = mongoose.model('Asistencia', asistenciaSchema)