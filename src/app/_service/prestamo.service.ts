import { Subject } from 'rxjs';
import { Prestamo } from './../_model/prestamo';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST } from '../_shared/constants';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  url : string = `${HOST}/prestamo`;
  prestamoCambio = new Subject<Prestamo[]>();

  constructor(private http : HttpClient) { }

  registrar(prestamo : Prestamo){
    return this.http.post<Prestamo>(`${this.url}/registrar`, prestamo);
  }

  elimimnar(idPrestamo : number){
    return this.http.delete<number>(`${this.url}/elimiar/${idPrestamo}`);
  }

  editar(prestamo : Prestamo){
    return this.http.put<Prestamo>(`${this.url}/editar`, prestamo);
  }

  listar(){
    return this.http.get<Prestamo[]>(`${this.url}/listar`);
  }

  obtener(idPrestamo : number){
    return this.http.get<Prestamo>(`${this.url}/obtener/${idPrestamo}`);
  }

  prestamosPorAlumno(idAlumno : number){
    return this.http.get<Prestamo[]>(`${this.url}/prestamosPorAlumno/${idAlumno}`);
  }
}
