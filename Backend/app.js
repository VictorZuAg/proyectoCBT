'use strict'
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const alumnoRutas = require('./routes/alumno')
const usuarioRutas = require('./routes/usuario')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//configurar cabeceras http
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Authorization, X-APY-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method ')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTION, PUT, DELETE')
    res.header('Allow', 'GET, POST, OPTION, PUT, DELETE')

    next()
})

app.use('/api', alumnoRutas)
app.use('/api',usuarioRutas)





module.exports = app
