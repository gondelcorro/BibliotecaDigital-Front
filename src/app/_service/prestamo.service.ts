import { TOKEN_NAME } from './../_shared/constants';
import { Subject } from 'rxjs';
import { Prestamo } from './../_model/prestamo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST } from '../_shared/constants';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  url : string = `${HOST}/prestamo`;
  prestamoCambio = new Subject<Prestamo[]>();
  access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;

  constructor(private http : HttpClient) { }

  registrar(prestamo : Prestamo){
    return this.http.post<Prestamo>(`${this.url}/registrar`, prestamo, {
      headers: new HttpHeaders().set('Authorization', `bearer ${this.access_token}`).set('Content-Type', 'application/json')
    });
  }

  elimimnar(idPrestamo : number){
    return this.http.delete<number>(`${this.url}/elimiar/${idPrestamo}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${this.access_token}`).set('Content-Type', 'application/json')
    });
  }

  editar(prestamo : Prestamo){
    return this.http.put<number>(`${this.url}/editar`, prestamo, {
      headers: new HttpHeaders().set('Authorization', `bearer ${this.access_token}`).set('Content-Type', 'application/json')
    });
  }

  listar(){
    return this.http.get<Prestamo[]>(`${this.url}/listar`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${this.access_token}`).set('Content-Type', 'application/json')
    });
  }

  obtener(idPrestamo : number){
    return this.http.get<Prestamo>(`${this.url}/obtener/${idPrestamo}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${this.access_token}`).set('Content-Type', 'application/json')
    });
  }

  prestamosPorAlumno(idAlumno : number){
    return this.http.get<Prestamo[]>(`${this.url}/prestamosPorAlumno/${idAlumno}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${this.access_token}`).set('Content-Type', 'application/json')
    });
  }
}
