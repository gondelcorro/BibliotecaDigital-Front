import { Libro } from './../_model/libro';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HOST, TOKEN_NAME } from './../_shared/constants';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  url : string = `${HOST}/libro`;
  libroCambio = new Subject<Libro[]>(); //Variable de tipo Subject para prog reactiva, va a permitir detectar un cambio y actualizar la pantalla
  access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;

  constructor(private http : HttpClient) {}

  registar(libro : Libro){
    return this.http.post<Libro>(`${this.url}/registrar`, libro, {
      headers: new HttpHeaders().set('Authorization', `bearer ${this.access_token}`).set('Content-Type', 'application/json')
    });
  }

  eliminar(idLibro : number){
    return this.http.delete(`${this.url}/eliminar/${idLibro}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${this.access_token}`).set('Content-Type', 'application/json')
    });
  }

  editar(libro : Libro){
    return this.http.put<number>(`${this.url}/editar`, libro, {
      headers: new HttpHeaders().set('Authorization', `bearer ${this.access_token}`).set('Content-Type', 'application/json')
    });
  }

  listar(){
    return this.http.get<Libro[]>(`${this.url}/listar`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${this.access_token}`).set('Content-Type', 'application/json')
    });
  }

  obtener(idLibro : number){
    return this.http.get<Libro>(`${this.url}/obtener/${idLibro}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${this.access_token}`).set('Content-Type', 'application/json')
    });
  }

  buscarPorCodigo(codigo : string){
    return this.http.get<boolean>(`${this.url}/buscarPorCodigo/${codigo}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${this.access_token}`).set('Content-Type', 'application/json')
    });
  }

}
