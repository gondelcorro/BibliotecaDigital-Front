import { EstadoPrestamo } from './../../_model/estadoPrestamo';
import { Prestamo } from './../../_model/prestamo';
import { PrestamoService } from './../../_service/prestamo.service';
import { LibroService } from './../../_service/libro.service';
import { AlumnoService } from './../../_service/alumno.service';
import { Alumno } from './../../_model/alumno';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Libro } from 'src/app/_model/libro';
import { MatSnackBar } from '@angular/material/snack-bar';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.css'],
  providers: [{
    //Seccion propivers agregada para poder cambiar los iconos del stepper
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class PrestamoComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  formCtrlAlu = new FormControl();
  formCtrlLib = new FormControl();
  listaAlumnos: Alumno[] = [];// lista de alumnos para el autocompletar
  listaLibros: Libro[] = [];
  alumnosFiltrados: Observable<Alumno[]>;
  librosFiltrados: Observable<Libro[]>;
  alumnoSelect: Alumno;
  libroSelect: Libro;
  ocultarTarjetaAlu: boolean = false;
  ocultarTarjetaLib: boolean = false;
  ocultarTarjetaOk: boolean = false;
  prestamo: Prestamo;

  constructor(private _formBuilder: FormBuilder, private alumnoService: AlumnoService, private libroService: LibroService
    , private snackBar: MatSnackBar, private prestamoService: PrestamoService) { }

  ngOnInit(): void {
    this.listarAlumnos();
    this.listarLibros();
    this.firstFormGroup = this._formBuilder.group({
      formCtrlAlu: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      formCtrlLib: ['', Validators.required]
    });

    this.alumnosFiltrados = this.formCtrlAlu.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'number' ? value : value.dni),
        map(dni => dni ? this._filterAlu(dni) : this.listaAlumnos.slice())
      );

    this.librosFiltrados = this.formCtrlLib.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'number' ? value : value.codigo),
        map(codigo => codigo ? this._filterLib(codigo) : this.listaLibros.slice())
      );
  }

  fcionMostrarAlu(alumno: Alumno): string {
    return alumno && alumno.dni ? alumno.dni : '';
  }

  fcionMostrarLib(libro: Libro): string {
    return libro && libro.codigo ? libro.codigo : '';
  }

  private _filterAlu(dni: number): Alumno[] {
    const filterValue = dni.toString().toLowerCase();
    return this.listaAlumnos.filter(alumno => alumno.dni.toString().toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterLib(cod: number): Libro[] {
    const filterValue = cod.toString().toLowerCase();
    return this.listaLibros.filter(libro => libro.codigo.toString().toLowerCase().indexOf(filterValue) === 0);
  }

  listarAlumnos() {
    this.alumnoService.listar().subscribe(data => {
      this.listaAlumnos = data;
    })
  }

  listarLibros() {
    this.libroService.listar().subscribe(data => {
      this.listaLibros = data;
    })
  }

  updateAluSelect(aluSelect: Alumno) {
    this.alumnoSelect = aluSelect;
    if (this.alumnoSelect != null) {
      this.ocultarTarjetaAlu = true;
    }
  }

  updateLibSelect(libSelect: Libro) {
    this.libroSelect = libSelect;
    if (this.libroSelect != null) {
      this.ocultarTarjetaLib = true;
    }
  }

  solicitudConfirmacion() {
    this.ocultarTarjetaOk = true;
    this.prestamo = new Prestamo()
    this.prestamo.fechaPrestamo = new Date();
    this.prestamo.fechaMaxDevolucion = new Date();
    this.prestamo.fechaMaxDevolucion.setDate(this.prestamo.fechaMaxDevolucion.getDate() + 15);
  }

  realizarPrestamo() {
    let alumno = new Alumno();
    let libro = new Libro();
    alumno.idAlumno = this.alumnoSelect.idAlumno;
    libro.idLibro = this.libroSelect.idLibro;
    this.prestamo.libro = libro;
    this.prestamo.alumno = alumno;
    this.prestamo.estadoPrestamo = EstadoPrestamo.PRESTADO
    this.prestamoService.registrar(this.prestamo).subscribe(data => {
      if (data != null) {
        this.snackBar.open("Se registró el prestamo correctamente", "Aviso", { duration: 2000 });
        //PARA Q TENGA EFECTO DE PROCESAMIENTO, SINO SE LIMPIA MUY RAPIDO
        setTimeout(() => {
          //refrescar la pantalla para q vuelva a inicializar todas las variables
          window.location.reload();
        }, 1000);
      } else {
        this.snackBar.open("Error al registrar el prestamo", "Aviso", { duration: 2000 });
      }
    });

  }
}
