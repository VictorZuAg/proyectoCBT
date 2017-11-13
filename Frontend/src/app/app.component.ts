import { Component,OnInit} from '@angular/core';
import { Usuario } from './models/usuario';
import { UsuarioService} from './services/usuario.service'
import { GLOBAL} from './services/global'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UsuarioService],
  styleUrls: ['./styles/app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'CBT Dr. Maxmiliano Ruiz Castañeda';
  public user: Usuario;
  public userRegistro: Usuario;
  public identity;
  public token;
  public errorMensaje
  public alertRegistro
  public url

  constructor(
    private _usuarioService: UsuarioService
  ) {
    this.user = new Usuario('', '', '', '', '', '', 'USUARIO', '');
    this.userRegistro = new Usuario('', '', '', '', '', '', 'USUARIO', '');
    this.url = GLOBAL.url
    //console.log('asdf');
  }

  ngOnInit() {
    this.identity = this._usuarioService.getIdentity()
    this.token = this._usuarioService.getToken()
  }

  public onSubmit() {
    //console.log(this.user);
    //Conseguir los datos del usuario identificado
    this._usuarioService.signup(this.user).subscribe(
      response => {
        let identity = response.usuario
        this.identity = identity

        if (!this.identity._id) {
          alert("El usuario no está correctamente identificado")
        } else {
          //Crear elemento en el localstorage para guardar la sesion
          localStorage.setItem('identity', JSON.stringify(identity))

          //Conseguir el token y enviarlo por peticion http
          this._usuarioService.signup(this.user, true).subscribe(
            response => {
              let token = response.token
              this.token = token

              if (this.token.length <= 0) {
                alert("El token no se ha generado correctamente")
              } else {
                //Crear elemento en el localstorage para guardar la sesion
                localStorage.setItem('token', token)
                this.user = new Usuario('', '', '', '', '', '', 'USUARIO', '');
              }
            },
            error => {
              var errorMensaje = < any > error;

              if (errorMensaje != null) {
                let body = JSON.parse(error._body)
                this.errorMensaje = body.mensaje
                console.log(errorMensaje)
              }
            }
          )
        }
      },
      error => {
        var errorMensaje = < any > error;

        if (errorMensaje != null) {
          let body = JSON.parse(error._body)
          this.errorMensaje = body.mensaje
        }
      }
    )
  }

  logOut() {
    localStorage.removeItem('identity')
    localStorage.removeItem('token')
    localStorage.clear()
    this.identity = null
    this.token = null
  }

  registrar() {
    this._usuarioService.registro(this.userRegistro).subscribe(
      response => {
        let user = response.usuario
        this.userRegistro = user

        if (!user._id) {
          this.alertRegistro = 'Error al registrarse'
        } else {
          //Crear elemento en el localstorage para guardar la sesion
          this.alertRegistro = `El usuario ${user.usuario} se registro exitosamente`
          this.userRegistro = new Usuario('', '', '', '', '', '', 'USUARIO', '');
        }
      },
      error => {
        var errorMensaje = < any > error;
        if (errorMensaje != null) {
          let body = JSON.parse(error._body)
          this.alertRegistro = body.mensaje
        }
      }
    )
  }

}
