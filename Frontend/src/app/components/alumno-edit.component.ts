import {Component, OnInit} from '@angular/core'
import {Router, ActivatedRoute, Params} from '@angular/router'

import {UsuarioService} from '../services/usuario.service'
import { AlumnoService } from '../services/alumno.service'
import { UploadService } from '../services/upload.service'
import {GLOBAL} from '../services/global'
import {Alumno} from '../models/alumno'

@Component({
    selector: 'alumno-edit',
    templateUrl: '../views/alumno-add.html',
    providers: [UsuarioService, AlumnoService, UploadService]
})

export class AlumnoEditComponent implements OnInit{
    public titulo: string
    public nuevoAlumno: Alumno
    public identity
    public token
    public url: string
    public mensaje
    public is_edit
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _usuarioService: UsuarioService,
        private _uploadService: UploadService,
        private _alumnoService: AlumnoService
    ){
        this.titulo = "Editar Alumno"
        this.identity = this._usuarioService.getIdentity()
        this.token = this._usuarioService.getToken()
        this.url = GLOBAL.url
        this.nuevoAlumno = new Alumno(0,"","","","","",0,0,"")
        this.is_edit = true
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
                        this.nuevoAlumno = response.alumno
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
    registrar(){
       this._route.params.forEach((params:Params)=>{
           let id = params['id']
           this._alumnoService.editAlumno(this.token,id, this.nuevoAlumno).subscribe(
            response =>{
                if(!response.alumno){
                   this.mensaje =  "Error al Registrar al Alumno"
                }else{
                    this.mensaje = `El alumno ${response.alumno.nombre } se modificó exitosamente`
                    this._uploadService.makeFileRequest(this.url+'subirImagenAlumno/'+id,[],this.filesToUpload, this.token, 'imagen')
                    .then(
                        (result)=>{
                            this._router.navigate(['/alumnos'])
                        },
                        error=>{
                            console.log(error)
                        }
                    )
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
       })
    }
    public filesToUpload: Array<File>
    fileChangeEvent(fileInput:any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }
}