'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')

const secret = 'CBTMaximiliano'

exports.ensureAuth = (req, res, next)=>{
    //console.log(req.headers.authorization)
    if(!req.headers.authorization){
        return res.status(403).send({mensaje: 'La petición no tiene la cabecera de autenticación'})
    }

    let token = req.headers.authorization.replace(/[' "]+/g, '')

    try{

        var payload = jwt.decode(token, secret) 

        if(payload.exp <= moment().unix()){
            return res.status(401).send({mensaje: 'El token ha expirado'})
        }
    }catch(ex){
        console.log(ex)
        return res.status(404).send({mensaje: 'Token no valido'})
    }

    req.user = payload

    next()
}