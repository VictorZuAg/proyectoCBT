import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map'
import { Observable } from "rxjs/Observable";
import { GLOBAL } from "./global";
import {Alumno} from '../models/alumno'

@Injectable()

export class AlumnoService{

    public url: string

    constructor(private _http:Http){
        this.url = GLOBAL.url
    }
    /**
     * nuevoAlumno
     */
    public nuevoAlumno(token, alumno: Alumno) {
        let params = JSON.stringify(alumno)

        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': token
        })
        return this._http.post(this.url+'alumno', params, {headers:headers})
                        .map(res => res.json())
    }
    public getAlumnos(token){
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': token
        })
        let options = new RequestOptions({headers})
        return this._http.get(this.url+"alumnos", options)
                    .map(res=>res.json())
    }
    public getAlumno(token, id: string){
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': token
        })
        let options = new RequestOptions({headers})
        return this._http.get(this.url+"alumno/"+id, options)
                    .map(res=>res.json())
    }

    public editAlumno(token,id: string, alumno: Alumno) {
        let params = JSON.stringify(alumno)

        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': token
        })
        return this._http.put(this.url+'alumno/'+id, params, {headers:headers})
                        .map(res => res.json())
    }
    public deleteAlumno(token, id:string){
        let headers = new Headers({
            'Content-Type':'application/json',
            'Authorization': token
        })
        let options = new RequestOptions({headers})
        console.log(this.url)
        return this._http.delete(this.url+"alumno/"+id, options)
                    .map(res=>res.json())
                ///cbt/alumno/:alumnoId
    }
}