'use strict'
const path = require('path')
const fs = require('fs')

const Alumno = require('../models/alumno')

function saveAlumno(req, res){
    console.log('POST api/cbt/alumno')
    console.log(req.body)
    let alumno = new Alumno()
  
    alumno.matricula = req.body.matricula
    alumno.nombre = req.body.nombre.toUpperCase()
    alumno.paterno = req.body.paterno.toUpperCase()
    alumno.materno = req.body.materno.toUpperCase()
    alumno.grado = req.body.grado
    alumno.grupo = req.body.grupo
    alumno.curp = req.body.curp.toUpperCase()
    alumno.imagen = 'null'
  
    //Guardar datos del alumno en la base de datos
    alumno.save((err, alumnoGuardado)=>{
      if(err){
        res.status(500).send({mensaje: 'Error al guardar al alumno'})
      }else{
        if(!alumnoGuardado){
          res.status(500).send({mensaje : 'Error al guardar el alumno'})
        }else{
          res.status(200).send({alumno: alumnoGuardado})
        }
      }
    })
}
function getAlumnos(req, res){
  console.log('GET api/cbt/alumnos')
  Alumno.find({}, (err, alumnos)=>{
    if(err){
      return res.status(500).send({mensaje:' Error al realizar la petición'})
    }if(!alumnos){
      return res.status(404).send({mensaje: 'No se encontraron alumnos en la base de datos'})
    }else{
      res.status(200).send({alumnos})
    }
  })  
}
function getAlumno(req, res){
  console.log('GET api/cbt/alumno')
  let alumnoId = req.params.alumnoId
  Alumno.findById(alumnoId, (err, alumno)=>{
    if(err){
      return res.status(500).send({mensaje:' Error al realizar la petición'})
    }if(!alumno){
      return res.status(404).send({mensaje: 'El alumno no existe'})
    }else{
      res.status(200).send({alumno})
    }
  })
}
function updateAlumno(req, res){
  console.log('PUT api/cbt/alumno')
  let alumnoId = req.params.alumnoId
  let update = req.body
  Alumno.findByIdAndUpdate(alumnoId, update, (err, alumnoActualizado)=>{
    if(err){
      return res.status(500).send({mensaje:' Error al realizar la petición'})
    }else{
      res.status(200).send({alumno: alumnoActualizado})
    }
  })
}
function deleteAlumno(req,res){
  console.log('DELETE api/cbt/alumno')
  let alumnoId = req.params.alumnoId
  Alumno.findById(alumnoId, (err, alumno)=>{
    if(err){
      return res.status(500).send({mensaje:' Error al realizar la petición'})
    }if(!alumno){
      return res.status(404).send({mensaje: 'El alumno no existe'})
    }else{
      alumno.remove(err =>{
        if(err){
          res.status(500).send({mensaje: 'Error al borrar alumno'})
        }else{
          res.status(200).send({alumno, mensaje: 'El alumno fue eliminado'})
        }
      })
    }
  })
}
function uploadImagen(req, res){
  let alumnoId = req.params.alumnoId
  let fileName = 'default'

  if(req.files){
      let filePath = req.files.imagen.path;
      let fileSplit = filePath.split('\\')
      let fileName = fileSplit[2]

      let extSplit = fileName.split('\.')
      let fileExt = extSplit[1]

      if(fileExt =='png' || fileExt == 'jpg' || fileExt == 'gif'){
          Alumno.findByIdAndUpdate(alumnoId, {imagen: fileName},(err, alumnoActualizado)=>{
              if(err){
                  res.status(500).send({mensaje: 'Error al actualizar un alumno'})
              }if(!alumnoActualizado){
                  res.status(404).send({mensaje: 'No se a podido actualizar el alumno'})
              }else{
                  res.status(200).send({imagen: fileName, alumno: alumnoActualizado})
              }
          })
      }else{
          res.status(200).send({mensaje: 'Extensión de archivo no valida'})
      }

  }else{
      res.status(200).send({mensaje: 'No has subido ninguna imagen'})
  }
}
function getImagen(req, res){
  let imagenFile = req.params.imagen
  let pathFile = './uploads/alumnos/'+imagenFile
  //console.log(pathFile)
  fs.exists(pathFile, exists=>{
      if(exists){
          res.sendFile(path.resolve(pathFile))
      }else{
          res.status(404).send({mensaje: 'No se encontro la imagen'})
      }
  })
}
module.exports = {
    saveAlumno,
    getAlumnos,
    getAlumno,
    updateAlumno,
    deleteAlumno,
    uploadImagen,
    getImagen
}