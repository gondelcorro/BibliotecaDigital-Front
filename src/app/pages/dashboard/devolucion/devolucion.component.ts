import { PrestamoService } from './../../../_service/prestamo.service';
import { Prestamo } from './../../../_model/prestamo';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EstadoPrestamo } from 'src/app/_model/estadoPrestamo';

@Component({
  selector: 'app-devolucion',
  templateUrl: './devolucion.component.html',
  styleUrls: ['./devolucion.component.css']
})
export class DevolucionComponent implements OnInit {

  prestamo: Prestamo;
  listaPrestamos: any; //Uso tipo any para poder instanciarlo como MatTableDataSource y usar el filtro, sino puede ser tipo lista  listaLibro: Alumno[] = [];
  displayedColumns: string[] = ['Documento', 'Alumno', 'Libro', 'Fecha de Préstamo', 'Fecha máx. Devolución', 'Fecha Devolucíon', 'Estado', 'Acciones'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private prestamoService: PrestamoService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.prestamoService.listar().subscribe(data => {
      this.listaPrestamos = new MatTableDataSource();
        this.listaPrestamos.data = data;
        this.listaPrestamos.sort = this.sort;
        //Filtro aplicado solamente a la columna alumno (se sobreescribe el método filterPredicate)
        //Lo pongo dentro de la suscrpcion xq necesito que primero se cargue listaPrestamos
        this.listaPrestamos.filterPredicate = (data, filter: string) => {
          const accumulator = (currentTerm, key) => {
            return key === 'alumno' ? currentTerm + data.alumno.dni : currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };
    });
  }

  aplicarFiltro(filterValue: string) {
    //filterValue = filterValue.trim().toLowerCase();//quita espacios en blanco y paso a minuscula
    this.listaPrestamos.filter = filterValue;
  }

  devolverLibro(prestamo: Prestamo) {
    if (prestamo.estadoPrestamo != EstadoPrestamo.DEVUELTO) {
      prestamo.estadoPrestamo = EstadoPrestamo.DEVUELTO
      prestamo.fechaDevolucion = new Date();
      this.prestamoService.editar(prestamo).subscribe(data => {
        if (data === 1) {
            this.snackBar.open("Libro devuelto exitosamente", "Aviso", { duration: 3000 });
        } else {
          this.snackBar.open("Error al devolver libro", "Aviso", { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open("El libro ya fué devuelto", "Aviso", { duration: 3000 });
    }
  }

}
