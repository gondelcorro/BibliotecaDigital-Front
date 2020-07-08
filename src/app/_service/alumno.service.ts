import { Alumno } from './../_model/alumno';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HOST, TOKEN_NAME } from './../_shared/constants';
import { Injectable} from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  url : string = `${HOST}/alumno`;
  alumnoCambio = new Subject<Alumno[]>();
  access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;

  constructor(private http : HttpClient) { }

  registrar(alumno : Alumno){
    return this.http.post<Alumno>(`${this.url}/registrar`, alumno, {
      headers: new HttpHeaders().set('Authorization', `bearer ${this.access_token}`).set('Content-Type', 'application/json')
    });
  }

  eliminar(idAlumno : number){
    return this.http.delete(`${this.url}/eliminar/${idAlumno}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${this.access_token}`).set('Content-Type', 'application/json')
    });
  }

  editar(alumno : Alumno){
    return this.http.put<number>(`${this.url}/editar`, alumno, {
      headers: new HttpHeaders().set('Authorization', `bearer ${this.access_token}`).set('Content-Type', 'application/json')
    });
  }

  listar(){
    return this.http.get<Alumno[]>(`${this.url}/listar`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${this.access_token}`).set('Content-Type', 'application/json')
    });
  }

  obtener(idAlumno : number){
    return this.http.get<Alumno>(`${this.url}/obtener/${idAlumno}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${this.access_token}`).set('Content-Type', 'application/json')
    });
  }

  buscarPorDni(dni : string){
    return this.http.get<boolean>(`${this.url}/buscarPorDni/${dni}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${this.access_token}`).set('Content-Type', 'application/json')
    });
  }
}
