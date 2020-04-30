import { Libro } from './../_model/libro';
import { HttpClient } from '@angular/common/http';
import { HOST } from './../_shared/constants';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  url : string = `${HOST}/libro`;
  libroCambio = new Subject<Libro[]>(); //Variable de tipo Subject para prog reactiva, va a permitir detectar un cambio y actualizar la pantalla

  constructor(private http : HttpClient) {}

  registar(libro : Libro){
    return this.http.post<Libro>(`${this.url}/registrar`, libro);
  }

  eliminar(idLibro : number){
    return this.http.delete(`${this.url}/eliminar/${idLibro}`);
  }

  editar(libro : Libro){
    return this.http.put<Libro>(`${this.url}/editar`, libro);
  }

  listar(){
    return this.http.get<Libro[]>(`${this.url}/listar`);
  }

  obtener(idLibro : number){
    return this.http.get<Libro>(`${this.url}/obtener/${idLibro}`);
  }

}
