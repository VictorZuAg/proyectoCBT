import {Component} from '@angular/core'

@Component({
    selector: 'not-found',
    templateUrl: '../views/notFound.html'
})
export class PaginaNoEncontrada{
    public titulo

    constructor(){
        this.titulo="Error 404"
    }
}