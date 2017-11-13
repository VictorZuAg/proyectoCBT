import {Injectable} from '@angular/core'
import {Http,Response,Headers} from '@angular/http'
 import 'rxjs/add/operator/map'
 import {Observable} from 'rxjs/Observable'
 import {GLOBAL} from './global'

 @Injectable()
 export class UsuarioService{

    public url: string
    public identity
    public token

    constructor(private _http:Http){
        this.url = GLOBAL.url
    }

    signup(userToLogin, gethash = null){
        if(gethash != null){
            userToLogin.gethash = gethash
        }
        let json = JSON.stringify(userToLogin)
        let params = json

        let headers = new Headers({'Content-Type':'application/json'})

        return this._http.post(this.url+'login', params, {headers:headers})
                         .map(res=>res.json())
    }

    //acceder al localstorage y devolverlo a la pagina
    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'))

        if(identity != "undefined"){
            this.identity = identity
        }else{
            this.identity = null
        }
        return this.identity
    }
    getToken(){
        let token = localStorage.getItem('token')
        
                if(token != "undefined"){
                    this.token = token
                }else{
                    this.token = null
                }
                return this.token
    }

    registro(userToRegister){
        let params = JSON.stringify(userToRegister)

        let headers = new Headers({'Content-Type':'application/json'})

        return this._http.post(this.url+'singup', params, {headers:headers})
                         .map(res=>res.json())
    }

    actualizarUsuario(userToUpdate){
        let params = JSON.stringify(userToUpdate)
        
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': this.getToken()
        })
        
        return this._http.put(this.url+'actualizarUsuario/'+userToUpdate._id, params, {headers:headers})
                         .map(res=>res.json())
    }

 }