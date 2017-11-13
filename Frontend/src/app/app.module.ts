import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import {HttpModule} from '@angular/http'

import { AppComponent } from './app.component';
import { UsuarioEditComponent } from './components/user-edit.component'
import { routing, appRoutingProviders} from './app.routing'
import { AlumnoListComponent } from './components/alumno-list.component'
import { AlumnoAddComponent } from './components/alumno-add.component'
import { AlumnoEditComponent } from './components/alumno-edit.component'
import { AlumnoDetailComponent } from './components/alumno-detail.component'
import { HomeComponent } from './components/home.component'
import { PaginaNoEncontrada } from './components/notFound'

@NgModule({
  declarations: [
    AppComponent,
    UsuarioEditComponent,
    AlumnoListComponent,
    AlumnoAddComponent,
    HomeComponent,
    AlumnoEditComponent,
    AlumnoDetailComponent,
    PaginaNoEncontrada
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
