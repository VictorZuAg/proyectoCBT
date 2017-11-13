'use strict'
const moment = require('moment')
const Inasistencia = require('../models/inasistencia')
const Alumno = require('../models/alumno')
const Asistencia = require('../models/asistencia')

function registrarInasistencia(){
    Alumno.find({}, (err, alumnos)=>{
        if(err){
            return console.log('Error favor de contactar a soporte técnico')
        }if(!alumnos){
            return console.log('No se encontraron alumnos llamar a soporte técnico')
        }else{
            alumnos.forEach((alumno)=>{
                return console.log(alumno._id)
                Asistencia.find({alumno: alumno._id}, (err, asistencia)=>{
                    if(err){
                        console.log('Llamar a soporte técnico')
                    }if(!asistencia){
                        let inasistencia = new Inasistencia()

                        inasistencia.alumno = alumno._id
                        inasistencia.fecha = moment().format('YYYY MM D')

                        inasistencia.save((err, inasistenciaRegistrada)=>{
                            if(err){
                                console.log('No se registro inasistencia llamar a soporte técnico')
                            }if(!inasistenciaRegistrada){
                                console.log('No se registro inasistencia llamar a soporte técnico')
                            }else{
                                console.log('se registro la Inasistencia')
                            }
                        })
                    }
                })
            })
        }
    })
}

function getInasistencia(req, res){
    alumnoId = req.body._id
    var inasistenciaFind = Isistencia.find({alumno: alumnoId})
    inasistenciaFind.populate({path: 'alumno'}).exec((err, inasistencias)=>{
        if(err){
            return res.status(500).send({mensaje: 'Error al consultar las asistencias llamar a soporte técnico'})
        }if(!asistencia || asistencia == ''){
            return  res.status(404).send({mensaje: 'No se encontraron asistencias de este alumno'})
        }else{
            return res.status(200).send({inasistencias})
        }
    })
}

module.exports={
    registrarInasistencia,
    getInasistencia
}