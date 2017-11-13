import {Component, OnInit} from '@angular/core'
import {Router, ActivatedRoute, Params} from '@angular/router'
import {UsuarioService} from '../services/usuario.service'
import { AlumnoService } from '../services/alumno.service'
import {GLOBAL} from '../services/global'
import {Alumno} from '../models/alumno'

@Component({
    selector: 'alumno-add',
    templateUrl: '../views/alumno-add.html',
    providers: [UsuarioService, AlumnoService]
})

export class AlumnoAddComponent implements OnInit{
    public titulo: string
    public nuevoAlumno: Alumno
    public identity
    public token
    public url: string
    public mensaje
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _usuarioService: UsuarioService,
        private _alumnoService: AlumnoService
    ){
        this.titulo = "Agregar Nuevo Alumno"
        this.identity = this._usuarioService.getIdentity()
        this.token = this._usuarioService.getToken()
        this.url = GLOBAL.url
        this.nuevoAlumno = new Alumno(0,"","","","","",0,0,"")
    }
    ngOnInit(){
        //console.log('Funcionando')
    }
    registrar(){
        this._alumnoService.nuevoAlumno(this.token, this.nuevoAlumno).subscribe(
            response =>{
                let alumno = response.alumno
                this.nuevoAlumno = alumno
                if(!alumno._id){
                   this.mensaje =  "Error al Registrar al Alumno"
                }else{
                    this.mensaje = `El alumno ${alumno.nombre } se registro exitosamente`
                    this.nuevoAlumno = new Alumno(0,"","","","","",0,0,"")
                    this._router.navigate(['/alumnos'])
                }
            },
            error=>{
                let errorMensaje = <any>error;
                if(errorMensaje != null){
                    let body = JSON.parse(error._body)
                    this.mensaje = body.mensaje
                    console.log('Error')
                }
            }
        )  
    }
}
