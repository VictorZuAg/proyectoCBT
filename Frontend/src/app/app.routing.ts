import { ModuleWithProviders} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'

//import usuario
 import {UsuarioEditComponent} from './components/user-edit.component'
 import { AlumnoListComponent } from './components/alumno-list.component'
 import { AlumnoAddComponent } from './components/alumno-add.component' 
 import { AlumnoEditComponent } from './components/alumno-edit.component'
 import { AlumnoDetailComponent } from './components/alumno-detail.component'
 import { HomeComponent } from './components/home.component'
 import { PaginaNoEncontrada } from './components/notFound'
 
 const appRoutes : Routes = [
     {path:'', component: HomeComponent},
     {path:'misDatos', component: UsuarioEditComponent},
     {path:'alumnos', component: AlumnoListComponent},
     {path:'nuevoAlumno', component: AlumnoAddComponent},
     {path:'editarAlumno/:id', component:AlumnoEditComponent },
     {path:'alumno/:id', component:AlumnoDetailComponent },
     {path:'**', component: PaginaNoEncontrada},
 ]
 export const appRoutingProviders: any[] = []
 export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)