import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginComponent } from './pages/login/login.component';
import { DevolucionComponent } from './pages/dashboard/devolucion/devolucion.component';
import { PrestamoComponent } from './pages/dashboard/prestamo/prestamo.component';
import { ModalComponent } from './pages/dashboard/libro/modal/modal.component';
import { LibroComponent } from './pages//dashboard/libro/libro.component';
import { AlumnoComponent } from './pages/dashboard/alumno/alumno.component';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    AlumnoComponent,
    LibroComponent,
    ModalComponent,
    PrestamoComponent,
    DevolucionComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  // NECESARIO IMPORTAR PARA USAR EL Routing
    BrowserAnimationsModule,
    HttpClientModule, // NECESARIO IMPORTAR PARA USAR LOS services
    MaterialModule,
    FormsModule, // NECESARIO IMPORTAR PARA USAR EL NgModule
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
