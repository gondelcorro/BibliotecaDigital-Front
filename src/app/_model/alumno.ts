import { Carrera } from 'src/app/_model/carrera';
export class Alumno{
    //nombres igual q la columna de la bd siempre
    public idAlumno:number;
    public nombres:string;
    public apellidos:string;
    public legajo:string;
    public dni:string;
    public correo:string;
    public carrera:Carrera;
    public telefono:string;
}