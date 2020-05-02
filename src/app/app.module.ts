import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AlumnoComponent } from './pages/alumno/alumno.component';
import { LibroComponent } from './pages/libro/libro.component';
import { ModalComponent } from './pages/libro/modal/modal.component';
import { PrestamoComponent } from './pages/prestamo/prestamo.component';

@NgModule({
  declarations: [
    AppComponent,
    AlumnoComponent,
    LibroComponent,
    ModalComponent,
    PrestamoComponent
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
