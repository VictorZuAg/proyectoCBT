import {Component, OnInit} from '@angular/core'
import {Router, ActivatedRoute, Params} from '@angular/router'
import {UsuarioService} from '../services/usuario.service'
import {AlumnoService} from '../services/alumno.service'
import {GLOBAL} from '../services/global'
import {Alumno} from '../models/alumno'

@Component({
    selector: 'alumno-list',
    templateUrl: '../views/alumno-list.html',
    providers: [UsuarioService, AlumnoService]
})

export class AlumnoListComponent implements OnInit{
    public titulo: string
    public alumnos: Alumno[]
    public identity
    public token
    public url: string
    public mensaje
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _usuarioService: UsuarioService,
        private _alumnoService : AlumnoService
    ){
        this.titulo = "Lista de Alumnos"
        this.identity = this._usuarioService.getIdentity()
        this.token = this._usuarioService.getToken()
        this.url = GLOBAL.url
    }
    ngOnInit(){
        //console.log('Funcionando')
        this.getAlumnos()
    }
    getAlumnos(){
        this._route.params.forEach((params: Params)=>{
            this._alumnoService.getAlumnos(this.token).subscribe(
                response => {
                    if(!response.alumnos){
                        this._router.navigate(['/'])
                    }else{
                        this.alumnos = response.alumnos
                    }
                },error =>{
                    let errorMensaje = <any>error;
                    if(errorMensaje != null){
                        let body = JSON.parse(error._body)
                        this.mensaje = body.mensaje
                        console.log('Error')
                    }
                }
            )
        })
    }
    
    public confirmado
    confirmarDelete(id){
        console.log("algo")
        this.confirmado = id
    }
    cancelar(){
        this.confirmado = null
    }
    deleteAlumno(id){
        this._alumnoService.deleteAlumno(this.token, id).subscribe(
            response=>{
                console.log(response)
                if(!response.alumno){
                    console.log("Error en el servidor")
                }else{
                    this.getAlumnos()
                }
            },error=>{
                let errorMensaje = <any>error;
                if(errorMensaje != null){
                    let body = JSON.parse(error._body)
                    this.mensaje = body.mensaje
                }
            }
        )
    }
}

