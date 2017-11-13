'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')

const secret = 'CBTMaximiliano'

exports.createToken = (usuario)=>{
    let payload = {
        sub: usuario._id,
        nombre: usuario.nombre,
        usuario: usuario.usuario,
        role: usuario.role,
        imagen: usuario.imagen,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix
    }
    return jwt.encode(payload, secret)
}