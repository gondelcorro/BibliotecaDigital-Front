import { CLIENT_ID, CLIENT_SECRET } from './../_shared/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST } from '../_shared/constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url : string = `${HOST}/oauth/token`;

  constructor(private http : HttpClient) { }

  login(usuario : string, clave : string){
    const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(clave)}`;
    return this.http.post(this.url, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8').set('Authorization', 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET))
    });
  }
}
