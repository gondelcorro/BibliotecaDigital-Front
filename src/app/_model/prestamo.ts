import { EstadoPrestamo } from './estadoPrestamo';
import { Alumno } from './alumno';
import { Libro } from './libro';

export class Prestamo{
    //nombres igual q la columna de la bd siempre
    public idPrestamo : number;
    public alumno : Alumno;
    public libro : Libro;
    public fechaPrestamo : Date;
    public fechaMaxDevolucion : Date;
    public fechaDevolucion : Date;
    public estadoPrestamo : EstadoPrestamo; 
}