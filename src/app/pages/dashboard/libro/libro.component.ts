import { LibroService } from './../../../_service/libro.service';
import { Libro } from './../../../_model/libro';
import { ModalComponent } from './modal/modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit {

  libro : Libro;
  listaLibros : any; //Uso tipo any para poder instanciarlo como MatTableDataSource y usar el filtro, sino puede ser tipo lista  listaLibro: Alumno[] = [];
  displayedColumns: string[] = ['Titulo', 'Autor','Editorial', 'ICBN', 'Original', 'Codigo', 'NumEjemplares','EjemplaresDisp', 'Anio', 'Acciones'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private libroService : LibroService, private snackBar : MatSnackBar, private modal : MatDialog) { }

  ngOnInit(): void {
    this.listar();
    //Para actualizar la tabla cuando se edita desde el modal
    this.libroService.libroCambio.subscribe(data => {
      this.listaLibros = data;
      this.listaLibros = new MatTableDataSource(this.listaLibros);
      this.listaLibros.sort = this.sort;
    });
  }

  listar(){
    this.libroService.listar().subscribe(data => {
      this.listaLibros = new MatTableDataSource();
      this.listaLibros.data = data;
      this.listaLibros.sort = this.sort;
    });
  }

  aplicarFiltro(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();//quita espacios en blanco y paso a minuscula
    this.listaLibros.filter = filterValue;
  }

  eliminar(libro : Libro){
    this.libroService.eliminar(libro.idLibro).subscribe(data => {
      if (data === 1) {
        this.libroService.listar().subscribe(libros => {
          this.listaLibros = libros;
          this.snackBar.open("Se elimino correctamente", "Aviso", { duration: 3000 });
        });
      } else {
        this.snackBar.open("No se elimino", "Aviso", { duration: 3000 });
      }
    });
  }

  abrirModal(libro : Libro): void {
    let libroSelect = libro != null ? libro : new Libro(); //control para modo edicion o registro
    let dialogRef = this.modal.open(ModalComponent, {
      width: '350px',   
      disableClose: true,   
      data: libroSelect      
    });
  }

}
