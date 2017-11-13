'use strict'

const moment = require('moment')

const Asistencia = require('../models/asistencia')
const Alumno = require('../models/alumno')
const Inasistencia = require('../models/inasistencia')

function entradaAlumno(data){
    let matricula = data

   // var asistenciaFind = Asistencia.find({})
  
    //Buscar matricula del alumno
    console.log('..../Buscando Alumno.........')
    Alumno.findOne({matricula: matricula}, (err,alumno)=>{
        //console.log(alumno)
        if(err){
            return console.log(`Error al buscar el Alumno con matricula: ${matricula}`)
        }if(!alumno){
            return console.log(`No se encontro la matricula ${matricula}`)
        }else{
            var alumnoId = alumno._id
            var fecha = moment().format('YYYY MM D')
            Inasistencia.find({alumno: alumnoId, fechaEntrada: fecha}, (err, inasistencia)=>{
                if(err){
                    console.log('Error al checar')
                }
                if(!inasistencia || inasistencia==''){
                    //let alumnoId = alumno._id
                    //let fecha = moment().format('YYYY MM D')
                    var asistenciaFind = Asistencia.find({alumno: alumnoId, fechaEntrada: fecha})
                    //console.log(asistenciaFind)
                    asistenciaFind.populate({path: 'alumno'}).exec((err, asistencia)=>{
                        var a = asistencia[0]
                        //console.log(a[0]._id);
                        if(err){
                            return console.log('Error al registrar con la tarjeta')
                        }
                        if(!asistencia || asistencia == '' ){
                            //return console.log('listo')
        
                            let asistencia = new Asistencia()
                            asistencia.alumno = alumno._id
                            asistencia.fechaEntrada = moment().format('YYYY MM D')
                            asistencia.horaEntrada = moment().format('h:mm:ss a')
                            asistencia.fechaSalida = null
                            asistencia.horaSalida = null
        
                            asistencia.save((err, entradaRegistrada)=>{
                                if(err){
                                    return console.log('Error al registrar la entrada')
                                }if(!entradaRegistrada){
                                    return console.log('No se registro la entrada llamar a soporte técnico')
                                }else{
                                    return console.log(`Entrada registrada
                                    ${entradaRegistrada}
                                    `)
                                }
                            })
                        }else{
                            if(!a.fechaSalida){
                                //console.log(a._id, a.fechaEntrada)
                                let salida = {
                                    fechaSalida : moment().format('YYYY MM D'),
                                    horaSalida : moment().format('h:mm:ss a')
                                }
                                Asistencia.findByIdAndUpdate(a._id, salida, (err, checkSalida)=>{
                                    if(err){
                                        return console.log(`Eror al registrar la salida ${err}`)
                                    }else{
                                        if(!checkSalida){
                                            return console.log(`No esta registrando bien favor de acudir con soporte técnico XD ${checkSalida}`)
                                        }else{
                                            return console.log('Se registro tu salida')
                                        }
                                    }
                                })
                            }else{
                                return console.log(`Hoy ya se registro tu salida ${a}`)
                            }
                        }
                    })
                }else{
                    console.log('Ya tienes inasistencia')
                }
            })
        }
    })
}

function getAsistencia(req, res){
    alumnoId = req.body._id
    var asistenciaFind = Asistencia.find({alumno: alumnoId})
    asistenciaFind.populate({path: 'alumno'}).exec((err, asistencias)=>{
        if(err){
            return res.status(500).send({mensaje: 'Error al consultar las asistencias llamar a soporte técnico'})
        }if(!asistencia || asistencia == ''){
            return  res.status(404).send({mensaje: 'No se encontraron asistencias de este alumno'})
        }else{
            return res.status(200).send({asistencias})
        }
    })
}

module.exports = {
    entradaAlumno,  
    getAsistencia
}