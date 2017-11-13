import {Component, OnInit} from '@angular/core'
import {Router, ActivatedRoute, Params} from '@angular/router'

import {UsuarioService} from '../services/usuario.service'
import { AlumnoService } from '../services/alumno.service'
import {GLOBAL} from '../services/global'
import {Alumno} from '../models/alumno'

@Component({
    selector: 'alumno-detail',
    templateUrl: '../views/alumno-detail.html',
    providers: [UsuarioService, AlumnoService]
})

export class AlumnoDetailComponent implements OnInit{
    public titulo: string
    public alumno: Alumno
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
        this.titulo = "Detalles de Alumno"
        this.identity = this._usuarioService.getIdentity()
        this.token = this._usuarioService.getToken()
        this.url = GLOBAL.url
    }
    ngOnInit(){
        //console.log('Funcionando')
        this.getAlumno()
    }
    getAlumno(){
        this._route.params.forEach((params: Params)=>{
            let id = params['id']
            this._alumnoService.getAlumno(this.token, id).subscribe(
                response=>{
                    if(!response.alumno){
                        this._router.navigate(['/'])
                    }else{
                        this.alumno = response.alumno
                    }
                },error=>{
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
}