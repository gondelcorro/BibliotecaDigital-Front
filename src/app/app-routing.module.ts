import { GuardService } from './_service/guard.service';
import { LoginComponent } from './pages/login/login.component';
import { LibroComponent } from './pages/dashboard/libro/libro.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DevolucionComponent } from './pages/dashboard/devolucion/devolucion.component';
import { PrestamoComponent } from './pages/dashboard/prestamo/prestamo.component';
import { AlumnoComponent } from './pages/dashboard/alumno/alumno.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  //Cuando la ruta sea la especificada en el path, redirigime al componente o a una ruta en particular
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [GuardService], children:[
    {path:'alumno', component:AlumnoComponent},
    {path:'libro', component:LibroComponent},
    {path:'prestamo', component:PrestamoComponent},
    {path:'devolucion', component:DevolucionComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})], //El use # lo agrego como estrategia en las URL
  exports: [RouterModule]
})
export class AppRoutingModule { }
