import {Component, OnInit} from '@angular/core'
import {Router, ActivatedRoute, Params} from '@angular/router'


@Component({
    selector: 'home',
    templateUrl: '../views/home.html'
})

export class HomeComponent implements OnInit{
    public titulo: string

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        
    ){
        this.titulo = "Lista de Alumnos"
        
    }
    ngOnInit(){
        console.log('home.component')
    }
}

