import { PrestamoService } from './../../_service/prestamo.service';
import { Prestamo } from './../../_model/prestamo';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlumnoService } from './../../_service/alumno.service';
import { Alumno } from './../../_model/alumno';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Carrera } from 'src/app/_model/carrera';
import { EstadoPrestamo } from 'src/app/_model/estadoPrestamo';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {

  listaAlumnos: any; //Uso tipo any para poder instanciarlo como MatTableDataSource y usar el filtro, sino puede ser tipo lista  listaAlu: Alumno[] = [];
  displayedColumns: string[] = ['Nombres', 'Apellidos', 'Legajo', 'Documento', 'Carrera', 'Correo', 'Telefono', 'Acciones'];
  @ViewChild(MatSort) sort: MatSort;
  mostrarPanelNuevo: boolean = false;
  formAlumno: FormGroup;
  alumnoSelect : Alumno;
  carreraEnum = Carrera;
  carreraOpciones : string[] = [];
  prestados : Prestamo[] = [];
  devueltos : Prestamo[] = [];
  vencidos : Prestamo[] = [];

  constructor(private alumnoService: AlumnoService, private snackBar: MatSnackBar, private PrestamoService : PrestamoService) {
    //INSTANCIO EL FORMULARIO (los nombres deben coincidir con el definido para cada campo en el formControlName del html)
    this.formAlumno = new FormGroup({
      'idAlumno' : new FormControl(0),
      'nombres' : new FormControl(''),
      'apellidos' : new FormControl(''),
      'legajo': new FormControl(''),
      'dni' : new FormControl('', [Validators.pattern("[0-9]+"), Validators.maxLength(10)]),
      'carrera' : new FormControl(''),
      'correo' : new FormControl('', Validators.email),
      'telefono' : new FormControl('')
    });
    //Uso la clase Object y values muetra el valor del objeto Enum (keys me recupera las llaves)
    this.carreraOpciones = Object.values(this.carreraEnum);
  }

  ngOnInit(): void {
    this.listar();
    this.alumnoService.alumnoCambio.subscribe(data => {
      this.listaAlumnos.data = data;
      this.listaAlumnos = new MatTableDataSource(this.listaAlumnos);
      this.listaAlumnos.sort = this.sort;
    });
  }

  operar(){
    if(this.formAlumno.value['idAlumno'] == 0){
    // INSTANCIO UN ALUMNO Y LE SETEO LOS VALORES CON LO DEL FORMULARIO
    let alumno = new Alumno();
    alumno.nombres = this.formAlumno.value['nombres'];
    alumno.apellidos = this.formAlumno.value['apellidos'];
    alumno.legajo = this.formAlumno.value['legajo'];
    alumno.dni = this.formAlumno.value['dni'];
    alumno.carrera = this.formAlumno.value['carrera'];
    alumno.correo = this.formAlumno.value['correo'];
    alumno.telefono = this.formAlumno.value['telefono'];
    this.alumnoService.registrar(alumno).subscribe(alu => {
      if (alu != null) {
        this.listar();
          this.snackBar.open("Se registró correctamente", "Aviso", { duration: 3000 });
      } else {
        this.snackBar.open("No se registró", "Aviso", { duration: 3000 });
      }
    });
    }else{
      console.log(this.formAlumno.value['idAlumno']);
    // AL ALUMNO SELECCIONADO LE SETEO LOS VALORES CON LOS NUEVOS DATOS DEL FORMULARIO
    this.alumnoSelect.nombres = this.formAlumno.value['nombres'];
    this.alumnoSelect.apellidos = this.formAlumno.value['apellidos'];
    this.alumnoSelect.legajo = this.formAlumno.value['legajo'];
    this.alumnoSelect.dni = this.formAlumno.value['dni'];
    this.alumnoSelect.carrera = this.formAlumno.value['carrera'];
    this.alumnoSelect.correo = this.formAlumno.value['correo'];
    this.alumnoSelect.telefono = this.formAlumno.value['telefono'];
    this.alumnoService.editar(this.alumnoSelect).subscribe(rpta => {
      if (rpta === 1) {
          this.snackBar.open("Se editó correctamente", "Aviso", { duration: 3000 });
      } else {
        this.snackBar.open("No se editó", "Aviso", { duration: 3000 });
      }
    });
    }
    this.formAlumno.reset(); //resetea el formulario
  }

  listar() {
    this.alumnoService.listar().subscribe(data => {
      this.listaAlumnos = new MatTableDataSource();
      this.listaAlumnos.data = data;
      this.listaAlumnos.sort = this.sort;
    })
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listaAlumnos.filter = filterValue.trim().toLowerCase();//quita espacios en blanco y paso a minuscula
  }

  eliminar(alumno: Alumno) {
    this.alumnoService.eliminar(alumno.idAlumno).subscribe(data => {
      if (data === 1) {
        this.alumnoService.listar().subscribe(alumnos => {
          this.listaAlumnos = alumnos;
          this.snackBar.open("Se elimino correctamente", "Aviso", { duration: 3000 });
        });
      } else {
        this.snackBar.open("No se elimino", "Aviso", { duration: 3000 });
      }
    });
  }

  mostrarPanel() {
    this.mostrarPanelNuevo = !this.mostrarPanelNuevo;
  }

  resetForm() {
    this.formAlumno.reset();
  }

  cargarDataEdicion(aluSelect: Alumno) {
    this.alumnoSelect = aluSelect;
    //usar el método setValue cuando se van a actualizar todos sus campos y usar patchValue si solo se actualizan algunos (el idAlumno no se modifica)
    this.formAlumno.patchValue({
      idAlumno : aluSelect.idAlumno,
      nombres : aluSelect.nombres,
      apellidos : aluSelect.apellidos,
      legajo : aluSelect.legajo,
      dni : aluSelect.dni,
      carrera : aluSelect.carrera,
      correo : aluSelect.correo,
      telefono : aluSelect.telefono
    });
  }

  cargarDetallePrestamos(aluSelect: Alumno){
    this.alumnoSelect = aluSelect;
    this.PrestamoService.prestamosPorAlumno(this.alumnoSelect.idAlumno).subscribe(data =>{
      if(data != null){
        data.forEach(prestados =>{
          if(prestados.estadoPrestamo == EstadoPrestamo.PRESTADO){
            this.prestados.push(prestados)
          }
          if(prestados.estadoPrestamo == EstadoPrestamo.DEVUELTO){
            this.devueltos.push(prestados)
          }
          if(prestados.estadoPrestamo == EstadoPrestamo.VENCIDO){
            this.vencidos.push(prestados)
          }
        });
      }
    });
  }
}
