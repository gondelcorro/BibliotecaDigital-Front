import { Alumno } from './../_model/alumno';
import { HttpClient } from '@angular/common/http';
import { HOST } from './../_shared/constants';
import { Injectable} from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  url : string = `${HOST}/alumno`;
  alumnoCambio = new Subject<Alumno[]>();

  constructor(private http : HttpClient) { }

  registrar(alumno : Alumno){
    return this.http.post<Alumno>(`${this.url}/registrar`, alumno);
  }

  eliminar(idAlumno : number){
    return this.http.delete(`${this.url}/eliminar/${idAlumno}`);
  }

  editar(alumno : Alumno){
    return this.http.put<number>(`${this.url}/editar`, alumno);
  }

  listar(){
    return this.http.get<Alumno[]>(`${this.url}/listar`);
  }

  obtener(idAlumno : number){
    return this.http.get<Alumno>(`${this.url}/obtener/${idAlumno}`);
  }
}
