'use strict'

const bcrypt = require('bcrypt-nodejs')
const fs = require('fs')
const path = require('path')

const Usuario = require('../models/usuario')
const jwt = require('../services/jwt')

function saveUsuario(req, res){
    let usuario = new Usuario()

    //console.log(req.body)

    usuario.nombre = req.body.nombre.toUpperCase()
    usuario.paterno = req.body.paterno.toUpperCase()
    usuario.materno = req.body.materno.toUpperCase()
    usuario.usuario = req.body.usuario
    usuario.role = 'USUARIO'
    usuario.imagen = 'default.png'

    if(req.body.password){
        //Encriptar contraseña
        bcrypt.hash(req.body.password, null, null , (err,hash)=>{
            usuario.password = hash
            if(usuario.nombre != null && usuario.paterno != null && usuario.materno != null && usuario.usuario!= null){
                //Guardar datos
                usuario.save((err, usuarioGuardado)=>{
                    if(err){
                        res.status(500).send({mensaje: 'Error al guardar el usuario'})
                    }if(!usuarioGuardado){
                        res.status(500).send({mensaje: 'No se ha registrado el usuario'})
                    }else{
                        res.status(200).send({usuario: usuarioGuardado})
                    }
                })
            } else{
                res.status(500).send({mensaje:'Llenar todos los campos'})
            }
        })
    }else{
        res.status(500).send({mensaje: 'Introduce la contraseña'})
    }
}
function loginUsuario(req, res){

    let user = req.body.usuario
    let password = req.body.password
    
    Usuario.findOne({usuario: user}, (err, usuario)=>{
        //console.log(password)
        //console.log(usuario.password)
        if(err){
            res.status(500).send({mensaje: 'Error en la petición'})
        }
        
        if(!usuario){
            res.status(404).send({mensaje: 'No se encontro el usuario'})
        }else{
            //Comprobar la contraseña
            //bcrypt.hash(password)
            //console.log(password)
            bcrypt.compare(password, usuario.password, (err, check)=>{
                //console.log(check)
                if(check){
                    //Devolver los datos del usuario logueado
                    if(req.body.gethash){
                        //Devolver el token de jwt
                        res.status(200).send({token: jwt.createToken(usuario)})
                    }else{
                        res.status(200).send({usuario})
                    }
                }else{
                    res.status(500).send({mensaje: 'La constraseña no es correcta'})
                }
            })
        }
    })    
}
function updateUsuario(req,res){
    let usuarioId = req.params.usuarioId
    let update = req.body

    Usuario.findByIdAndUpdate(usuarioId, update, (err, usuarioActualizado)=>{
        if(err){
            res.status(500).send({mensaje: 'Error al actualizar la imagen'})
        }if(!usuarioActualizado){
            res.status(404).send({mensaje: 'No se a podido actualizar la imagen'})
        }else{
            res.status(200).send({usuario: usuarioActualizado})
        }
    })
}

function uploadImagen(req, res){
    let userId = req.params.usuarioId
    let fileName = 'default'

    if(req.files){
        let filePath = req.files.imagen.path;
        let fileSplit = filePath.split('\\')
        let fileName = fileSplit[2]

        let extSplit = fileName.split('\.')
        let fileExt = extSplit[1]

        if(fileExt =='png' || fileExt == 'jpg' || fileExt == 'gif'){
            Usuario.findByIdAndUpdate(userId, {imagen: fileName},(err, usuarioActualizado)=>{
                if(err){
                    res.status(500).send({mensaje: 'Error al actualizar un usuario'})
                }if(!usuarioActualizado){
                    res.status(404).send({mensaje: 'No se a podido actualizar el usuario'})
                }else{
                    res.status(200).send({imagen: fileName, usuario: usuarioActualizado})
                }
            })
        }else{
            res.status(200).send({usuario: 'Extensión de archivo no valida'})
        }

    }else{
        res.status(200).send({usuario: 'No has subido ninguna imagen'})
    }
}
function getImagen(req, res){
    let imagenFile = req.params.imagen
    let pathFile = './uploads/usuarios/'+imagenFile
    console.log(pathFile)
    fs.exists(pathFile, exists=>{
        if(exists){
            res.sendFile(path.resolve(pathFile))
        }else{
            res.status(404).send({mensaje: 'No se encontro la imagen'})
        }
    })
}

module.exports = {
    saveUsuario,
    loginUsuario,
    updateUsuario,
    uploadImagen,
    getImagen
}