import {Component, OnInit} from "@angular/core"

import {GLOBAL} from '../services/global'
import {UsuarioService} from '../services/usuario.service'
import {Usuario} from '../models/usuario'

@Component({
    selector: 'user-edit',
    templateUrl: '../views/user-edit.html',
    providers: [UsuarioService],
    styleUrls:['../styles/user-edit.scss']
})

export class UsuarioEditComponent implements OnInit{
    public titulo: string
    public user= new Usuario('','','','','','','USUARIO','')
    public identity
    public token
    public alertMensaje
    public url:string

    constructor(
        private _usuarioService : UsuarioService
    ){
        this.titulo = "Actualizar mis datos"
        this.identity = this._usuarioService.getIdentity()
        this.token = this._usuarioService.getToken()
        this.user = this.identity
        this.url = GLOBAL.url
    }
    
    ngOnInit(){
        

    }
    onSubmit(){
        this._usuarioService.actualizarUsuario(this.user).subscribe(
            response => {
                if(!response.usuario){
                    this.alertMensaje = 'El usuario no se ha actualizado'
                }else{
                    
                    //this.user = response.user
                    localStorage.setItem('identity', JSON.stringify(this.user))
                    document.getElementById("nombre").innerHTML= this.user.usuario
                    
                    if(!this.filesToUpload){

                    }else{
                        this.makeFileRequest(this.url+'subirImagenUsuario/'+this.user._id,[],this.filesToUpload).then(
                            (result: any)=>{
                                this.user.imagen = result.imagen
                                localStorage.setItem('identity', JSON.stringify(this.user))
                                //console.log(this.user)
                                let imagenPath = this.url+'obtenerImagenUsuario/'+this.user.imagen
                                document.getElementById("imagenUsuario").setAttribute('src', imagenPath)
                            }
                        )
                    }                  
                    this.alertMensaje = 'El usuario se ha actualizado correctamente'
                }
            },
            error =>{
                var errorMensaje = <any>error;
                if(errorMensaje != null){
                  let body = JSON.parse(error._body)
                  this.alertMensaje = body.mensaje
                }
            }
        )
    }

    public filesToUpload: Array<File>

    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files
    }
    makeFileRequest(url: string, params: Array<string>, files: Array<File>){
        let token = this.token
        return new Promise((resolve, reject)=>{
            var formData:any = new FormData()
            var xhr = new XMLHttpRequest()

            for(var i=0; i <files.length; i++){
                formData.append('imagen', files[i], files[i].name)
            }
            xhr.onreadystatechange = ()=>{
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.response))
                    }else{
                        reject(xhr.response)
                    }
                }
            }
            xhr.open('POST',url,true)
            xhr.setRequestHeader('Authorization', token)
            xhr.send(formData)
        })
    }
}