'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')
const schedule = require('node-schedule')

const asistenciaCtrl = require('./controllers/asistencia')
const inasistenciaCtrl = require('./controllers/inasistencia')

//Crear conexion con mongodb
mongoose.connect(config.db, {useMongoClient: true}, (err, res)=>{
  if(err){
    console.log(`Error al conectar con la base de datos ${err}`)
  }
  console.log('Conexion establecida a la base de datos')

  app.listen(config.port,()=>{
    console.log(`localhost:${config.port}`)
  })
})


const SerialPort = require('serialport')
const puerto = new SerialPort('COM3', {
  baudRate: 9600
})
const Readline = SerialPort.parsers.Readline
const parser = new Readline()

puerto.pipe(parser)
puerto.on('open', function(){
  console.log('Arduino conectado');
  parser.on('data', function(data){
    asistenciaCtrl.entradaAlumno(data)
    console.log('Data:', data);
    console.log('leido')
  });
  console.log('---------------------fin de lectura----------------')
});
puerto.on('error', function(error){
  console.log(error);
});

var tareaInasistencia = schedule.scheduleJob({hour:20, minute: 51, second:0}, ()=>{
  //schedule.scheduleJob('second minute hour dayofmonth month dayofweek')
  console.log('tarea realizada')
  inasistenciaCtrl.registrarInasistencia()
})