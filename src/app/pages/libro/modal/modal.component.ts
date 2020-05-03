import { Libro } from './../../../_model/libro';
import { LibroService } from './../../../_service/libro.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  libro: Libro;

  //PARA RECIBIR EN EL DIALOGO LOS DATOS Q VIENEN DEL COMPONENTE PADRE, EL MATDIALOGREF Y EL @INJECT
  constructor(public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public libroSelect: Libro,
    private service: LibroService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    //ASIGO EN LIBRO LA DATA Q VIENE DE LA TABLA PARA PODER MOSTRARLA EN EL HTML
    //LO HAGO ASI CREANDO UNA NUEVA INSTANCIA XQ SINO LOS CAMBIOS SE VERAN TB EN LA TABLA EN TPO REAL MIENTRAS MODIFICO
    this.libro = new Libro();
    this.libro.idLibro = this.libroSelect.idLibro;// a la nueva instancia hay q setearle el id para q el back sepa q es una edicion
    this.libro.titulo = this.libroSelect.titulo;
    this.libro.autor = this.libroSelect.autor;
    this.libro.icbn = this.libroSelect.icbn;
    this.libro.original = this.libroSelect.original;
    this.libro.codigo = this.libroSelect.codigo;
    this.libro.numEjemplares = this.libroSelect.numEjemplares;
    this.libro.anio = this.libroSelect.anio;
  }

  operar() {
    if(this.libro != null && this.libro.idLibro > 0){
      this.service.editar(this.libro).subscribe(rpta => {
        if (rpta === 1) {
          this.service.listar().subscribe(libros => {
            this.service.libroCambio.next(libros);
            this.snackBar.open("Se editó correctamente", "Aviso", { duration: 3000 });
          });
        } else {
          this.snackBar.open("No se editó", "Aviso", { duration: 3000 });
        }
      });
    }else{
      this.libro.ejemplaresDisp = this.libro.numEjemplares
      this.service.registar(this.libro).subscribe( data => {
        if(data != null){
          this.service.listar().subscribe(libros => {
            this.service.libroCambio.next(libros);
            this.snackBar.open("Se registró correctamente", "Aviso", { duration: 3000 });
          });
        }else{
          this.snackBar.open("No se registró", "Aviso", {duration : 3000});
        }
      });
    }
    this.dialogRef.close();
  }

  cancelar() {
    this.dialogRef.close();
  }


}
