import { DevolucionComponent } from './pages/devolucion/devolucion.component';
import { PrestamoComponent } from './pages/prestamo/prestamo.component';
import { LibroComponent } from './pages/libro/libro.component';
import { AlumnoComponent } from './pages/alumno/alumno.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  //Cuando la ruta sea la especificada en el path, redirigime al componente o a una ruta en particular
  {path: '', redirectTo: 'app', pathMatch: 'full' },
  {path:'alumno', component:AlumnoComponent},
  {path:'libro', component:LibroComponent},
  {path:'prestamo', component:PrestamoComponent},
  {path:'devolucion', component:DevolucionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
